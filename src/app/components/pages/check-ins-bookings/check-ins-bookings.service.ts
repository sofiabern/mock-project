import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Types
import { CheckInBooking } from './check-ins-bookings.types';

// Service
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';

// Etc
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class checkInsBookingsService {
  private checkInsBookingsSubject = new BehaviorSubject<CheckInBooking[]>([]);
  rooms$ = this.checkInsBookingsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private checkInsBookingsApiService: CheckInsBookingsApiService, private toastr: ToastrService) {}

  fetchRooms() {
    this.checkInsBookingsSubject.next([]);
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.getCheckIns().subscribe({
      next: (response) => {
        this.checkInsBookingsSubject.next(response.data);
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching rooms.');
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    });
  }

  getCheckIns(): CheckInBooking[] {
    return this.checkInsBookingsSubject.value;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
