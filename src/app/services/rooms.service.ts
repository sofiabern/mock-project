import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model'; // Припустимо, що у вас є модель Room

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = 'https://667ff67156c2c76b495ab16c.mockapi.io'; 

  constructor(private http: HttpClient) { } 
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }
}