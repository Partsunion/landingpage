import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CampaignLanding } from '@/components/campaign/CampaignLanding';
import { campaignPages, findCampaignPage } from '@/lib/campaign-pages';
import '../campaign.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return campaignPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findCampaignPage(slug);
  if (!page) notFound();
  const url = `https://partsunion.de/lp/${slug}`;
  return {
    title: page.title,
    description: page.description,
    // Campaign destinations remain crawlable for Ads, but do not compete with the SEO pages.
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    alternates: { canonical: url, languages: { 'de-DE': url, 'x-default': url } },
    openGraph: { title: page.title, description: page.description, url },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  };
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findCampaignPage(slug);
  if (!page) notFound();
  return <CampaignLanding page={page} />;
}
