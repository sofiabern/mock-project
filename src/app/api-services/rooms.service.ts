import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomsApiResponse} from '../components/pages/rooms/rooms.types';


@Injectable({
  providedIn: 'root'
})
export class RoomsApiService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<RoomsApiResponse> {
    return this.http.get<RoomsApiResponse>(`${this.apiUrl}/rooms`);
  }

}
