import { Component } from '@angular/core';
import { EventCategoryService } from '../../../../services/event-category.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {


  constructor(
    private eventService: EventCategoryService,
    private toaster: ToastrService
  ) {}

  payload:any = {
    name: '',
    description: ''
  }

  async onSubmit(){
    try{
        const res:any = await this.eventService.createEventCategory(this.payload)
        this.toaster.success('Event Category Created Successfully')
    }catch(e){
      console.log(e);
    }
  }
}
