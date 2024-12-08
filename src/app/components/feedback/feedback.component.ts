import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-feedback',
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit{

  isFeedbackModelOpen:boolean = false;
  @Input() eventId: string = '';
  feedback: any = { rating: '', comments: '', eventId: '', userId: '' };
  eventFeedback: any[] = [];
  userId: string = ''


  constructor(
    private feedbackService: FeedbackService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.currentUser.userId
  }

  async submitFeedback() {
    try{
      this.feedback.eventId = this.eventId;
      this.feedback.userId = this.userId;
      this.feedback.dateSubmitted = new Date()
      const res:any = await this.feedbackService.submitFeedback(this.feedback)
      if(res.data){
        this.toastr.success("Feedback submitted successfully")
      }
    }catch(e){
      console.log(e);
    }
    
  }

  // loadFeedback() {
  //   try{
  //     const res:any = this.feedbackService.getSubmitByEventId()
  //   }catch(e){
  //     console.log(e);
  //   }
  // }


  openFeedBackModel(){
    this.isFeedbackModelOpen = !this.isFeedbackModelOpen
  }

  closeFeedbackModel(){
    this.isFeedbackModelOpen = false;
  }

}
