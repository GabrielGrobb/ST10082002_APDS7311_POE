import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private readonly BASE_URL = 'https://localhost:3000';
  
  constructor(private http: HttpClient, private auth: AuthServiceService) { }

  getPosts(){
    const token = this.auth.gettoken();
    return this.http.get(`${this.BASE_URL}/api/bulletinboard`,{
      headers: {
        'x-auth-token': token ?? '',
      },
    });
  }

  add(title: string, description: string, department: string){
    const token = this.auth.gettoken();
    return this.http.post(
      `${this.BASE_URL}/api/bulletinboard`, 
      {
        title,
        description,
        department,
      },
      {
        headers: {
          'x-auth-token': token ?? '',
        },
      }
    );
  }

  delete(id: string){
    return this.http.delete(`${this.BASE_URL}/api/bulletinboard/${id}`, {
      headers: {
        'x-auth-token': this.auth.gettoken() ?? '',
      },
    });
  }
}
