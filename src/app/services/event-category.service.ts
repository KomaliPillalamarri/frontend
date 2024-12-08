import { Injectable } from '@angular/core';
import { CustomHttpService } from './customhttp.service';
import API_ENDPOINTS from '../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {

  constructor(private customHttp:CustomHttpService) { }

  async getEventCategories():Promise<any>{
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.GET_EVENT_CATEGORIES_API)
      console.log(res);
      return res;
    }catch(e){
      throw e
    }
  }

  async createEventCategory(payload:string):Promise<any>{
    try{
      const res:any = this.customHttp.post(API_ENDPOINTS.CREATE_EVENT_CATEGORIES_API,payload)
      return res;
    }catch(e){
      throw e
    }
  }
}
