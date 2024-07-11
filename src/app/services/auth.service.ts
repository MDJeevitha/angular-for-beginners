import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7239/api"
  constructor(private http : HttpClient) { }


  //creating services
  signUp(userObj:any){
      return this.http.post<any>(`${this.baseUrl}/user/register`, userObj)
  }


  login(loginObj:any) {
      return this.http.post<any>(`${this.baseUrl}/user/authenticate`, loginObj)
  }
}
