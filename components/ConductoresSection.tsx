'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const SLIDER_IMAGES = [
  '/img/kaiser.jpg',
  '/img/karbon.jpg',
  '/img/keramx.jpg',
  '/img/klar.jpg',
  '/img/klass.jpg',
  '/img/krypton.jpg',
]

const WORDS = ['confort', 'seguridad', 'privacidad', 'protección']

const CARDS = [
  {
    id: 'termico',
    title: 'Confort térmico',
    text: 'Reducí la temperatura interior del vehículo y viajá más cómodo, sin depender tanto del aire acondicionado.',
    paths: [
      'M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
    ],
  },
  {
    id: 'deslumbramiento',
    title: 'Menos deslumbramiento',
    text: 'Manejá con menor fatiga visual. El sol o las luces nocturnas ya no serán un problema.',
    paths: [
      'M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z',
      'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    ],
  },
  {
    id: 'privacidad',
    title: 'Privacidad real',
    text: 'Disfrutá tu espacio con tranquilidad. Tu mundo adentro, sin afectar tu visibilidad.',
    paths: [
      'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
    ],
  },
  {
    id: 'uv',
    title: 'Protección UV',
    text: 'Bloqueá los rayos que dañan la piel y deterioran los materiales del interior del auto.',
    paths: [
      'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
    ],
  },
]

function CardIcon({ paths }: { paths: string[] }) {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {paths.map((d, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
    </svg>
  )
}

export default function ConductoresSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [wordIn, setWordIn] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setImgIndex((i) => (i + 1) % SLIDER_IMAGES.length)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setWordIn(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setWordIn(true)
      }, 350)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

      {/* Left: masonry-style cards */}
      <div className="p-8 xl:p-12 flex flex-col gap-4">

        {/* Card 0 — full width */}
        <div
          className="bg-white border border-gray-100 p-7 rounded-xl shadow-sm transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transitionDelay: '0ms',
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-5">
            <CardIcon paths={CARDS[0].paths} />
          </div>
          <h3 className="font-bold uppercase tracking-wide text-sm mb-2 heading">{CARDS[0].title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed body-text">{CARDS[0].text}</p>
        </div>

        {/* Cards 1-3 — three columns */}
        <div className="grid grid-cols-3 gap-3">
          {CARDS.slice(1).map((card, i) => (
            <div
              key={card.id}
              className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm transition-all duration-700 ease-out flex flex-col"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${(i + 1) * 110}ms`,
              }}
            >
              <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center mb-3 shrink-0">
                <CardIcon paths={card.paths} />
              </div>
              <h3 className="font-bold uppercase tracking-wide text-xs mb-1.5 heading leading-tight">{card.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed body-text line-clamp-3">{card.text}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Right: image slider + rotating word */}
      <div className="p-8 xl:p-12 h-full flex items-stretch">
        <div className="relative overflow-hidden rounded-xl w-full min-h-[440px]">

          {SLIDER_IMAGES.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === imgIndex ? 1 : 0 }}
            >
              <Image src={src} alt="" fill className="object-cover" priority={i === 0} />
            </div>
          ))}

          <div className="absolute inset-0 bg-black/65 z-10" />

          <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
            <span
              className="text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-widest text-white heading text-center transition-all duration-300 ease-out"
              style={{
                opacity: wordIn ? 1 : 0,
                transform: wordIn ? 'scale(1) translateY(0px)' : 'scale(0.93) translateY(10px)',
              }}
            >
              {WORDS[wordIndex]}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
