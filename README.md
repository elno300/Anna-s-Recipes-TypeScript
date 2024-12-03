# Lab 1 Fullstackprojekt med Typescript

Jag hoppas att jag har uppnåt alla mål. Detta är ett next projekt med komponentbiblioteket shadcn och tailwind.
Jag använder useContext och är lite osäker på om jag typat det helt rätt.

## För att starta projektet.

1. Kör npm install i front- och backend mappen för att skapa node modules.
2. Starta postgres psql --username=postgres, lägg till databasen, db.sql filen som ligger i root-mappen i detta projekt, kopiera allt lägg in i terminalen och tryck enter.
3. Lägg till PGURI i en .env fil, alltså sökvägen till databasen i backend-mappen. Den kan se ut likt nedan:

```
PGURI=postgres://postgres:{lösenord}@localhost/postgres
```

4. Kör npm run dev i backend-mappen (den får port 3000)
5. Kör npm run dev i frontend, den öppnas på port 4000. (next kör på 3000 så ändrade till 4000 i package.json)
6. Öppna http://localhost:4000/ i din webbläsare.

7. Om något saknas så är det förmodligen komponenter från komponentbibliotektet shadcn som måste installeras var för sig.
   <br>Installera i så fall:
   ```
   npx shadcn@latest add card
   npx shadcn@latest add button
   npx shadcn@latest add alert-dialog
   ```

---

# Lab 2 Fullstackprojekt med testning

1. Om du inte har kört projektet av denna version tidigare, följ instruktionerna ovan, jag har ändrat en typ i databasen efter feedback från förra labben, tack för bra feedback! Med det sagt så hoppas jag att det ska funka nu!

2. Från root-mappen,
   kör:

```
cd frontend
npx cypress open
```

Om cypress inte finns eller öppnas kör:

```
npm install --save-dev cypress
npx cypress open
```

## Detta projektet uppfyller:

Förhoppningsvis alla kraven men kan ha missat något.

<b>Komponenttest</b> där mockning används från en fixtures fil.
[Mockning från en fixture file](frontend/cypress/component/HomePage.cy.tsx).<br>
Välj <i>"Component testing"</i> i cypress, välj valfri webbläsare och välj HomePage.cy.tsx.

<b>E2E-test</b>
Som använder it. och som involverar frontend, backend och databas. Mockning används ej. Dock görs även integrations tester i samma fil där postanropet använder mockad data. Hoppas att det är okej. i slutet görs en delete som tar bort ett av recepten som lagts till. Kyckling Alfredo och Spagetti med köttfärsås läggs till. Första gången tas köttfärsås med spagetti bort.<br>
[Komplett E2E-test samt 2 enklare integrationstester](frontend/cypress/e2e/spec.cy.ts).<br>
Välj <i>"E2E testing"</i> i cypress, välj valfri webbläsare och välj spec.cy.ts.

<b>Alla test är skapade via cypress</b>

<b>Readme-fil</b> som berättar vilka krav som uppnåtts och hur man kan få igång projektet.

En sak jag insåg, det är att testen inte funkar om man raderar alla recept. Det tar jag med mig till nästa projekt!
