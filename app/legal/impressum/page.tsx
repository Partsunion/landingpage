import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Impressum - Partsunion',
    description: 'Impressum der PartsUnion UG (haftungsbeschränkt)',
};

export default function ImpressumPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <div className="blog-content max-w-none">
                <h1
                    className="text-3xl md:text-4xl font-semibold text-foreground mb-3"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                    Impressum
                </h1>
                <p className="text-sm text-muted-foreground">Angaben gemäß § 5 DDG</p>

                <h2>Anbieter</h2>
                <p>
                    PartsUnion UG (haftungsbeschränkt)<br />
                    Zum Sommersberg 27<br />
                    50321 Brühl<br />
                    Deutschland
                </p>

                <h2>Vertreten durch</h2>
                <p>
                    Geschäftsführer:<br />
                    Alexander Blawat<br />
                    Aaron Vogt<br />
                    Bardia Bagherian<br />
                    Elias Zafar
                </p>

                <h2>Registereintrag</h2>
                <p>
                    Registergericht: Amtsgericht Köln<br />
                    Handelsregisternummer: HRB 128845
                </p>

                <h2>Kontakt</h2>
                <p>
                    E-Mail: info@partsunion.de<br />
                    Website: partsunion.de
                </p>

                <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
                <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>

                <h2>Haftung für Inhalte</h2>
                <p>
                    Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                    verantwortlich. Eine allgemeine Verpflichtung, übermittelte oder gespeicherte fremde Informationen
                    zu überwachen oder aktiv nach rechtswidrigen Tätigkeiten zu forschen, besteht nicht. Verpflichtungen zur Entfernung oder
                    Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                    Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                    Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                    Inhalte umgehend entfernen.
                </p>

                <h2>Haftung für Links</h2>
                <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                    verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
                    Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
                    waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
                    Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
                    von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>

                <h2>Urheberrecht</h2>
                <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                    beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                    Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
                    Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
            </div>
        </div>
    );
}
