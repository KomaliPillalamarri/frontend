import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { EventCardComponent } from '../../../components/event-card/event-card.component';
import { RegistrationService } from '../../../services/registration.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-home',
  imports: [EventCardComponent,NgFor,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  events: any[] = [];
  registeredEvents: any[] = []
  searchQuery:string = '';
  currentUserId:string | null = null;
  notifications:any[] = []

  constructor(
    private toastr: ToastrService,
    private eventService:EventService,
    private registrationService:RegistrationService,
    private authService: AuthService,
    private router:Router,
    private notificationService: NotificationsService
  ){}

  async ngOnInit() {
    this.loadEvents();
    if(this.authService.isLoggedIn){
        this.loadRegisteredEvents()
    }
    this.currentUserId = this.authService.currentUser.userId
  }

  async loadEvents(){
    try{
      const res = await this.eventService.getEvents();
      this.events = res.data.map((event:any) => ({
        name: event.name,
        description: event.description,
        category: event.category,
        location: event.location,
        eventId: event.eventId,
        registeredUserIds:event.registeredUserIds || '-',
        visibility: String(event.visibility).toLowerCase()
      }));
      console.log(this.events);
    }catch(e){
      console.log(e);
    }
  }

  async searchEvents(){
    try{
      const res:any = await this.eventService.searchEvents(this.searchQuery);
      this.events = res.data.map((event: any) => ({
        name: event.name,
        description: event.description,
        category: event.category,
        location: event.location,
        eventId: event.eventId,
        registeredUserIds: event.registeredUserIds || '-',
        visibility: String(event.visibility).toLowerCase()
      }));
    }catch(e){
      console.log(e);
    }
  }

  async onRegister(event:any){
    try{
      if(this.authService.isLoggedIn){
        const payload = {
          eventId: event.eventId,
          userId: this.authService.currentUser.userId,
          status: event.status,
          registrationDate: new Date,
        }
        const res = await this.registrationService.registration(payload);
        this.events = res.data;
        console.log(this.events);
        this.toastr.success("Registered successfully")
        this.loadEvents()
      }else{
        this.router.navigate(['/login'])
      }
    }catch(e){
      console.log(e);
    }
  }

  showSuccess(messsage:string){
    this.toastr.success(messsage)
  }

  async loadRegisteredEvents() {
    try {
      const userId = this.authService.currentUser.userId;
      const res = await this.registrationService.getUserRegistrations(userId);
      this.registeredEvents = res.data || []; 
      console.log('Registered events:', this.registeredEvents);
    } catch (e) {
      console.error('Error loading user registrations:', e);
    }
  }

  async loadNotifications(){
    try{
      if(this.currentUserId){
        const res:any = await this.notificationService.getUserNotification(this.currentUserId)
        this.notifications = res.data;
      }
    }catch(e){
      console.log(e);
    }
  }
}
