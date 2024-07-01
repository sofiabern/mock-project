import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { LogInModalComponent } from '../log-in-modal/log-in-modal.component';
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
      width: '40vw',
      height: '80vh',
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
