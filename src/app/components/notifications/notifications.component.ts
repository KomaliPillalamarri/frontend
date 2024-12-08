import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule,FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  @Input() notifications:any[] = [];
  currentUserId:string | null = null;
  isNotificationModelOpen:boolean = false;
  notificationsCount: number | null = null;

  constructor(
    private notificationService: NotificationsService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.currentUser?.userId
    this.loadNotifications()
  }

  openNotificationModal(){
    this.isNotificationModelOpen = !this.isNotificationModelOpen
    this.currentUserId = this.authService.currentUser?.userId
    this.markReadNotifications()
    this.notificationsCount = this.notifications.length;
  }

  closeNotificationModal(){
    this.isNotificationModelOpen = false;
  }

  async loadNotifications(){
    try{
      if(this.currentUserId){
        const res:any = await this.notificationService.getUserNotification(this.currentUserId)
        this.notifications = res.data;
        this.notificationsCount = res.data.length;
      }
    }catch(e){
      console.log(e);
    }
  }

  notificationCountFunc(){
    return this.notificationsCount
  }

  async markReadNotifications(){
    try{
      if(this.currentUserId){
        const res:any = await this.notificationService.markReadNotification(this.currentUserId)
        this.notifications = res.data;
        this.notificationsCount = null
      }
    }catch(e){
      console.log(e);
    }
  }

}
