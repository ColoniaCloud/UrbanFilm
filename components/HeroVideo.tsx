'use client'

import { useEffect, useRef } from 'react'

/** Video decorativo del hero. Se pausa si el usuario pidió movimiento reducido. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (query.matches) video.pause()
      else void video.play().catch(() => {})
    }

    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src="/video/hero.mp4"
      poster="/video/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  )
}
