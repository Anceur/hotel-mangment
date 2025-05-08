import { Component,HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  isMenuOpen = false;
  isScrolled = false;

  constructor(private router: Router) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  redirigerVersAjouterClient() {
    this.router.navigate(['/add-client']);
  }
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
      // Ajoutez un ID à votre footer
      const footer = document.getElementById('footer-section');
      if (footer) {
        footer.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // ou 'end' selon votre préférence
        });
      }
      return;
    }
  }

  cards = [

    {
      title: 'Aventure en Famille',
      description: 'Chambres spacieuses avec lits superposés, club enfants et activités ludiques pour toute la famille.',
      image: 'assets/images/famille.png'
    },
    {
      title: 'Escapade Gastronomique',
      description: 'Découvrez nos restaurants étoilés, menus dégustation et expériences culinaires raffinées.',
      image: 'assets/images/restaurant.png'
    },
    {
      title: 'Bien-être & Spa',
      description: 'Profitez d’un séjour relaxant avec soins spa, massages et accès à la piscine intérieure chauffée.',
      image: 'assets/images/spa.jpg'
    },
    {
      title: 'Séjour d’Affaires',
      description: 'Espace de travail moderne, Wi-Fi haut débit et accès lounge exécutif pour vos voyages professionnels.',
      image: 'assets/images/sejour.png'
    },
    {
      title: 'Évasion Romantique',
      description: 'Offrez-vous une suite luxueuse avec jacuzzi privé et champagne pour des souvenirs inoubliables à deux.',
      image: 'assets/images/romantique.png'
    },

    {
      title: 'Suite Présidentielle',
      description: 'Un hébergement prestigieux avec vue panoramique, service majordome et équipements exclusifs.',
      image: 'assets/images/presedent.png'
    },

  ];
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

  currentIndex = 0;

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 3;
    }
  }

  next() {
    if (this.currentIndex + 3 < this.cards.length) {
      this.currentIndex += 3;
    }
  }
}
