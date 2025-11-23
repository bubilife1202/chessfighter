'use client'

import { useState, useEffect } from 'react'

interface StatsCounterProps {
  end: number
  duration?: number
  label: string
  suffix?: string
}

export default function StatsCounter({
  end,
  duration = 2000,
  label,
  suffix = '',
}: StatsCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      setCount(Math.floor(end * percentage))

      if (percentage < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [end, duration])

  return (
    <div className="text-center p-4 rounded-xl hover:bg-purple-50 transition-all duration-300">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 text-sm md:text-base">{label}</div>
    </div>
  )
}
