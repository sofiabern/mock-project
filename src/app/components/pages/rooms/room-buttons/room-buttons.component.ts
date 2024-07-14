import { Component, Input } from '@angular/core';

// Componenets
import { BookModalComponent } from '../../../modals/book-modal/book-modal.component';
import { CheckInModalComponent } from '../../../modals/check-in-modal/check-in-modal.component';

// Services
import { RoomsComponentsService } from '../rooms.service';

// Types
import { Room } from '../rooms.types';

// Modal
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-room-buttons',
  standalone: true,
  imports: [],
  templateUrl: './room-buttons.component.html',
  styleUrl: './room-buttons.component.css'
})
export class RoomButtonsComponent {
  @Input() roomPrice!: number;
  @Input() roomId!: string;
  

  constructor(
    private dialog: MatDialog,
    private roomsComponentsService: RoomsComponentsService
  ) {}

  openBookModal(roomId: string, roomPrice: number): void {
    const dialogBookRef = this.dialog.open(BookModalComponent, {
      disableClose: false,
      autoFocus: false,
      data: { roomId, roomPrice }
    });

    dialogBookRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomsComponentsService.fetchRooms();
      }
    });
  }

  openCheckInModal(roomId: string, roomPrice: number): void {
    const dialogCheckInRef = this.dialog.open(CheckInModalComponent, {
      disableClose: false,
      autoFocus: false,
      data: { roomId, roomPrice }
    });

    dialogCheckInRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomsComponentsService.fetchRooms();
      }
    });
  }
}