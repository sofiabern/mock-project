import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

// Components
import { CancelBookModalComponent } from '../../modals/cancel-book-modal/cancel-book-modal.component';
import { CheckInsBookingsFilterComponent } from './check-ins-bookings-filter/check-ins-bookings-filter.component';
import { CheckInsBookingsListComponent } from './check-ins-bookings-list/check-ins-bookings-list.component';

// Types
import { CheckInBooking } from './check-ins-bookings.types';

// Services
import { CheckInsBookingsService } from './check-ins-bookings.service';

// Modal
import { MatDialog } from '@angular/material/dialog';

// Etc
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-check-ins-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    CheckInsBookingsFilterComponent,
    CheckInsBookingsListComponent,
    MatPaginatorModule
  ],
  templateUrl: './check-ins-bookings.component.html',
  styleUrls: ['./check-ins-bookings.component.css']
})
export class CheckInsBookingsComponent implements OnInit {
  checkInsBookings: CheckInBooking[] = [];
  filteredCheckInsBookings: CheckInBooking[] = [];
  loading: boolean = false;
  paginationInfo: any = {}; // To store pagination info
  currentPage: number = 1;
  perPage: number = 6;

  constructor(private checkInsBookingsService: CheckInsBookingsService) {}

  ngOnInit() {
    this.checkInsBookingsService.loading$.subscribe(loading => this.loading = loading);
    this.checkInsBookingsService.checkInsBookings$.subscribe(checkInsBookings => {
      this.checkInsBookings = checkInsBookings;
      this.updateFilteredCheckIns();
    });
    this.checkInsBookingsService.filteredCheckIns$.subscribe(filteredCheckIns => {
      this.filteredCheckInsBookings = filteredCheckIns || this.checkInsBookings;
    });
    this.checkInsBookingsService.paginationInfo$.subscribe(paginationInfo => {
      this.paginationInfo = paginationInfo;
    });
    this.loadCheckIns();
  }

  loadCheckIns(page: number = this.currentPage) {
    this.checkInsBookingsService.fetchCheckIns(page, this.perPage);
  }

  updateFilteredCheckIns() {
    this.filteredCheckInsBookings = this.checkInsBookingsService.getCheckIns();
  }

  nextPage() {
    if (this.paginationInfo.hasNextPage) {
      this.currentPage++;
      this.loadCheckIns(this.currentPage);
    }
  }

  previousPage() {
    if (this.paginationInfo.hasPreviousPage) {
      this.currentPage--;
      this.loadCheckIns(this.currentPage);
    }
  }


  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // MatPaginator uses 0-based index
    this.perPage = event.pageSize;
    this.loadCheckIns(this.currentPage);
  }
}
