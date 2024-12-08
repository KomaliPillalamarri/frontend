import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventCategoryService } from '../../../services/event-category.service';
import { RegistrationService } from '../../../services/registration.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalEvents:number = 0
  totalRegistrations:number =0
  totalCategories:number = 0
  recentRegistrations:any[] =[]


  constructor(
    private eventService: EventService,
    private eventCategoryService:EventCategoryService,
    private registrationService:RegistrationService
  
  ) {}

  ngOnInit(): void {
      this.loadAllEvents()
      this.loadAllRegistrations()
      this.loadAllCategories()
  }

  async loadAllEvents(){
    try{
      const res = await this.eventService.getEvents();
      this.totalEvents = res.data.length;
    }catch(e){
      console.log(e);
    }
  }

  async loadAllRegistrations(){
    try{
      const res = await this.registrationService.getRegistrartions();
      this.recentRegistrations = res.data
      this.totalRegistrations = res.data.length;
    }catch(e){
      console.log(e);
    }
  }

  async loadAllCategories(){
    try{
      const res = await this.eventCategoryService.getEventCategories();
      this.totalCategories = res.data.length;
    }catch(e){
      console.log(e);
    }
  }

}
