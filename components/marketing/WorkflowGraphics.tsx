import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  MessageCircle,
  Paperclip,
  Send,
  Sparkles,
  UserRound,
  WalletCards,
} from 'lucide-react';

/** Illustrative customer journeys: deliberately not presented as a live product screen. */
export function WhatsAppJourney() {
  return (
    <figure
      className="wf-journey"
      aria-label="Beispiel: Aus einer WhatsApp-Nachricht wird eine strukturierte Teileanfrage für dein Team."
    >
      <div className="wf-chat">
        <div className="wf-chat-head">
          <span className="wf-whatsapp-icon">
            <MessageCircle aria-hidden="true" />
          </span>
          <div>
            <strong>Dein Teilehandel</strong>
            <span>Kundenservice über WhatsApp</span>
          </div>
          <span className="wf-example-tag">Beispiel</span>
        </div>
        <div className="wf-chat-body">
          <div className="wf-bubble wf-customer">
            Ich brauche einen Außenspiegel links für meinen Golf 7.<span>Kunde · 09:41</span>
          </div>
          <div className="wf-bubble wf-bot">
            Gerne. Schick mir bitte ein Foto vom Fahrzeugschein. Ist der Spiegel elektrisch
            anklappbar?
            <span>
              Partsunion Bot · 09:41 <Check aria-hidden="true" />
            </span>
          </div>
          <div className="wf-attachment">
            <Paperclip aria-hidden="true" />
            <div>
              <strong>Fahrzeugschein.jpg</strong>
              <span>Vom Kunden ergänzt</span>
            </div>
            <Check aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="wf-transfer">
        <span />
        <ArrowDown aria-hidden="true" />
        <p>Nachricht wird Vorgang</p>
      </div>
      <div className="wf-case">
        <div className="wf-case-head">
          <span className="wf-case-icon">
            <FileText aria-hidden="true" />
          </span>
          <div>
            <span>PARTSUNION · TEILEANFRAGE</span>
            <strong>Bereit für dein Team.</strong>
          </div>
          <span className="wf-case-number">#1042</span>
        </div>
        <dl>
          <div>
            <dt>Fahrzeug</dt>
            <dd>VW Golf 7</dd>
          </div>
          <div>
            <dt>Gesuchtes Teil</dt>
            <dd>Außenspiegel links</dd>
          </div>
          <div>
            <dt>Ausführung</dt>
            <dd>
              <span className="wf-pending">Rückfrage offen</span>
            </dd>
          </div>
        </dl>
        <div className="wf-case-foot">
          <UserRound aria-hidden="true" />
          <span>Originalnachricht und Fahrzeugdaten bleiben zusammen.</span>
        </div>
      </div>
      <figcaption>Ablaufbeispiel · Angaben und fachliche Zuordnung werden geprüft.</figcaption>
    </figure>
  );
}

export function AssistantGraphic() {
  return (
    <figure
      className="wf-assistant"
      aria-label="Beispiel: Der Betriebsassistent findet offene Vorgänge und bereitet einen nächsten Arbeitsschritt vor."
    >
      <div className="wf-assistant-top">
        <span>
          <Sparkles aria-hidden="true" /> Betriebsassistent
        </span>
        <span>Ablaufbeispiel</span>
      </div>
      <p className="wf-question">„Welche Aufträge brauchen heute meine Aufmerksamkeit?“</p>
      <div className="wf-answer">
        <p>Hier lohnt sich ein Blick:</p>
        <div className="wf-task">
          <span className="wf-task-dot" />
          <div>
            <strong>Auftrag 1042</strong>
            <span>Eine Position ist noch nicht verfügbar.</span>
          </div>
          <span className="wf-task-state">Fehlmenge</span>
        </div>
        <div className="wf-task">
          <span className="wf-task-dot blue" />
          <div>
            <strong>Auftrag 1049</strong>
            <span>Die Antwort zur Ausführung fehlt.</span>
          </div>
          <span className="wf-task-state">Rückfrage</span>
        </div>
        <div className="wf-proposal">
          <span>Nächster möglicher Schritt</span>
          <strong>
            Rückfrage an den Kunden vorbereiten <ArrowRight aria-hidden="true" />
          </strong>
          <p>Du prüfst den Vorschlag. Änderungen brauchen deine Freigabe.</p>
        </div>
      </div>
      <figcaption>Fragen stellen. Zusammenhänge verstehen. Geprüft weiterarbeiten.</figcaption>
    </figure>
  );
}

export function FinanceGraphic() {
  return (
    <figure
      className="wf-finance"
      aria-label="Beispiel für den Abgleich einer Rechnung mit einem Bankeingang und die Vorbereitung der Buchhaltung."
    >
      <div className="wf-finance-title">
        <span>VOM BELEG ZUR ZUORDNUNG</span>
        <span>Beispiel</span>
      </div>
      <div className="wf-finance-doc">
        <FileText aria-hidden="true" />
        <div>
          <span>Ausgangsrechnung · RE-1042</span>
          <strong>248,00 €</strong>
          <p>Werkstatt Müller · Auftrag 1042</p>
        </div>
      </div>
      <div className="wf-finance-link">
        <span />
        <ArrowDown aria-hidden="true" />
        <span>Mit Bankumsatz abgleichen</span>
      </div>
      <div className="wf-finance-bank">
        <WalletCards aria-hidden="true" />
        <div>
          <span>Zahlungseingang</span>
          <strong>+ 248,00 €</strong>
          <p>Verwendungszweck: RE-1042</p>
        </div>
        <span className="wf-match">Betrag passt</span>
      </div>
      <div className="wf-finance-review">
        <Check aria-hidden="true" />
        <p>
          <strong>Zuordnung prüfen und bestätigen.</strong>
          <span>Teilzahlungen und Abweichungen bleiben sichtbar.</span>
        </p>
      </div>
      <figcaption>
        <Send aria-hidden="true" /> Belege und Buchungsdaten für die weitere Bearbeitung
        vorbereiten.
      </figcaption>
    </figure>
  );
}
