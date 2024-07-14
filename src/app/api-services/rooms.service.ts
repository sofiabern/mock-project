import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { Room, RoomApiResponse} from '../components/pages/rooms/rooms.types';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<RoomApiResponse> {
    return this.http.get<RoomApiResponse>(`${this.apiUrl}/rooms`);
  }

  getRoom(roomId: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/rooms/${roomId}`);
  }

  updateRoom(roomId: string, updateData: any): Observable<Room> {
    return this.http.patch<Room>(`${this.apiUrl}/rooms/${roomId}`, updateData);
  }

  // addBooking(roomId: string, newBooking: any): Observable<Room> {
  //   return this.getRoom(roomId).pipe(
  //     tap((response: any) => {
  //       const room = response.data;
  //       console.log('Room:', room);
  //       if (!room.bookings) {
  //         room.bookings = [];
  //       }
  //       room.bookings.push(newBooking);
  //       console.log(room.bookings);

  //       this.updateRoom(roomId, { bookings: room.bookings }).subscribe({
  //         next: (updatedRoom) => {
  //           console.log('Room bookings updated successfully:', updatedRoom);
  //         },
  //         error: (error) => {
  //           console.error('Error updating room bookings:', error);
  //         }
  //       });
  //     })
  //   );
  // }
}
