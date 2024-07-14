import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomsService } from '../../../api-services/rooms.service';
import { ToastrService } from 'ngx-toastr';
import { Room } from './rooms.types';

@Injectable({
  providedIn: 'root'
})
export class RoomsComponentsService {
  private roomsSubject = new BehaviorSubject<Room[]>([]);
  rooms$ = this.roomsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private roomsService: RoomsService, private toastr: ToastrService) {}

  fetchRooms() {
    this.roomsSubject.next([]);
    this.loadingSubject.next(true);
    this.roomsService.getRooms().subscribe({
      next: (response) => {
        this.roomsSubject.next(response.data);
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching rooms.');
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    });
  }

  getRooms(): Room[] {
    return this.roomsSubject.value;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
