import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent {
  constructor(public dialogRef: MatDialogRef<SignUpModalComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      // Ваш код для відправки форми, наприклад, до сервера
      console.log('Form submitted:', form.value);
      this.dialogRef.close();
    }
  }
}