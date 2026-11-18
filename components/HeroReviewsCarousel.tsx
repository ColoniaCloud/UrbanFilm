'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

type Review = {
  text: string
  name: string
  zone: string
}

const reviews: Review[] = [
  {
    text: 'Desde que instalo Urban Film mis clientes notan la diferencia al toque y vuelven a buscarme para más vehículos.',
    name: 'Martín Sosa',
    zone: 'Zona Norte, Buenos Aires',
  },
  {
    text: 'El estándar americano se nota en la terminación. Subí mi ticket promedio sin perder clientes.',
    name: 'Diego Fernández',
    zone: 'CABA',
  },
  {
    text: 'Es la lámina que más margen me deja y la que menos reclamos me trae. Eso es todo lo que necesito.',
    name: 'Lucas Romero',
    zone: 'Zona Oeste, Buenos Aires',
  },
  {
    text: 'Mis clientes preguntan por la marca antes de agendar el turno. Se ganó su lugar solo.',
    name: 'Fernando Acosta',
    zone: 'Zona Sur, Buenos Aires',
  },
  {
    text: 'Trabajo con varias líneas y esta es la que me permite cobrar mejor sin perder competitividad.',
    name: 'Nicolás Peralta',
    zone: 'La Plata, Buenos Aires',
  },
]

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.55 10.78l7.98-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  return (
    <div className={'relative overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] ' + className}>
      {/* Reflejo diagonal tipo vidrio polarizado */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-1/2 -left-1/4 h-[200%] w-1/3 rotate-12 bg-white/5 blur-2xl" />

      <p className="relative body-text text-sm sm:text-base text-white/85 leading-relaxed italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="relative mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <GoogleG className="h-6 w-6 shrink-0" />
        <div>
          <p className="heading text-white text-sm font-bold uppercase tracking-widest">
            {review.name}
          </p>
          <p className="body-text text-xs text-white/50 mt-1">{review.zone}</p>
        </div>
      </div>
    </div>
  )
}

export default function HeroReviewsCarousel() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    // Con movimiento reducido no hay avance automático de las reseñas.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    timerRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length)
    }, 5000)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="w-full">
      {/* Mobile: single-card carousel */}
      <div className="md:hidden">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {reviews.map((review, i) => (
              <div key={i} className="w-full shrink-0 px-2 sm:px-0">
                <div className="mx-auto max-w-2xl">
                  <ReviewCard review={review} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver reseña ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                'h-1.5 rounded-full transition-all duration-300 ' +
                (i === index ? 'w-6 bg-white/80' : 'w-1.5 bg-white/30')
              }
            />
          ))}
        </div>
      </div>

      {/* Desktop: slow continuous marquee of multiple cards */}
      <div className="hidden md:block overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex w-max gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={i} review={review} className="w-95 shrink-0" />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
