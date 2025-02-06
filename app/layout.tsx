import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import type React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://generators-hub.vercel.app'),
  title: {
    default: 'Generators Hub - Create README files and Color Palettes',
    template: '%s | Generators Hub',
  },
  description:
    'Free online tools to generate README files and color palettes with a Discord-inspired interface. Create beautiful documentation and color schemes for your projects.',
  keywords: [
    'readme generator',
    'color palette generator',
    'markdown editor',
    'color scheme',
    'documentation tool',
    'developer tools',
  ],
  authors: [{ name: 'Gonzalo Azaldegi', url: 'https://lalo.lol/me' }],
  creator: 'Gonzalo Azaldegi',
  publisher: 'Generators Hub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://generators-hub.vercel.app',
    siteName: 'Generators Hub',
    title: 'Generators Hub - Create README files and Color Palettes',
    description:
      'Free online tools to generate README files and color palettes with a Discord-inspired interface. Create beautiful documentation and color schemes for your projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Generators Hub - README and Color Palette Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generators Hub - Create README files and Color Palettes',
    description:
      'Free online tools to generate README files and color palettes with a Discord-inspired interface.',
    images: ['/og-image.png'],
    creator: '@lalodev',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Generators Hub',
    'msapplication-TileColor': '#5865F2',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#5865F2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://generators-hub.vercel.app" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-discord flex flex-col`}>
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
