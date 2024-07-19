import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthApiService } from '../../../auth/auth.service';

// Modal
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-log-in-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.css']
})
export class LogInModalComponent {
  constructor(public dialogRef: MatDialogRef<LogInModalComponent>,
    private authService: AuthApiService,
    private router: Router) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      this.authService.login(form.value).subscribe({
        next: () => {
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
}
