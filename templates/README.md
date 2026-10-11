# Sjablonen

Lege sjablonen voor wie het onderzoek uitvoert. Gebruik alleen deelnemerscodes (D01–D100), nooit namen. Alle CSV-bestanden gebruiken `;` als scheidingsteken, net als de bestanden die de app zelf maakt.

## `sessieregistratie.csv`

Eén regel per taak, dus vijftien regels per deelnemer.

| Kolom | Inhoud |
|---|---|
| `deelnemerscode` | Bijvoorbeeld `D07`. |
| `apparaat` | `Smartphone` of `Desktop`. |
| `taak` | `T01` tot en met `T15`, zoals in `public/deelnemers.csv`. |
| `soort` | `boeking` of `informatie`. |
| `paar` | `1`–`6` bij een boeking, leeg bij een informatieopdracht. |
| `variant` | `A` of `B` bij een boeking, leeg bij een informatieopdracht. |
| `opdracht` | `X`, `Y`, `Z`, `W` of `I1`–`I5`. |
| `tijd_s` | Duur in seconden. Neem de waarde uit `taakduren.csv` over, of de handmatig gemeten stoptijd als de taak is afgebroken. |
| `geslaagd` | `ja` als de deelnemer de taak zelfstandig binnen 3 minuten afrondde, anders `nee`. |
| `reden_stop` | Bij `nee`: `tijdgrens`, `opgegeven` of `storing`. |
| `fouten` | Aantal fouten: verkeerde dienst, datum of tijd, verkeerde stap, onterechte of herhaalde bevestiging. |
| `hulpvragen` | Aantal keer dat de deelnemer om hulp vroeg. |
| `frustratie` | 1–5. |
| `onzekerheid` | 1–5. |
| `geldig` | `nee` bij een technische storing of als de opgeslagen tijd niet klopt, anders `ja`. |
| `observaties` | Korte notities en citaten, zonder namen. |

## `deelnemers-achtergrond.csv`

Eén regel per deelnemer.

| Kolom | Inhoud |
|---|---|
| `leeftijd` | Leeftijd in jaren. |
| `smartphonegebruik` | `dagelijks`, `wekelijks`, `zelden` of `nooit`. |
| `digitale_diensten` | Hoe vaak de deelnemer online diensten gebruikt (bank, DigiD, webwinkel): `dagelijks`, `wekelijks`, `zelden` of `nooit`. |
| `online_afspraak` | Eerdere ervaring met online een afspraak maken: `zelfstandig`, `met moeite`, `alleen met hulp` of `nooit`. |
| `hulpmiddelen` | Bijvoorbeeld `leesbril`, of leeg. |
| `zoom` | Zoomniveau van het apparaat als dat is aangepast, anders `100%`. |
| `toestemming_*` | `ja` of `nee` per onderdeel van het toestemmingsformulier. |
| `datum` | Datum van de sessie (JJJJ-MM-DD). |
| `nagesprek` | Korte samenvatting van het nagesprek. |

## `toestemmingsformulier.md`

Een voorbeeld van een toestemmingsformulier. Vul de gegevens tussen haken in en pas de bewaartermijn aan aan je eigen afspraken.
