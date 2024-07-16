import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';

@Component({
  selector: 'app-cancel-book-modal',
  standalone: true,
  templateUrl: './cancel-book-modal.component.html',
  styleUrls: ['./cancel-book-modal.component.css']
})
export class CancelBookModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {checkInBookingId: string, checkInBookingFirstName: string, checkInBookingMiddleName: undefined | string, checkInBookingLastName: string, checkInBookingRoomNumber: number },
    private checkInsBookingsApiService: CheckInsBookingsApiService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.checkInsBookingsApiService.deleteCheckIn(this.data.checkInBookingId).subscribe({

      next: () => {
        console.log(this.data.checkInBookingId);
        console.log('Booking cancelled for room:', this.data.checkInBookingRoomNumber);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
        this.dialogRef.close(false);
      }
    });
  }

}
