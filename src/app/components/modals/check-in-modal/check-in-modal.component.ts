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

import { ClientsService } from '../../../services/clients.service';
import { RoomsService } from '../../../services/rooms.service';
import { CheckInsService } from '../../../services/check-ins.service';

@Component({
  selector: 'app-check-in-modal',
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
  templateUrl: './check-in-modal.component.html',
  styleUrl: './check-in-modal.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CheckInModalComponent {
  constructor(public dialogRef: MatDialogRef<CheckInModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { roomId: string }, private checkInsService: CheckInsService) { }

  submitForm(form: NgForm): void {
    if (form.valid) {

      const CheckInData = {
        last_name: form.value.lastName,
        first_name: form.value.firstName,
        middle_name: form.value.middleName,
        passport_details: form.value.passportNumber,
        room: this.data.roomId,
        check_in_date: form.value.startDate,
        check_out_date: form.value.endDate,
        comment: form.value.comment || 'No comment',
        note: form.value.comment || 'No note',
        isCheckIn: true
      };

      this.checkInsService.createCheckInClient(CheckInData).subscribe({
        next: (response) => {
          console.log('Check-in created successfully:', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error creating check-in:', error);
        }
      });
    }
  }
}

