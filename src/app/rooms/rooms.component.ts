import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';
import { Room } from '../models/room.model';
import { RoomsService } from '../services/rooms.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { isBefore, isAfter } from 'date-fns';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [provideNativeDateAdapter()],
})

export class RoomsComponent implements OnInit {

  rooms$!: Observable<Room[]>;
  allRooms: Room[] = [];
  loading = true;
  startDate: Date | null;
  endDate: Date | null;
  filteredRooms: Room[];

  constructor(
    private roomsService: RoomsService,
    private dialog: MatDialog
  ) {
    this.startDate = null;
    this.endDate = null;
    this.filteredRooms = [];
  }

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
        this.allRooms = rooms; // Зберігаємо всі кімнати
        this.filteredRooms = rooms; // Початково відображаємо всі кімнати
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

  filterRooms() {
    if (!this.startDate || !this.endDate) {
      return; // Якщо дати не введені, не виконувати фільтрацію
    }

    // Конвертація введених дат в об'єкти Date
    const checkInDate = new Date(this.startDate);
    const checkOutDate = new Date(this.endDate);

    // Фільтрація кімнат на основі введених дат заїзду і виїзду
    this.filteredRooms = this.allRooms.filter(room => {
      return !room.bookings.some(booking =>
        (isBefore(checkInDate, new Date(booking.check_out_date)) && isAfter(checkOutDate, new Date(booking.check_in_date)))
      );
    });

    // Оновлення Observable для відображення відфільтрованих кімнат
    this.rooms$ = of(this.filteredRooms);
    console.log(this.filteredRooms);
    console.log(this.rooms$);
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
      console.log(result);
      if (result) {
        this.fetchRooms();
      }
    });
  }
}
