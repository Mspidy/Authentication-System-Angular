import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(){

  }

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  userRegisterationForm(){
    console.log(this.registerForm.value)
    this.authservice.userRegister(this.registerForm.value).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        background: '#1a1f36',
        title: `welcome ${this.registerForm.value.name}`,
        color:'#FFF',
        text: 'Registeration Successfully',
      })
      this.router.navigate(['/login'])
    })
  }


}
