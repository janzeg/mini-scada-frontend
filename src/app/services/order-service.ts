import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../model/order';
import { OrderRequestDTO } from '../model/order-request-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8090/api/orders';

  private selectedOrderSubject = new BehaviorSubject<Order | null>(null);
  selectedOrder$ = this.selectedOrderSubject.asObservable();

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  addOrder(order: OrderRequestDTO): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  setSelectedOrder(order: Order | null) {
    this.selectedOrderSubject.next(order);
  }

  getSelectedOrder(): Order | null {
    return this.selectedOrderSubject.value;
  }
}
