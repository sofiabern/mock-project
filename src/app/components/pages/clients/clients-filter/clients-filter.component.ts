import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Services
import { ClientsService } from '../clients.service';

// Types
import { Client } from '../clients.types';

// Etc
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-clients-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './clients-filter.component.html',
  styleUrls: ['./clients-filter.component.css']
})
export class ClientsFilterComponent implements OnInit{
  searchTerm: string = '';

  constructor(private clientsService : ClientsService){

  }

  ngOnInit() {
    // Initialize searchTerm with the current filter from the service
    this.searchTerm = this.clientsService.getFilter();
  }

  onSearchChange() {
  }

  applyFilter() {
    this.clientsService.setFilter(this.searchTerm); // Save the filter
    this.clientsService.fetchClients(1, this.clientsService.getPerPage(), this.searchTerm); // Reset to first page
  }

  resetFilter() {
    this.searchTerm = '';
    this.clientsService.setFilter(''); // Clear the filter
    this.clientsService.fetchClients(1, 6); // Reset to first page with default perPage
  }
}
