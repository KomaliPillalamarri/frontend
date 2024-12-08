import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { EventService } from '../../../../services/event.service';
import { EventCategoryService } from '../../../../services/event-category.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../../../../services/notifications.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers: [NgModel],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit{
  categoryId: string = ''
  event:any|null = {
    name: '',
    description: '',
    maxRegistrations: 0,
    date: '',
    deadline: '',
    location: '',
    status: '',
    visibility: "public"
  }
  users:any[] = [];
  categories:any[] = [];

  constructor(
    private eventService:EventService,
    private eventCategoryService:EventCategoryService,
    private toastr:ToastrService,
    private notificationService:NotificationsService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
      this.loadEventCategories()
      this.allUsers()
  }

  toggleVisibility(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.event.visibility = isChecked ? 'Private' : 'Public';
  }

  async loadEventCategories(){
    try{
      const res = await this.eventCategoryService.getEventCategories();
      console.log(this.categories);
      this.categories = res.data || [];
    }catch(e){
      console.log(e);
    }
  }

  async onSubmit(){
    try{
      const payload = {
        ...this.event,
      }
      const res = await this.eventService.createEvent(this.categoryId,payload)
      if(res.data){
        this.toastr.success("Event created successfully")
      }
      this.users.map(async(user:any)=>{
        const payload = {
          id:user.userId,
          message:'event created',
          type:'event created'
        }
        await this.notificationService.saveNotification(payload)
      })
    }catch(e){
      console.log(e);
    }
  }
  async allUsers(){
    try{
      const res:any = await this.authService.getAllUsers()
      this.users=res.data
    }catch(e){
      console.log(e);
    }
  }
}
