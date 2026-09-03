import {
    ArrowRight,
    Bot,
    Camera,
    CarFront,
    Check,
    CheckCircle2,
    CircleDollarSign,
    ClipboardCheck,
    CreditCard,
    FileCheck2,
    FileText,
    Inbox,
    MapPin,
    MessageCircle,
    PackageCheck,
    PackageSearch,
    ReceiptText,
    RotateCcw,
    ScanLine,
    SearchCheck,
    ShieldCheck,
    ShoppingCart,
    Smartphone,
    Truck,
    Warehouse,
    type LucideIcon,
} from 'lucide-react';
import type { SolutionVisual as VisualName } from '@/lib/solutions-data';

function WindowBar({ icon: Icon, title, detail, badge = 'BEISPIELVORGANG' }: { icon: LucideIcon; title: string; detail: string; badge?: string }) {
    return (
        <div className="flex min-h-12 min-w-0 items-center border-b border-[#cbd5e0] bg-[#f7f9fb] px-3 sm:px-4">
            <Icon className="h-4 w-4 shrink-0 text-[#1d6fe8]" />
            <span className="ml-2.5 min-w-0"><strong className="block truncate text-[9px] font-semibold text-[#243349]">PARTSUNION · {title}</strong><span className="block truncate text-[7px] text-[#758294]">{detail}</span></span>
            <span className="ml-auto hidden shrink-0 border border-[#bac6d3] bg-white px-2 py-1 text-[7px] font-semibold text-[#647286] sm:block">{badge}</span>
        </div>
    );
}

function InquiryEvidence() {
    return (
        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_24px_55px_rgba(26,47,75,.14)]">
            <WindowBar icon={Inbox} title="ANFRAGEN" detail="Eingang, Fachprüfung und Verkauf in einem Prozess" />
            <div className="grid min-h-[410px] sm:grid-cols-[.78fr_1.22fr]">
                <section className="border-b border-[#d2dce6] bg-[#eef3f7] p-4 sm:border-b-0 sm:border-r">
                    <div className="flex items-center gap-2 text-[7px] font-bold uppercase tracking-[.12em] text-[#6f7e90]"><MessageCircle className="h-3 w-3 text-[#22a06b]" /> Originaldialog</div>
                    <div className="mt-4 space-y-2.5 text-[8px] leading-4">
                        <div className="mr-7 border border-[#c5d1dc] bg-white p-3 text-[#435166]">Moin, brauche Bremse vorne für den Golf. Schicke Schein gleich.</div>
                        <div className="ml-8 bg-[#d8f3e4] p-3 text-[#31564a]">Alles klar. Ich prüfe Fahrzeug und passende Ausführung.</div>
                        <div className="mr-12 flex items-center gap-2 border border-[#c5d1dc] bg-white p-3"><FileText className="h-4 w-4 text-[#1d6fe8]" /><span><strong className="block">Fahrzeugschein</strong><span className="text-[7px] text-[#778596]">Dokument am Vorgang</span></span></div>
                    </div>
                    <div className="mt-5 flex items-center gap-2 border-t border-[#cbd6e0] pt-3 text-[7px] font-semibold text-[#68778a]"><span className="h-2 w-2 rounded-full bg-[#22a06b]" /> WhatsApp · heute</div>
                </section>
                <section className="p-4 sm:p-5">
                    <div className="flex items-center justify-between"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#6f7e90]">Bearbeitbarer Vorgang</span><span className="bg-[#e9f2ff] px-2 py-1 text-[7px] font-semibold text-[#155fc8]">Fahrzeugprüfung</span></div>
                    <div className="mt-4 grid grid-cols-2 gap-px border border-[#c9d4df] bg-[#c9d4df] text-[8px]">
                        {[["Kunde", "Thekenkunde"], ["Fahrzeug", "Golf VII"], ["Teilewunsch", "Bremse vorne"], ["Zuständig", "Verkauf"]].map(([label, value]) => <div key={label} className="bg-white p-3"><span className="text-[7px] text-[#7a8798]">{label}</span><strong className="mt-1 block text-[#29394d]">{value}</strong></div>)}
                    </div>
                    <div className="mt-4 border-l-2 border-[#e2a24d] bg-[#fff8ec] px-3 py-2.5 text-[8px] leading-4 text-[#66543d]"><strong className="block text-[#7a531e]">Noch zu prüfen</strong>Ausführung über Fahrzeugdaten eindeutig bestimmen.</div>
                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 text-center text-[7px] font-semibold text-[#607084]"><span className="border border-[#c7d2de] px-1 py-2">Eingang</span><ArrowRight className="h-3 w-3 text-[#8aa4c1]" /><span className="border border-[#72a7ea] bg-[#edf4fd] px-1 py-2 text-[#155fc8]">Prüfung</span><ArrowRight className="h-3 w-3 text-[#8aa4c1]" /><span className="border border-[#c7d2de] px-1 py-2">Angebot</span></div>
                </section>
            </div>
        </div>
    );
}

function OemEvidence() {
    return (
        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_24px_55px_rgba(26,47,75,.14)]">
            <WindowBar icon={ScanLine} title="OE-PRÜFKETTE" detail="Vom Fahrzeug über den Katalog bis zum verkaufsfähigen Artikel" />
            <div className="grid min-h-[420px] lg:grid-cols-[.78fr_1fr_1fr]">
                <section className="border-b border-[#d3dce5] bg-[#0e2d55] p-5 text-white lg:border-b-0 lg:border-r lg:border-white/15">
                    <div className="flex h-10 w-10 items-center justify-center border border-white/25 bg-white/10"><CarFront className="h-5 w-5 text-[#8ab9fb]" /></div>
                    <span className="mt-5 block text-[7px] font-bold uppercase tracking-[.14em] text-[#8ab9fb]">01 · Fahrzeug</span><strong className="mt-2 block text-base">Golf VII</strong><span className="mt-1 block text-[8px] text-white/55">1.6 TDI · Beispielzuordnung</span>
                    <dl className="mt-5 border-t border-white/15 text-[8px]">{[['HSN / TSN', 'vorhanden'], ['VIN', 'vorhanden'], ['Quelle', 'Fahrzeugschein']].map(([label, value]) => <div key={label} className="grid grid-cols-[75px_1fr] border-b border-white/12 py-2.5"><dt className="text-white/45">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
                    <div className="mt-5 text-[8px] leading-4 text-white/62">Fahrzeugdatenbank für 56 Marken als Ausgangspunkt der Prüfung.</div>
                </section>
                <section className="border-b border-[#d3dce5] bg-[#eef4fb] p-5 lg:border-b-0 lg:border-r">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#a9c2df] bg-white"><SearchCheck className="h-5 w-5 text-[#1d6fe8]" /></div>
                    <span className="mt-5 block text-[7px] font-bold uppercase tracking-[.14em] text-[#1d6fe8]">02 · Herstellerkatalog</span><strong className="mt-2 block text-sm text-[#25354a]">Baugruppe eingrenzen</strong>
                    <div className="mt-4 border border-[#bccbd9] bg-white p-3 text-[8px]"><span className="text-[#778596]">Bauteil</span><strong className="mt-1 block">Kühlmittelpumpe</strong></div>
                    <div className="mt-2 border border-[#e2b86e] bg-[#fff9ee] p-3 text-[8px]"><span className="font-semibold text-[#7c5921]">Variantenprüfung</span><span className="mt-1 block leading-4 text-[#74644d]">Offene Ausstattung wird sichtbar geklärt.</span></div>
                    <div className="mt-4 flex items-center gap-2 text-[7px] font-semibold text-[#2b724d]"><ShieldCheck className="h-3.5 w-3.5" /> Katalognutzung lizenziert</div>
                </section>
                <section className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#a9c2df] bg-[#edf4fd]"><PackageCheck className="h-5 w-5 text-[#1d6fe8]" /></div>
                    <span className="mt-5 block text-[7px] font-bold uppercase tracking-[.14em] text-[#1d6fe8]">03 · Artikelentscheidung</span>
                    <div className="mt-3 border-l-4 border-[#1d6fe8] bg-[#edf4fd] px-4 py-3"><span className="text-[7px] text-[#6d7b8c]">OE-Referenz · Beispiel</span><strong className="mt-1.5 block font-mono text-sm text-[#155fc8]">04L 121 011 L</strong></div>
                    <div className="mt-3 border border-[#ccd6e1] text-[8px]">{[['Fahrzeugbezug', 'geprüft'], ['Alternativen', 'vergleichbar'], ['Eigener Bestand', 'im Kontext'], ['Kondition', 'am Artikel']].map(([label, value], index) => <div key={label} className={`flex justify-between px-3 py-2.5 ${index > 0 ? 'border-t border-[#dce3ea]' : ''}`}><span className="text-[#748193]">{label}</span><strong>{value}</strong></div>)}</div>
                </section>
            </div>
        </div>
    );
}

function OrderEvidence() {
    const positions = [['Bremsscheibe vorne', 'lieferbar', '2'], ['Bremsbelagsatz', 'Fehlmenge', '1'], ['Verschleißkontakt', 'reserviert', '1']];
    return (
        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_24px_55px_rgba(26,47,75,.14)]">
            <WindowBar icon={ShoppingCart} title="VERKAUFSAUFTRAG" detail="Positionen, Deckung und Belegfluss" />
            <div className="p-4 sm:p-5">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end"><div><span className="text-[7px] font-bold uppercase tracking-[.13em] text-[#768496]">Auftrag · Beispiel</span><strong className="mt-1 block text-base text-[#243349]">Bremsanlage Golf VII</strong><span className="mt-1 block text-[8px] text-[#748193]">Aus geprüfter Anfrage und OE-Ermittlung</span></div><span className="w-fit bg-[#e9f5ed] px-3 py-2 text-[8px] font-semibold text-[#277548]">Kunde bestätigt</span></div>
                <div className="mt-5 overflow-hidden border border-[#c5d1dc]">
                    <div className="grid grid-cols-[1fr_90px_35px] bg-[#eef2f6] px-3 py-2 text-[7px] font-bold uppercase tracking-[.1em] text-[#758294]"><span>Position</span><span>Status</span><span className="text-right">Menge</span></div>
                    {positions.map(([name, status, quantity], index) => <div key={name} className={`grid grid-cols-[1fr_90px_35px] items-center px-3 py-3 text-[8px] ${index > 0 ? 'border-t border-[#d7dfe7]' : ''}`}><strong>{name}</strong><span className={status === 'Fehlmenge' ? 'font-semibold text-[#a5631a]' : 'text-[#506177]'}>{status}</span><span className="text-right font-mono font-bold">{quantity}</span></div>)}
                </div>
                <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1 text-center text-[7px] font-semibold"><span className="border border-[#bdd0e5] bg-[#edf4fd] p-2.5 text-[#155fc8]">Angebot</span><ArrowRight className="h-3 w-3 text-[#91a3b8]" /><span className="border border-[#79a9e8] bg-[#dfeeff] p-2.5 text-[#155fc8]">Auftrag</span><ArrowRight className="h-3 w-3 text-[#91a3b8]" /><span className="border border-[#c7d2de] p-2.5 text-[#5f6f82]">Lieferung</span><ArrowRight className="h-3 w-3 text-[#91a3b8]" /><span className="border border-[#c7d2de] p-2.5 text-[#5f6f82]">Zahlung</span></div>
                <div className="mt-4 flex items-center gap-2 border-l-2 border-[#e2a24d] pl-3 text-[8px] text-[#6c5a43]"><ClipboardCheck className="h-3.5 w-3.5" /> Fehlmenge bleibt am Kundenauftrag sichtbar und geht kontrolliert in die Beschaffung.</div>
            </div>
        </div>
    );
}

function ProcurementEvidence() {
    return (
        <div className="overflow-hidden border border-[#244d7a] bg-[#0b294e] text-white shadow-[0_24px_55px_rgba(10,35,68,.2)]">
            <div className="flex min-h-12 items-center border-b border-white/15 px-4"><PackageSearch className="h-4 w-4 text-[#84b6fb]" /><span className="ml-2.5"><strong className="block text-[9px]">BEDARFSPRÜFUNG</strong><span className="text-[7px] text-white/48">Herkunft, Deckung und Quelle</span></span><span className="ml-auto hidden text-[7px] font-semibold text-[#84b6fb] sm:block">NOCH NICHT BESTELLT</span></div>
            <div className="grid min-h-[410px] gap-px bg-white/15 sm:grid-cols-3">
                <section className="bg-[#0e315d] p-4"><span className="font-mono text-[8px] font-bold text-[#84b6fb]">01</span><h3 className="mt-3 text-sm font-semibold">Bedarf mit Ursprung</h3><div className="mt-4 border border-white/16 bg-white/6 p-3"><span className="text-[7px] text-white/45">Kundenauftrag</span><strong className="mt-1 block text-[9px]">Bremsbelagsatz</strong><div className="mt-3 flex justify-between text-[8px]"><span className="text-white/50">benötigt</span><strong>1</strong></div><div className="mt-1 flex justify-between text-[8px]"><span className="text-white/50">ungedeckt</span><strong className="text-[#f1bd72]">1</strong></div></div><p className="mt-4 text-[8px] leading-4 text-white/50">Auftrag und Wunschtermin bleiben an der Menge.</p></section>
                <section className="bg-[#113866] p-4"><span className="font-mono text-[8px] font-bold text-[#84b6fb]">02</span><h3 className="mt-3 text-sm font-semibold">Deckung zuerst</h3><div className="mt-4 border-y border-white/15 text-[8px]">{[['frei im Lager', '0'], ['reserviert', '0'], ['offener Zugang', '0'], ['zu beschaffen', '1']].map(([label, value], index) => <div key={label} className={`flex justify-between py-2.5 ${index > 0 ? 'border-t border-white/10' : ''}`}><span className="text-white/52">{label}</span><strong className={index === 3 ? 'text-[#f1bd72]' : ''}>{value}</strong></div>)}</div><p className="mt-4 text-[8px] leading-4 text-white/50">Vorhandene Ware und Zuläufe werden nicht doppelt bestellt.</p></section>
                <section className="bg-[#f5f8fc] p-4 text-[#23344a]"><span className="font-mono text-[8px] font-bold text-[#1d6fe8]">03</span><h3 className="mt-3 text-sm font-semibold">Bestellentwurf</h3><div className="mt-4 space-y-2 text-[8px]">{[['Quelle A', 'verfügbar · Standardlauf'], ['Quelle B', 'verfügbar · früher'], ['Eigener Transfer', 'nicht verfügbar']].map(([name, detail], index) => <div key={name} className={`border p-3 ${index === 1 ? 'border-[#69a2ea] bg-[#eaf3ff]' : 'border-[#cad5e0] bg-white'}`}><div className="flex justify-between"><strong>{name}</strong>{index === 1 && <Check className="h-3 w-3 text-[#1d6fe8]" />}</div><span className="mt-1 block text-[7px] text-[#738195]">{detail}</span></div>)}</div><div className="mt-3 bg-[#1d6fe8] px-3 py-2.5 text-center text-[8px] font-semibold text-white">Zur Freigabe vorlegen</div></section>
            </div>
        </div>
    );
}

function InventoryEvidence() {
    return (
        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_24px_55px_rgba(26,47,75,.14)]">
            <WindowBar icon={Warehouse} title="BESTAND & BEWEGUNG" detail="Mengenbestand und Einzelstücke nachvollziehbar geführt" />
            <div className="grid min-h-[410px] sm:grid-cols-[1.05fr_.95fr]">
                <section className="border-b border-[#d2dce6] p-4 sm:border-b-0 sm:border-r sm:p-5"><div className="flex items-start justify-between"><div><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#748193]">Artikelbestand</span><strong className="mt-2 block text-sm">Bremsbelagsatz vorne</strong><span className="mt-1 block font-mono text-[8px] text-[#6b7a8d]">Lagerort · A-03-02</span></div><MapPin className="h-5 w-5 text-[#1d6fe8]" /></div>
                    <div className="mt-5 grid grid-cols-2 gap-px border border-[#c7d2de] bg-[#c7d2de] text-[8px]">{[['Verfügbar', '12'], ['Reserviert', '4'], ['Im Zulauf', '8'], ['Mindestbestand', '6']].map(([label, value]) => <div key={label} className="bg-[#f7f9fb] p-3"><span className="text-[7px] text-[#768496]">{label}</span><strong className="mt-1 block text-lg text-[#20334c]">{value}</strong></div>)}</div>
                    <div className="mt-4 border border-[#bbcee4] bg-[#edf4fd] p-3 text-[8px]"><strong className="text-[#155fc8]">Einzelstückmodus</strong><span className="mt-1 block leading-4 text-[#617188]">Zustand, Herkunft, Fotos und individueller Wert folgen dem konkreten Teil.</span></div>
                </section>
                <section className="bg-[#f3f6f9] p-4 sm:p-5"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#748193]">Bewegungsjournal</span><div className="mt-4 border-l border-[#adc2d9] pl-4">{[['Wareneingang', '+ 8', 'aus Bestellung'], ['Reservierung', '− 2 frei', 'für Kundenauftrag'], ['Kommissionierung', '− 2', 'vom Lagerort'], ['Korrektur', 'prüfen', 'mit Begründung']].map(([title, value, detail], index) => <div key={title} className="relative pb-5 last:pb-0"><span className={`absolute -left-[20.5px] top-0 h-2.5 w-2.5 rounded-full border-2 border-[#f3f6f9] ${index === 3 ? 'bg-[#e2a24d]' : 'bg-[#1d6fe8]'}`} /><div className="flex justify-between text-[8px]"><strong>{title}</strong><span className={index === 3 ? 'font-semibold text-[#98601e]' : 'font-mono font-bold text-[#155fc8]'}>{value}</span></div><span className="mt-1 block text-[7px] text-[#7a8798]">{detail}</span></div>)}</div><div className="mt-5 flex items-center gap-2 border-t border-[#ced8e2] pt-3 text-[7px] text-[#647286]"><ShieldCheck className="h-3.5 w-3.5 text-[#277548]" /> Jede Änderung hat Herkunft und Bearbeitungsstand.</div></section>
            </div>
        </div>
    );
}

function ReturnEvidence() {
    const reviewSteps: Array<[LucideIcon, string, string]> = [[SearchCheck, 'Fall prüfen', 'Beleg, Fallart, Grund und Zustand'], [Warehouse, 'Bestand entscheiden', 'einlagern, sperren oder nicht übernehmen'], [ReceiptText, 'Kundenfolge entscheiden', 'Gutschrift oder Erstattung getrennt bearbeiten'], [Truck, 'Lieferant reklamieren', 'mit eigenem Status und nachvollziehbarem Bezug']];
    return (
        <div className="overflow-hidden border border-[#aebdce] bg-white shadow-[0_24px_55px_rgba(26,47,75,.14)]">
            <WindowBar icon={RotateCcw} title="RETOUREN & REKLAMATIONEN" detail="Rückgabe, Mangel und Auswirkungen getrennt geführt" />
            <div className="grid min-h-[410px] lg:grid-cols-[.9fr_1.1fr]">
                <section className="border-b border-[#d2dce6] bg-[#eef3f7] p-4 lg:border-b-0 lg:border-r sm:p-5"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#748193]">Teil am Rückgabetisch</span><div className="mt-4 flex gap-3 border border-[#c1ceda] bg-white p-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#e8f2ff]"><Camera className="h-5 w-5 text-[#1d6fe8]" /></div><div><strong className="font-mono text-[9px]">5G1 615 123 A</strong><span className="mt-1 block text-[7px] text-[#748193]">Artikelnummer erkannt</span></div></div>
                    <dl className="mt-3 border border-[#c1ceda] bg-white text-[8px]">{[['Fallart', 'Reklamation'], ['Ursprungsbeleg', 'zugeordnet'], ['Grund', 'falsch geliefert'], ['Zustand', 'zu prüfen'], ['Fotos', 'optional']].map(([label, value], index) => <div key={label} className={`flex justify-between px-3 py-2.5 ${index > 0 ? 'border-t border-[#dce3ea]' : ''}`}><dt className="text-[#758294]">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
                </section>
                <section className="p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#748193]">Prüfung & Folgen</span><span className="bg-[#fff3df] px-2 py-1 text-[7px] font-semibold text-[#8a5b1f]">Entscheidung offen</span></div><div className="mt-5 grid grid-cols-[30px_1fr] gap-x-3 gap-y-4 text-[8px]">{reviewSteps.map(([ItemIcon, title, text], index) => <div key={title} className="contents"><span className={`flex h-7 w-7 items-center justify-center border ${index === 0 ? 'border-[#6da5ed] bg-[#edf4fd] text-[#1d6fe8]' : 'border-[#c5d1dc] bg-[#f7f9fb] text-[#718094]'}`}><ItemIcon className="h-3.5 w-3.5" /></span><span className="border-b border-[#d8e0e8] pb-3"><strong className="block text-[#29394d]">{title}</strong><span className="mt-1 block text-[7px] leading-3 text-[#758294]">{text}</span></span></div>)}</div><div className="mt-5 border-l-2 border-[#1d6fe8] bg-[#edf4fd] p-3 text-[8px] leading-4 text-[#52677f]">Auch eine Reklamation bucht keinen Bestand und erzeugt nicht automatisch eine Gutschrift.</div></section>
            </div>
        </div>
    );
}

function FinanceEvidence() {
    const paymentSteps: Array<[LucideIcon, string, string]> = [[ShoppingCart, 'Auftrag', 'geprüfter Verkaufsstand'], [FileCheck2, 'Rechnung', 'Beleg erstellt'], [CreditCard, 'Zahlung', 'Zuordnung offen'], [CheckCircle2, 'Ausgleich', 'nach Zahlung vollständig']];
    return (
        <div className="overflow-hidden border border-[#274e78] bg-[#0c294d] text-white shadow-[0_24px_55px_rgba(10,35,68,.22)]">
            <div className="flex min-h-12 items-center border-b border-white/15 px-4"><CircleDollarSign className="h-4 w-4 text-[#83b5fa]" /><span className="ml-2.5"><strong className="block text-[9px]">ZAHLUNGSSTAND</strong><span className="text-[7px] text-white/45">Geschäftsvorgang, Beleg und Ausgleich</span></span></div>
            <div className="grid min-h-[410px] lg:grid-cols-[1.05fr_.95fr]">
                <section className="border-b border-white/15 p-4 lg:border-b-0 lg:border-r sm:p-5"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#83b5fa]">Bezahlungskette</span><div className="mt-5 space-y-2">{paymentSteps.map(([ItemIcon, title, detail], index) => <div key={title} className={`grid grid-cols-[32px_1fr_auto] items-center gap-3 border p-3 ${index === 2 ? 'border-[#76aaf0] bg-[#164276]' : 'border-white/14 bg-white/5'}`}><span className="flex h-8 w-8 items-center justify-center bg-white/8"><ItemIcon className="h-4 w-4 text-[#8bbafa]" /></span><span><strong className="block text-[8px]">{title}</strong><span className="mt-1 block text-[7px] text-white/43">{detail}</span></span><span className="font-mono text-[7px] text-white/45">0{index + 1}</span></div>)}</div></section>
                <section className="bg-[#f6f8fb] p-4 text-[#26364b] sm:p-5"><div className="flex items-center justify-between"><span className="text-[7px] font-bold uppercase tracking-[.12em] text-[#748193]">Offene Bearbeitung</span><ReceiptText className="h-4 w-4 text-[#1d6fe8]" /></div><div className="mt-4 border border-[#c6d2de] bg-white"><div className="border-b border-[#d7dfe7] p-3"><span className="text-[7px] text-[#748193]">Rechnung · Beispiel</span><strong className="mt-1 block text-sm">Verkauf Bremsanlage</strong></div>{[['Auftrag', 'verbunden'], ['Fälligkeit', 'sichtbar'], ['Zahlung', 'teilweise'], ['Restbetrag', 'offen']].map(([label, value], index) => <div key={label} className={`flex justify-between px-3 py-2.5 text-[8px] ${index > 0 ? 'border-t border-[#dfe5eb]' : ''}`}><span className="text-[#748193]">{label}</span><strong className={index === 3 ? 'text-[#a5631a]' : ''}>{value}</strong></div>)}</div><div className="mt-4 grid grid-cols-2 gap-2 text-[7px] font-semibold"><span className="border border-[#c7d3df] bg-white p-2.5 text-center">Zahlung zuordnen</span><span className="bg-[#1d6fe8] p-2.5 text-center text-white">Vorgang prüfen</span></div></section>
            </div>
        </div>
    );
}

function AssistantEvidence() {
    return (
        <div className="overflow-hidden border border-[#335c88] bg-[#092541] text-white shadow-[0_24px_60px_rgba(4,24,47,.26)]">
            <div className="flex min-h-12 items-center border-b border-white/14 px-4"><Bot className="h-4 w-4 text-[#87b8fb]" /><span className="ml-2.5"><strong className="block text-[9px]">BETRIEBSASSISTENT</strong><span className="text-[7px] text-white/44">Wissen, Lagebild und kontrollierte Bearbeitung</span></span><span className="ml-auto flex items-center gap-1 text-[7px] text-[#91bdf7]"><ShieldCheck className="h-3 w-3" /> Freigabe vor Änderung</span></div>
            <div className="grid min-h-[430px] lg:grid-cols-[.78fr_1.22fr]">
                <aside className="border-b border-white/14 bg-[#0d3156] p-4 lg:border-b-0 lg:border-r"><span className="text-[7px] font-bold uppercase tracking-[.13em] text-[#82b3f7]">Was willst du wissen?</span><div className="mt-4 space-y-2 text-[8px]">{['Was muss heute erledigt werden?', 'Welche Aufträge hängen fest?', 'Welche Rückgaben oder Reklamationen brauchen eine Entscheidung?', 'Wie steht der Umsatz?'].map((question, index) => <div key={question} className={`border p-3 leading-4 ${index === 1 ? 'border-[#75aaf0] bg-[#174878] text-white' : 'border-white/13 bg-white/5 text-white/62'}`}>{question}</div>)}</div><div className="mt-5 border-t border-white/12 pt-4 text-[7px] leading-4 text-white/42">Produkte · Bestand · Kunden · Aufträge · Retouren · Reklamationen · Zahlen · Aufgaben</div></aside>
                <section className="bg-[#f3f6f9] p-4 text-[#26364b] sm:p-5"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center bg-[#1d6fe8] text-white"><Bot className="h-3.5 w-3.5" /></span><span><strong className="block text-[8px]">Prüfung abgeschlossen</strong><span className="text-[7px] text-[#758294]">Antwort aus freigegebenem Betriebskontext</span></span></div><h3 className="mt-5 text-sm font-semibold">Ein Kundenauftrag wartet auf eine fehlende Position.</h3><p className="mt-2 text-[8px] leading-4 text-[#66768a]">Der vorhandene Bestand ist bereits reserviert. Ein offener Zugang deckt die benötigte Menge noch nicht vollständig.</p><div className="mt-4 border border-[#c8d4df] bg-white text-[8px]">{[['Auftrag', 'betroffen'], ['Fehlmenge', 'sichtbar'], ['Zulauf', 'berücksichtigt'], ['Nächster Schritt', 'Bestellentwurf']].map(([label, value], index) => <div key={label} className={`flex justify-between px-3 py-2.5 ${index > 0 ? 'border-t border-[#dce3ea]' : ''}`}><span className="text-[#758294]">{label}</span><strong>{value}</strong></div>)}</div><div className="mt-4 border-l-2 border-[#1d6fe8] bg-[#eaf3ff] p-3"><span className="text-[7px] font-bold uppercase tracking-[.1em] text-[#155fc8]">Vorbereitete Bearbeitung</span><strong className="mt-1 block text-[8px]">Bestellentwurf für die offene Menge anlegen</strong><div className="mt-3 flex items-center justify-between"><span className="text-[7px] text-[#6b7b8e]">Noch keine Bestellung ausgelöst</span><button type="button" className="bg-[#1d6fe8] px-3 py-2 text-[7px] font-semibold text-white">Prüfen & bestätigen</button></div></div></section>
            </div>
        </div>
    );
}

function MobileEvidence() {
    return (
        <div className="relative overflow-hidden border border-[#9fb5ce] bg-[#dfe9f5] shadow-[0_24px_55px_rgba(26,47,75,.16)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(35,86,145,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(35,86,145,.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative grid min-h-[460px] items-center gap-5 p-4 sm:grid-cols-[.82fr_1.18fr] sm:p-6">
                <div className="mx-auto w-full max-w-[210px] rounded-[31px] border-[6px] border-[#101821] bg-[#101821] p-1 shadow-[0_18px_35px_rgba(15,29,47,.24)]">
                    <div className="overflow-hidden rounded-[21px] bg-[#f5f7f9]"><div className="bg-[#0d2b50] px-3 pb-2.5 pt-5 text-[8px] font-bold text-white">Neu erfassen</div><div className="p-3"><div className="flex aspect-[1.35/1] items-center justify-center border border-dashed border-[#8fa8c4] bg-[#e8f1fb]"><div className="text-center"><ScanLine className="mx-auto h-6 w-6 text-[#1d6fe8]" /><span className="mt-2 block text-[7px] font-semibold text-[#155fc8]">Artikelnummer scannen</span></div></div><div className="mt-2 border border-[#c2ceda] bg-white p-2.5"><span className="text-[7px] text-[#758294]">Erkannt</span><strong className="mt-1 block font-mono text-[8px]">5G1 615 123 A</strong></div><div className="mt-2 grid grid-cols-2 gap-2 text-[7px]"><span className="border border-[#c2ceda] bg-white p-2">Vorgang<strong className="mt-1 block">Retoure</strong></span><span className="border border-[#c2ceda] bg-white p-2">Fotos<strong className="mt-1 block">optional</strong></span></div><div className="mt-2 bg-[#1d6fe8] py-2.5 text-center text-[7px] font-bold text-white">Entwurf übergeben</div></div></div>
                </div>
                <div className="relative min-w-0 bg-white shadow-[0_14px_35px_rgba(28,53,84,.14)]"><WindowBar icon={Smartphone} title="MOBILE ÜBERGABE" detail="Derselbe Vorgang wartet im Arbeitsvorrat" badge="ENTWURF" /><div className="p-4"><div className="flex items-center gap-3 border-b border-[#d8e0e8] pb-4"><span className="flex h-9 w-9 items-center justify-center bg-[#e9f2ff]"><PackageCheck className="h-4 w-4 text-[#1d6fe8]" /></span><span><strong className="block text-[9px]">Artikel erkannt</strong><span className="mt-1 block text-[7px] text-[#758294]">mit Quelle und mobilem Zeitstempel</span></span></div><div className="mt-4 space-y-3 text-[8px]">{[['01', 'Zuordnung', 'Artikel und Vorgangsart'], ['02', 'Kontext', 'Beleg, Menge und Grund'], ['03', 'Prüfung', 'zuständiger Arbeitsvorrat'], ['04', 'Freigabe', 'vor Bestands- oder Finanzwirkung']].map(([number, title, text], index) => <div key={number} className="grid grid-cols-[24px_1fr] gap-2"><span className="font-mono text-[7px] font-bold text-[#1d6fe8]">{number}</span><span className={index < 3 ? 'border-b border-[#dce3ea] pb-3' : ''}><strong className="block">{title}</strong><span className="mt-1 block text-[7px] text-[#758294]">{text}</span></span></div>)}</div></div></div>
            </div>
        </div>
    );
}

const visuals: Record<VisualName, () => React.ReactNode> = {
    inquiry: InquiryEvidence,
    oem: OemEvidence,
    order: OrderEvidence,
    procurement: ProcurementEvidence,
    inventory: InventoryEvidence,
    returns: ReturnEvidence,
    finance: FinanceEvidence,
    assistant: AssistantEvidence,
    mobile: MobileEvidence,
};

export function SolutionVisual({ visual }: { visual: VisualName }) {
    const Visual = visuals[visual];
    return <Visual />;
}
