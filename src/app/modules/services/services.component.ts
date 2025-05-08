import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  isMenuOpen = false;
  isScrolled = false;
  constructor(private router: Router) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  handleMobileClick(action: string, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }

    if (action === 'about' || action === 'contact') {
      this.scrollTo(action, event);
    } else {
      this.navigateTo(action);
    }
  }
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
    this.isMenuOpen = false;
  }

  scrollTo(section: string, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }

    this.isMenuOpen = false;

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section === 'about' || section === 'contact') {
      const footer = document.getElementById('footer-section');
      if (footer) {
        footer.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      return;
    }
  }
}
