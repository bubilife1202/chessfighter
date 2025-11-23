'use client'

import Link from 'next/link'

interface PricingCardProps {
  title: string
  price: string
  period: string
  features: string[]
  cta: string
  href: string
  isPopular?: boolean
  gradient: string
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  cta,
  href,
  isPopular = false,
  gradient,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl p-8 ${
        isPopular ? 'ring-4 ring-purple-500 transform scale-105' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          🔥 인기 플랜
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {price}
          </span>
          <span className="text-gray-600">/ {period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-green-500 text-xl flex-shrink-0">✓</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={href}>
        <button
          className={`w-full bg-gradient-to-r ${gradient} text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
        >
          {cta}
        </button>
      </Link>
    </div>
  )
}
