import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ClientsService } from '../services/clients.service';
import { RoomsService } from '../services/rooms.service';
import { CheckInsService } from '../services/check-ins.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule
  ],
  styleUrls: ['./book-modal.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class BookModalComponent {
  constructor(public dialogRef: MatDialogRef<BookModalComponent>, private clientsService: ClientsService, @Inject(MAT_DIALOG_DATA) public data: { roomId: string }, private roomsService: RoomsService, private checkInsService: CheckInsService) { }

  submitForm(form: NgForm): void {
    if (form.valid) {
      const clientData = {
        last_name: form.value.lastName,
        first_name: form.value.firstName,
        middle_name: form.value.middleName,
        passport_details: form.value.passportNumber,
        comment: form.value.comment
      };

      const checkInData = {
        room_id: this.data.roomId,
        client: clientData,
        check_in_date: form.value.checkInDate,
        check_out_date: form.value.checkOutDate,
        note: form.value.comment,
      }

      console.log(clientData);

      this.clientsService.createClient(clientData).subscribe({
        next: (response) => {
          console.log('Client created:', response);
          this.updateRoomAvailability(this.data.roomId, { isAvailable: false });
          this.dialogRef.close(true); // Close dialog and pass true to indicate success
        },
        error: (error) => {
          console.error('Error creating client:', error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    }
  }

  private updateRoomAvailability(roomId: string, updateData: any): void {
    this.roomsService.updateRoom(roomId, updateData).subscribe({
      next: (response) => {
        console.log('Room updated:', response);
      },
      error: (error) => {
        console.error('Error updating room:', error);
      },
      complete: () => {
        console.log('Room update request completed');
      }
    });
  }
}
