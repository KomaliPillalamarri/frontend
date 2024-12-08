import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchableSelectComponent } from '../../components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-base-form-nested',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SearchableSelectComponent],
  templateUrl: './base-form-nested.component.html',
  styleUrl: './base-form-nested.component.css'
})
export class BaseFormNestedComponent implements OnInit {
  @Input() fieldDefinitions: any[] = [];
  @Input() initialValues: any;
  @Input() isReadOnly: boolean = false;
  @Input() customCheckboxHandleChange: any;
  @Input() customSelectHandleChange: any;
  @Input() NoValidationFields: string[] = [];
  @Input() formClassname: any;
  @Input() dropdownRef: any;

  @ViewChild('form', { static: false }) form: any = null;
  constructor(private fb: FormBuilder) {}
  
  formGroup!: FormGroup;
  ngOnInit(): void {
      if(this.initialValues){
        this.initializeForm()
      }

      console.log(this.form);
  }

  initializeForm() {
    const group: any = {};
    console.log(this.fieldDefinitions);
  
    this.fieldDefinitions.map(fieldGroup => {
      console.log(fieldGroup);
  
      if (fieldGroup?.fields) {
        fieldGroup.fields.map((field: any) => {
          console.log("field", field?.name);
  
          if (field && field.name) {
            if (!this.NoValidationFields.includes(field.name)) {
              console.log(this.initialValues);
              group[field.name] = [
                this.initialValues[field.name] || '',
                field.required ? Validators.required : null
              ];
            }
          } else {
            console.error('Invalid field:', field);  
          }
        });
      }
    });

    this.form = this.fb.group(group)
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      console.log('Form Submitted', this.form.value);
    } else {
      console.log('Form Invalid');
    }
  }

  getErrorMessage(fieldName: string): string {
    if(this.form){
      const control = this.form.get(fieldName);
      if (control?.hasError('required')) {
        return `${fieldName} is required`;
      }
    }
    return '';
  }
}