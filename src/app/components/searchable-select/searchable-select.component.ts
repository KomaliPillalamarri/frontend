import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchable-select',
  imports: [ReactiveFormsModule],
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.css'
})
export class SearchableSelectComponent {
  @Input() options:any[] = []
  @Input() value: any;
  @Input() placeholder: string = '';
  @Input() dropdownRef: any;
  @Output() onChange = new EventEmitter<any>()

  searchQuery: string = ''

  get filteredOptions(){
    return this.options.filter(option => option.label.toLowerCase().includes(this.searchQuery.toLowerCase()))
  }

  onSearchChange(event:any){
    this.searchQuery =event.target.value
  }

  onSelectOption(option:any){
    this.onChange.emit(option)
    this.searchQuery = ""
  }
}
