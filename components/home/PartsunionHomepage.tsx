import Link from 'next/link';
import '@/app/home-upgrade.css';
import {
  ArrowRight,
  Check,
  FileText,
  MessageCircle,
  PackageSearch,
  ShoppingCart,
  Users,
  WalletCards,
  Warehouse,
  Workflow,
  ShieldCheck,
  RotateCcw,
  Smartphone,
  ScanLine,
} from 'lucide-react';
import { SystemWorkflow, MobileReturnsGraphic } from '@/components/marketing/SystemWorkflow';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { ProductPreview } from '@/components/marketing/ProductPreview';
import { AssistantGraphic, FinanceGraphic } from '@/components/marketing/WorkflowGraphics';
import {
  AudienceLinks,
  ConsultationLink,
  FAQ,
  homeFaqs,
  Implementation,
} from '@/components/marketing/Shared';

const modules = [
  {
    icon: PackageSearch,
    title: 'Automatische OE-Ermittlung',
    text: 'Fahrzeugschein auslesen, VIN decodieren und passende OE-Nummern ermitteln. Fahrzeug, Teilebedarf und Ergebnis bleiben miteinander verbunden.',
    href: '/loesungen/oe-ermittlung',
    link: 'OE-Ermittlung verstehen',
  },
  {
    icon: ShoppingCart,
    title: 'Verkaufen und beschaffen',
    text: 'Anfrage, Angebot, Auftrag und Einkauf bauen aufeinander auf. Dein Team erkennt, was verfügbar ist und was noch bestellt werden muss.',
    href: '/loesungen/angebot-auftrag',
    link: 'Verkauf und Einkauf',
  },
  {
    icon: Warehouse,
    title: 'Lager und Warenwirtschaft',
    text: 'Bestände, Reservierungen und Lagerplätze für Neuware. Zustand, Fotos und Herkunft für gebrauchte Teile. Immer mit Bezug zu Einkauf und Verkauf.',
    href: '/loesungen/bestand-lager',
    link: 'Warenwirtschaft ansehen',
  },
  {
    icon: FileText,
    title: 'Belege und Buchhaltung',
    text: 'Aufträge in Rechnungen weiterführen, Eingangsbelege bearbeiten und Buchungsdaten für die Übergabe vorbereiten.',
    href: '/buchhaltung-banking',
    link: 'Belege und Buchungen',
  },
  {
    icon: WalletCards,
    title: 'Banking und Zahlungen',
    text: 'Bankumsätze mit offenen Belegen abgleichen. Beträge, Zuordnungen und Abweichungen im Zusammenhang prüfen.',
    href: '/buchhaltung-banking#banking',
    link: 'Zahlungen zuordnen',
  },
  {
    icon: WalletCards,
    title: 'Kassensystem für die Theke',
    text: 'Artikel, Kunde, Verkauf und Zahlung in einem Ablauf. Die Kasse arbeitet mit demselben Bestand wie dein Team im Büro und Lager.',
    href: '/loesungen/finanzen-kasse',
    link: 'Kasse und Thekenverkauf',
  },
  {
    icon: RotateCcw,
    title: 'Retouren und Reklamationen',
    text: 'Rückläufer automatisch dem ursprünglichen Vorgang zuordnen und die Bearbeitung steuern. Prüfung, Warenbewegung und Gutschrift bleiben nachvollziehbar.',
    href: '/loesungen/retouren',
    link: 'Rückabwicklung automatisieren',
  },
  {
    icon: Smartphone,
    title: 'Partsunion Mobile App',
    text: 'Informationen direkt an der Ware erfassen und mobil auf Vorgänge zugreifen. Dein Team arbeitet unterwegs mit derselben Plattform weiter.',
    href: '/loesungen/haendler-app',
    link: 'Die Mobile App entdecken',
  },
  {
    icon: Users,
    title: 'Betriebsassistent & dynamische Maskenöffnung',
    text: 'Der Assistent kennt die verbundenen Betriebsdaten, beantwortet Fragen und öffnet dynamisch die passende Maske für den nächsten Arbeitsschritt.',
    href: '/betriebsassistent',
    link: 'Den Betrieb im Blick behalten',
  },
];

export function PartsunionHomepage() {
  return (
    <div className="mk hu-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: homeFaqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />
      <section className="hu-hero">
        <div className="mk-wrap">
          <div className="hu-hero-grid">
            <div>
              <p className="mk-kicker">Die All-in-One-Plattform für Autoteilehändler</p>
              <h1>
                Dein Teilehandel.
                <br />
                <span>
                  Alles verbunden.
                  <br />
                  Ein System.
                </span>
              </h1>
              <p className="mk-copy">
                Vom Fahrzeugschein zum passenden Teil. Von der Anfrage bis zur Zahlung. Partsunion
                automatisiert deine Abläufe und verbindet automatische OE-Ermittlung, WhatsApp-Bot,
                ERP, Warenwirtschaft und Kasse in einem System.
              </p>
              <div className="mk-actions">
                <ConsultationLink />
                <a href="#oe-ermittlung" className="mk-link">
                  So greift alles ineinander <ArrowRight aria-hidden="true" />
                </a>
              </div>
              <p className="hu-hero-note">
                <Check aria-hidden="true" /> Persönliches Beratungsgespräch · ca. 30 Minuten ·
                unverbindlich
              </p>
            </div>
            <SystemWorkflow />
          </div>
          <div className="hu-hero-bottom">
            <a href="#oe-ermittlung">
              <ScanLine aria-hidden="true" /> Fahrzeugschein → VIN → OE{' '}
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="#warenwirtschaft">
              <Workflow aria-hidden="true" /> ERP, WaWi & Kasse <ArrowRight aria-hidden="true" />
            </a>
            <a href="#whatsapp">
              <MessageCircle aria-hidden="true" /> WhatsApp & Betriebsassistent{' '}
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="oe-ermittlung" className="mk-section sw-oe-section">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Automatische OE-Ermittlung · von Anfang an verbunden</p>
              <h2>
                Der Fahrzeugschein ist der Anfang.
                <br />
                Das passende Teil der nächste Schritt.
              </h2>
            </div>
            <div>
              <p className="mk-copy">
                Partsunion liest Fahrzeugdaten aus dem Fahrzeugschein, decodiert die VIN und
                ermittelt OE-Nummern anhand von Fahrzeug, Teilebedarf und Katalogdaten. Das Ergebnis
                fließt direkt in den nächsten Arbeitsbereich – ohne dieselben Angaben erneut
                einzutippen.
              </p>
              <Link href="/loesungen/oe-ermittlung" className="mk-link">
                Die automatische OE-Ermittlung im Detail <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="sw-facts">
            <div>
              <strong>
                56<span> Marken</span>
              </strong>
              <p>Nutzungsrechte für unsere Fahrzeug- und Teileidentifikation.</p>
            </div>
            <div>
              <strong>
                80<span> %</span>
              </strong>
              <p>der weltweiten VINs können wir decodieren.</p>
            </div>
            <div>
              <strong>
                1<span> durchgängiger Ablauf</span>
              </strong>
              <p>Fahrzeug, OE-Ergebnis, Artikel und Auftrag bleiben verknüpft.</p>
            </div>
          </div>
          <p className="sw-facts-note">
            VIN-Abdeckung beschreibt die Decodierung. Die eindeutige OE-Zuordnung hängt von
            Fahrzeug, Teilebedarf und verfügbaren Katalogdaten ab. Bei offenen Varianten fragt das
            System gezielt nach.
          </p>
        </div>
      </section>

      <section id="warenwirtschaft" className="mk-section mk-paper">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">ERP, Warenwirtschaft & Automatisierung</p>
              <h2>
                Arbeitsbereiche, die
                <br />
                miteinander weiterdenken.
              </h2>
            </div>
            <p className="mk-copy">
              Eine Anfrage wird zum Angebot. Ein Auftrag reserviert Ware. Die Rechnung führt zur
              Zahlung. Partsunion verbindet deine Prozessketten auf einer gemeinsamen Datenbasis –
              bis zu Retoure und Reklamation.
            </p>
          </div>
          <div className="hu-modules">
            {modules.map(({ icon: Icon, title, text, href, link }) => (
              <article className="hu-module" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={href} className="mk-link">
                  {link}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <div id="produkt" className="hu-product-area">
            <div className="hu-section-head">
              <h3>Dein System. In echten Produktansichten.</h3>
              <p className="mk-small">
                Wähle einen Arbeitsbereich. Die Ansichten zeigen das Produkt mit Beispieldaten und
                lassen sich vergrößern.
              </p>
            </div>
            <ProductPreview />
          </div>
          <div className="mk-actions">
            <Link href="/plattform" className="mk-link">
              Die ganze Plattform entdecken <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/features" className="mk-link">
              Alle Funktionen im Detail <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/automatisierung-autoteilehandel" className="mk-link">
              Automatisierung im Autoteilehandel <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="whatsapp" className="mk-section">
        <div className="mk-wrap">
          <div className="hu-split">
            <div>
              <span className="hu-section-label">
                <MessageCircle aria-hidden="true" /> Dein automatisierter Kundenkontakt
              </span>
              <h2>
                Deine Kunden bleiben bei WhatsApp.
                <br />
                Die Anfrage kommt im System an.
              </h2>
              <p className="mk-copy">
                Ein Foto vom Fahrzeugschein, eine Sprachnachricht, „habt ihr das Teil?“: So beginnt
                euer Alltag. Der Partsunion-Bot beantwortet Anfragen automatisch und macht daraus
                einen vollständigen Vorgang, mit dem dein Team direkt weiterarbeiten kann.
              </p>
              <Link href="/whatsapp-bot" className="mk-link">
                Den WhatsApp-Bot kennenlernen <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="hu-list">
              <div>
                <span>01</span>
                <div>
                  <h3>Anfragen automatisch beantworten</h3>
                  <p>
                    Der Kunde schreibt im vertrauten Chat. Fahrzeug, gesuchtes Teil und mitgesendete
                    Medien werden in der Anfrage zusammengeführt. Der Bot klärt fehlende Angaben
                    und antwortet automatisch.
                  </p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Fahrzeugschein auslesen. OE automatisch ermitteln.</h3>
                  <p>
                    Der Bot übergibt Fahrzeugdaten und Teilebedarf an die automatische
                    OE-Ermittlung. Unklare Ausführungen werden gezielt abgefragt. Das Ergebnis
                    bleibt mit dem Chat verbunden und kann in Angebot und Auftrag weitergeführt
                    werden.
                  </p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <h3>Angebot senden und direkt bezahlen lassen</h3>
                  <p>
                    Artikel, Preis, Verfügbarkeit und Liefertermin gehen automatisch zurück in den
                    Chat. Partsunion erstellt das Angebot, der Kunde kann direkt bezahlen und
                    bestellen. Danach laufen Auftrag und weitere Bearbeitung im System weiter.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hu-product-area">
            <ProductPreview
              image="whatsapp-dialog"
              alt="WhatsApp-Anfrage: Kundendialog, Fahrzeugdaten und Bearbeitungsstand im Partsunion-System"
            />
          </div>
        </div>
      </section>

      <section id="betriebsassistent" className="mk-section hu-navy">
        <div className="mk-wrap hu-split">
          <div>
            <p className="mk-kicker">Dein Betriebsassistent · Wissen über Arbeitsbereiche hinweg</p>
            <h2>
              Frag deinen Betrieb.
              <br />
              Der Betriebsassistent findet den Zusammenhang.
            </h2>
            <p className="mk-copy">
              Er kennt Artikel, Bestände, Kunden, Fahrzeuge, Aufträge, Einkauf, Retouren, Umsätze,
              Forderungen und Aufgaben. Stelle deine Frage in normalen Worten und erhalte die
              Antwort aus dem gesamten verbundenen Betriebswissen.
            </p>
            <div className="hu-list">
              <div>
                <span>01</span>
                <div>
                  <h3>Das gesamte Betriebswissen im Zusammenhang</h3>
                  <p>
                    Der Assistent findet Zusammenhänge über alle verbundenen Arbeitsbereiche und
                    führt dich direkt zu den zugrunde liegenden Vorgängen.
                  </p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Dynamisch zur richtigen Maske und Aktion</h3>
                  <p>
                    Er öffnet passend zur Frage die benötigte Maske, priorisiert den nächsten
                    Schritt und bereitet die Bearbeitung direkt im richtigen Vorgang vor.
                  </p>
                </div>
              </div>
            </div>
            <Link href="/betriebsassistent" className="mk-link">
              Mehr zum Betriebsassistenten <ArrowRight aria-hidden="true" />
            </Link>
            <div className="hu-principle">
              <ShieldCheck aria-hidden="true" />
              <span>
                Berechtigungen bleiben maßgeblich. Änderungen erfolgen nach Prüfung und Freigabe.
              </span>
            </div>
          </div>
          <AssistantGraphic />
        </div>
      </section>

      <section id="finanzen" className="mk-section">
        <div className="mk-wrap hu-split">
          <FinanceGraphic />
          <div>
            <p className="mk-kicker">Buchhaltung & Banking</p>
            <h2>
              Verkauft ist gut.
              <br />
              Sauber zugeordnet ist besser.
            </h2>
            <p className="mk-copy">
              Nach dem Auftrag geht die Arbeit im Büro weiter. Partsunion verbindet Rechnungen,
              Belege und Bankumsätze, damit du Zahlungen zuordnen und Buchungsdaten nachvollziehbar
              vorbereiten kannst.
            </p>
            <div className="hu-list">
              <div>
                <span>01</span>
                <div>
                  <h3>Belege am Vorgang halten</h3>
                  <p>
                    Rechnungen, Gutschriften und Eingangsbelege mit Bezug zu Kunden, Lieferanten und
                    Aufträgen bearbeiten.
                  </p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Zahlungen abgleichen</h3>
                  <p>
                    Bankumsätze mit offenen Belegen vergleichen, Zuordnungen bestätigen und
                    Abweichungen prüfen.
                  </p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <h3>Die Buchhaltung vorbereiten</h3>
                  <p>
                    Buchungsdaten und Belege für die Übergabe zusammenstellen. Konten, Importwege
                    und Exporte stimmen wir auf deinen Betrieb ab.
                  </p>
                </div>
              </div>
            </div>
            <Link href="/buchhaltung-banking" className="mk-link">
              Buchhaltung und Banking ansehen <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="retouren-mobile" className="mk-section hu-navy">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Mobile App · Retouren · Reklamationen</p>
              <h2>
                Auch nach dem Verkauf.
                <br />
                Auch abseits des Schreibtischs.
              </h2>
            </div>
            <p className="mk-copy">
              Ein Rückläufer gehört zum ursprünglichen Verkauf. Ein Foto gehört zum betroffenen
              Artikel. Partsunion automatisiert die Bearbeitung von Retouren und Reklamationen und
              hält Informationen dort zusammen, wo dein Team sie braucht – auch in der Mobile App.
            </p>
          </div>
          <MobileReturnsGraphic />
          <div className="mk-actions">
            <Link href="/loesungen/retouren" className="mk-link">
              Retouren und Reklamationen <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/loesungen/haendler-app" className="mk-link">
              Partsunion Mobile App <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section mk-paper hu-audiences">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Dein Sortiment bestimmt den Ablauf</p>
              <h2>
                Neuteile. Gebrauchtteile.
                <br />
                Oder beides.
              </h2>
            </div>
            <p className="mk-copy">
              Neuware braucht Mengen, Beschaffung und Verfügbarkeit. Bei gebrauchten Teilen zählen
              das konkrete Gebrauchtteil, Zustand und Herkunft. Partsunion verbindet beide
              Arbeitsweisen.
            </p>
          </div>
          <AudienceLinks />
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-section-intro">
            <div>
              <p className="mk-kicker">Einführung mit Plan</p>
              <h2>
                Wir starten mit deinem Betrieb.
                <br />
                Und einem Gespräch.
              </h2>
            </div>
            <div>
              <p className="mk-copy">
                Im Beratungsgespräch klären wir deine Abläufe, bestehende Programme und den
                sinnvollen Einstieg. Danach weißt du, welche Funktionen, Daten und Anbindungen für
                dich relevant sind.
              </p>
              <Link href="/einfuehrung" className="mk-link">
                So läuft die Einführung ab <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Implementation />
          <div className="mk-actions">
            <ConsultationLink />
            <Link href="/pricing" className="mk-link">
              Kosten und Leistungsumfang <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="mk-section mk-paper">
        <div className="mk-wrap mk-faq-layout">
          <div>
            <p className="mk-kicker">Vor unserem Gespräch</p>
            <h2>
              Was du noch
              <br />
              wissen möchtest.
            </h2>
            <p className="mk-copy" style={{ marginTop: 22 }}>
              Fragen zu deinem Betrieb klären wir persönlich. Diese Antworten helfen dir vorab bei
              der Einordnung.
            </p>
          </div>
          <FAQ />
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
