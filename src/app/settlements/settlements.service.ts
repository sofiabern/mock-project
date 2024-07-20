import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {
  private apiUrl = 'https://mock-beckend.onrender.com/settlements';

  constructor(private http: HttpClient) {}

  getSettlements(pageSize: number, currentPage: number): Observable<any> {
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    return this.http.get<any>(`${this.apiUrl}${queryParams}`);
  }
}
