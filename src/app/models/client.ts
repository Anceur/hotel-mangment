import { Recommendation } from "./recommendation";
import { Service } from "./service";

export interface Client {
  id?: string;
  nom: string;
  prenom: string;
  statut: 'standard' | 'gold' | 'platinum';
  preferences: { [key: string]: boolean };
  niveauPreferences: { [key: string]: 'faible' | 'moyenne' | 'élevée' };
  contraintes: string;
  services?: Service[];
  recommendations?: Recommendation[];
}
