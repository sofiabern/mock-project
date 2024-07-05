import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Room } from '../models/room.model';
import { RoomsService } from '../services/rooms.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms$!: Observable<Room[]>;
  loading = true;

  constructor(
    private roomsService: RoomsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms() {
    this.loading = true;

    this.rooms$ = this.roomsService.getRooms().pipe(
      map((response: any) => response.data),
      catchError(error => {
        console.error('Error fetching rooms:', error);
        this.loading = false;
        return of([]);
      })
    );

    this.rooms$.subscribe({
      next: (rooms: Room[]) => {
        console.log('Received rooms:', rooms);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error in subscription:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Room subscription completed');
        this.loading = false;
      }
    });
  }

  openBookModal(roomId: string): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '600px',
      height: '80vh',
      disableClose: false,
      data: { roomId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) { // Execute fetchRooms only if booking was successful

        this.fetchRooms();
      }
    });
  }
}
