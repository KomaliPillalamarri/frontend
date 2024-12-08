import { Injectable } from '@angular/core';
import API_ENDPOINTS from '../constants/apiEndpoints';
import { CustomHttpService } from './customhttp.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private customHttp:CustomHttpService,private http:HttpClient) { }


  async getEvents():Promise<any>{
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.GET_EVENTS_API)
      return res;
    }catch(e){
      throw e
    }
  }

  async getEventById(eventId:string):Promise<any>{
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.GET_EVENT_BY_ID(eventId))
      return res;
    }catch(e){
      throw e
    }
  }

  async searchEvents(search:string):Promise<any>{
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.GET_EVENTS_BY_SEARCH(search))
      return res;
    }catch(e){
      throw e
    }
  }

  async createEvent(categoryId:string,payload:any):Promise<any>{
    try{
      const res:any = this.customHttp.post(API_ENDPOINTS.CREATE_EVENTS_API(categoryId),payload)
      return res;
    }catch(e){
      throw e
    }
  }

  async updateEvent(eventId:string,categoryId:string,payload:any):Promise<any>{
    try{
      const res:any = this.customHttp.patch(API_ENDPOINTS.UPDATE_EVENT_BY_ID_ADMIN_API(eventId,categoryId),payload)
      return res;
    }catch(e){
      throw e
    }
  }

  async deleteEvent(eventId:string){
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.DELETE_EVENT_BY_ID_ADMIN_API(eventId))
      return res;
    }catch(e){
      throw e
    }
  }

  async getEventAtandees(eventId:string){
    try{
      const res:any = this.customHttp.get(API_ENDPOINTS.GET_EVENT_ATENDEES_API(eventId))
      return res;
    }catch(e){
      throw e
    }
  } 

  async downloadAttendees(eventId: string) {
    // this.http.get(`/api/app/events/${eventId}/attendees/download`, { responseType: 'text' }).subscribe({
    //   next: (data: string) => {
    //     console.log(data);
    //     const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    //     // saveAs(blob, 'attendees.csv');
    //   },
    //   error: (err) => alert(err.error.message || 'Error downloading attendees list')
    // });
    try{
      const res = await fetch(`/api/app/events/download/${eventId}`,{
        method: "GET",
        headers: {
          "Content-Type": 'text/csv',
        }
      })

      if(!res.ok){
        throw new Error("Failed to download csv files")
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url;
      a.download = 'events.csv'
      document.body.appendChild(a);
      a.click()
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url)
    }catch(e){
      throw e
    }
  }
}
