import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Emitters } from '../emmiters/emmiters';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  ngOnInit() {
    this.getUser()
    this.getAllTodo()
  }

  message=''

  todoForm = new FormGroup({
    todo: new FormControl('', Validators.required),
  })

  getUser(){
    try{
      this.authservice.getUserLogin().subscribe((res:any)=>{
        console.log(res)
        this.message = `Hi ${res.name}`
        Emitters.authEmitter.emit(true)
      })
    } catch(err){
      this.message=`${err}`
      Emitters.authEmitter.emit(false)
    }
  }

  addTodoForm(){
    console.log(this.todoForm.value)
    this.authservice.createTodo(this.todoForm.value).subscribe((res:any)=>{
      console.log(res)
      Swal.fire({
        icon: 'success',
        background: '#1a1f36',
        title: `Todo`,
        color:'#FFF',
        text: 'Successfully Submited Todo',
      })
    })
    this.todoForm.reset();
  }

  totalTodo:any
  getAllTodo(){
    this.authservice.getAllTodo().subscribe((res:any)=>{
      console.log(res)
      this.totalTodo = res
    })
  }

  deletTrashTodo:any
  fieldsChange($event:any){
    console.log($event.id)
    this.deletTrashTodo = $event.id
  }

  deleteTodoFinally(){
    this.authservice.deleteTodoList(this.deletTrashTodo).subscribe((res:any)=>{
      console.log(res)
      Swal.fire({
        icon: 'success',
        background: '#1a1f36',
        title: `Delete Todo`,
        color:'#FFF',
        text: 'Successfully Delete Todo',
      })
      this.router.navigate(['/home'])
    })
  }
}
