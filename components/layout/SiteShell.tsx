'use client';

import { usePathname } from 'next/navigation';
import { CampaignHeader, CampaignFooter } from '@/components/campaign/CampaignShell';
import { HomepageFooter } from '@/components/home/HomepageFooter';
import { HomepageHeader } from '@/components/home/HomepageHeader';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const campaign = usePathname().startsWith('/lp/');
  return (
    <>
      {campaign ? <CampaignHeader /> : <HomepageHeader />}
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      {campaign ? <CampaignFooter /> : <HomepageFooter />}
    </>
  );
}
