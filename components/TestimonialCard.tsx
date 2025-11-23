'use client'

interface TestimonialCardProps {
  name: string
  role: string
  comment: string
  rating: number
  avatar: string
}

export default function TestimonialCard({
  name,
  role,
  comment,
  rating,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-5xl">{avatar}</div>
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-yellow-500 text-xl">
            {i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <p className="text-gray-700 italic">&ldquo;{comment}&rdquo;</p>
    </div>
  )
}
