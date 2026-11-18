'use client'

import { LazyMotion, MotionConfig } from 'framer-motion'

// Las funciones de animación se descargan aparte, después de la primera carga:
// el JS inicial incluye solo el componente `m` (unos pocos kB) y no todo motion.
const loadFeatures = () => import('@/components/motionFeatures').then((mod) => mod.default)

/**
 * Motion para toda la parte pública: carga diferida (`strict` obliga a usar `m` en vez de
 * `motion`) y respeta prefers-reduced-motion en todos los componentes animados.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
