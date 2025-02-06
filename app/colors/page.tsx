import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ColorPaletteGenerator = dynamic(
  () => import('@/components/color-palette-generator'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Color Palette Generator - Create Beautiful Color Schemes',
  description:
    'Generate harmonious color palettes for your projects. Features multiple color schemes, real-time preview, and export options for CSS and Tailwind.',
  openGraph: {
    title: 'Color Palette Generator - Create Beautiful Color Schemes',
    description:
      'Generate harmonious color palettes for your projects. Features multiple color schemes, real-time preview, and export options.',
  },
  twitter: {
    title: 'Color Palette Generator - Create Beautiful Color Schemes',
    description:
      'Generate harmonious color palettes for your projects. Features multiple color schemes, real-time preview, and export options.',
  },
};

export default function ColorsPage() {
  return <ColorPaletteGenerator />;
}
