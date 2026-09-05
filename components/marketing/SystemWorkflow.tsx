import '@/app/system-workflow.css';
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileScan,
  Layers3,
  MessageCircle,
  PackageSearch,
  ScanLine,
  ShoppingCart,
  WalletCards,
} from 'lucide-react';

/** A readable process illustration, not a fabricated application screenshot. */
export function SystemWorkflow() {
  return (
    <figure
      className="sw-system"
      aria-label="Ablaufbeispiel: Fahrzeugschein auslesen, VIN decodieren, OE-Nummer automatisch ermitteln, Angebot erstellen, Liefertermin senden und den Kunden direkt bezahlen lassen."
    >
      <div className="sw-top">
        <span>
          <Layers3 aria-hidden="true" /> PARTSUNION
        </span>
        <span>Ein verbundener Ablauf</span>
      </div>
      <div className="sw-inputs">
        <span>
          <MessageCircle aria-hidden="true" /> WhatsApp
        </span>
        <span>Theke</span>
        <span>Telefon & E-Mail</span>
      </div>
      <div className="sw-document">
        <div className="sw-paper" aria-hidden="true">
          <span>ZULASSUNGSBESCHEINIGUNG</span>
          <b>Teil I</b>
          <div>
            <i>E</i>
            <span>VIN / Fahrgestellnummer</span>
          </div>
          <div>
            <i>D.1</i>
            <span>Fahrzeughersteller</span>
          </div>
          <div>
            <i>D.2</i>
            <span>Typ · Variante · Version</span>
          </div>
          <span className="sw-scan-line" />
        </div>
        <div className="sw-extraction">
          <span className="sw-step-label">01 · DOKUMENT ERKENNEN</span>
          <strong>
            Fahrzeugschein rein.
            <br />
            Fahrzeugdaten da.
          </strong>
          <p>
            <FileScan aria-hidden="true" /> Automatisch ausgelesen
          </p>
        </div>
      </div>
      <div className="sw-connector">
        <ArrowDown aria-hidden="true" />
        <span>Daten bleiben am Vorgang</span>
      </div>
      <div className="sw-identification">
        <div>
          <ScanLine aria-hidden="true" />
          <span className="sw-step-label">02 · FAHRZEUG</span>
          <strong>VIN decodieren</strong>
          <p>Fahrzeug & Ausführung</p>
        </div>
        <ArrowRight className="sw-middle-arrow" aria-hidden="true" />
        <div>
          <PackageSearch aria-hidden="true" />
          <span className="sw-step-label">03 · TEILEBEZUG</span>
          <strong>OE automatisch ermitteln</strong>
          <p>Teilebedarf & Katalogdaten</p>
        </div>
      </div>
      <div className="sw-check">
        <Check aria-hidden="true" />
        <span>Eindeutig? Weiter im Ablauf. Unklar? Gezielte Rückfrage.</span>
      </div>
      <div className="sw-platform">
        <div>
          <Layers3 aria-hidden="true" />
          <strong>Im System geht der Vorgang automatisch weiter.</strong>
        </div>
        <div className="sw-areas">
          <span>
            <ShoppingCart aria-hidden="true" /> Angebot automatisch erstellt
          </span>
          <span>
            <MessageCircle aria-hidden="true" /> Preis & Liefertermin gesendet
          </span>
          <span>
            <WalletCards aria-hidden="true" /> Direkt bezahlen & bestellen
          </span>
          <span>
            <PackageSearch aria-hidden="true" /> Auftrag & Beschaffung weiter
          </span>
        </div>
        <p>
          <Layers3 aria-hidden="true" /> ERP, Warenwirtschaft, Kasse, Belege und Retouren bleiben
          verbunden
        </p>
      </div>
      <figcaption>
        Vereinfachtes Ablaufbeispiel · abhängig von Datenlage und eingerichteten Anbindungen
      </figcaption>
    </figure>
  );
}

export function MobileReturnsGraphic() {
  return (
    <figure
      className="sw-after"
      aria-label="Beispiel: Ein beschädigtes Teil wird mobil dokumentiert und im Retourenprozess mit dem ursprünglichen Auftrag verknüpft."
    >
      <div className="sw-phone">
        <div className="sw-phone-notch" />
        <span>PARTSUNION MOBILE</span>
        <h3>
          Direkt am Teil.
          <br />
          Direkt im Vorgang.
        </h3>
        <div className="sw-phone-camera">
          <ScanLine aria-hidden="true" />
          <span>Artikel zuordnen</span>
        </div>
        <div className="sw-phone-row">
          <Check aria-hidden="true" />
          <span>Foto dokumentiert</span>
        </div>
        <div className="sw-phone-row">
          <Check aria-hidden="true" />
          <span>Mit Auftrag verknüpft</span>
        </div>
        <div className="sw-phone-action">
          Im Team weiterbearbeiten <ArrowRight aria-hidden="true" />
        </div>
      </div>
      <div className="sw-return-flow">
        <span className="mk-kicker">Derselbe Vorgang geht weiter</span>
        {[
          'Retoure oder Reklamation aufnehmen',
          'Ware, Grund und Nachweise zuordnen',
          'Prüfung und Rückabwicklung steuern',
          'Bestand und Gutschrift weiterführen',
        ].map((text, i) => (
          <div key={text}>
            <span>0{i + 1}</span>
            <strong>{text}</strong>
          </div>
        ))}
        <p>Ablaufbeispiel · die fachliche Entscheidung bleibt beim berechtigten Team.</p>
      </div>
    </figure>
  );
}
