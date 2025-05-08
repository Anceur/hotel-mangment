import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../models/client';
import { ClientService } from '../../client.service';
import { Service } from '../../../models/service';



@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-client.component.html',
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  isMenuOpen = false;
  clientId: string | null = null;

  preferences = [
    { key: 'newsletter', label: 'Recevoir la newsletter' },
    { key: 'offres', label: 'Offres spéciales' },
    { key: 'notifications', label: 'Notifications SMS' },
  ];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      statut: ['', Validators.required],
      preferencesGroup: this.fb.group({}),
      preferencesNiveauGroup: this.fb.group({}),
      contraintes: [''],
      services: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const preferencesGroup = this.preferencesGroup;
    const preferencesNiveauGroup = this.preferencesNiveauGroup;

    this.preferences.forEach(pref => {
      preferencesGroup.addControl(pref.key, new FormControl(false));
      preferencesNiveauGroup.addControl(pref.key, new FormControl('moyenne'));
    });

    // Récupération ID pour le mode édition
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.loadClient();
    }
  }

  get services(): FormArray {
    return this.clientForm.get('services') as FormArray;
  }

  addService() {
    const serviceGroup = this.fb.group({
      type: ['', Validators.required],
      details: this.fb.group({})
    });

    serviceGroup.get('type')?.valueChanges.subscribe((type: any) => {
      const detailsGroup = this.createDetailsGroup(type);
      serviceGroup.setControl('details', detailsGroup);
    });

    this.services.push(serviceGroup);
  }

  removeService(index: number) {
    this.services.removeAt(index);
  }
  createDetailsGroup(type: string): FormGroup {
    switch (type) {
      case 'chambre':
        return this.fb.group({
          etage: [''],
          vue: [''],
          lit: [''],
          petitDejeuner: [''],
          serviceChambre: ['']
        });
      case 'restauration':
        return this.fb.group({
          typeRestauration: [''],
          horaires: ['']
        });
      case 'spa':
        return this.fb.group({
          optionsSpa: this.fb.group({
            massage: [false],
            jacuzzi: [false],
            sauna: [false],
            hammam: [false]
          })
        });
      case 'sport':
        return this.fb.group({
          coachDisponible: [false],
          equipements: this.fb.control([])
        });
      case 'wifi':
        return this.fb.group({
          debit: ['']
        });
      case 'piscine':
        return this.fb.group({
          piscineType: [''],
          temperature: ['']
        });
      case 'transport':
        return this.fb.group({
          vehicule: [''],
          destination: ['']
        });
      default:
        return this.fb.group({});
    }
  }



  get preferencesGroup(): FormGroup {
    return this.clientForm.get('preferencesGroup') as FormGroup;
  }

  get preferencesNiveauGroup(): FormGroup {
    return this.clientForm.get('preferencesNiveauGroup') as FormGroup;
  }

  getFormControl(group: FormGroup, key: string): FormControl {
    return group.get(key) as FormControl;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(section: string, event?: MouseEvent) {
    if (event) event.preventDefault();
    this.isMenuOpen = false;

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section === 'about' || section === 'contact') {
      const footer = document.getElementById('footer-section');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  handleMobileClick(action: string, event?: MouseEvent) {
    if (event) event.preventDefault();

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

  onSubmit() {
    if (this.clientForm.invalid) return;

    const formValue = this.clientForm.value;

    const newClient: Client = {
      nom: formValue.nom,
      prenom: formValue.prenom,
      statut: formValue.statut,
      preferences: this.preferences.reduce((prefs, pref) => {
        prefs[pref.key] = formValue.preferencesGroup[pref.key];
        return prefs;
      }, {} as { [key: string]: boolean }),
      niveauPreferences: this.preferences.reduce((nivPrefs, pref) => {
        nivPrefs[pref.key] = formValue.preferencesNiveauGroup[pref.key] as 'faible' | 'moyenne' | 'élevée';
        return nivPrefs;
      }, {} as { [key: string]: 'faible' | 'moyenne' | 'élevée' }),
      contraintes: formValue.contraintes,
      services: formValue.services
    };

    this.clientService.addClient(newClient).subscribe((createdClient:any) => {
      console.log('Client créé avec ID :', createdClient.id);
      this.router.navigate(['/recommendations', createdClient.id]);
    });
  }



  private async loadClient() {
    const client = await this.clientService.getClientById(this.clientId!);
    if (client) {
      this.clientForm.patchValue({
        nom: client.nom,
        prenom: client.prenom,
        statut: client.statut,
        contraintes: client.contraintes
      });

      this.preferences.forEach(pref => {
        this.preferencesGroup.get(pref.key)?.setValue(client.preferences[pref.key] || false);
        this.preferencesNiveauGroup.get(pref.key)?.setValue(client.niveauPreferences[pref.key] || 'moyenne');
      });
    }
  }

}
