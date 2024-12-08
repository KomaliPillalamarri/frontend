import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  providers: [NgModel],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() toggleSidebar: () => void = () => {};
  user_first:any|null = null;
  username: string | null = null;
  showDropdown = false; 
  isAdmin:boolean = false;
  email:string | null = null;

  routes = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      active: false 
    },
    { 
      name: 'Events',  
      active: false ,
      subRoutes: [
        {
          name: "List",
          href: '/admin/events/list',
        },
        {
          name: "Create",
          href: '/admin/events/create',
        },
        {
          name: "Create Event categories",
          href: '/admin/events/event-category/create',
        }
      ]
    },
    { 
      name: 'Registrations', 
      active: false ,
      subRoutes: [
        {
          name: "View",
          href: '/admin/events/registrations/view',
        }
      ]
    },
    { 
      name: 'Calendars', 
      active: false ,
      subRoutes: [
        {
          name: "calendar view",
          href: '/admin/events/calendar/view',
        }
      ]
    },
  ];

  expandedRoute: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userDetails = this.authService.currentUser
    console.log(userDetails);
    this.username = userDetails.username
    this.user_first = this.username?.charAt(0).toLocaleUpperCase()
    this.isAdmin = userDetails.role === 'ADMIN' ? true:false
    this.email = userDetails.email
  }

  toggleSubRoutes(routeName: string) {
    if (this.expandedRoute === routeName) {
      this.expandedRoute = null; 
    } else {
      this.expandedRoute = routeName; 
    }
  }

  checkActive(routeHref: string): boolean {
    return this.router.url === routeHref;
  }

  setActive(routeHref: string) {
    this.routes.forEach(route => route.active = false); 
    const activeRoute = this.routes.find(route => route.href === routeHref);
    if (activeRoute) {
      activeRoute.active = true; 
    }
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown; 
  }
}
