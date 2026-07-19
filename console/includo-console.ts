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

const amina = new Partecipante(
  "Amina",
  "Diallo",
  "Senegal",
  "Diploma superiore",
  ["francese", "italiano B1"],
  "Sviluppo web"
);

const youssef = new Partecipante(
  "Youssef",
  "El Amrani",
  "Marocco",
  "Laurea",
  ["arabo", "francese", "italiano B2"],
  "Ristorazione"
);

const corsoWeb = new Corso(
  "Sviluppo Web Front-End",
  "Corso base su HTML, CSS e JavaScript",
  "Informatica",
  120
);

const corsoCucina = new Corso(
  "Cucina e Sala",
  "Tecniche di base di cucina e servizio in sala",
  "Ristorazione",
  80
);

const techBridge = new Azienda(
  "TechBridge Srl",
  "Sviluppo software",
  "Azienda di sviluppo web e app",
  ["Junior Frontend Developer", "Stagista IT"]
);

const trattoriaIlPonte = new Azienda(
  "Trattoria Il Ponte",
  "Ristorazione",
  "Ristorante tipico italiano",
  ["Aiuto cuoco"]
);
