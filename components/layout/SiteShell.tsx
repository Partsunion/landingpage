'use client';

import { HomepageFooter } from '@/components/home/HomepageFooter';
import { HomepageHeader } from '@/components/home/HomepageHeader';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomepageHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <HomepageFooter />
    </>
  );
}
