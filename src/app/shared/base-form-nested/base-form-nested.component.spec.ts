import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormNestedComponent } from './base-form-nested.component';

describe('BaseFormNestedComponent', () => {
  let component: BaseFormNestedComponent;
  let fixture: ComponentFixture<BaseFormNestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormNestedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFormNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
