import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }
}
