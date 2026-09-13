"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductShot, type ProductShotVariant } from "@/components/ProductShot";

const slides = [
  {
    eyebrow: "DIE ALL-IN-ONE-PLATTFORM FÜR AUTOTEILEHÄNDLER",
    title: "Dein Teilehandel. Alles verbunden. Ein System.",
    text: "Vom Fahrzeugschein zum passenden Teil, von der Anfrage bis zur Zahlung: Partsunion verbindet Verkauf, Einkauf, Lager, Kasse und Buchhaltung.",
    cta: "Partsunion entdecken",
    href: "/plattform",
    shot: "order" as ProductShotVariant,
  },
  {
    eyebrow: "SCHNELLER DAS RICHTIGE TEIL FINDEN",
    title: "Fahrzeug erkennen. OE-Nummer ermitteln. Direkt verkaufen.",
    text: "Fahrzeugschein, VIN oder HSN/TSN werden zum Startpunkt eines durchgängigen Vorgangs – ohne doppelte Eingaben und unnötige Rückfragen.",
    cta: "OE-Ermittlung ansehen",
    href: "/loesungen/oe-ermittlung",
    shot: "oe" as ProductShotVariant,
  },
  {
    eyebrow: "ANFRAGEN AUTOMATISCH VERARBEITEN",
    title: "WhatsApp-Nachrichten werden zu vollständigen Teileanfragen",
    text: "Der Partsunion Bot sammelt Fahrzeugdaten, Bilder und Teilewünsche strukturiert ein, damit dein Team direkt mit der Bearbeitung starten kann.",
    cta: "WhatsApp-Bot entdecken",
    href: "/whatsapp-bot",
    shot: "whatsapp" as ProductShotVariant,
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const move = (direction: number) => setActive((active + direction + slides.length) % slides.length);

  return (
    <section className="hero container" aria-roledescription="Karussell" aria-label="Highlights">
      <div className="hero-panel">
        <button className="slider-arrow slider-arrow-left" aria-label="Vorheriger Inhalt" onClick={() => move(-1)}><ArrowLeft /></button>
        <div className="hero-copy" key={slide.title}>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <Link className="button button-primary" href={slide.href}>{slide.cta} <ArrowRight size={16} /></Link>
        </div>
        <div className="hero-product-stage">
          <div className="hero-product-status"><i /> Live verbunden <span>01 — 07</span></div>
          <ProductShot variant={slide.shot} priority={active === 0} />
          <div className="hero-process" aria-hidden="true"><span>Anfrage</span><i /><span>Fahrzeug</span><i /><span>Auftrag</span></div>
        </div>
        <button className="slider-arrow slider-arrow-right" aria-label="Nächster Inhalt" onClick={() => move(1)}><ArrowRight /></button>
        <div className="slide-dots">
          {slides.map((item, index) => <button className={index === active ? "active" : ""} aria-label={`Slide ${index + 1}: ${item.title}`} aria-current={index === active} onClick={() => setActive(index)} key={item.title} />)}
        </div>
      </div>
    </section>
  );
}
