import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CheckInBooking } from './check-ins-bookings.types';
import { CheckInsAndBookingsApiService } from '../../../api-services/check-ins.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CancelBookModalComponent } from '../../modals/cancel-book-modal/cancel-book-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-ins-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './check-ins-bookings.component.html',
  styleUrls: ['./check-ins-bookings.component.css']
})
export class CheckInsBookingsComponent implements OnInit {
  checkIns: CheckInBooking[] = [];
  filteredCheckIns: CheckInBooking[] = [];
  searchTerm: string = '';
  loading = true;

  constructor(private checkInsAndBookinsApiService: CheckInsAndBookingsApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchCheckIns();
  }

  fetchCheckIns() {
    this.loading = true;
    this.checkInsAndBookinsApiService.getCheckIns().pipe(
      map((response: any) => response.data),
      catchError(error => {
        console.error('Error fetching check-ins:', error);
        this.loading = false;
        return of([]);
      })
    ).subscribe({
      next: (checkIns: CheckInBooking[]) => {
        console.log('Received check-ins:', checkIns);
        this.checkIns = checkIns;
        this.filteredCheckIns = checkIns;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error in subscription:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Check-in subscription completed');
      }
    });
  }

  filterCheckIns() {
    if (!this.searchTerm) {
      this.filteredCheckIns = this.checkIns;
    } else {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      this.filteredCheckIns = this.checkIns.filter(checkIn => {
        const firstName = checkIn.client.first_name?.toLowerCase();
        const middleName = checkIn.client.middle_name?.toLowerCase();
        const lastName = checkIn.client.last_name?.toLowerCase();
        const roomNumber = checkIn.room.room_number.toString();
        const note = checkIn.note?.toLowerCase() || '';

        return (
          firstName.includes(lowerCaseTerm) ||
          middleName.includes(lowerCaseTerm) ||
          lastName.includes(lowerCaseTerm) ||
          roomNumber.includes(this.searchTerm) ||
          note.includes(lowerCaseTerm)
        );
      });
    }
  }

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

    this.checkInsAndBookinsApiService.updateCheckIn(checkInId, updateData).subscribe({
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


}



