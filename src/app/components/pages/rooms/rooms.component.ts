import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { RoomsFilterComponent } from './rooms-filter/rooms-filter.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';

// Services
import { RoomsService } from '../../../api-services/rooms.service';
import { RoomsComponentsService } from './rooms.service';

// Types
import { Room } from './rooms.types';

// Etc
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, RoomsFilterComponent, RoomsListComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})

export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  loading = true;

  constructor(
    private roomsComponentsService: RoomsComponentsService
  ) {}

  ngOnInit() {
    this.roomsComponentsService.loading$.subscribe(loading => this.loading = loading);
    this.roomsComponentsService.rooms$.subscribe(rooms => this.rooms = rooms);
    this.roomsComponentsService.fetchRooms();
  }

  filterRooms(filteredRooms: Room[]) {
    this.rooms = filteredRooms;
  }
}