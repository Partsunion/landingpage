/**
 * WhatsAppPreview — wrapper that reuses the single ChatPreview source of truth.
 *
 * Jetzt: nutzt dieselbe `ChatPreview` wie die Feature-Pages → ein Design,
 * eine Nachrichten-Architektur.
 *
 * HONESTY: zeigt nur den LIVE-Pfad (Foto → Fahrzeug-/Teil-Erkennung →
 * 3 Angebote → Kunde wählt → Auftrag entsteht). Der Vorkasse-/Chat-Zahlungs-
 * Schritt (Klarna/PayPal/…) ist Roadmap und wird hier NICHT als live gezeigt.
 */

import { ChatPreview, type ChatPreviewData } from './feature-previews/ChatPreview';

const data: ChatPreviewData = {
    title: 'DIGITALE ANFRAGE · DEMO',
    sub: 'mit Fachprüfung bei Unsicherheit',
    customerName: 'KFZ Meier GmbH',
    customerInitials: 'KM',
    footer: 'Kundenkontext · Teilezuordnung · Übergabe in den Verkauf',
    messages: [
        { from: 'user', text: 'Hi, brauche Bremsen vorne für meinen Golf 7 1.6 TDI. Hier ist der Schein.', time: '14:32' },
        { from: 'user', kind: 'image', imageLabel: 'fahrzeugschein', time: '14:32' },
        {
            from: 'bot',
            text: 'Erkannt: VW Golf VII 1.6 TDI. FIN endet auf ...1923. Hier sind 3 Angebote für die Bremsen vorne:\n\n• Bosch BP1411 — 89,40 €\n• ATE 13.0470-7280.2 — 76,20 €\n• Generic — 49,90 €',
            time: '14:32',
            tag: 'vorstrukturiert',
        },
        { from: 'user', text: 'Ich nehme die ATE.', time: '14:33' },
        {
            from: 'bot',
            kind: 'offer',
            text: '1× ATE Bremsbeläge VA\nFür VW Golf VII 1.6 TDI · OEM 5Q0698451',
            price: '76,20 €',
            deliveryNote: 'Lieferung morgen Mi 29.05. vor 12 Uhr',
            time: '14:33',
            tag: 'geprüft',
        },
        // Live: aus der Auswahl entsteht ein Auftrag/Vorgang im Dashboard.
        {
            from: 'bot',
            kind: 'confirm',
            orderId: '24871',
            eta: 'Mi 29.05. vor 12 Uhr',
            time: '14:34',
        },
    ],
};

export function WhatsAppPreview() {
    return (
        <div className="max-w-[400px] mx-auto">
            <ChatPreview data={data} />
        </div>
    );
}
