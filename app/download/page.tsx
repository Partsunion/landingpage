import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, Clock3, Download, LifeBuoy, Monitor } from 'lucide-react';
import { DesktopDownloads } from '@/components/download/DesktopDownloads';
import './download.css';

export const metadata: Metadata = {
  title: 'Desktop-App für Windows und Mac herunterladen',
  description: 'Dein Arbeitsplatz für den Teilehandel: Partsunion Desktop für Windows und macOS herunterladen. Mit Installationshilfe und Zugang für dein Händlerkonto.',
  alternates: { canonical: 'https://partsunion.de/download' },
  openGraph: { title: 'Partsunion für Windows und Mac', description: 'Desktop-App herunterladen, mit deinem Händlerkonto anmelden und loslegen.', url: 'https://partsunion.de/download', type: 'website', locale: 'de_DE', siteName: 'Partsunion', images: ['/opengraph-image'] },
};

export default function DownloadPage() {
  return (
    <div className="mk dl-page"><div className="mk-wrap">
      <section className="dl-hero">
        <div>
          <p className="mk-kicker">Partsunion Desktop</p>
          <h1>Dein Teilehandel.<br /><span>Dein Arbeitsplatz.</span></h1>
          <p className="dl-hero-copy">Angebote, Aufträge und Lager an einem Ort. Hole dir Partsunion auf deinen Windows-PC oder Mac und melde dich mit deinem Händlerkonto an.</p>
          <a href="#downloads" className="mk-button">App herunterladen <ArrowDown aria-hidden="true" /></a>
          <p className="dl-hero-note"><Monitor aria-hidden="true" />Für Windows und macOS</p>
        </div>
        <div className="dl-brand-panel" aria-label="Partsunion Desktop für deinen Betrieb">
          <div className="dl-window-bar"><span /><span /><span /><p>PARTSUNION DESKTOP</p></div>
          <div className="dl-brand-content"><Image src="/brand/partsunion-desktop.svg" width={88} height={88} alt="" priority /><strong>partsunion</strong><p>Alles für deinen nächsten Auftrag.</p></div>
          <div className="dl-workspaces"><span><Check aria-hidden="true" />Verkauf</span><span><Check aria-hidden="true" />Lager</span><span><Check aria-hidden="true" />Finanzen</span></div>
        </div>
      </section>
      <DesktopDownloads />
      <section className="dl-setup" aria-labelledby="setup-title">
        <div className="dl-section-heading"><div><p className="mk-kicker">Dein Einstieg</p><h2 id="setup-title">In drei Schritten startklar.</h2></div><Link href="/contact" className="dl-text-link"><LifeBuoy aria-hidden="true" />Hilfe bei der Einrichtung</Link></div>
        <ol className="dl-steps">
          <li><span className="dl-step-number">01</span><h3>App herunterladen</h3><p>Wähle oben Windows oder deinen Mac-Prozessor. Du brauchst eine Internetverbindung und dein Partsunion-Händlerkonto.</p></li>
          <li><span className="dl-step-number">02</span><h3>Partsunion installieren</h3><p>Unter Windows öffnest du die MSI-Datei und folgst dem Installer. Auf dem Mac öffnest du die DMG-Datei und ziehst Partsunion in „Programme“.</p></li>
          <li><span className="dl-step-number">03</span><h3>Mit deinem Konto anmelden</h3><p>Starte Partsunion und nutze die Zugangsdaten deines Betriebs. Deine verfügbaren Arbeitsbereiche werden über dein Konto freigeschaltet.</p></li>
        </ol>
      </section>
      <section className="dl-demo" aria-labelledby="demo-title"><div className="dl-demo-icon"><Clock3 aria-hidden="true" /></div><div><p className="mk-kicker">Partsunion kennenlernen</p><h2 id="demo-title">Erst ausprobieren. Dann entscheiden.</h2><p>Wir richten dir einen persönlichen Demozugang für deinen Betrieb ein. Für Demo und Kundenkonto verwendest du dieselbe Desktop-App. Die vereinbarte Testdauer besprechen wir mit dir.</p></div><Link href="/beratung" className="mk-button" data-track="Consultation CTA">Demo anfragen <ArrowRight aria-hidden="true" /></Link></section>
      <section className="dl-faq" aria-labelledby="download-help"><div><p className="mk-kicker">Gut zu wissen</p><h2 id="download-help">Fragen zum Download.</h2><p>Deine Frage ist noch offen?<br /><Link href="/contact" className="dl-text-link">Sprich mit uns <ArrowRight aria-hidden="true" /></Link></p></div><div className="dl-questions">
        <details><summary>Welchen Mac-Download brauche ich?</summary><p>Öffne das Apple-Menü und wähle „Über diesen Mac“. Steht dort bei „Chip“ ein Apple-Chip der M-Serie, wähle „Mac mit Apple Chip“. Steht dort bei „Prozessor“ Intel, wähle den Intel-Download.</p></details>
        <details><summary>Kann ich Partsunion im Browser benutzen?</summary><p>Dein Händlerarbeitsplatz ist die Desktop-App. Lade sie für deinen Computer herunter und melde dich dort an. Diese Website hilft dir beim Einstieg und beim Download.</p></details>
        <details><summary>Brauche ich für die Demo eine andere App?</summary><p>Nein. Du erhältst einen persönlichen Demozugang und meldest dich damit in derselben Desktop-App an. Ein Demozugang wird von unserem Team für deinen Betrieb eingerichtet.</p></details>
        <details><summary>Wie bekomme ich Updates?</summary><p>Die Desktop-App prüft, ob eine neue Version verfügbar ist, und führt dich durch die Aktualisierung. Du kannst die aktuell veröffentlichte Version auch über diese Seite herunterladen.</p></details>
        <details><summary>Mein Download startet nicht. Was kann ich tun?</summary><p>Prüfe deine Internetverbindung und lade die Verfügbarkeit mit „Erneut prüfen“ neu. Ist für deinen Computer noch keine Version verfügbar, kontaktiere uns. Teile uns bei einer Fehlermeldung dein Betriebssystem und den Wortlaut mit.</p></details>
      </div></section>
      <div className="dl-bottom-note"><Download aria-hidden="true" /><p>Dein Zugang kommt von deinem Betrieb oder unserem Team. Der Download allein legt kein Konto an.</p></div>
    </div></div>
  );
}
