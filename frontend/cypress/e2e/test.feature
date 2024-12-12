Feature: Recept kort länkar till recept.

På sidans startsida ska kort med recept renderas ut, bla ett med namnet Bouillabaisse. När man klickar på ett av kortet så ska man hamna på en ny sida för just det receptet.

Given Jag är på hemsidan och ett recept-kort med namnet Bouillabaisse finns.
When jag klickar på knappen
Then En ny sida läses in som visar hela receptet, bla ingredienser.
