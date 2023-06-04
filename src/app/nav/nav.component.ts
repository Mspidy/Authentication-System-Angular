import { Component } from '@angular/core';
import { Emitters } from '../emmiters/emmiters';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  authenticated = false;
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(){
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated = auth
    })
  }

  logout(){
    let obj = {}
    this.authservice.logoutUser(obj).subscribe((res:any)=>{
      console.log(res)
      this.authenticated = false;
      Swal.fire({
        icon: 'success',
        background: '#1a1f36',
        title: `Logout Successfully`,
        color:'#FFF',
        text: 'Thanks for Using this Applications',
      })
      // window.location.reload();
      this.router.navigate(['/login'])
    })
  }

}
