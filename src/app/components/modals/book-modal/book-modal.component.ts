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
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ToastrService } from 'ngx-toastr';


import { ClientsService } from '../../../services/clients.service';
import { RoomsService } from '../../../services/rooms.service';
import { CheckInsService } from '../../../services/check-ins.service';

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
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  styleUrls: ['./book-modal.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class BookModalComponent {

  visitsAmount!: number;
  totalDiscount: number = 0;
  discounts = {
    regularCustomer: 0,
    military: 0,
    guardian: 0,
  };
  totalDayPrice: number = this.data.roomPrice;
  totalPrice!: number;
  passportNumber!: string
  startDate!: Date;
  endDate!: Date;
  discountChecked: boolean = false;
  constructor(public dialogRef: MatDialogRef<BookModalComponent>, private clientsService: ClientsService, @Inject(MAT_DIALOG_DATA) public data: { roomId: string, roomPrice: number }, private roomsService: RoomsService, private checkInsService: CheckInsService, private toastr: ToastrService) { }


  submitForm(bookForm: NgForm): void {
    if (!this.discountChecked) {
      this.toastr.error('Please fill all required fields and check discount.');
      return;
    }

    if (bookForm.valid) {
      const bookData = {
        last_name: bookForm.value.lastName,
        first_name: bookForm.value.firstName,
        middle_name: bookForm.value.middleName,
        passport_details: this.passportNumber,
        room: this.data.roomId,
        check_in_date: this.startDate,
        check_out_date: this.endDate,
        comment: bookForm.value.comment || 'No comment',
        note: bookForm.value.comment || 'No note',
        isCheckIn: false,
        discounts: {
          regularCustomer: this.discounts.regularCustomer,
          military: this.discounts.military,
          guardian: this.discounts.guardian
        },
        totalDiscount: this.totalDiscount,
        totalDayPrice: this.totalDayPrice,
        totalPrice: this.totalPrice
      };

      this.checkInsService.createCheckInClient(bookData).subscribe({
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

  onCheckDiscount(): void {
    if (!this.passportNumber) {
      this.toastr.error('Please enter passport number to check discount.');
      return;
    }

    this.clientsService.getClientVisits({ passport_details: this.passportNumber }).subscribe({
      next: (response: any) => {
        this.visitsAmount = response.data;
        console.log('Visits amount:', this.visitsAmount);
        this.discountChecked = true;
      },
      error: (error) => {
        console.error('Error fetching visits:', error);
      }
    });
  }

  onDiscountChange(type: string, isChecked: boolean): void {
    switch (type) {
      case 'regularCustomer':
        this.discounts.regularCustomer = isChecked ? 15 : 0;
        break;
      case 'military':
        this.discounts.military = isChecked ? 30 : 0;
        break;
      case 'guardian':
        this.discounts.guardian = isChecked ? 10 : 0;
        break;
    }
    this.calculateTotalDiscountAndPrice();
  }

  calculateTotalDiscountAndPrice(): void {
    this.totalDiscount = this.discounts.regularCustomer + this.discounts.military + this.discounts.guardian;

    if (this.startDate && this.endDate) {
      const difference = this.endDate.getTime() - this.startDate.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      this.totalDayPrice = this.totalDiscount ? Math.round(this.data.roomPrice * (1 - this.totalDiscount / 100)) : this.data.roomPrice;
      this.totalPrice = this.totalDayPrice * days;
    }
  }
}
