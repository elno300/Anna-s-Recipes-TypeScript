Feature: Lägg till nytt recept

Det ska finnas en knapp för att öppna ett formulär med texten "Lägg till nytt recept". När man klickar på knappen
ska ett formulär visas. Sidan ska alltså kunna gå från att inte visa ett formulär till att visa ett formulär.


Scenario: Ett första klick
  Jag är på hemsidan och knappen har texten Lägg till nytt recept
  Jag klickat på knappen bör ett formulär synas
  Man kan skriva in en text i inputfältet för titel

Scenario: Skriva i inputfältet
Jag klickar på knappen
  Man kan skriva in en text i inputfältet för titel
  When Jag skriver in i inputfälten
  Then Knappen ska visa 2
