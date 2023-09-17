import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from 'src/app/core/core.service';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customers-dashboard',
  templateUrl: './customers-dashboard.component.html',
  styleUrls: ['./customers-dashboard.component.scss']
})
export class CustomersDashboardComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _customerService: CustomerService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getCustomerList();
    this.getDataAfterSubscribe();
  }

  getDataAfterSubscribe() {
    this._customerService.refreshEvent.subscribe(() => {
      this.getCustomerList();
    });
  }

  addCustomerFrom() {
    this._dialog.open(CustomerAddEditComponent);

    // const dialogRef = this._dialog.open(CustomerAddEditComponent);
    // dialogRef.afterClosed().subscribe({
    //   next: (data) => {
    //     console.log();

    //     if (data) {
    //       this.getCustomerList();
    //     }
    //   },
    // });
  }
  editCustomerFrom(data: any) {
    this._dialog.open(CustomerAddEditComponent, { data: data });

    // const dialogRef = this._dialog.open(CustomerAddEditComponent);
    // dialogRef.afterClosed().subscribe({
    //   next: (data) => {
    //     console.log();

    //     if (data) {
    //       this.getCustomerList();
    //     }
    //   },
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCustomerList() {
    this._customerService.getCustomer().subscribe({
      next: (res:any) => {
        console.log('this.dataSource==> ', this.dataSource);

        this.dataSource = new MatTableDataSource(res);
        console.log(
          'this.dataSource:new MatTableDataSource==> ',
          this.dataSource
        );

        this.dataSource.sort = this.sort;
        console.log(
          'this.dataSource: this.dataSource.sort = this.sort==> ',
          this.dataSource
        );

        this.dataSource.paginator = this.paginator;
      },
      error: console.warn,
      // error: (err) => console.warn('Error', err),
    });
  }

  deleteCustomer(id: number) {
    this._customerService.deleteCustomer(id).subscribe({
      next: (res:any) => {
        this._coreService.openSnackBar('Customer deleted!!');
        this.getCustomerList();
      },
      error: console.warn,
    });
  }

  // ngOnDestroy() {
  //   // Unsubscribe from the refresh event to prevent memory leaks
  //   if (this._customerService.refreshEvent) {
  //     this._customerService.refreshEvent.unsubscribe();
  //   }
  // }
}
