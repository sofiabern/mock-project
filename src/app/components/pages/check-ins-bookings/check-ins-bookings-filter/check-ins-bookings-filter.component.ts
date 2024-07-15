import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Types
import { CheckInBooking } from '../check-ins-bookings.types';

// Etc
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-check-ins-bookings-filter',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, FormsModule],
  templateUrl: './check-ins-bookings-filter.component.html',
  styleUrl: './check-ins-bookings-filter.component.css'
})
export class CheckInsBookingsFilterComponent {
  @Input() checkInsBookings: CheckInBooking[] = [];
  @Output() filteredCheckInsBookings = new EventEmitter<CheckInBooking[]>();
  searchTerm: string = '';

  onSearchChange() {
    this.filterCheckInsBookings();
  }

  filterCheckInsBookings() {
    if (!this.searchTerm) {
      this.filteredCheckInsBookings.emit(this.checkInsBookings);
    } else {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      const filtered = this.checkInsBookings.filter(checkInBooking => {
        const firstName = checkInBooking.client.first_name?.toLowerCase();
        const middleName = checkInBooking.client.middle_name?.toLowerCase() || '';
        const lastName = checkInBooking.client.last_name?.toLowerCase();
        const roomNumber = checkInBooking.room.room_number.toString();
        const note = checkInBooking.note?.toLowerCase() || '';

        return (
          firstName.includes(lowerCaseTerm) ||
          middleName.includes(lowerCaseTerm) ||
          lastName.includes(lowerCaseTerm) ||
          roomNumber.includes(this.searchTerm) ||
          note.includes(lowerCaseTerm)
        );
      });
      this.filteredCheckInsBookings.emit(filtered);
    }
  }
}
