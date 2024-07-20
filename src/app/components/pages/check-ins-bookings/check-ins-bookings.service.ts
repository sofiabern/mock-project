import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Types
import { CheckInBooking } from './check-ins-bookings.types';

// Service
import { CheckInsBookingsApiService } from '../../../api-services/check-ins-bookings.service';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class CheckInsBookingsService {
  private checkInsBookingsSubject = new BehaviorSubject<CheckInBooking[]>([]);
  checkInsBookings$ = this.checkInsBookingsSubject.asObservable();

  private allCheckInsBookingsSubject = new BehaviorSubject<CheckInBooking[]>([]);
  allCheckInsBookingsSubject$ = this.checkInsBookingsSubject.asObservable();

  private filteredCheckInsSubject = new BehaviorSubject<CheckInBooking[]>([]);
  filteredCheckIns$ = this.filteredCheckInsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private paginationInfoSubject = new BehaviorSubject<any>({});
  paginationInfo$ = this.paginationInfoSubject.asObservable();

    private perPage = 6;

  constructor(private checkInsBookingsApiService: CheckInsBookingsApiService, private toastr: ToastrService) { }


  fetchAllcheckIns(){
    this.loadingSubject.next(true);
    this.checkInsBookingsApiService.getAllCheckIns().subscribe({
      next:(response) =>{
        this.allCheckInsBookingsSubject.next(response.data);
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


  fetchCheckIns(page: number = 1, perPage: number = 6) {
    this.loadingSubject.next(true);

    this.checkInsBookingsApiService.getCheckIns(page, perPage).subscribe({
      next: (response) => {

        this.checkInsBookingsSubject.next(response.data.checkIns);
        this.paginationInfoSubject.next({
          page: response.data.page,
          perPage: response.data.perPage,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
          hasPreviousPage: response.data.hasPreviousPage,
          hasNextPage: response.data.hasNextPage
        });
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

  getCheckIns(): CheckInBooking[] {
    return this.checkInsBookingsSubject.value;
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }

  applyFilter(filterValue: string = '') {
    const allCheckIns = this.checkInsBookingsSubject.value;
    const filteredCheckIns = allCheckIns.filter(checkInBooking => {
      const fullName = `${checkInBooking.client.first_name} ${checkInBooking.client.middle_name ? checkInBooking.client.middle_name + ' ' : ''}${checkInBooking.client.last_name}`.toLowerCase();
      const roomNumber = checkInBooking.room.room_number.toString();

      return (
        fullName.includes(filterValue.toLowerCase()) ||
        roomNumber.includes(filterValue)
      );
    });
    this.filteredCheckInsSubject.next(filteredCheckIns);
    this.updatePaginatedCheckIns(1);
  }


  updatePaginatedCheckIns(page: number) {
    const filteredCheckIns = this.filteredCheckInsSubject.value;
    const startIndex = (page - 1) * this.perPage;
    const endIndex = page * this.perPage;
    const paginatedCheckIns = filteredCheckIns.slice(startIndex, endIndex);
    this.checkInsBookingsSubject.next(paginatedCheckIns);
    this.updatePaginationInfo({
      page,
      perPage: this.perPage,
      totalItems: filteredCheckIns.length
    });
  }

  updatePaginationInfo(paginationData: any) {
    this.paginationInfoSubject.next({
      page: paginationData.page,
      perPage: paginationData.perPage,
      totalItems: paginationData.totalItems,
      totalPages: Math.ceil(paginationData.totalItems / this.perPage),
      hasPreviousPage: paginationData.page > 1,
      hasNextPage: paginationData.page * this.perPage < paginationData.totalItems
    });
  }

  setFilteredCheckIns(filteredCheckIns: CheckInBooking[]) {
    this.filteredCheckInsSubject.next(filteredCheckIns);
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
}
