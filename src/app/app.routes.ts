import { Routes } from '@angular/router';
import { AddClientComponent } from './modules/clients/add-client/add-client.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { HomeComponent } from './modules/home/home.component';
import { RecommendationsComponent } from './modules/recommendations/recommendations.component';
import { ServicesComponent } from './modules/services/services.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'add-client', component: AddClientComponent},
  { path: 'clients', component: ClientsComponent},
  { path: 'recommendations/:clientId', component: RecommendationsComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'rooms', component: ServicesComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'home', component: HomeComponent },

];
