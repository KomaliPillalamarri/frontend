import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import API_ENDPOINTS from '../constants/apiEndpoints';
import {jwtDecode} from 'jwt-decode'; 
import { CustomHttpService } from './customhttp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private loggedInUser:any=null
  private BASE_URL = 'http://localhost:8082/api'; 
  constructor(private customHttp:CustomHttpService,private router: Router) {}

   /**
   * Login the user by making an API call
   * @param username - User's username
   * @param password - User's password
   * @returns Observable<boolean> - true if login is successful
   */
   async login(username: string, password: string):Promise<boolean> {
    
    try{
      const res:any = await this.customHttp.post(API_ENDPOINTS.LOGIN_API,{username,password})
      console.log(res);
      if(res.data){
        const token = res.data;
        const decodedToken :any = jwtDecode(token)

        if(decodedToken.exp * 1000 < Date.now()){
          throw new Error("Token expired")
        }
        
        const userDetails = {
          username: decodedToken.sub,
          role: decodedToken.role,
          email: decodedToken.email,
          userId: decodedToken.userId,
        }

        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(userDetails))
        localStorage.setItem('role',userDetails.role)

        this.loggedInUserSubject.next(userDetails)
        return true;
      }

      return false;
    }catch(e){
      console.log(e);
      throw e;
    }
  }

  async signUp(payload:any):Promise<boolean> {
    
    try{
      const res:any = await this.customHttp.post(API_ENDPOINTS.SIGNUP_API,payload)
      console.log(res);
      if(res.data){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }catch(e){
      console.log(e);
      throw e;
    }
  }


  get isLoggedIn(): boolean {
    const isLoggedIn = !!localStorage.getItem('user')
    console.log(isLoggedIn);
    return isLoggedIn;
  }

  get currentUser(): any {
    return JSON.parse(localStorage.getItem('user')!)
  }

  logout(): void {
    this.loggedInUser = null
    localStorage.removeItem('token'); 
    localStorage.removeItem('role'); 
    localStorage.removeItem('user');

  }
  getAllUsers(){
    try{
      const response = this.customHttp.get(API_ENDPOINTS.GET_ALL_USERS_API)
      return response;
    }
    catch(e){
      throw e;
    }
    
  }
}
