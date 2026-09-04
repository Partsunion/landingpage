'use client';
import Image from 'next/image';
import { useId, useRef, useState, type CSSProperties } from 'react';
import { Expand, X } from 'lucide-react';
import { productImages, type ProductImageId } from '@/lib/product-images';

const views: ProductImageId[] = [
  'verkauf-auftrag',
  'lager-artikel',
  'whatsapp-dialog',
  'assistent-arbeitsablaeufe',
  'rechnungen-uebersicht',
  'banking-abgleich',
];
export function ProductPreview({
  image,
  alt,
  compact = true,
}: {
  image?: ProductImageId;
  alt?: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const key = image || views[active];
  const asset = productImages[key];
  const view = { name: asset.title, src: `/product/${key}.png`, text: alt || asset.description };
  const portrait = asset.height > asset.width;
  return (
    <div
      className={`mk-product ${portrait ? 'mk-product-portrait' : ''}`}
      style={{ '--product-focus': asset.focus } as CSSProperties}
      data-product-image={key}
    >
      {!image && (
        <div className="mk-product-tabs" role="group" aria-label="Produktbereich auswählen">
          {views.map((item, index) => (
            <button
              key={item}
              type="button"
              aria-pressed={active === index}
              aria-controls={id}
              onClick={() => setActive(index)}
            >
              {productImages[item].title}
            </button>
          ))}
        </div>
      )}
      <div id={id}>
        <button
          type="button"
          className={`mk-product-image ${compact ? 'mk-product-short' : ''}`}
          aria-label={`${view.name}: Produktansicht vergrößern`}
          onClick={() => dialog.current?.showModal()}
        >
          <picture>
            <source
              type="image/webp"
              srcSet={
                asset.width > 1600
                  ? `${view.src.replace(/\.png$/, '-1600.webp')} 1600w, ${view.src.replace(/\.png$/, '.webp')} ${asset.width}w`
                  : `${view.src.replace(/\.png$/, '.webp')} ${asset.width}w`
              }
              sizes={
                portrait
                  ? '(max-width: 640px) 90vw, 560px'
                  : '(max-width: 640px) 760px, (max-width: 1400px) 90vw, 1280px'
              }
            />
            <Image
              src={view.src.replace(/\.png$/, '.webp')}
              alt={`Partsunion-Demosystem: ${asset.description}`}
              width={asset.width}
              height={asset.height}
            />
          </picture>
          <span className="mk-product-zoom">
            <Expand aria-hidden="true" /> Ansicht vergrößern
          </span>
        </button>
        <div className="mk-product-caption">
          <p>
            <strong>{!image && `${view.name}. `}</strong>
            {view.text}
          </p>
          <span className="mk-small">
            Echte Produktansicht
            <br />
            Beispieldaten
          </span>
        </div>
      </div>
      <dialog
        className={`mk-dialog ${portrait ? 'mk-dialog-portrait' : ''}`}
        ref={dialog}
        aria-labelledby={`${id}-title`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="mk-dialog-head">
          <span id={`${id}-title`}>{view.name} · Demosystem</span>
          <button
            type="button"
            autoFocus
            aria-label="Produktansicht schließen"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <div className="mk-dialog-scroll">
          <Image src={view.src} alt={view.text} width={asset.width} height={asset.height} />
        </div>
        <p className="mk-small" style={{ padding: '12px 22px' }}>
          Auf kleinen Bildschirmen kannst du die Ansicht seitlich verschieben.
        </p>
      </dialog>
    </div>
  );
}
