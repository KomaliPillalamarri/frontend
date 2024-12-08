import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EventsComponent } from './pages/admin/events/events.component';
import { AuthGaurd } from './gaurds/auth.gaurd';
import { AdminGaurd } from './gaurds/admin.gaurds';
import { RegisterComponent } from './pages/register/register.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { HomeComponent } from './pages/app/home/home.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './pages/app/app.component';
import { EventsListComponent } from './pages/admin/events/events-list/events-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { EditEventComponent } from './pages/admin/events/edit-event/edit-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateEventComponent } from './pages/admin/events/create-event/create-event.component';
import { NgModel } from '@angular/forms';
import { RegistrationsComponent } from './pages/admin/events/registrations/registrations.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CreateComponent } from './pages/admin/event-category/create/create.component';

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},

    {path:'app',
        component: AppComponent,
        children: [
            {path: 'home',component: HomeComponent}
        ]
    },

    {path:'admin',
        component:AdminComponent,
        canActivate: [AuthGaurd,AdminGaurd],
        children: [
            {path: 'dashboard',component:DashboardComponent},
            {path: 'events',component: EventsComponent},
            {path: 'events/list',component: EventsListComponent },
            {path: 'events/:eventId/edit',component:EditEventComponent},
            {path: 'events/create',component: CreateEventComponent},
            {path: 'events/registrations/view',component:RegistrationsComponent},
            {path: 'events/calendar/view',component:CalendarComponent},
            {path: 'events/event-category/create',component:CreateComponent}


        ]
    },


    {path: '**',redirectTo: 'app/home',pathMatch: 'full'},

];

@NgModule({
    declarations: [
    ],
    imports: [RouterModule.forRoot(routes),
        BrowserModule,
        CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),],
    exports: [RouterModule],
    providers: [NgModel]
})
export class AppRoutingModule {}
