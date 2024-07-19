import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-mobile-nav-menu',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav-menu.component.html',
  styleUrl: './mobile-nav-menu.component.css'
})
export class MobileNavMenuComponent {
  @Input() isMobileMenuOpen!: boolean;
  @Output() closeMenu = new EventEmitter<void>();

  closeMobileMenu(): void {
    this.closeMenu.emit();
  }
}
