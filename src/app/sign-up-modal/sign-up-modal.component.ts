import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up-modal.component.html',
  styleUrl: './sign-up-modal.component.css'
})
export class SignUpModalComponent {
  constructor(public dialogRef: MatDialogRef<SignUpModalComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}