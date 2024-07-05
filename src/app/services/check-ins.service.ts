import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckIn } from '../models/check-in.model';

@Injectable({
  providedIn: 'root'
})
export class CheckInsService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }
  getCheckIns(): Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.apiUrl}/check-ins`);
  }

  createCheckIn(checkIn: CheckIn): Observable<CheckIn> {
    return this.http.post<CheckIn>(`${this.apiUrl}/check-ins`, checkIn);
  }

  deleteCheckIn(checkInId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/check-ins/${checkInId}`);
  }
}
