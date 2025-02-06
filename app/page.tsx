'use client';

import { Button } from '@/components/ui/button';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { AnimatedCard } from '@/components/ui/animated-card';
import Link from 'next/link';
import { ArrowRight, FileText, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const generators = [
    {
      title: 'README Generator',
      description:
        'Create professional README files with a Discord-inspired interface.',
      icon: FileText,
      href: '/readme',
      color: 'primary',
    },
    {
      title: 'Color Palette',
      description: 'Generate beautiful color palettes with a single click.',
      icon: Palette,
      href: '/colors',
      color: 'green',
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-20">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container relative flex flex-col items-center text-center space-y-16 px-4 max-w-7xl mx-auto">
        <div className="space-y-8 animate-fade-in-up max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-discord-text-primary via-discord-blue to-discord-primary leading-[1.1]">
            Generators Hub
          </h1>
          <p className="text-discord-text-secondary text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
            A collection of useful generators with a Discord-inspired interface.
          </p>
        </div>

        <div className="grid gap-8 md:gap-6 lg:gap-8 md:grid-cols-2 w-full max-w-4xl">
          {generators.map((generator, index) => (
            <Link key={generator.href} href={generator.href}>
              <AnimatedCard
                delay={`${index * 0.2}s`}
                className="group p-8 cursor-pointer transform transition-transform hover:scale-105">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`rounded-2xl bg-discord-${generator.color}/10 p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto`}>
                  <generator.icon
                    className={`h-8 w-8 text-discord-${generator.color}`}
                  />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-discord-text-primary">
                  {generator.title}
                </h3>
                <p className="text-discord-text-secondary text-lg leading-relaxed">
                  {generator.description}
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <Button variant="ghost" className="group">
                    Try it out
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
