/**
 * WhatsAppPreview — wrapper that reuses the single ChatPreview source of truth.
 *
 * Jetzt: nutzt dieselbe `ChatPreview` wie die Feature-Pages → ein Design,
 * eine Nachrichten-Architektur.
 *
 * Zeigt den durchgängigen Pfad von der Anfrage über Fahrzeug- und
 * Teileerkennung bis zu Angebot, direkter Zahlung und Auftrag.
 */

import { ChatPreview, type ChatPreviewData } from './feature-previews/ChatPreview';

export const whatsappPreviewData: ChatPreviewData = {
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
        {
            from: 'bot',
            kind: 'payment',
            amount: '76,20 €',
            methods: ['PayPal', 'Karte', 'Klarna', 'SOFORT'],
            time: '14:34',
            tag: 'Zahlung',
        },
        {
            from: 'bot',
            kind: 'confirm',
            orderId: '24871',
            eta: 'Mi 29.05. vor 12 Uhr',
            time: '14:35',
        },
    ],
};

export function WhatsAppPreview() {
    return (
        <div className="max-w-[400px] mx-auto">
            <ChatPreview data={whatsappPreviewData} />
        </div>
    );
}
