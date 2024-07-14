import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { CheckIn, CheckInsResponseApi, CheckInAndBookData, createCheckInResponseApi } from '../models/check-in.model';



@Injectable({
  providedIn: 'root'
})
export class CheckInsService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }
  getCheckIns(): Observable<CheckInsResponseApi> {
    return this.http.get<CheckInsResponseApi>(`${this.apiUrl}/check-ins`);
  }

  createCheckIn(formData: CheckInAndBookData): Observable<createCheckInResponseApi> {
    return this.http.post<createCheckInResponseApi>(`${this.apiUrl}/check-ins`, formData);
  }

  updateCheckIn(checkInId: string, updateData:Partial<CheckIn>):Observable<CheckIn>{
    return this.http.patch<CheckIn>(`${this.apiUrl}/check-ins/${checkInId}`, updateData);
  }

  deleteCheckIn(checkInId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/check-ins/${checkInId}`);
  }
}
