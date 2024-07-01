import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { RoomsService } from '../services/rooms.service';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../book-modal/book-modal.component';

import rooms from "../mock-info/rooms.json"

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
// export class RoomsComponent implements OnInit {
//   rooms$!: Observable<Room[]>;
//   loading = true;

//   constructor(private roomService: RoomsService, private dialog: MatDialog) { }

//   ngOnInit() {
//     this.fetchRooms();
//   }

//   fetchRooms() {
//     this.rooms$ = this.roomService.getRooms();
//     this.rooms$ = this.roomService.getRooms();

//     this.rooms$.subscribe({
//       next: (rooms: Room[]) => {
//         console.log('Received rooms:', rooms);
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching rooms:', error);
//         this.loading = false;
//       },
//       complete: () => {
//         console.log('Room subscription completed');
//       }
//     });
//   }
// }




export class RoomsComponent implements OnInit {
  rooms$!: Observable<Room[]>;
  loading = true;

  constructor(private dialog: MatDialog){}

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms() {
    this.rooms$ = this.getRoomsObservable();

    this.rooms$.subscribe({
      next: (rooms: Room[]) => {
        console.log('Received rooms:', rooms);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Room subscription completed');
      }
    });
  }

  private getRoomsObservable(): Observable<Room[]> {
    return new Observable(observer => {
      observer.next(rooms as Room[]);
      observer.complete();
    });
  }

  openBookModal(): void {
    this.dialog.open(BookModalComponent, {
      width: '36vw',
      height: '80vh',
      disableClose: false,
    });
  }
}