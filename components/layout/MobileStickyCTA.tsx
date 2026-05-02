'use client';


import { Button } from '@/components/ui/Button';
import { MessageCircle } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export function MobileStickyCTA() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show after scrolling past hero (approx 500px)
        setVisible(latest > 500);
    });

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: visible ? 0 : 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border z-50 md:hidden"
        >
            <Button
                className="w-full shadow-lg h-12 text-lg font-bold"
                size="lg"
                onClick={() => document.getElementById('beratung')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <MessageCircle className="mr-2 h-5 w-5" />
                Jetzt Beratung buchen
            </Button>
        </motion.div>
    );
}
