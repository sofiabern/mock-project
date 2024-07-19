import { Component } from '@angular/core';


import { MatIconModule } from '@angular/material/icon';

// Components
import { AuthButtonsComponent } from './auth-buttons/auth-buttons.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MobileNavMenuComponent } from './mobile-nav-menu/mobile-nav-menu.component';

// Services
import { AuthApiService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatIconModule, AuthButtonsComponent, NavMenuComponent, MobileNavMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isAuthenticated: boolean = false;
  isMobileMenuOpen = false;

  constructor(private authService: AuthApiService) { }

  ngOnInit(): void {

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
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
