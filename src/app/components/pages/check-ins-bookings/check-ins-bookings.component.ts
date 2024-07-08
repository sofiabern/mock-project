import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CheckIn } from '../../../models/check-in.model';
import { CheckInsService } from '../../../services/check-ins.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CancelBookModalComponent } from '../../modals/cancel-book-modal/cancel-book-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-ins-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './check-ins-bookings.component.html',
  styleUrls: ['./check-ins-bookings.component.css']
})
export class CheckInsBookingsComponent implements OnInit {
  checkIns: CheckIn[] = [];
  filteredCheckIns: CheckIn[] = [];
  searchTerm: string = '';
  loading = true;

  constructor(private checkInService: CheckInsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchCheckIns();
  }

  fetchCheckIns() {
    this.loading = true;
    this.checkInService.getCheckIns().pipe(
      map((response: any) => response.data),
      catchError(error => {
        console.error('Error fetching check-ins:', error);
        this.loading = false;
        return of([]);
      })
    ).subscribe({
      next: (checkIns: CheckIn[]) => {
        console.log('Received check-ins:', checkIns);
        this.checkIns = checkIns;
        this.filteredCheckIns = checkIns;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error in subscription:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Check-in subscription completed');
      }
    });
  }

  filterCheckIns() {
    if (!this.searchTerm) {
      this.filteredCheckIns = this.checkIns;
    } else {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      this.filteredCheckIns = this.checkIns.filter(checkIn =>
        checkIn.client.first_name.toLowerCase().includes(lowerCaseTerm) ||
        (checkIn.client.middle_name && checkIn.client.middle_name.toLowerCase().includes(lowerCaseTerm)) ||
        checkIn.client.last_name.toLowerCase().includes(lowerCaseTerm) ||
        checkIn.room.room_number.toString().includes(this.searchTerm) ||
        checkIn.note.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }

  openCancelBookModal(checkInId: string, clientFirstName: string, clientMiddleName: undefined | string, clientLastName: string, roomNumber: number): void {
    const dialogRef = this.dialog.open(CancelBookModalComponent, {
      width: '50%',
      disableClose: false,
      data: {checkInId, clientFirstName, clientMiddleName, clientLastName, roomNumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCheckIns();
      } else {
        console.log('Cancellation aborted');
      }
    });
  }
}
