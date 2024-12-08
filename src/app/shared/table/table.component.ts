import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { MarkAttendanceComponent } from '../../pages/admin/events/attendance/mark-attendance/mark-attendance.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,FormsModule,MarkAttendanceComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: {key:string;header:string}[] = [];
  @Input() deleteItem: any
  @Input() updateItem: any
  @Input() actions:boolean = true;

  @Output() eventEdit = new EventEmitter<any>();
  @Output() eventDelete = new EventEmitter<any>()
  searchQuery: string = '';
  emptyDataMessage:string = ''

  constructor(private eventService:EventService,private router:Router) {}

  filteredData() {
    if (this.data.length > 0) {
      return this.data.filter((row) =>
        row?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      return []; 
    }
  }
  
  isEmptyData(): boolean {
    return (
      this.data.length === 0 || 
      this.filteredData().length === 0
    );
  }
  editEvent(row: any) {
    
    this.eventEdit.emit(row.eventId)
  }

  async deleteEvent(row: any) {
    this.eventDelete.emit(row.eventId)
  }
}
