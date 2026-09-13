import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "ERP & Automatisierung für den Autoteilehandel",
  description: "Dein Teilehandel in einem System: OE-Ermittlung, Angebote, Einkauf, Lager, Kasse, Buchhaltung und WhatsApp-Automatisierung.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
