import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CheckIn } from '../models/check-in.model';
import { CheckInsService } from '../services/check-ins.service';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-check-ins-bookings',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './check-ins-bookings.component.html',
  styleUrl: './check-ins-bookings.component.css'
})
export class CheckInsBookingsComponent implements OnInit {
  checkIns$!: Observable<CheckIn[]>;
  loading = true;

  constructor(private checkInService: CheckInsService) { }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.checkIns$ = this.checkInService.getCheckIns().pipe(
      map((response: any) => response.data),
      catchError(error => {
        console.error('Error fetching clients:', error);
        this.loading = false;
        return of([]);
      })
    );

    this.checkIns$.subscribe({
      next: (checkIns: CheckIn[]) => {
        console.log('Received check-ins:', checkIns);
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

}
