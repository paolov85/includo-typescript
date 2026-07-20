# IncluDO — Progetto TypeScript

Progetto finale del modulo TypeScript (corso "Master Web Developer Full Stack", start2impact): un sistema che modella la struttura operativa di IncluDO, una scuola di formazione professionale per migranti, con interazioni tra tre entità — partecipanti, corsi e aziende partner.

## Prova subito il progetto (nessuna installazione richiesta)

Il progetto è pubblicato su CodePen e gira già compilato nel browser, senza bisogno di installare nulla:

- [incluDO console](https://codepen.io/Vicaro/pen/RNKJYpb) — versione minima, output tramite `console.log`
- [incluDO interattivo](https://codepen.io/Vicaro/pen/VYPdGpJ) — versione con interfaccia HTML

Le sezioni seguenti riguardano invece lo **sviluppo in locale** (leggere/modificare il codice sorgente), utile solo se vuoi lavorare sul progetto o verificarlo prima di una modifica.

## Struttura del progetto

```
├── console/
│   └── includo-console.ts   # versione minima richiesta dal brief
└── interattivo/
    ├── index.html            # markup dell'interfaccia
    ├── styles.css            # stile
    └── includo.ts            # stessa logica + gestione DOM
```

- **`console/includo-console.ts`** — definisce le interfacce `IPartecipante`, `ICorso`, `IAzienda`, le classi che le implementano, istanzia alcuni dati di esempio e ne testa la logica (iscrizione ai corsi, offerta di posizioni lavorative) tramite `console.log`.
- **`interattivo/`** — stesse interfacce e classi, con in più un'interfaccia HTML che permette di aggiungere partecipanti/corsi/aziende, iscrivere e offrire posizioni lavorative a runtime, con un pannello di log che mostra ogni azione.

## Sviluppo in locale

### Installazione

Serve solo [Node.js](https://nodejs.org/) (che include `npx`) per compilare ed eseguire il TypeScript sul proprio computer. Nessuna dipendenza da installare: il progetto non ha un `package.json`, si usa direttamente il compilatore TypeScript via `npx`.

```bash
git clone https://github.com/paolov85/includo-typescript.git
cd includo-typescript
```

### Configurazione

Non è richiesta alcuna configurazione: nessuna variabile d'ambiente, nessun file di config. `npx tsc` scarica ed esegue il compilatore TypeScript al volo se non già presente sul sistema.

### Utilizzo

**Versione console** — compila ed esegui il file per vedere l'esito dei test in console:

```bash
npx tsc --target es2020 --outDir /tmp/includo-build console/includo-console.ts
node /tmp/includo-build/includo-console.js
```

**Versione interattiva** — essendo TypeScript, va prima compilato in JavaScript:

```bash
npx tsc --target es2020 --lib dom,es2020 --outDir /tmp/includo-interattivo interattivo/includo.ts
```

Poi crea un file HTML che includa `index.html`, `styles.css` e il file compilato, oppure carica i tre file originali (`index.html`, `styles.css`, `includo.ts`) direttamente nei pannelli di [CodePen](https://codepen.io/), che si occupa di compilare il TypeScript automaticamente (vedi sotto).

## Come è stato fatto il deploy su CodePen

1. Creato un nuovo Pen.
2. Nel pannello **JS**, impostazioni (icona ingranaggio) → preprocessore **TypeScript**.
3. Incollato il contenuto di `interattivo/index.html` nel pannello **HTML**, di `interattivo/styles.css` nel pannello **CSS**, e di `interattivo/includo.ts` (o `console/includo-console.ts` per la versione console) nel pannello **JS**.
4. Salvato: CodePen compila ed esegue il TypeScript automaticamente.
