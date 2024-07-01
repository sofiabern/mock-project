import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {
  constructor(public dialogRef: MatDialogRef<BookModalComponent>) {}

  submitForm(form: NgForm): void {
    if (form.valid) {
      // Опрацювання введених даних форми, наприклад, відправка на сервер
      console.log('Form submitted:', form.value);
      this.dialogRef.close();
    }
  }
}