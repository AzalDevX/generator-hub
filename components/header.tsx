'use client';

import Link from 'next/link';
import { FileText, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  const container = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };

  const generators = [
    { href: '/readme', label: 'README', icon: FileText },
    { href: '/colors', label: 'Colors', icon: Palette },
  ];

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={container}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-discord-secondary/95 border-discord-tertiary backdrop-blur-md supports-[backdrop-filter]:bg-discord-secondary/80">
      <div className="container flex h-20 items-center justify-between">
        <motion.div variants={item}>
          <Link
            href="/"
            className="flex items-center space-x-3 text-discord-text-primary hover:text-discord-blue transition-all duration-300 hover:scale-105">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-2 bg-discord-primary rounded-lg">
              <FileText className="h-6 w-6" />
            </motion.div>
            <span className="font-bold text-lg">Generators Hub</span>
          </Link>
        </motion.div>
        <nav className="flex items-center space-x-8">
          {generators.map(({ href, label, icon: Icon }) => (
            <motion.div key={href} variants={item}>
              <Link
                href={href}
                className="relative text-discord-text-secondary hover:text-discord-text-primary transition-all duration-300 text-sm font-medium tracking-wide px-1 py-2 flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-discord-primary origin-left"
                />
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
