'use client';

import { cn } from '@/lib/utils';
import type React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: string;
}

export function AnimatedCard({
  children,
  className,
  delay = '0s',
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Number.parseFloat(delay) }}
      className={cn(
        'relative overflow-hidden rounded-xl border-2 border-discord-tertiary bg-discord-secondary transition-all duration-300 hover:border-discord-primary hover:shadow-xl hover:shadow-discord-primary/10',
        className
      )}
      {...(props as HTMLMotionProps<'div'>)} // Asegúrate de pasar las props correctamente tipadas.
    >
      {children}
    </motion.div>
  );
}
