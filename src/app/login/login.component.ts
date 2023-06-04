import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(){

  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  welocmeLogin(){
    console.log(this.loginForm.value)
    this.authservice.loginSuccess(this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        background: '#1a1f36',
        title: `welcome Sir`,
        color:'#FFF',
        text: 'Welcome to this virtual world',
      })
      this.router.navigate(['/home'])
    })
  }

}
