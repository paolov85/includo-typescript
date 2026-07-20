# IncluDO — Progetto TypeScript

Progetto finale del modulo TypeScript (corso "Master Web Developer Full Stack", start2impact): un sistema che modella la struttura operativa di IncluDO, una scuola di formazione professionale per migranti, con interazioni tra tre entità — partecipanti, corsi e aziende partner.

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

## Installazione

Serve solo [Node.js](https://nodejs.org/) (che include `npx`) per compilare ed eseguire il TypeScript in locale. Nessuna dipendenza da installare: il progetto non ha un `package.json`, si usa direttamente il compilatore TypeScript via `npx`.

```bash
git clone https://github.com/paolov85/includo-typescript.git
cd includo-typescript
```

## Configurazione

Non è richiesta alcuna configurazione: nessuna variabile d'ambiente, nessun file di config. `npx tsc` scarica ed esegue il compilatore TypeScript al volo se non già presente sul sistema.

## Utilizzo

### Versione console

Compila ed esegui il file per vedere l'esito dei test in console:

```bash
npx tsc --target es2020 --outDir /tmp/includo-build console/includo-console.ts
node /tmp/includo-build/includo-console.js
```

### Versione interattiva

Apri semplicemente `interattivo/index.html` nel browser — ma essendo TypeScript, va prima compilato in JavaScript. Per una prova rapida in locale:

1. Compila `interattivo/includo.ts` in JavaScript:
   ```bash
   npx tsc --target es2020 --lib dom,es2020 --outDir /tmp/includo-interattivo interattivo/includo.ts
   ```
2. Crea un file HTML che includa `index.html`, `styles.css` e il file compilato, oppure — più semplicemente — carica i tre file originali (`index.html`, `styles.css`, `includo.ts`) direttamente nei pannelli di [CodePen](https://codepen.io/) (vedi sezione Deploy sotto), che si occupa di compilare il TypeScript automaticamente.

## Deploy

Il progetto è pensato per essere pubblicato su [CodePen](https://codepen.io/):

1. Crea un nuovo Pen.
2. Nel pannello **JS**, apri le impostazioni (icona ingranaggio) e imposta **TypeScript** come preprocessore.
3. Incolla il contenuto di `interattivo/index.html` nel pannello **HTML**, di `interattivo/styles.css` nel pannello **CSS**, e di `interattivo/includo.ts` nel pannello **JS**.
4. Salva il Pen: CodePen compila ed esegue il TypeScript automaticamente.

Link al Pen pubblicato: *da aggiungere a deploy avvenuto*.
