import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignUpModalComponent } from '../modals/sign-up-modal/sign-up-modal.component';
import { LogInModalComponent } from '../modals/log-in-modal/log-in-modal.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isMobileMenuOpen = false;

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

  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
    document.body.classList.add('no-scroll');
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('no-scroll');
  }

}
