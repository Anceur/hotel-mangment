import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecommendationService } from '../recommendation.service';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/client';
import { Recommendation } from '../../models/recommendation';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  searchTerm = '';
  filteredClients: any[] = [];
  isMenuOpen = false;
  isScrolled = false;
  client: any;
  recommendations: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recommendationService: RecommendationService,
    private clientService: ClientService
  ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ngOnInit() {
     const clientId = this.route.snapshot.paramMap.get('clientId');
     if (clientId) {
       this.clientService.getClientById(clientId).then(client => {
         this.client = client;
       });
     }
     this.recommendationService.getRecommendations().then((data:any) => {
       this.recommendations = data;
     });

  }


  saveRecommendation(rec: Recommendation) {
    if (this.client?.id) {
      this.clientService.addRecommendationToClient(this.client.id, rec).subscribe(() => {
        console.log('Recommandation enregistrée');
      });
    }
  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  filteredRecommendations() {
    if (!this.searchTerm) return this.recommendations;
    return this.recommendations.filter(r =>
      r.nomService.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  searchClients(term: string) {
    this.clientService.searchClients(term).subscribe((results: any[]) => {
      this.filteredClients = results;
    });
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
  redirigerVersAjouterClient() {
    this.router.navigate(['/add-client']);
  }
}
