'use client';

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export function MagneticButton({
    children,
    className = '',
    onClick,
    strength = 0.35,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const reduceMotion = useReducedMotion();

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (reduceMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
        setPos({ x, y });
    };

    const handleMouseLeave = () => setPos({ x: 0, y: 0 });

    return (
        <motion.button
            ref={ref}
            type="button"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={pos}
            transition={{ type: 'spring', stiffness: 180, damping: 14, mass: 0.4 }}
            className={className}
        >
            {children}
        </motion.button>
    );
}
