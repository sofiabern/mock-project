import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { SignUpModalComponent } from '../modals/sign-up-modal/sign-up-modal.component';
import { LogInModalComponent } from '../modals/log-in-modal/log-in-modal.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(component: ComponentType<SignUpModalComponent | LogInModalComponent>): void {
    this.dialog.open(component, {
      width: '24vw',
      disableClose: false
    });
  }

  openSignUpDialog(): void {
    this.openDialog(SignUpModalComponent);
  }

  openLogInDialog(): void {
    this.openDialog(LogInModalComponent);
  }
}