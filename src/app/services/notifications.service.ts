import { Injectable } from '@angular/core';
import API_ENDPOINTS from '../constants/apiEndpoints';
import { CustomHttpService } from './customhttp.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http:CustomHttpService
  ) { }

  async saveNotification(payload:any):Promise<any>{
    try{
      const res:any = this.http.post(API_ENDPOINTS.SAVE_NOTIFICATION_API,payload)
      return res;
    }catch(e){
      throw e
    }
  }

  async getUserNotification(id:string):Promise<any>{
    try{
      const res:any = this.http.get(API_ENDPOINTS.GET_EMPLOYEE_NOTIFICATION_API(id))
      return res;
    }catch(e){
      throw e
    }
  }

  async markReadNotification(id:string):Promise<any>{
    try{
      const res:any = this.http.get(API_ENDPOINTS.MARK_READ_NOTIFICAITONS_API(id))
      return res;
    }catch(e){
      throw e
    }
  }
}
