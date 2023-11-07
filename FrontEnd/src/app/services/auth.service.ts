import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly BASE_URL = 'https://localhost:3000';
  constructor(private http: HttpClient) {}

  get isLoggedIn():boolean{
    const token = localStorage.getItem('x-auth-token')
    return token ? true : false;
  }

  gettoken(){
    return localStorage.getItem('x-auth-token');
  }

  login(username : string, password : string){
    return this.http.post(`${this.BASE_URL}/api/auth`, {username, password});
  }

  logout() : void{
    localStorage.removeItem('x-auth-token');
  }

  signUp(
    username: string, 
    firstName: string, 
    lastName: string,
    password: string,
    age: number
    ){
    return this.http.post(`${this.BASE_URL}/api/user`, {
      username,
      firstName,
      lastName,
      password,
      age
    });
  }
}
