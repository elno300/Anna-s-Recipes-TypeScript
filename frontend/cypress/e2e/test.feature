Feature: Receptkort länkar till recept

  På sidans startsida ska kort med recept renderas ut, bland annat ett med namnet Bouillabaisse. När man klickar på ett av korten ska man hamna på en ny sida för just det receptet.

  Scenario: Användaren klickar på ett receptkort
    Given Jag är på hemsidan och ett receptkort med namnet Bouillabaisse finns
    When Jag klickar på kortet med namnet Bouillabaisse
    Then En ny sida ska läsas in som visar hela receptet, inklusive ingredienser
