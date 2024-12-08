import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../../services/event.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCategoryService } from '../../../../services/event-category.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../../../../services/notifications.service';
@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
  eventId: string| null = null;
  event:any|null = {
    name: '',
    description: '',
    maxRegistrations: 0,
    date: '',
    deadline: '',
    location: '',
    status: '',
    visibility: '',
  }
  categoryId: string = ''
  successMessage: string = ''
  categories: any[] = []
  registeredUsers:any[] = [];



  constructor(
    private route:ActivatedRoute,
    private eventService:EventService,
    private eventCategoryService: EventCategoryService,
    private toastr: ToastrService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.loadEventById()
    this.loadEventCategory()
  }

  toggleVisibility(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.event.visibility = isChecked ? 'Private' : 'Public';
  }

  viewVisibility(){
    return String(this.event.visibility).toLocaleLowerCase() === 'private';
  }

  async loadEventById(){
    try{
      if(this.eventId){
        const res = await this.eventService.getEventById(this.eventId);
        this.event = res.data
        this.categoryId = res.data.category.categoryId
        this.registeredUsers = res.data.registeredUserIds
        console.log(this.registeredUsers);
      }
    }catch(e){
      console.log(e);
    }
  }

  async loadEventCategory(){
    try{
      if(this.eventId){
        const res = await this.eventCategoryService.getEventCategories();
        this.categories = res.data;
      }
    }catch(e){
      console.log(e);
    }
  }

  async onSubmit(){
    try{
      if(this.eventId){
        const {registeredUserIds,...payload} = this.event
        const res = await this.eventService.updateEvent(this.eventId,this.categoryId,payload)
        if(res.data){
          await this.sendNotificationsToAllUsers()
          this.successMessage = "Event Updated successfully!"
          this.toastr.success("Event updated successfully!")
          return;
        }
        this.toastr.error("Error updating event")
      }
    }catch(e){
      console.log(e);
      this.toastr.error("Error updating event")
    }
  }


  async sendNotificationsToAllUsers(){
    try{
      this.registeredUsers.map(async (userId) => {
        console.log(userId);
        const notificationPayload: any = {
          userId,
          message: "Event Updated",
          type: "EVENT_UPDATE",
          dateSent: new Date().toString()
        }
        await this.notificationService.saveNotification(notificationPayload)
      })
    }catch(e){
      console.log(e);
    }
  }

}
