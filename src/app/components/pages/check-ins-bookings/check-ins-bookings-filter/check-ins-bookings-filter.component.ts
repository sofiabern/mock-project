import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Types
import { CheckInBooking } from '../check-ins-bookings.types';

// Services
import { CheckInsBookingsService } from '../check-ins-bookings.service';

// Modal
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
    this.searchTerm = this.checkInsBookingsService.getFilter();
  }

  applyFilter() {
    this.checkInsBookingsService.setFilter(this.searchTerm); 
    this.checkInsBookingsService.fetchCheckIns(1, this.checkInsBookingsService.getPerPage(), this.searchTerm); 
  }

  resetFilter() {
    this.searchTerm = '';
    this.checkInsBookingsService.setFilter(''); 
    this.checkInsBookingsService.fetchCheckIns(1, 6);
  }
}
