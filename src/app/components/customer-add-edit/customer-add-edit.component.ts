import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss'],
})
export class CustomerAddEditComponent implements OnInit {
  customerForm: FormGroup;

  education: string[] = [
    '10th',
    '12th',
    'Bachelor Degree',
    'Master Degree',
    'PHD',
  ];

  constructor(
    private _fb: FormBuilder,
    private _customerService: CustomerService,
    private _dialogRef: MatDialogRef<CustomerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.customerForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.customerForm.patchValue(this.data);
  }

  onCustomerFormSubmit() {
    if (this.customerForm.valid) {
      if (this.data) {
        this.updateCustomerInfo();
      } else {
        this.saveCustomerInfo();
      }
    }
  }

  saveCustomerInfo() {
    this._customerService.addCustomer(this.customerForm.value).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Customer added!!');
        this._dialogRef.close();
        // this._dialogRef.close(true);
        this._customerService.triggerRefresh();
        // this._customerService.refreshEvent.emit();
      },
      error: (err: any) => {
        console.error('Error while saving customer information: ', err);
      },
    });
  }

  updateCustomerInfo() {
    this._customerService
      .updateCustomer(this.data.id, this.customerForm.value)
      .subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Customer updated!!');
          this._dialogRef.close();
          // this._dialogRef.close(true);
          this._customerService.triggerRefresh();
          // this._customerService.refreshEvent.emit();
        },
        error: (err: any) => {
          console.error('Error while updating customer information: ', err);
        },
      });
  }
}
