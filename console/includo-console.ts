interface IPartecipante {
  nome: string;
  cognome: string;
  paeseOrigine: string;
  livelloIstruzione: string;
  competenzeLinguistiche: string[];
  ambitoFormazioneInteresse: string;
  iscrivitiCorso(corso: ICorso): void;
}

interface ICorso {
  titolo: string;
  descrizione: string;
  settoreProfessionale: string;
  durata: number;
  iscritti: IPartecipante[];
  aggiungiPartecipante(partecipante: IPartecipante): void;
}

interface IAzienda {
  nome: string;
  settoreAttivita: string;
  descrizione: string;
  posizioniAperte: string[];
  offriPosizione(partecipante: IPartecipante, posizione: string): void;
}
