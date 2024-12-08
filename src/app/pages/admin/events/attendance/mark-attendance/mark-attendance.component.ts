import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from '../services/attendance.service';
import { RegistrationService } from '../../../../../services/registration.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent {

  @Input() user: any = {}
  isAttendanceModalOpen: boolean = false;
  currentUserId: string = ''
  currentDate: string = ''
  status: string | null = null
  attendance:any = {
    status: '',
    date: new Date()
  }


  attendancePayload:any = {
    status: '',
    date: new Date()
  }

  statusData = [
    {
      name: 'Attended'
    },
    {
      name: 'Not Attended'
    },
  ]

  constructor(
    private registrationService:RegistrationService,
    private attendanceService: AttendanceService,
    private toastr: ToastrService
  ) {
    this.currentDate = this.setTodayDate()
    this.currentUserId = this.user.userId
  }

  ngOnInit(): void {
      console.log(this.user);
      this.currentUserId = this.user.userId
  }

  setTodayDate() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2); // Add leading zero if day < 10
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero if month < 10
    const year = today.getFullYear();

    // Assign the formatted date to the attendance object
    this.attendance.date = `${day}-${month}-${year}`;
    return `${day}-${month}-${year}`;
  }

  openMarkAttendance(){
    this.isAttendanceModalOpen = !this.isAttendanceModalOpen
    this.loadAttendanceByUserId()
  }

  closeMarkAttendanceModel(){
    this.isAttendanceModalOpen = false;
  }

  async markEmployeeAttendance(){
    try{
      const payload = {
        status: this.status,
        date: new Date()
      }
      await this.registrationService.markAttendace(this.currentUserId,payload)
      this.toastr.success("Marked attendance")
    }catch(e){
      console.log(e);
    }
  } 

  async loadAttendanceByUserId(){
    try{
      console.log(this.currentUserId);
     
      const res:any = await this.attendanceService.getAttendanceByUserId(this.currentUserId)
      this.attendance = res.data[0];
      console.log(this.attendance);
    }catch(e){
      console.log(e);
    }
  } 
}
