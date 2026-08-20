# Claim- und Evidenzmatrix

Produkt- und Marketingaussagen dürfen erst als absolute Zusage veröffentlicht
werden, wenn die angegebene Evidenz vorliegt und Product, Operations sowie Legal
den Status freigegeben haben.

| Aussage | Erforderliche Evidenz | Aktueller freigegebener Wortlaut |
|---|---|---|
| OEM-Trefferquote | Blind gelabeltes Händler-Dataset, Top-1/Top-3 und False-Auto-Approve | Zielwert oder interne Testgröße, direkt am Wert gekennzeichnet |
| Antwortzeit | 30 Tage p50/p95 aus Produktion | Keine feste Sekundenzahl; „schneller zum Angebot“ |
| Retourenquote | Händlerkohorte mit Baseline und Zeitraum | Keine garantierte Quote; „messbar senken“ |
| Verfügbarkeit | Gemessene Verfügbarkeit, Messmethode und freigegebene SLA-Anlage | Keine Prozentzusage ohne individuellen Vertrag |
| Mandantentrennung | Non-owner-DB-User, fail-closed RLS, Zwei-Tenant-Suite und Pentest | „tenant-gescopt“, keine absolute Fail-closed-Aussage |
| TSE / DSFinV-K / GoBD | Zertifizierte TSE-Anbindung, Standardvalidatoren und externe Steuerfreigabe | „technisch vorbereitet“ / „GoBD-orientiert“ |
| Backup / Restore | Verschlüsseltes Off-Site-Backup und protokollierter Restore-Drill | Automatisierung vorbereitet; Off-Site erst nach Einrichtung und Drill |
| B2B-Portal | Erfolgreicher TLS-/Smoke-Test der veröffentlichten Domain | „Pilot / Freischaltung im Onboarding“, kein Live-Domain-Claim |

Jede Änderung an einem dieser Claims muss in derselben Änderung die Evidenz oder
den qualifizierenden Wortlaut aktualisieren.
