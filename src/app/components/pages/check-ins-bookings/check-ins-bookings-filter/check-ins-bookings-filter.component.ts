import { Component, OnInit } from '@angular/core';
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
export class CheckInsBookingsFilterComponent implements OnInit {
  searchTerm: string = '';

  constructor(private checkInsBookingsService: CheckInsBookingsService) {}

  ngOnInit() {
    // Initialize searchTerm with the current filter from the service
    this.searchTerm = this.checkInsBookingsService.getFilter();
  }


  onSearchChange() {
    // Optional: handle changes in search term (e.g., debounce)
  }

  applyFilter() {
    this.checkInsBookingsService.setFilter(this.searchTerm); // Save the filter
    this.checkInsBookingsService.fetchCheckIns(1, this.checkInsBookingsService.getPerPage(), this.searchTerm); // Reset to first page
  }

  resetFilter() {
    this.searchTerm = '';
    this.checkInsBookingsService.setFilter(''); // Clear the filter
    this.checkInsBookingsService.fetchCheckIns(1, 6); // Reset to first page with default perPage
  }
}
