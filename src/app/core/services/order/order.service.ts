import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private httpClient: HttpClient) {}

  checkoutCession(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: data,
      }
    );
  }
}
