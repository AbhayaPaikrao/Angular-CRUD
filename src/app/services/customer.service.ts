import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = 'http://localhost:3000/';

  public refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  public triggerRefresh(): void {
    this.refreshEvent.emit();
  }

  constructor(private _http: HttpClient) {}

  addCustomer(data: any): Observable<any> {
    return this._http.post(`${this.url}customer`, data);
  }
  updateCustomer(id: number, data: any): Observable<any> {
    return this._http.put(`${this.url}customer/${id}`, data);
  }
  getCustomer(): Observable<any> {
    return this._http.get(`${this.url}customer`);
  }
  deleteCustomer(id: number): Observable<any> {
    return this._http.delete(`${this.url}customer/${id}`);
  }
}
