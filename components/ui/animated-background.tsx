'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-discord"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #5865F2 0%, transparent 50%)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 0.5, x: '0%' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="absolute top-0 -left-4 w-3/4 h-full opacity-50 bg-gradient-to-r from-transparent via-discord-primary/10 to-transparent transform -skew-x-12"
          style={{ backgroundSize: '200% 100%' }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-[25%] -left-[25%] w-[150%] h-[150%]"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, ${hexToRgba(
              '#5865F2',
              0.1
            )} 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, ${hexToRgba(
              '#3BA55D',
              0.1
            )} 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${hexToRgba(
              '#7289DA',
              0.1
            )} 0%, transparent 50%)
          `,
        }}>
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
