'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/landing/Footer';
import { HomepageFooter } from '@/components/home/HomepageFooter';
import { HomepageHeader } from '@/components/home/HomepageHeader';

export function SiteShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const usesProductFooter = pathname === '/' || pathname.startsWith('/loesungen') || pathname.startsWith('/plattform') || pathname.startsWith('/blog') || pathname === '/beratung';

    return (
        <>
            <HomepageHeader />
            <main className="flex-1">{children}</main>
            {usesProductFooter ? <HomepageFooter /> : <Footer />}
        </>
    );
}
