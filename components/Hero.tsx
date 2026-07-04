'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import HeroReviewsCarousel from '@/components/HeroReviewsCarousel'

const HEADLINE = 'Aumenta tu margen de ganancias instalando láminas de calidad.'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh]">
      {/* Decorative layer only: bleeds up behind the floating header (h-16 + top-4 = 5rem) */}
      <div className="absolute inset-x-0 -top-20 bottom-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <motion.div
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      {/* Content layer: stays within normal document flow, never behind the header */}
      <div className="relative z-10 flex flex-col justify-center gap-16 py-24">
        <div className="w-full px-4">
          <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center gap-8 md:flex-row md:justify-between">
            <div className="w-full md:w-[50%] flex items-center justify-center">
              <div className="max-w-xl text-center md:text-left">
                <h1
                  className="flex flex-wrap justify-center gap-x-2 text-3xl md:text-4xl font-black leading-snug text-white md:justify-start"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {HEADLINE.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.04, ease: 'easeOut' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
                <motion.p
                  className="mt-6 text-base md:text-lg text-white/75 leading-relaxed body-text"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
                >
                  Instala láminas con estándar americano, ofreciéndole a tus clientes un producto de buena calidad real y aumentá tu margen de ganancias.
                </motion.p>

                <motion.div
                  className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-start"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                    <Link
                      href="/contacto"
                      className="btn btn-primary w-full sm:w-auto"
                    >
                      CONTACTO VENTAS
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="w-full md:w-[45%] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              >
                <Image
                  src="/img/logo-f.png"
                  alt="Urban Film"
                  width={280}
                  height={112}
                  className="max-w-full h-auto"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="w-full px-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
        >
          <HeroReviewsCarousel />
        </motion.div>
      </div>
    </section>
  )
}
