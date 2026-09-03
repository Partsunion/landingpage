import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PhoneFrameProps {
    children: ReactNode;
    className?: string;
    screenClassName?: string;
}

/** Gemeinsamer, bewusst schlichter Geräterahmen für alle mobilen Produktabläufe. */
export function PhoneFrame({ children, className, screenClassName }: PhoneFrameProps) {
    return (
        <div data-phone-frame className={cn('relative rounded-[34px] border-[6px] border-[#111923] bg-[#111923] p-1.5 shadow-[0_22px_48px_rgba(15,29,47,.23)]', className)}>
            <span aria-hidden className="absolute left-1/2 top-2 z-20 h-3.5 w-14 -translate-x-1/2 rounded-full bg-[#111923]" />
            <div className={cn('overflow-hidden rounded-[24px]', screenClassName)}>{children}</div>
        </div>
    );
}
