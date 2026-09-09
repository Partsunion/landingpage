'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import { ArrowRight, Check, Expand, X } from 'lucide-react';
import { productImages, type ProductImageId } from '@/lib/product-images';
import { track } from '@/components/layout/Analytics';

const views: { image: ProductImageId; label: string; title: string; copy: string; outcome: string }[] = [
  {
    image: 'oe-ermittlung', label: 'OE-Ermittlung', title: 'Vom Fahrzeugschein zum passenden Teil.',
    copy: 'Fahrzeugdaten auslesen, VIN decodieren, OE-Nummern ermitteln. Offene Varianten werden gezielt geklärt. Das Ergebnis bleibt für den Verkauf erhalten.',
    outcome: 'Fahrzeug und Teilebedarf nur einmal aufnehmen.',
  },
  {
    image: 'verkauf-auftrag', label: 'Verkauf & Einkauf', title: 'Ein Auftrag. Alle nächsten Schritte im Blick.',
    copy: 'Artikel, Mengen und Fehlbestände stehen direkt am Auftrag. Dein Team führt den Vorgang mit Bezug zum Kunden in Beschaffung, Lieferung und Rechnung weiter.',
    outcome: 'Vom Angebot bis zum Beleg mit denselben Daten arbeiten.',
  },
  {
    image: 'lager-artikel', label: 'Warenwirtschaft', title: 'Wissen, was da ist. Erkennen, was fehlt.',
    copy: 'OE-Nummer, Bestand, Mindestmenge und Preis stehen am Artikel. Einkauf, Reservierungen und Verkauf greifen auf die gemeinsame Warenwirtschaft zu.',
    outcome: 'Bestand und Verkauf im Zusammenhang sehen.',
  },
  {
    image: 'whatsapp-dialog', label: 'WhatsApp-Bot', title: 'Dein Kunde schreibt. Der Verkauf kommt weiter.',
    copy: 'Der Bot erfasst die Anfrage, klärt Fahrzeug und Teilebedarf und antwortet mit Preis, Verfügbarkeit und Liefertermin. Angebot und direkte Zahlung schließen an.',
    outcome: 'WhatsApp-Anfragen direkt im Betrieb weiterbearbeiten.',
  },
  {
    image: 'kasse-verkauf', label: 'Kasse & Zahlung', title: 'Die Theke ist Teil deines Systems.',
    copy: 'Kasse, Kunde, Warenkorb und Beleg arbeiten mit derselben Warenwirtschaft. Banking verbindet eingehende Zahlungen mit den offenen Belegen.',
    outcome: 'Kassen- und Zahlungsanbindungen stimmen wir für deinen Betrieb ab.',
  },
  {
    image: 'retouren-rma', label: 'Retouren', title: 'Auch der Rückweg bleibt verbunden.',
    copy: 'Rückgabe oder Reklamation dem ursprünglichen Verkauf zuordnen. Grund, Prüfung, Bestandswirkung und Gutschrift bleiben am Vorgang nachvollziehbar.',
    outcome: 'Rückläufer mit der vollständigen Vorgeschichte bearbeiten.',
  },
];

export function CampaignImage({ image, priority = false }: { image: ProductImageId; priority?: boolean }) {
  const asset = productImages[image];
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  return (
    <>
      <button className="cp-screenshot" type="button" onClick={() => dialog.current?.showModal()}
        aria-label={`${asset.title}: Systemansicht vergrößern`}>
        <Image src={`/product/${image}-1600.webp`} alt={`Partsunion mit Beispieldaten: ${asset.description}`}
          width={asset.width} height={asset.height} loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'} />
        <span className="cp-zoom"><Expand aria-hidden="true" /> Vergrößern</span>
      </button>
      <dialog ref={dialog} className="cp-image-dialog" aria-labelledby={id}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="cp-dialog-head"><strong id={id}>{asset.title} · echte Systemansicht mit Beispieldaten</strong>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Systemansicht schließen"><X /></button>
        </div>
        <div className="cp-dialog-image"><Image src={`/product/${image}.webp`} alt={asset.description} width={asset.width} height={asset.height} /></div>
      </dialog>
    </>
  );
}

export function CampaignShowcase({ initialView }: { initialView: ProductImageId }) {
  const [selected, setSelected] = useState(initialView);
  const id = useId();
  const view = views.find((item) => item.image === selected) || views[0];
  return (
    <div className="cp-showcase">
      <div className="cp-view-buttons" role="group" aria-label="Arbeitsbereich auswählen">
        {views.map((item, index) => (
          <button key={item.image} type="button" aria-pressed={selected === item.image} aria-controls={id}
            onClick={() => { setSelected(item.image); track('Campaign Product View', { view: item.image }); }}>
            <span>0{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
      <div id={id} className="cp-view-panel">
        <div className="cp-view-copy" aria-live="polite">
          <div><h3>{view.title}</h3><p>{view.copy}</p></div>
          <a href="#beratung" className="cp-text-link" data-track="Campaign Product CTA">Für meinen Betrieb ansehen <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="cp-view-screen"><CampaignImage image={view.image} /></div>
        <div className="cp-view-caption"><p><Check aria-hidden="true" />{view.outcome}</p><span>Echte Systemansicht · Beispieldaten</span></div>
      </div>
    </div>
  );
}
