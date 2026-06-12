/**
 * WhatsAppPreview — wrapper that reuses the single ChatPreview source of truth.
 *
 * Vorher: separate Phone-Mockup-Komponente mit eigenem Design + eigenen Nachrichten.
 * Jetzt: nutzt dieselbe `ChatPreview` wie die Feature-Pages → **ein** Design,
 * **eine** Nachrichten-Architektur, **ein** Vorkasse-Flow.
 *
 * Spezifisch für TechTabs auf der Landingpage: zeigt den vollen Vorkasse-Pfad
 * vom Foto-Upload bis zur ausgelösten Bestellung.
 */

import { ChatPreview, type ChatPreviewData } from './feature-previews/ChatPreview';

const data: ChatPreviewData = {
    title: '24/7 BOT',
    sub: 'antwortet meist sofort',
    customerName: 'KFZ Meier GmbH',
    customerInitials: 'KM',
    footer: 'Antwortzeit Median 8 s · Vorkasse aktiv',
    messages: [
        { from: 'user', text: 'Hi, brauche Bremsen vorne für meinen Golf 7 1.6 TDI. Hier ist der Schein.', time: '14:32' },
        { from: 'user', kind: 'image', imageLabel: 'fahrzeugschein', time: '14:32' },
        {
            from: 'bot',
            text: 'Erkannt: VW Golf VII 2.0 TDI Variant. FIN endet auf ...1923. Hier sind 3 Angebote für die Bremsen vorne:\n\n• Bosch BP1411 — 89,40 €\n• ATE 13.0470-7280.2 — 76,20 €\n• Generic — 49,90 €',
            time: '14:32',
            tag: 'auto · 8s',
        },
        { from: 'user', text: 'Ich nehme die ATE.', time: '14:33' },
        {
            from: 'bot',
            kind: 'offer',
            text: '1× ATE Bremsbeläge VA\nFür VW Golf VII 2.0 TDI · OEM 5Q0698451',
            price: '76,20 €',
            deliveryNote: 'Lieferung morgen Mi 29.05. vor 12 Uhr (Express)',
            time: '14:33',
            tag: 'auto',
        },
        {
            from: 'bot',
            kind: 'payment',
            amount: '76,20 €',
            methods: ['Klarna', 'PayPal', 'Karte', 'SOFORT'],
            time: '14:33',
            tag: 'vorkasse',
        },
        // Optional confirm-message simulates the "after payment" state.
        // Kept here so visitors see the full closed loop on the landing page.
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
