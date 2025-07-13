
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      easing: (t) => t, // Use a linear easing function for consistent speed
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
