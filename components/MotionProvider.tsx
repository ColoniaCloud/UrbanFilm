'use client'

import { MotionConfig } from 'motion/react'

/** Respeta prefers-reduced-motion en todos los componentes de motion de la app. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
