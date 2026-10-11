# Sjablonen

Lege sjablonen voor wie het onderzoek uitvoert. Gebruik alleen deelnemerscodes, nooit namen. Alle CSV-bestanden gebruiken `;` als scheidingsteken, net als de bestanden die de app zelf maakt.

## `sessieregistratie.csv`

Eén regel per taak per deelnemer. Dit is hetzelfde format dat wij voor ons eigen onderzoek gebruiken.

| Kolom | Inhoud |
|---|---|
| `deelnemerscode` | Bijvoorbeeld `D07`. |
| `bron` | `echt` voor een echte deelnemer. Gesimuleerde of verzonnen gegevens krijgen `gesimuleerd` en worden nooit als echte data gerapporteerd. |
| `apparaat` | Telefoon en browser, bijvoorbeeld `Android (Chrome)` of `iPhone (Safari)`. |
| `datum` | Datum van de sessie (JJJJ-MM-DD). |
| `volgorde` | 1, 2, 3 … de volgorde van de taken bij deze deelnemer. |
| `taak` | `X`, `Y`, `Z`, `W` (boeking), `I1`–`I4` (informatie) of `L` (inloggen). Zet er `?` achter als je de taak hebt afgeleid. |
| `soort` | `boeking`, `informatie` of `inloggen`. |
| `weggelaten` | Het kenmerk dat in deze taak uit stond: `tekstgrootte`, `navigatie`, `contrast`, `laadscherm`, `geen` of `onbekend`. |
| `tekstgrootte`, `navigatie`, `contrast`, `laadscherm` | `aan` of `uit`; volgt uit `weggelaten`. |
| `conditie_uit` | Hoe je de conditie weet: `panel` (instellingen in beeld) of `uiterlijk` (afgeleid uit wat je ziet). |
| `opdracht` | Tekst van de opdracht, of `onbekend`. |
| `opdracht_uit` | `panel`, `afgeleid` of `onbekend`. |
| `resultaat` | Wat de deelnemer geboekt of gevonden heeft. |
| `tijd_s` | Seconden van de start (site in beeld) tot "Uw afspraak is geboekt", tot het antwoord in beeld is, of tot het einde van de poging. |
| `tijd_bron` | `opname`, `stopwatch` of `app` (`taakduren.csv`). |
| `geslaagd` | `ja` of `nee`. Een boeking is alleen geslaagd als dienst, datum en tijd alle drie kloppen. |
| `reden_stop` | Leeg als de taak is afgerond, anders `opgegeven`, `tijdslimiet`, `gestopt_onderzoeker`, `storing` of `onbekend`. |
| `fouten` | Aantal verkeerde onderdelen in het eindresultaat (0–3). |
| `fouttypes` | `dienst`, `datum`, `tijd`, `stap` (volgende stap niet gevonden) of `overig`; meerdere gescheiden door `\|`. |
| `hulpvragen` | Aantal keer dat de deelnemer om hulp vroeg. |
| `frustratie`, `onzekerheid` | 1–5, gevraagd direct na de taak. |
| `geldig` | `nee` als de taak niet in de analyse mag (reden in `observaties`), anders `ja`. |
| `observaties` | Wat je zag, zonder namen. |
| `citaten` | Letterlijke uitspraken van de deelnemer. |
| `opname` | Map- of bestandsnaam van de schermopname. |
| `opname_start`, `opname_eind` | Begin en einde van de taak in de opname (m:ss). |

## `deelnemers-achtergrond.csv`

Eén regel per deelnemer.

| Kolom | Inhoud |
|---|---|
| `deelnemerscode`, `bron`, `apparaat`, `datum` | Zoals hierboven. |
| `leeftijd` | Leeftijd in jaren. |
| `smartphonegebruik` | Hoe vaak de deelnemer een smartphone gebruikt. |
| `digitale_diensten` | Hoe vaak de deelnemer online diensten gebruikt (bank, DigiD, webwinkel). |
| `online_afspraak` | Eerdere ervaring met online een afspraak maken: zelfstandig, met moeite, alleen met hulp of nooit. |
| `hulpmiddelen` | Bijvoorbeeld `leesbril`, of leeg. |
| `zoom` | Zoomniveau van het apparaat als dat is aangepast, anders `100%`. |
| `toestemming_deelname`, `toestemming_schermopname`, `toestemming_gezicht_stem` | `ja` of `nee` per onderdeel van het toestemmingsformulier. |
| `locatie` | Waar de sessie plaatsvond, in algemene termen (bijvoorbeeld `thuis`, `buurthuis`). |
| `begeleider`, `registrator` | Initialen van de onderzoekers. |
| `nagesprek_makkelijker_moeilijker` | "Welke versies van de afspraakroute vond u makkelijker of moeilijker?" |
| `nagesprek_wat_hielp` | "Wat hielp u daarbij?" |
| `nagesprek_houden` | "Welke aanpassing zou u zelf willen houden?" |
| `nagesprek_wachten` | "Was er iets onduidelijk tijdens het wachten tussen schermen?" |
| `nagesprek_overig` | Overige opmerkingen uit het nagesprek. |
| `opmerkingen` | Opmerkingen van de onderzoekers. |

## `toestemmingsformulier.md`

Een voorbeeld van een toestemmingsformulier. Vul de gegevens tussen haken in en pas de bewaartermijn aan aan je eigen afspraken.
