import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../api-services/clients.service';
import { CommonModule } from '@angular/common';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  clients$!: Observable<Client[]>;
  loading = true;

  constructor(private clientService: ClientsService) { }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clients$ = this.clientService.getClients().pipe(
      map((response: any) => response.data),
      catchError(error => {
        console.error('Error fetching clients:', error);
        this.loading = false;
        return of([]);
      })
    );

    this.clients$.subscribe({
      next: (clients: Client[]) => {
        console.log('Received clients:', clients);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error in subscription:', error);
        this.loading = false;
      }
    });
  }


}
