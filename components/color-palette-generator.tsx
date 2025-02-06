"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, Download, Shuffle, Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import chroma from "chroma-js"
import { usePathname } from "next/navigation"

interface Color {
  hex: string
  name: string
  locked: boolean
}

type ColorScheme = "analogous" | "monochromatic" | "triadic" | "complementary" | "split-complementary"

interface ExportFormat {
  name: string
  extension: string
  generate: (colors: Color[]) => string
}

const exportFormats: ExportFormat[] = [
  {
    name: "Color Palette",
    extension: "txt",
    generate: (colors: Color[]) => colors.map((color) => `${color.name}: ${color.hex}`).join("\n"),
  },
  {
    name: "CSS Variables",
    extension: "css",
    generate: (colors: Color[]) =>
      `
:root {
${colors.map((color) => `  --${color.name.replace(/\s+/g, "-")}: ${color.hex};`).join("\n")}
}`.trim(),
  },
  {
    name: "Tailwind Config",
    extension: "js",
    generate: (colors: Color[]) =>
      `
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
${colors.map((color) => `        '${color.name.replace(/\s+/g, "-")}': '${color.hex}',`).join("\n")}
      }
    }
  }
}`.trim(),
  },
]

const generateMonochromaticColors = (baseColor: chroma.Color): Color[] => {
  return chroma
    .scale([baseColor.brighten(2), baseColor, baseColor.darken(2)])
    .colors(5)
    .map((hex) => ({
      hex,
      name: getColorName(hex),
      locked: false,
    }))
}

const generateAnalogousColors = (baseColor: chroma.Color): Color[] => {
  const hue = baseColor.get("hsl.h")
  return [-30, -15, 0, 15, 30].map((offset) => {
    const newHue = (hue + offset) % 360
    const color = chroma.hsl(newHue, baseColor.get("hsl.s"), baseColor.get("hsl.l"))
    return {
      hex: color.hex(),
      name: getColorName(color.hex()),
      locked: false,
    }
  })
}

const generateTriadicColors = (baseColor: chroma.Color): Color[] => {
  return [0, 120, 240].flatMap((offset) => {
    const hue = (baseColor.get("hsl.h") + offset) % 360
    const color = chroma.hsl(hue, baseColor.get("hsl.s"), baseColor.get("hsl.l"))
    const lighter = color.brighten()
    if (offset === 0) {
      return [
        { hex: lighter.hex(), name: getColorName(lighter.hex()), locked: false },
        { hex: color.hex(), name: getColorName(color.hex()), locked: false },
      ]
    }
    return [{ hex: color.hex(), name: getColorName(color.hex()), locked: false }]
  })
}

const generateComplementaryColors = (baseColor: chroma.Color): Color[] => {
  const comp = chroma.hsl((baseColor.get("hsl.h") + 180) % 360, baseColor.get("hsl.s"), baseColor.get("hsl.l"))
  return [baseColor.brighten(2), baseColor, baseColor.darken(1), comp.brighten(1), comp].map((color) => ({
    hex: color.hex(),
    name: getColorName(color.hex()),
    locked: false,
  }))
}

const generateSplitComplementaryColors = (baseColor: chroma.Color): Color[] => {
  const baseHue = baseColor.get("hsl.h")
  return [
    baseColor,
    chroma.hsl((baseHue + 150) % 360, baseColor.get("hsl.s"), baseColor.get("hsl.l")),
    chroma.hsl((baseHue + 210) % 360, baseColor.get("hsl.s"), baseColor.get("hsl.l")),
    baseColor.brighten(),
    baseColor.darken(),
  ].map((color) => ({
    hex: color.hex(),
    name: getColorName(color.hex()),
    locked: false,
  }))
}

const getColorName = (hex: string): string => {
  const color = chroma(hex)
  const hue = color.get("hsl.h")
  const saturation = color.get("hsl.s")
  const luminance = color.get("hsl.l")

  let baseName = ""
  if ((hue >= 0 && hue < 15) || hue >= 345) baseName = "red"
  else if (hue >= 15 && hue < 45) baseName = "orange"
  else if (hue >= 45 && hue < 75) baseName = "yellow"
  else if (hue >= 75 && hue < 165) baseName = "green"
  else if (hue >= 165 && hue < 195) baseName = "cyan"
  else if (hue >= 195 && hue < 255) baseName = "blue"
  else if (hue >= 255 && hue < 285) baseName = "purple"
  else if (hue >= 285 && hue < 345) baseName = "pink"

  if (luminance > 0.8) return `light ${baseName}`
  if (luminance < 0.3) return `dark ${baseName}`
  if (saturation < 0.3) return `muted ${baseName}`
  return baseName
}

export default function ColorPaletteGenerator() {
  const [colors, setColors] = useState<Color[]>([])
  const [scheme, setScheme] = useState<ColorScheme>("analogous")
  const pathname = usePathname()

  const updateURL = useCallback((colors: Color[]) => {
    const hexCodes = colors.map((color) => color.hex.replace("#", "")).join("-")
    // Instead of navigation, update the URL without a page reload
    window.history.replaceState(null, "", `/colors#${hexCodes}`)
  }, [])

  const generatePalette = useCallback(() => {
    setColors((prevColors) => {
      const baseColor = chroma.random()
      let newColors: Color[]

      // Generate new colors based on scheme
      switch (scheme) {
        case "monochromatic":
          newColors = generateMonochromaticColors(baseColor)
          break
        case "analogous":
          newColors = generateAnalogousColors(baseColor)
          break
        case "triadic":
          newColors = generateTriadicColors(baseColor)
          break
        case "complementary":
          newColors = generateComplementaryColors(baseColor)
          break
        case "split-complementary":
          newColors = generateSplitComplementaryColors(baseColor)
          break
        default:
          newColors = generateAnalogousColors(baseColor)
      }

      // If there are no previous colors, return the new ones
      if (prevColors.length === 0) {
        return newColors
      }

      // Otherwise, preserve locked colors
      return prevColors.map((prevColor, index) => {
        if (prevColor.locked) {
          return { ...prevColor, locked: true }
        }
        return { ...newColors[index], locked: false }
      })
    })

    // Update URL after setting colors
    setTimeout(() => {
      setColors((currentColors) => {
        updateURL(currentColors)
        return currentColors
      })
    }, 0)
  }, [scheme, updateURL])

  const handleSchemeChange = (newScheme: ColorScheme) => {
    setScheme(newScheme)
    generatePalette()
  }

  const toggleLock = (index: number) => {
    setColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : { ...color, locked: color.locked },
      ),
    )
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadPalette = (format: ExportFormat) => {
    const content = format.generate(colors)
    const blob = new Blob([content], {
      type:
        format.extension === "txt" ? "text/plain" : format.extension === "css" ? "text/css" : "application/javascript",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    const timestamp = new Date().toISOString().split("T")[0]
    const fileName = `${scheme}-palette-${timestamp}.${format.extension}`
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Initialize from URL hash or generate new palette
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const hexCodes = hash.split("-").map((hex) => `#${hex}`)
      const urlColors = hexCodes.map((hex) => ({
        hex,
        name: getColorName(hex),
        locked: false,
      }))
      setColors(urlColors)
    } else if (colors.length === 0) {
      generatePalette()
    }
  }, [colors.length]) // Only run on mount and when colors.length changes

  // Space bar handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault()
        generatePalette()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [generatePalette])

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-discord-text-primary mb-2">Color Palette Generator</h1>
            <p className="text-discord-text-secondary">Press the spacebar to generate color palettes!</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={scheme}
              onChange={(e) => handleSchemeChange(e.target.value as ColorScheme)}
              className="bg-discord-secondary text-discord-text-primary border border-discord-tertiary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-discord-primary"
            >
              <option value="analogous">Analogous</option>
              <option value="monochromatic">Monochromatic</option>
              <option value="triadic">Triadic</option>
              <option value="complementary">Complementary</option>
              <option value="split-complementary">Split Complementary</option>
            </select>
            <Button variant="secondary" size="lg" onClick={generatePalette} className="flex items-center space-x-2">
              <Shuffle className="w-4 h-4" />
              <span>Generate</span>
            </Button>
            <div className="relative group">
              <Button variant="secondary" size="lg" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
              <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-discord-secondary rounded-lg shadow-lg border border-discord-tertiary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {exportFormats.map((format) => (
                  <button
                    key={format.extension}
                    onClick={() => downloadPalette(format)}
                    className="w-full px-4 py-2 text-left text-discord-text-secondary hover:text-discord-text-primary hover:bg-discord-tertiary transition-colors"
                  >
                    {format.name} (.{format.extension})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 h-[calc(100vh-16rem)] overflow-hidden rounded-lg">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <Button variant="secondary" size="icon" onClick={() => toggleLock(index)} className="mb-4">
                  {color.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </Button>
                <Button variant="secondary" onClick={() => copyToClipboard(color.hex)} className="mb-2">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <div className="text-center text-white">
                  <p className="font-mono font-bold">{color.hex}</p>
                  <p className="text-sm opacity-75 capitalize">{color.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

