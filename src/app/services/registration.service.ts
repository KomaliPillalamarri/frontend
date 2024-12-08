import { Injectable } from '@angular/core';
import { CustomHttpService } from './customhttp.service';
import API_ENDPOINTS from '../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private customHttp:CustomHttpService) { }

  async getRegistrartions():Promise<any>{
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.GET_ALL_EVENT_REGISTRATIONS_API)
      return res;
    }catch(e){
      throw e
    }
  }

  async registration(payload:any):Promise<any>{
    try{
      const res:any = this.customHttp.post(API_ENDPOINTS.EVENT_REGISTRATION_API,payload)
      return res;
    }catch(e){
      throw e
    }
  }

  async getUserRegistrations(userId:any) {
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.GET_REGISTRATIONS_BY_USERID(userId))
      return res;
    }catch(e){
      throw e
    }
  }

  async markAttendace(id:string,payload:any){
    try{
      const res = this.customHttp.post(API_ENDPOINTS.MARK_ATTENDANCE_API(id),payload);
      return res;
    }catch(e){
      throw e;
    }
  }
}