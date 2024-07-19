import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { SignUpModalComponent } from '../../modals/sign-up-modal/sign-up-modal.component';
import { LogInModalComponent } from '../../modals/log-in-modal/log-in-modal.component';
import { ComponentType } from '@angular/cdk/portal';

// Services
import { AuthApiService } from '../../../auth/auth.service';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css'
})
export class AuthButtonsComponent {
  isAuthenticated$: Observable<boolean>;


  constructor(public dialog: MatDialog, private authService: AuthApiService, private router: Router){
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }


  openDialog(component: ComponentType<SignUpModalComponent | LogInModalComponent>): void {
    this.dialog.open(component, {
      disableClose: false
    });
  }

  openSignUpDialog(): void {
    this.openDialog(SignUpModalComponent);
  }

  openLogInDialog(): void {
    this.openDialog(LogInModalComponent);
  }

  logOut(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/authorization']);
    });
  }
}
