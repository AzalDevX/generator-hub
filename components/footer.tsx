"use client"

import { Github } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="border-t bg-discord-secondary/95 border-discord-tertiary py-8 relative overflow-hidden backdrop-blur-md supports-[backdrop-filter]:bg-discord-secondary/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col items-center justify-between gap-4 md:flex-row relative z-10 max-w-7xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-discord-text-secondary hover:text-discord-text-primary transition-colors duration-300 text-sm"
        >
          Created with{" "}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="inline-block"
          >
            ❤️
          </motion.span>{" "}
          by{" "}
          <a
            href="https://lalo.lol/me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-discord-primary"
          >
            Gonzalo Azaldegi
          </a>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center space-x-6"
        >
          <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.6 }}>
            <Link
              href="https://lalo.lol/gh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-discord-text-secondary hover:text-discord-text-primary transition-all duration-300 p-2"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-discord-primary/5 via-transparent to-discord-blue/5"
      />
    </footer>
  )
}

