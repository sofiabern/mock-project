import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';
import { Room } from '../../../models/room.model';
import { RoomsService } from '../../../services/rooms.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../../modals/book-modal/book-modal.component';
import { CheckInModalComponent } from '../../modals/check-in-modal/check-in-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { isBefore, isAfter, isEqual } from 'date-fns';

// Components
import { RoomsFilterComponent } from './rooms-filter/rooms-filter.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, RoomsFilterComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [provideNativeDateAdapter()],
})

export class RoomsComponent implements OnInit {

  fetchedRooms: Room[] = [];
  filteredRooms: Room[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
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

    this.roomsService.getRooms().subscribe({
      next: (response: any) => {
        this.fetchedRooms = response.data;
        this.filteredRooms = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error in subscription:', error);
        this.loading = false;
      },
    });
  }

  filterRooms(filteredRooms: Room[]) {
    this.filteredRooms = filteredRooms;
    console.log(this.filteredRooms)
    this.fetchedRooms = this.filteredRooms;
  }

  openBookModal(roomId: string, roomPrice: number): void {
    const dialogBookRef = this.dialog.open(BookModalComponent, {

      disableClose: false,
      autoFocus: false,
      data: { roomId, roomPrice }

    });

    dialogBookRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRooms();
      }
    });
  }

  openCheckInModal(roomId: string, roomPrice: number): void {
    const dialogCheckInRef = this.dialog.open(CheckInModalComponent, {
      disableClose: false,
      autoFocus: false,
      data: { roomId, roomPrice }
    });

    dialogCheckInRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRooms();
      }
    });
  }
}
