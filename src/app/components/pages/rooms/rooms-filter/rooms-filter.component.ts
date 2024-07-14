import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../../../models/room.model';
import { isBefore, isAfter, isEqual } from 'date-fns';

// Form
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-rooms-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './rooms-filter.component.html',
  styleUrls: ['./rooms-filter.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class RoomsFilterComponent {
  @Input() fetchedRooms!: Room[];
  @Output() filteredRoomsChange = new EventEmitter<Room[]>();
 startDate!: Date | null;
endDate!: Date | null;

  constructor() { }

  onSubmit(): void {
    if (this.startDate && this.endDate) {
      const filteredRooms = this.filterRoomsByDate(this.startDate, this.endDate);
      console.log(filteredRooms)
      this.filteredRoomsChange.emit(filteredRooms);
    }
  }

  private filterRoomsByDate(startDate: Date, endDate: Date): Room[] {
    return this.fetchedRooms.filter(room => {
      return !room.bookingsAndCheckIns.some((item: { check_in_date: Date, check_out_date: Date }) => {

        const bookingCheckInDate = new Date(item.check_in_date);
        const bookingCheckOutDate = new Date(item.check_out_date);

        return (isBefore(startDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate)) ||
          isEqual(startDate, bookingCheckInDate) || isEqual(endDate, bookingCheckOutDate) ||
          isEqual(endDate, bookingCheckInDate) || isEqual(startDate, bookingCheckOutDate) ||
          (isBefore(startDate, bookingCheckOutDate) && isAfter(startDate, bookingCheckInDate)) ||
          (isBefore(endDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate));
      });
    });
  }
}
