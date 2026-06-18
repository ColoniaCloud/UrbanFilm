'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    timersRef.current.push(
      window.setTimeout(() => setOverlayVisible(true), 1500)
    )
    timersRef.current.push(
      window.setTimeout(() => setLogoVisible(true), 1700)
    )
    timersRef.current.push(
      window.setTimeout(() => setTextVisible(true), 2000)
    )

    return () => {
      timersRef.current.forEach(window.clearTimeout)
    }
  }, [])

  return (
    <section className="relative h-[80vh] -mt-16 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div
        className={
          'absolute inset-0 bg-black/70 transition-opacity duration-700 ' +
          (overlayVisible ? 'opacity-100' : 'opacity-0')
        }
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-4">
          <div className="mx-auto flex h-full max-w-6xl flex-col-reverse items-center justify-center gap-8 md:flex-row md:justify-between">
            <div className="w-full md:w-[50%] flex items-center justify-center">
              <div
                className={
                  'max-w-xl text-center md:text-left transition-all duration-700 ease-out ' +
                  (textVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8')
                }
              >
                <h1 className="text-3xl md:text-4xl font-black leading-snug text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Disfrutá tus rutas con más confort
                </h1>
                <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed body-text">
                  Láminas polarizadas Urban Film te otorgan confort y protección para hacer de tus viajes un tiempo más disfrutable.
                </p>

                <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-start">
                  <Link
                    href="/contacto"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    PARA MI AUTO
                  </Link>
                  <Link
                    href="/contacto"
                    className="btn btn-secondary w-full sm:w-auto"
                  >
                    SOY INSTALADOR
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[45%] flex items-center justify-center">
              <div
                className={
                  'transition-all duration-700 ease-out ' +
                  (logoVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8')
                }
              >
                <Image
                  src="/img/logo-f.png"
                  alt="Urban Film"
                  width={280}
                  height={112}
                  className="max-w-full h-auto"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
