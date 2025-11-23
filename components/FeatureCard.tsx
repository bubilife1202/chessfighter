'use client'

import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  gradient: string
  benefits: string[]
}

export default function FeatureCard({
  icon,
  title,
  description,
  gradient,
  benefits,
}: FeatureCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 md:p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-xl border border-white/20`}
    >
      <div className="text-5xl md:text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
      <p className="text-sm md:text-base opacity-90 mb-4">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2 text-sm md:text-base">
            <span className="text-xl flex-shrink-0">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
