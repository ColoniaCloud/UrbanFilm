'use client'

import { useState } from 'react'

type Review = {
  text: string
  name: string
  zone: string
}

const REVIEWS: Review[] = [
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-ink-800 p-6 sm:p-8">
      <blockquote className="body-text text-sm leading-relaxed text-white/85 sm:text-base">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-white/10 pt-4">
        <p className="heading text-sm font-bold uppercase tracking-widest text-white">{review.name}</p>
        <p className="body-text mt-1 text-xs text-mist-300">{review.zone}</p>
      </figcaption>
    </figure>
  )
}

export default function Reviews() {
  const [pausado, setPausado] = useState(false)

  return (
    <section className="bg-ink-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="mb-3 text-xs uppercase tracking-widest text-mist-300">Instaladores</p>
        <h2 className="heading text-3xl font-bold uppercase tracking-widest md:text-4xl">Lo que dicen quienes la instalan</h2>
      </div>

      {/* Móvil: tarjetas con scroll horizontal y snap. Se desliza con el dedo; no avanza solo. */}
      <div
        role="region"
        aria-label="Reseñas de instaladores"
        tabIndex={0}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:hidden"
      >
        {REVIEWS.map((review) => (
          <div key={review.name} className="w-[85%] shrink-0 snap-center">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* Escritorio: cinta continua. Se detiene con el mouse encima y con el botón Pausar. */}
      <div className="mt-10 hidden md:block">
        <div
          role="region"
          aria-label="Reseñas de instaladores"
          className="reviews-viewport overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="reviews-track flex w-max gap-6 pr-6" data-paused={pausado}>
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div key={i} className="w-96 shrink-0" aria-hidden={i >= REVIEWS.length ? true : undefined}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            aria-pressed={pausado}
            onClick={() => setPausado((p) => !p)}
            className="btn-icon inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-mist-300 hover:text-white"
          >
            {pausado ? 'Reanudar movimiento' : 'Pausar movimiento'}
          </button>
        </div>
      </div>
    </section>
  )
}
