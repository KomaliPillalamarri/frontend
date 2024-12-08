import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../../../services/registration.service';
import { TableComponent } from '../../../../shared/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrations',
  imports: [TableComponent,CommonModule],
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css'
})
export class RegistrationsComponent implements OnInit {
  registrations:any[] = []
  displayedColumns = [
    { key: 'name', header: 'User Name' },
    { key: 'eventName', header: 'Event Name' },
    { key: 'registrationDate', header: 'Registered Date' },
    { key: 'status', header: 'Status' },

  ];
  actions:boolean = false
  constructor(private registrationService:RegistrationService) {}

  ngOnInit(): void {
      this.loadRegistrations()
  }

  async loadRegistrations(){
    try{
      const res = await this.registrationService.getRegistrartions();
      this.registrations = res.data.map((reg:any) => ({
        eventName: reg.eventId?.name || '-',
        name: reg.userId.username || '-',
        registrationDate: reg.registrationDate || "-",
        status: reg.status || '-',
        userId: reg.userId.userId
      }))
      console.log(this.registrations);
    }catch(e){
      console.log(e);
    }
  }
}
