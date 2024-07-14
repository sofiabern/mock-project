import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

// Components
import { ClientsListComponent } from './clients-list/clients-list.component';

// Types
import { Client } from './client.types';

// Services
import { ClientsService } from '../../../api-services/clients.service';

// Etc
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ClientsListComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  loading = true;

  constructor(private clientService: ClientsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {

    this.clientService.getClients().subscribe({
      next: (response) => {
        this.clients = response.data;
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching clients.');
      }, complete: () =>{
        this.loading = false;
      }
    });
  }

}
