'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
    Children,
    cloneElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from 'react';

interface AnimatedHeadlineProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
}

const container: Variants = {
    hidden: {},
    visible: (delay: number = 0) => ({
        transition: {
            delayChildren: delay,
            staggerChildren: 0.035,
        },
    }),
};

const word: Variants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const splitTextNode = (text: string, baseKey: string): ReactNode[] => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, idx) => {
        if (part.length === 0) return null;
        if (/^\s+$/.test(part)) return part;
        return (
            <motion.span
                key={`${baseKey}-w${idx}`}
                variants={word}
                className="inline-block"
                style={{ willChange: 'transform, opacity, filter' }}
            >
                {part}
            </motion.span>
        );
    });
};

const transformChildren = (nodes: ReactNode, baseKey: string): ReactNode => {
    return Children.map(nodes, (node, i) => {
        const key = `${baseKey}-${i}`;
        if (typeof node === 'string') return splitTextNode(node, key);
        if (typeof node === 'number') return splitTextNode(String(node), key);
        if (!isValidElement(node)) return node;
        const el = node as ReactElement<{ children?: ReactNode; className?: string }>;

        // Gradient text (and any element where `background-image` carries the
        // visible color via `-webkit-text-fill-color: transparent`) cannot be
        // split into per-word motion.spans — `background-image` is not an
        // inherited CSS property, so the kids would render as fully
        // transparent text. Animate the whole element as one motion.span.
        const className = el.props.className ?? '';
        if (/\btext-gradient\b/.test(className)) {
            return (
                <motion.span
                    key={key}
                    variants={word}
                    className={`inline-block ${className}`}
                    style={{ willChange: 'transform, opacity, filter' }}
                >
                    {el.props.children}
                </motion.span>
            );
        }

        return cloneElement(el, {
            ...el.props,
            children: transformChildren(el.props.children, key),
        });
    });
};

/**
 * Splits children (incl. nested elements) into words and reveals them
 * with a blur-up stagger. Honors prefers-reduced-motion.
 */
export function AnimatedHeadline({
    children,
    className = '',
    style,
    delay = 0,
}: AnimatedHeadlineProps) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return (
            <h1 className={className} style={style}>
                {children}
            </h1>
        );
    }

    return (
        <motion.h1
            className={className}
            style={style}
            initial="hidden"
            animate="visible"
            variants={container}
            custom={delay}
        >
            {transformChildren(children, 'h')}
        </motion.h1>
    );
}
