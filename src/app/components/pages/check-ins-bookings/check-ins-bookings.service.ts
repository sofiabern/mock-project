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
export class CheckInsBookingsService {
  private checkInsBookingsSubject = new BehaviorSubject<CheckInBooking[]>([]);
  checkInsBookings$ = this.checkInsBookingsSubject.asObservable();
  private filteredCheckInsSubject = new BehaviorSubject<CheckInBooking[]>([]);
  filteredCheckIns$ = this.filteredCheckInsSubject.asObservable(); // Оголошуємо Observable для фільтрованих даних
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private checkInsBookingsApiService: CheckInsBookingsApiService, private toastr: ToastrService) {}

  fetchCheckIns() {
    this.checkInsBookingsSubject.next([]);
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.getCheckIns().subscribe({
      next: (response) => {
        this.checkInsBookingsSubject.next(response.data);
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching check-ins.');
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    });
  }

  approveCheckIn(checkInId: string) {
    this.loadingSubject.next(true);
    const updateData: Partial<CheckInBooking> = {
      isCheckIn: true
    };
    this.checkInsBookingsApiService.updateCheckIn(checkInId, updateData).subscribe({
      next: () => {
        this.fetchCheckIns();
        this.toastr.success('Check-in approved successfully!');
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while approving check-in.');
      }
    });
  }

  cancelCheckIn(checkInId: string) {
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.deleteCheckIn(checkInId).subscribe({
      next: () => {
        this.fetchCheckIns();
        this.toastr.success('Check-in cancelled successfully!');
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while cancelling check-in.');
      }
    });
  }

  getCheckIns(): CheckInBooking[] {
    return this.checkInsBookingsSubject.value;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }

  setFilteredCheckIns(filteredCheckIns: CheckInBooking[]) {
    this.filteredCheckInsSubject.next(filteredCheckIns); // Оновлюємо фільтровані дані
  }
}
