'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
}

export default function ScrambleText({ text, className, delay = 0 }: ScrambleTextProps) {
  const [display, setDisplay] = useState('')
  const iteration = useRef(0)
  const frame = useRef(0)
  const started = useRef(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      started.current = true
      const animate = () => {
        const progress = iteration.current / text.length
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < iteration.current) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        if (iteration.current < text.length + 3) {
          iteration.current += 0.4
          frame.current = requestAnimationFrame(animate)
        } else {
          setDisplay(text)
        }
      }
      frame.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame.current)
    }
  }, [text, delay])

  return <span className={className}>{display || text}</span>
}