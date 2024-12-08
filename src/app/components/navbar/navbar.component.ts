import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsComponent } from "../notifications/notifications.component";
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user_first:any|null = null;
  username: string | null = null;
  email:string | null = null;
  showDropdown = false; 
  isAdmin:boolean = false;
  isMenuOpen: boolean = false;
  notifications:any[] =[]

  currentUserId: string | null = null;
  notificationsCount:number | null = null;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    console.log(this.isLoggedIn);
    const userDetails = this.authService.currentUser
    console.log(userDetails);
    this.username = userDetails?.username
    this.user_first = this.username?.charAt(0).toLocaleUpperCase()
    this.email = userDetails?.email
    this.isAdmin = userDetails?.role === 'ADMIN' ? true:false
    this.currentUserId = userDetails?.userId
    this.loadNotifications()
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }


  goToSignIn(): void {
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout(); 
    this.isLoggedIn = false; 
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown; 
  }

  async loadNotifications(){
    try{
        if(this.currentUserId){
          const res:any = await this.notificationService.getUserNotification(this.currentUserId)
          this.notificationsCount = res.data.length;
          this.notifications = res.data;
        }
    }catch(e){
      console.log(e);
    }
  }
}
