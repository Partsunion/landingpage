'use client';

import { useReducedMotion } from 'framer-motion';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => undefined;

export function useHydrationSafeReducedMotion() {
    const prefersReducedMotion = useReducedMotion();
    const isHydrated = useSyncExternalStore(subscribe, () => true, () => false);

    return isHydrated && Boolean(prefersReducedMotion);
}
