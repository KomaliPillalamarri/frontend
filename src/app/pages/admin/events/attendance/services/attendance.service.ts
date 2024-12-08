import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../../../../services/customhttp.service';
import API_ENDPOINTS from '../../../../../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private customHttp:CustomHttpService
  ) { }

  markAttendance(id:string,payload:any){
    try{
      const res = this.customHttp.post(API_ENDPOINTS.MARK_ATTENDANCE_API(id),payload)
      return res;
    }catch(e){
      throw e
    }
  }

  getAttendanceByUserId(userId:string){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_ATTENDANCE_BY_USER_ID_API(userId))
      return res;
    }catch(e){
      throw e
    }
  }

  getAttendanceByDate(date:string){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_ATTENDANCE_BY_DATE_API(date))
      return res;
    }catch(e){
      throw e
    }
  }

  getAllAttendance(){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_ATTENDANCE_API)
      return res;
    }catch(e){
      throw e
    }
  }
}
