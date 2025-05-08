import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../../models/client';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientService } from '../client.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  isMenuOpen = false;
  isScrolled = false;
  clients: Client[] = [];

  constructor(
    private router: Router,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.loadClients();
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

  loadClients(): void {
    this.clientService.getClients().then(res => {
      res.forEach((data: any) => {
        this.clients.push({ id: data.id, ...data });
      });
      console.log('Clients récupérés:', this.clients);
    });
  }



  openClientDetails(clientId: string): void {
    console.log('Client ID reçu :', clientId);

    if (!clientId) {
      console.warn('ID client manquant !');
      return;
    }

    this.clientService.getClientById(clientId).then((client) => {
      if (client) {
        const dialogRef = this.dialog.open(ClientDetailsComponent, {
          data: client
        });

        dialogRef.afterClosed().subscribe(() => {
          console.log('Dialog fermé');
        });
      } else {
        console.warn('Client non trouvé');
      }
    }).catch((error) => {
      console.error('Erreur lors de la récupération du client :', error);
    });
  }
}




