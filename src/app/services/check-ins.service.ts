import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckIn } from '../models/check-in.model';
import { BookData } from '../models/book-data.model';

@Injectable({
  providedIn: 'root'
})
export class CheckInsService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }
  getCheckIns(): Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.apiUrl}/check-ins`);
  }

  createCheckInClient(bookData: BookData): Observable<BookData> {
    return this.http.post<BookData>(`${this.apiUrl}/check-ins`, bookData);
  }

  deleteCheckIn(checkInId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/check-ins/${checkInId}`);
  }
}
