import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Types
import { CheckInBooking } from '../check-ins-bookings.types';

// Services
import { CheckInsBookingsService } from '../check-ins-bookings.service';

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
  searchTerm: string = '';

  constructor(private checkInsBookingsService: CheckInsBookingsService) {}

  onSearchChange() {
    this.filterCheckInsBookings();
  }

  filterCheckInsBookings() {
    const checkInsBookings = this.checkInsBookingsService.getCheckIns();
    if (!this.searchTerm) {
      this.checkInsBookingsService.setFilteredCheckIns(checkInsBookings);
    } else {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      const filtered = checkInsBookings.filter(checkInBooking => {
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
      this.checkInsBookingsService.setFilteredCheckIns(filtered);
    }
  }
}
