import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ColorPaletteGenerator = dynamic(
  () => import('@/components/color-palette-generator'),
  { ssr: false }
);

interface Props {
  params: {
    palette: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const colors = params.palette.split('-').map((hex) => `#${hex}`);
  const colorList = colors.join(', ');

  return {
    title: `Color Palette - ${colorList}`,
    description: `Custom color palette featuring ${colors.length} colors: ${colorList}. Generate your own color schemes with our palette generator.`,
    openGraph: {
      title: `Color Palette - ${colorList}`,
      description: `Custom color palette featuring ${colors.length} colors: ${colorList}. Generate your own color schemes with our palette generator.`,
      images: [
        {
          url: `/api/og?palette=${params.palette}`,
          width: 1200,
          height: 630,
          alt: `Color palette preview: ${colorList}`,
        },
      ],
    },
    twitter: {
      title: `Color Palette - ${colorList}`,
      description: `Custom color palette featuring ${colors.length} colors: ${colorList}. Generate your own color schemes with our palette generator.`,
      images: [`/api/og?palette=${params.palette}`],
    },
  };
}

// Generar las rutas estáticas posibles para la página dinámica
export function generateStaticParams() {
  // Aquí deberías especificar todas las paletas de colores que deseas pre-generar estáticamente.
  const palettes = ['red-green-blue', 'blue-yellow-purple', 'pink-orange-grey'];

  return palettes.map((palette) => ({
    palette,
  }));
}

export default function PalettePage() {
  return <ColorPaletteGenerator />;
}
