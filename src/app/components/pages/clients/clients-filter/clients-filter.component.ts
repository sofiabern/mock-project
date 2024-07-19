import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  styleUrl: './clients-filter.component.css'
})

export class ClientsFilterComponent {
  searchTerm: string = '';

  @Input() clients: Client[] = [];
  @Output() filteredClients = new EventEmitter<Client[]>();

  onSearchChange() {
    const filtered = this.filterClients(this.searchTerm);
    this.filteredClients.emit(filtered);
  }

  private filterClients(searchTerm: string): Client[] {
    if (searchTerm) {
      return this.clients.filter(client => {
        const fullName = `${client.first_name} ${client.middle_name ? client.middle_name + ' ' : ''}${client.last_name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) ||
               client.passport_details.toString().includes(searchTerm);
      });
    } else {
      return this.clients;
    }
  }
}
