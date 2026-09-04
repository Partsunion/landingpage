import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Widerrufsbelehrung',
    description: 'Widerrufsbelehrung für Partsunion Verträge mit Angaben zu Frist, Ausübung, Folgen des Widerrufs und dem gesetzlichen Muster-Widerrufsformular.',
    alternates: { canonical: 'https://partsunion.de/legal/widerruf' },
};

export default function WiderrufPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <div className="blog-content max-w-none">
                <h1
                    className="text-3xl md:text-4xl font-semibold text-foreground mb-3"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                    Widerrufsbelehrung
                </h1>
                <p className="text-sm text-muted-foreground">Stand: Juli 2026</p>

                <h2>Widerrufsrecht</h2>
                <p>
                    Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
                    zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
                    Vertragsabschlusses.
                </p>
                <p>
                    Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
                </p>
                <p>
                    <strong>Anbieter gemäß Impressum</strong><br />
                    Ladungsfähige Anschrift und Vertretungsberechtigte:{' '}
                    <Link href="/legal/impressum">siehe Impressum</Link><br />
                    E-Mail: widerruf@partsunion.de
                </p>
                <p>
                    mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief,
                    Telefax oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
                    informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden,
                    das jedoch nicht vorgeschrieben ist.
                </p>
                <p>
                    Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
                    Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
                </p>

                <h2>Folgen des Widerrufs</h2>
                <p>
                    Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
                    Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen
                    Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von
                    uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und
                    spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
                    über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung
                    verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
                    eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart;
                    in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
                </p>
                <p>
                    Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen
                    sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der
                    bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts
                    hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im
                    Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
                </p>

                <h2>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
                <p>
                    Das Widerrufsrecht erlischt bei einem Vertrag über die Lieferung von nicht auf einem
                    körperlichen Datenträger befindlichen digitalen Inhalten auch dann vorzeitig, wenn
                    der Anbieter mit der Ausführung des Vertrags begonnen hat, nachdem der Kunde:
                </p>
                <ul>
                    <li>
                        ausdrücklich zugestimmt hat, dass der Anbieter mit der Ausführung des Vertrags
                        vor Ablauf der Widerrufsfrist beginnt, und
                    </li>
                    <li>
                        seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit Beginn
                        der Ausführung des Vertrags sein Widerrufsrecht verliert.
                    </li>
                </ul>

                <h2>Ausschluss des Widerrufsrechts</h2>
                <p>
                    Das Widerrufsrecht besteht nicht bei Verträgen mit Unternehmern im Sinne von § 14 BGB.
                    Das Widerrufsrecht gilt ausschließlich für Verbraucher im Sinne von § 13 BGB.
                </p>

                <h2>Muster-Widerrufsformular</h2>
                <p>
                    (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus
                    und senden Sie es zurück.)
                </p>
                <div className="p-6 rounded-xl bg-muted border border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        An:<br />
                        Anbieter gemäß <Link href="/legal/impressum">Impressum</Link><br />
                        Ladungsfähige Anschrift: siehe Impressum<br />
                        E-Mail: widerruf@partsunion.de
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                        Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag
                        über die Erbringung der folgenden Dienstleistung (*):
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                        _____________________________________________
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                        Bestellt am (*) / erhalten am (*): _______________
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                        Name des/der Verbraucher(s): _______________
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                        Anschrift des/der Verbraucher(s): _______________
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                        Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): _______________
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Datum: _______________
                    </p>
                    <p className="text-xs text-muted-foreground mt-4 italic">
                        (*) Unzutreffendes streichen.
                    </p>
                </div>
            </div>
        </div>
    );
}
