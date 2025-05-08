export interface Service {
  id?: string;
  type: 'chambre' | 'restauration' | 'spa' | 'sport' | 'wifi' | 'conciergerie' | 'transport' | 'blanchisserie' | 'piscine';

  details?: {
    etage?: number;
    vue?: 'mer' | 'ville' | 'jardin';
    lit?: 'simple' | 'double' | 'king' | 'queen';
    petitDejeuner?: 'inclus' | 'supplement' | 'non';
    serviceChambre?: 'matin' | 'soir' | '24h';

    // Pour la restauration
    typeRestauration?: 'buffet' | 'carte';
    horaires?: string;

    // Pour le spa
    optionsSpa?: {
      massage: boolean;
      jacuzzi: boolean;
      sauna: boolean;
      hammam: boolean;
    };

    // Pour la salle de sport
    coachDisponible?: boolean;
    equipements?: string[];

    // Pour le wifi
    debit?: 'haut' | 'normal';

    // Pour la piscine
    piscineType?: 'ouverte' | 'couverte';
    temperature?: 'chauffée' | 'ambiante';

    // Pour le transport
    vehicule?: 'voiture' | 'minibus' | 'limousine';
    destination?: string;
  };
}
