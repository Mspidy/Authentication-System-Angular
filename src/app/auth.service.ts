import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userRegister(data: any) {
    return this.http.post('http://localhost:8000/api/register', data)
  }

  loginSuccess(data:any){
    return this.http.post('http://localhost:8000/api/login',data,{ withCredentials: true });
  }

  getUserLogin(){
    let headers = new Headers();
    return this.http.get('http://localhost:8000/api/user/info',{withCredentials:true});
  }

  logoutUser(data:any){
    return this.http.post('http://localhost:8000/api/logout',data, { withCredentials: true })
  }

  // Now next line is for todo all http services
  createTodo(data:any){
    return this.http.post('http://localhost:8000/api/todo-post',data)
  }

  getAllTodo(){
    return this.http.get('http://localhost:8000/api/todo-get')
  }

  deleteTodoList(id:number){
    return this.http.delete(`http://localhost:8000/api/todo/${id}`)
  }
}
