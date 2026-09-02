import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SolutionPage } from '@/components/solutions/SolutionPage';
import { getSolutionPage, solutionPages } from '@/lib/solutions-data';

export const dynamicParams = false;

export function generateStaticParams() {
    return solutionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = getSolutionPage(slug);
    if (!page) return {};
    return {
        title: `${page.navLabel} für den Autoteilehandel`,
        description: page.intro,
        alternates: { canonical: `/loesungen/${page.slug}` },
        openGraph: {
            title: `${page.navLabel} | Partsunion`,
            description: page.promise,
            url: `https://partsunion.de/loesungen/${page.slug}`,
            type: 'website',
        },
    };
}

export default async function SolutionRoute({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = getSolutionPage(slug);
    if (!page) notFound();
    return <SolutionPage page={page} />;
}
