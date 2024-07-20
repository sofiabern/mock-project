import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { CheckInBooking, CheckInsBookingsApiResponse, CheckInAndBookingData, CheckInBookingApiResponse, CheckInsBookingsPaginationApiResponse } from '../components/pages/check-ins-bookings/check-ins-bookings.types';



@Injectable({
  providedIn: 'root'
})
export class CheckInsBookingsApiService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }

  getAllCheckIns(): Observable<CheckInsBookingsApiResponse> {
    return this.http.get<CheckInsBookingsApiResponse>(`${this.apiUrl}/check-ins/all`);
  }

  getCheckIns(page: number = 1, perPage: number = 6): Observable<CheckInsBookingsPaginationApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());

    return this.http.get<CheckInsBookingsPaginationApiResponse>(`${this.apiUrl}/check-ins`, { params });
  }


  createCheckIn(formData: CheckInAndBookingData): Observable<CheckInBookingApiResponse> {
    return this.http.post<CheckInBookingApiResponse>(`${this.apiUrl}/check-ins`, formData);
  }

  updateCheckIn(checkInId: string, updateData:Partial<CheckInBooking>):Observable<CheckInBookingApiResponse>{
    return this.http.patch<CheckInBookingApiResponse>(`${this.apiUrl}/check-ins/${checkInId}`, updateData);
  }

  deleteCheckIn(checkInId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/check-ins/${checkInId}`);
  }
}
