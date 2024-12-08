import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { FeedbackComponent } from "../feedback/feedback.component";


@Component({
  selector: 'app-event-card',
  imports: [CommonModule, FeedbackComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit{

  @Input() event: any;
  @Output() register = new EventEmitter();
 
  attandeesData:any[] = []
  attendeesModalVisible: boolean = false;
  displayAttendeesButton:boolean = false;

  isCalendarModalVisible: boolean = false;
  currentEvent: any = {};

  constructor(
    private authService:AuthService,
    private eventService:EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
      if(this.event.registeredUserIds.length > 0 && this.event.visibility === 'public'){
        this.displayAttendeesButton = true
      }
  }

  openCalendarModal(event: any) {
    this.currentEvent = event;  
    this.isCalendarModalVisible = true;
  }

  closeCalendarModal() {
    this.isCalendarModalVisible = false;
  }

  addToGoogleCalendar() {
    const eventTitle = this.currentEvent.name;
    const eventDate = this.currentEvent.date; 
    const eventLocation = this.currentEvent.location;

    const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(eventTitle)}&dates=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}`;
    
    window.open(googleCalendarUrl, '_blank');
    this.closeCalendarModal();  
  }

  addToOutlookCalendar() {
    const eventTitle = this.currentEvent.name;
    const eventDate = this.currentEvent.date; 
    const eventLocation = this.currentEvent.location;
    
    const outlookCalendarUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(eventTitle)}&startdt=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}`;
    
    window.open(outlookCalendarUrl, '_blank');
    this.closeCalendarModal();  
  }

  onRegister(){
    this.register.emit(this.event);
  }

  isRegistered(eventId: string): boolean {
    return this.event.registeredUserIds?.includes(this.authService.currentUser?.userId);
  }

  closeAttendeesModal() {
    this.attendeesModalVisible = false; 
  }

  async viewAttendees() {
    try {
      if(this.authService.isLoggedIn){
        const res = await this.eventService.getEventAtandees(this.event.eventId);
        this.attandeesData = res.data || [];
        this.attendeesModalVisible = true;
      }else{
          this.router.navigate(['/login'])
      }
    } catch (e) {
      console.error('Error loading user registrations:', e);
    }
  }

  async downloadAttendees(eventId: string) {
    try{
      console.log(eventId);
      const res:any = await this.eventService.downloadAttendees(eventId)
    }catch(e){
      console.log(e);
    }
  }
}
