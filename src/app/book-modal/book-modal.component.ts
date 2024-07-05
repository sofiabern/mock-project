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

      const bookData = {
        last_name: form.value.lastName,
        first_name: form.value.firstName,
        middle_name: form.value.middleName,
        passport_details: form.value.passportNumber,
        room: this.data.roomId,
        check_in_date: form.value.startDate,
        check_out_date: form.value.endDate,
        comment: form.value.comment || 'No comment',
        note: form.value.comment || 'No note'
      };

      console.log(bookData);
    }


  }

}
