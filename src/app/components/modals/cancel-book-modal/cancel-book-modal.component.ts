import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { CheckInsService } from '../../../api-services/check-ins.service';

@Component({
  selector: 'app-cancel-book-modal',
  standalone: true,
  templateUrl: './cancel-book-modal.component.html',
  styleUrls: ['./cancel-book-modal.component.css']
})
export class CancelBookModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {checkInId: string, clientFirstName: string, clientMiddleName: undefined | string, clientLastName: string, roomNumber: number },
    private checkInsService: CheckInsService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.checkInsService.deleteCheckIn(this.data.checkInId).subscribe({

      next: () => {
        console.log(this.data.checkInId);
        console.log('Booking cancelled for room:', this.data.roomNumber);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
        this.dialogRef.close(false);
      }
    });
  }

}
