'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
