import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Componenets
import { CancelBookModalComponent } from '../../modals/cancel-book-modal/cancel-book-modal.component';
import { CheckInsBookingsFilterComponent } from './check-ins-bookings-filter/check-ins-bookings-filter.component';
import { CheckInsBookingsListComponent } from './check-ins-bookings-list/check-ins-bookings-list.component';

// Types
import { CheckInBooking } from './check-ins-bookings.types';

// Services
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';
import { CheckInsBookingsService } from './check-ins-bookings.service';

// Modal
import { MatDialog } from '@angular/material/dialog';

// Etc
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-check-ins-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    CheckInsBookingsFilterComponent,
    CheckInsBookingsListComponent
  ],
  templateUrl: './check-ins-bookings.component.html',
  styleUrls: ['./check-ins-bookings.component.css']
})
export class CheckInsBookingsComponent implements OnInit {
  checkInsBookings: CheckInBooking[] = [];
  filteredCheckInsBookings: CheckInBooking[] = [];
  loading: boolean = false;

  constructor(private checkInsBookingsService: CheckInsBookingsService) {}

  ngOnInit() {
    this.checkInsBookingsService.loading$.subscribe(loading => this.loading = loading);
    this.checkInsBookingsService.checkInsBookings$.subscribe(checkInsBookings => {
      this.checkInsBookings = checkInsBookings;
      this.updateFilteredCheckIns();
    });
    this.checkInsBookingsService.filteredCheckIns$.subscribe(filteredCheckIns => {
      this.filteredCheckInsBookings = filteredCheckIns || this.checkInsBookings; // Якщо фільтровані дані є null, використовуємо всі дані
    });
    this.checkInsBookingsService.fetchCheckIns();
  }

  updateFilteredCheckIns() {
    this.filteredCheckInsBookings = this.checkInsBookingsService.getCheckIns(); // Оновлюємо фільтровані дані після завантаження всіх даних
  }
}
