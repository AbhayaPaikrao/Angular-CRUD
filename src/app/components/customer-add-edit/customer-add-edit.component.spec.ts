import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddEditComponent } from './customer-add-edit.component';

describe('CustomerAddEditComponent', () => {
  let component: CustomerAddEditComponent;
  let fixture: ComponentFixture<CustomerAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddEditComponent]
    });
    fixture = TestBed.createComponent(CustomerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
