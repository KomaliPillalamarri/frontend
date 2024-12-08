import { Injectable } from '@angular/core';
import { CustomHttpService } from './customhttp.service';
import API_ENDPOINTS from '../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private customHttp:CustomHttpService
  ) { }

  async submitFeedback(payload:any){
    try{
      const res = this.customHttp.post(API_ENDPOINTS.SUBMIT_FEEDBACK_API,payload)
      return res;
    }catch(e){
      throw e
    }
  }

  async getSubmitByEventId(eventId:string){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_FEEDBACK_BY_EVENT_ID_API(eventId))
      return res;
    }catch(e){
      throw e
    }
  }
}
