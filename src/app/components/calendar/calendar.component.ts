import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule,CommonModule,FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarEvents: any[] = [];
  categories: any[] = [];
  locations: any[] = [];
  filter = { category: '', location: '', date: '' };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  async loadEvents(): Promise<void> {
    try {
      const res = await this.eventService.getEvents();
      this.calendarEvents = res.data.map((event: any) => ({
        title: `${event.name} - ${event.location}`,
        start: event.date, 
        extendedProps: {
          category: event.category,
          location: event.location,
        },
      }));
      this.categories = [...new Set(res.data.map((event: any) => event.category))];
      this.locations = [...new Set(res.data.map((event: any) => event.location))];
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }

  applyFilters(): void {
    const filtered = this.calendarEvents.filter((event) => {
      const matchesCategory = !this.filter.category || event.extendedProps.category === this.filter.category;
      const matchesLocation = !this.filter.location || event.extendedProps.location === this.filter.location;
      const matchesDate = !this.filter.date || new Date(event.start).toDateString() === new Date(this.filter.date).toDateString();

      return matchesCategory && matchesLocation && matchesDate;
    });
    this.calendarEvents = filtered;
  }

  handleDateClick(info: any): void {
    alert(`Date clicked: ${info.dateStr}`);
  }
}
