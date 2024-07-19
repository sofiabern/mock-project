import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFilterComponent } from './clients-filter/clients-filter.component';

// Types
import { Client } from './clients.types';

// Services
import { ClientsApiService } from '../../../api-services/clients.service';

// Etc
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ClientsListComponent, ClientsFilterComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  loading = true;

  constructor(private clientApiService: ClientsApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clientApiService.getClients().subscribe({
      next: (response) => {
        this.clients = response.data;
        this.filteredClients = this.clients;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching clients.');
      }
    });
  }

  onFilteredClients(filtered: Client[]) {
    this.filteredClients = filtered;
  }
}
