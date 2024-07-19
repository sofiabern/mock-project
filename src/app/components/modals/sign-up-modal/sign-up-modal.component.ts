import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

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
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [ FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SignUpModalComponent>,
    private authService: AuthApiService,
    private router: Router
  ) {}


  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(signUpForm: NgForm): void {
    if (signUpForm.valid) {
      this.authService.signupAndLogin(signUpForm.value).subscribe({
        next: () => {
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Signup failed', err);
        }
      });
    }
  }
}
