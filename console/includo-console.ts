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

class Partecipante implements IPartecipante {
  constructor(
    public nome: string,
    public cognome: string,
    public paeseOrigine: string,
    public livelloIstruzione: string,
    public competenzeLinguistiche: string[],
    public ambitoFormazioneInteresse: string
  ) {}

  iscrivitiCorso(corso: ICorso): void {
    corso.aggiungiPartecipante(this);
  }
}

class Corso implements ICorso {
  iscritti: IPartecipante[] = [];

  constructor(
    public titolo: string,
    public descrizione: string,
    public settoreProfessionale: string,
    public durata: number
  ) {}

  aggiungiPartecipante(partecipante: IPartecipante): void {
    if (this.iscritti.includes(partecipante)) {
      console.log(`${partecipante.nome} ${partecipante.cognome} è già iscritto/a al corso "${this.titolo}".`);
      return;
    }
    this.iscritti.push(partecipante);
    console.log(`${partecipante.nome} ${partecipante.cognome} si è iscritto/a al corso "${this.titolo}".`);
  }
}

class Azienda implements IAzienda {
  constructor(
    public nome: string,
    public settoreAttivita: string,
    public descrizione: string,
    public posizioniAperte: string[]
  ) {}

  offriPosizione(partecipante: IPartecipante, posizione: string): void {
    if (!this.posizioniAperte.includes(posizione)) {
      console.log(`${this.nome} non ha una posizione aperta come "${posizione}".`);
      return;
    }
    console.log(
      `${this.nome} offre a ${partecipante.nome} ${partecipante.cognome} la posizione di "${posizione}".`
    );
  }
}
