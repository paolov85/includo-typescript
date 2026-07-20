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

// Stato dell'applicazione
const partecipanti: Partecipante[] = [];
const corsi: Corso[] = [];
const aziende: Azienda[] = [];

// Collega console.log al pannello di log visivo
const logEl = document.getElementById('log') as HTMLDivElement;
const originalLog = console.log;
console.log = (...args: unknown[]) => {
  const line = document.createElement('div');
  line.className = 'log-line';
  line.textContent = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
  logEl.prepend(line);
  originalLog(...args);
};

function renderCorsi(): void {
  const container = document.getElementById('corsi-list') as HTMLDivElement;
  container.innerHTML = corsi.length === 0 ? '<p class="empty">Nessun corso ancora.</p>' : '';
  corsi.forEach(c => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${c.titolo}</strong> <span class="tag">${c.settoreProfessionale}</span>
      <p class="meta">${c.descrizione} — ${c.durata} ore</p>
      <p class="meta">Iscritti: ${c.iscritti.length ? c.iscritti.map(p => `${p.nome} ${p.cognome}`).join(', ') : 'nessuno'}</p>`;
    container.appendChild(div);
  });
}

function renderAziende(): void {
  const container = document.getElementById('aziende-list') as HTMLDivElement;
  container.innerHTML = aziende.length === 0 ? '<p class="empty">Nessuna azienda ancora.</p>' : '';
  aziende.forEach(a => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${a.nome}</strong> <span class="tag">${a.settoreAttivita}</span>
      <p class="meta">${a.descrizione}</p>
      <p class="meta">Posizioni aperte: ${a.posizioniAperte.length ? a.posizioniAperte.join(', ') : 'nessuna'}</p>`;
    container.appendChild(div);
  });
}

function renderPosizioniSelect(): void {
  const selAzienda = document.getElementById('sel-azienda-offerta') as HTMLSelectElement;
  const selPosizione = document.getElementById('sel-posizione-offerta') as HTMLSelectElement;
  const azienda = aziende[Number(selAzienda.value)];
  selPosizione.innerHTML = azienda
    ? azienda.posizioniAperte.map(p => `<option value="${p}">${p}</option>`).join('')
    : '';
}

function renderSelects(): void {
  const fillPartecipanti = (select: HTMLSelectElement) => {
    select.innerHTML = partecipanti.map((p, i) => `<option value="${i}">${p.nome} ${p.cognome}</option>`).join('');
  };
  fillPartecipanti(document.getElementById('sel-partecipante-iscrizione') as HTMLSelectElement);
  fillPartecipanti(document.getElementById('sel-partecipante-offerta') as HTMLSelectElement);

  const selCorsoIscrizione = document.getElementById('sel-corso-iscrizione') as HTMLSelectElement;
  selCorsoIscrizione.innerHTML = corsi.map((c, i) => `<option value="${i}">${c.titolo}</option>`).join('');

  const selAziendaOfferta = document.getElementById('sel-azienda-offerta') as HTMLSelectElement;
  selAziendaOfferta.innerHTML = aziende.map((a, i) => `<option value="${i}">${a.nome}</option>`).join('');

  renderPosizioniSelect();
}

function renderAll(): void {
  renderCorsi();
  renderAziende();
  renderSelects();
}

document.getElementById('btn-add-partecipante')!.addEventListener('click', () => {
  const nome = (document.getElementById('p-nome') as HTMLInputElement).value.trim();
  const cognome = (document.getElementById('p-cognome') as HTMLInputElement).value.trim();
  const paese = (document.getElementById('p-paese') as HTMLInputElement).value.trim();
  const istruzione = (document.getElementById('p-istruzione') as HTMLSelectElement).value;
  const lingue = (document.getElementById('p-lingue') as HTMLInputElement).value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const ambito = (document.getElementById('p-ambito') as HTMLInputElement).value.trim();

  if (!nome || !cognome) {
    console.log('Inserisci almeno nome e cognome per aggiungere un partecipante.');
    return;
  }

  partecipanti.push(new Partecipante(nome, cognome, paese, istruzione, lingue, ambito));
  console.log(`Nuovo partecipante aggiunto: ${nome} ${cognome}.`);
  renderAll();
});

document.getElementById('btn-add-corso')!.addEventListener('click', () => {
  const titolo = (document.getElementById('c-titolo') as HTMLInputElement).value.trim();
  const descrizione = (document.getElementById('c-descrizione') as HTMLInputElement).value.trim();
  const settore = (document.getElementById('c-settore') as HTMLInputElement).value.trim();
  const durata = Number((document.getElementById('c-durata') as HTMLInputElement).value) || 0;

  if (!titolo) {
    console.log('Inserisci almeno il titolo per aggiungere un corso.');
    return;
  }

  corsi.push(new Corso(titolo, descrizione, settore, durata));
  console.log(`Nuovo corso aggiunto: "${titolo}".`);
  renderAll();
});

document.getElementById('btn-add-azienda')!.addEventListener('click', () => {
  const nome = (document.getElementById('a-nome') as HTMLInputElement).value.trim();
  const settore = (document.getElementById('a-settore') as HTMLInputElement).value.trim();
  const descrizione = (document.getElementById('a-descrizione') as HTMLInputElement).value.trim();
  const posizioni = (document.getElementById('a-posizioni') as HTMLInputElement).value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (!nome) {
    console.log('Inserisci almeno il nome per aggiungere un\'azienda.');
    return;
  }

  aziende.push(new Azienda(nome, settore, descrizione, posizioni));
  console.log(`Nuova azienda partner aggiunta: ${nome}.`);
  renderAll();
});

document.getElementById('btn-iscrivi')!.addEventListener('click', () => {
  const partecipante = partecipanti[Number((document.getElementById('sel-partecipante-iscrizione') as HTMLSelectElement).value)];
  const corso = corsi[Number((document.getElementById('sel-corso-iscrizione') as HTMLSelectElement).value)];

  if (!partecipante || !corso) {
    console.log('Aggiungi almeno un partecipante e un corso prima di iscrivere.');
    return;
  }

  partecipante.iscrivitiCorso(corso);
  renderAll();
});

document.getElementById('sel-azienda-offerta')!.addEventListener('change', renderPosizioniSelect);

document.getElementById('btn-offri')!.addEventListener('click', () => {
  const azienda = aziende[Number((document.getElementById('sel-azienda-offerta') as HTMLSelectElement).value)];
  const partecipante = partecipanti[Number((document.getElementById('sel-partecipante-offerta') as HTMLSelectElement).value)];
  const posizione = (document.getElementById('sel-posizione-offerta') as HTMLSelectElement).value;

  if (!azienda || !partecipante || !posizione) {
    console.log('Aggiungi un\'azienda con posizioni aperte e un partecipante prima di offrire una posizione.');
    return;
  }

  azienda.offriPosizione(partecipante, posizione);
  renderAll();
});

function seed(): void {
  const corsoWeb = new Corso('Sviluppo Web Front-End', 'Corso base su HTML, CSS e JavaScript', 'Informatica', 120);
  const corsoCucina = new Corso('Cucina e Sala', 'Tecniche di base di cucina e servizio in sala', 'Ristorazione', 80);
  corsi.push(corsoWeb, corsoCucina);

  const amina = new Partecipante('Amina', 'Diallo', 'Senegal', 'Diploma superiore', ['francese', 'italiano B1'], 'Sviluppo web');
  const youssef = new Partecipante('Youssef', 'El Amrani', 'Marocco', 'Laurea', ['arabo', 'francese', 'italiano B2'], 'Ristorazione');
  partecipanti.push(amina, youssef);

  const techBridge = new Azienda('TechBridge Srl', 'Sviluppo software', 'Azienda di sviluppo web e app', ['Junior Frontend Developer', 'Stagista IT']);
  const trattoriaIlPonte = new Azienda('Trattoria Il Ponte', 'Ristorazione', 'Ristorante tipico italiano', ['Aiuto cuoco']);
  aziende.push(techBridge, trattoriaIlPonte);

  amina.iscrivitiCorso(corsoWeb);
  youssef.iscrivitiCorso(corsoCucina);

  renderAll();
}

seed();
