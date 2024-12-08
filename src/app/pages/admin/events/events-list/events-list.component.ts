import { Component } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { Router } from '@angular/router';
import { TableComponent } from "../../../../shared/table/table.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  events:any[] = [];
  displayedColumns = [
    { key: 'eventId', header: 'Event ID' },
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { key: 'location', header: 'Location' },
    { key: 'category', header: 'Category Name' },
  ];

  constructor(private eventService:EventService,private router:Router,private toastr:ToastrService) {}
  ngOnInit(): void {
    this.loadEvents();
  }

  // async deleteEvent(){
  //   await this.eventService.deleteEvent()
  // }

  async loadEvents(){
    try{
      const res = await this.eventService.getEvents();
      this.events = res.data.map((event:any) => ({
        ...event,
        category: event.category.name
      }))
      console.log(this.events);
    }catch(e){
      console.log(e);
    }
  }

  async onEventDelete(event:any){
    await this.eventService.deleteEvent(event)
    this.loadEvents()
    this.toastr.success("Event deleted successfully")
  }

  async onEventEdit(event:any){
    this.router.navigate([`/admin/events/${event}/edit`])
  }
}
