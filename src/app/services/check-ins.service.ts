import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckIn } from '../models/check-in.model';
import { CheckInBookData } from '../models/checkIn-book-data.model';

@Injectable({
  providedIn: 'root'
})
export class CheckInsService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }
  getCheckIns(): Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.apiUrl}/check-ins`);
  }

  createCheckInClient(checkInBookData: CheckInBookData): Observable<CheckInBookData> {
    return this.http.post<CheckInBookData>(`${this.apiUrl}/check-ins`, checkInBookData);
  }

  deleteCheckIn(checkInId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/check-ins/${checkInId}`);
  }
}
