import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componenets
import { CancelBookModalComponent } from '../../modals/cancel-book-modal/cancel-book-modal.component';
import { CheckInsBookingsFilterComponent } from './check-ins-bookings-filter/check-ins-bookings-filter.component';

// Types
import { CheckInBooking } from './check-ins-bookings.types';

// Services
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';

// Modal
import { MatDialog } from '@angular/material/dialog';

// Etc
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-check-ins-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CheckInsBookingsFilterComponent
  ],
  templateUrl: './check-ins-bookings.component.html',
  styleUrls: ['./check-ins-bookings.component.css']
})
export class CheckInsBookingsComponent implements OnInit {
  checkInsBookings: CheckInBooking[] = [];
  filteredCheckIns: CheckInBooking[] = [];
  loading = true;

  constructor(private checkInsBookinsApiService: CheckInsBookingsApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchCheckIns();
  }

  fetchCheckIns() {
    this.loading = true;

    this.checkInsBookinsApiService.getCheckIns().subscribe({
      next: (response) => {
        this.checkInsBookings = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching check-ins:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Check-in subscription completed');
      }
    });
  }

  // filterCheckIns() {
  //   if (!this.searchTerm) {
  //     this.filteredCheckIns = this.checkInsBookings;
  //   } else {
  //     const lowerCaseTerm = this.searchTerm.toLowerCase();
  //     this.filteredCheckIns = this.checkInsBookings.filter(checkInBooking => {
  //       const firstName = checkInBooking.client.first_name?.toLowerCase();
  //       const middleName = checkInBooking.client.middle_name?.toLowerCase();
  //       const lastName = checkInBooking.client.last_name?.toLowerCase();
  //       const roomNumber = checkInBooking.room.room_number.toString();
  //       const note = checkInBooking.note?.toLowerCase() || '';

  //       return (
  //         firstName.includes(lowerCaseTerm) ||
  //         middleName.includes(lowerCaseTerm) ||
  //         lastName.includes(lowerCaseTerm) ||
  //         roomNumber.includes(this.searchTerm) ||
  //         note.includes(lowerCaseTerm)
  //       );
  //     });
  //   }
  // }

  openCancelBookModal(checkInId: string, clientFirstName: string, clientMiddleName: undefined | string, clientLastName: string, roomNumber: number): void {
    const dialogRef = this.dialog.open(CancelBookModalComponent, {
      width: '50%',
      disableClose: false,
      data: { checkInId, clientFirstName, clientMiddleName, clientLastName, roomNumber }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCheckIns();
      } else {
        console.log('Cancellation aborted');
      }
    });
  }

  onApprove(checkInId: string,) {
    this.loading = true;
    const updateData: Partial<CheckInBooking> = {
      isCheckIn: true
    };

    this.checkInsBookinsApiService.updateCheckIn(checkInId, updateData).subscribe({
      next: (updatedCheckIn) => {
        console.log('Check-in updated:', updatedCheckIn);
        this.loading = false;

        this.fetchCheckIns();
      },
      error: (err) => {
        console.error('Error updating check-in:', err);
        this.loading = false;
      }
    });
  }

  onFilteredCheckInsBookings(filteredCheckInsBookings: CheckInBooking[]) {
    this.checkInsBookings = filteredCheckInsBookings;
  }
}



