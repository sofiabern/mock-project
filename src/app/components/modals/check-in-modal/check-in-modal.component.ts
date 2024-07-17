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

import { ToastrService } from 'ngx-toastr';


import { ClientsApiService } from '../../../api-services/clients.service';
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CheckInAndBookingData } from '../../pages/check-ins-bookings/check-ins-bookings.types';
import { Room } from '../../pages/rooms/rooms.types';

// Etc
import { isBefore, isAfter, isEqual } from 'date-fns';


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
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './check-in-modal.component.html',
  styleUrl: './check-in-modal.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CheckInModalComponent {
  visitsAmount! : number;
  totalDiscount: number = 0;
  discounts = {
    regularCustomer: 0,
    military: 0,
    guardian: 0,
  };
  totalDayPrice:number = this.data.room.price;
  totalPrice:number = 0;
  passportNumber!:string
  startDate!: Date;
  endDate!: Date;
  discountChecked: boolean = false;
  constructor(public dialogRef: MatDialogRef<CheckInModalComponent>, private clientsApiService: ClientsApiService, @Inject(MAT_DIALOG_DATA) public data: { room: Room}, private checkInsBookingsApiService: CheckInsBookingsApiService,  private toastr: ToastrService) { }

  submitForm(checkInForm: NgForm): void {
    if (!this.discountChecked) {
      this.toastr.error('Please fill all required fields marked by * and check discount.');
      return;
    }

    const { firstName, lastName, passportNumber, comment, middleName } = checkInForm.value;

    if (!firstName.trim() || !lastName.trim() || !passportNumber.trim()) {
      this.toastr.error('Fields cannot contain only spaces.');
      return;
    }

    if (checkInForm.valid) {
      const hasIntersection = this.data.room.bookingsAndCheckIns.some((item: any) => {
        const bookingCheckInDate = new Date(item.check_in_date);
        const bookingCheckOutDate = new Date(item.check_out_date);
        return (
          (isBefore(this.startDate, bookingCheckOutDate) && isAfter(this.endDate, bookingCheckInDate)) ||
          isEqual(this.startDate, bookingCheckInDate) ||
          isEqual(this.endDate, bookingCheckOutDate) ||
          isEqual(this.endDate, bookingCheckInDate) ||
          isEqual(this.startDate, bookingCheckOutDate) ||
          (isBefore(this.startDate, bookingCheckOutDate) && isAfter(this.startDate, bookingCheckInDate)) ||
          (isBefore(this.endDate, bookingCheckOutDate) && isAfter(this.endDate, bookingCheckInDate))
        );
      });

      if (hasIntersection) {
        this.toastr.error('Selected dates intersect with existing bookings or check-ins. Please filter rooms before choosing.');
        return;
      }

      const checkInData: CheckInAndBookingData = {
        last_name: lastName,
        first_name: firstName,
        passport_details: this.passportNumber,
        room: this.data.room._id,
        check_in_date: this.startDate,
        check_out_date: this.endDate,
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

      if (comment) {
        checkInData.comment = comment;
      }

      if (middleName) {
        checkInData.middle_name = middleName
      }


      this.checkInsBookingsApiService.createCheckIn(checkInData).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.toastr.success('Check-in created successfully!');
        },
        error: (error) => {
          console.error( error);
          this.toastr.error('Failed to create check-in.');

        }
      });
    }
  }

  onCheckDiscount(): void {
    if (!this.passportNumber) {
      this.toastr.error('Please enter passport number to check discount.');
      return;
    }

    this.clientsApiService.getClientVisits({ passport_details: this.passportNumber }).subscribe({
      next: (response) => {
        this.visitsAmount = response.data;
        this.discountChecked = true;
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Error fetching client visits. Please try again later.');
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
    this.totalDayPrice = this.totalDiscount ? Math.round(this.data.room.price * (1 - this.totalDiscount / 100)) : this.data.room.price;

    if (this.startDate && this.endDate) {
      const difference = this.endDate.getTime() - this.startDate.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      this.totalPrice = this.totalDayPrice * days;
    }
  }
}



