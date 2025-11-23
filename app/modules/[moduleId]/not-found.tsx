import Link from 'next/link'

export default function ModuleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <p className="text-6xl">🧐</p>
        <h1 className="text-3xl font-bold text-gray-800">모듈을 찾을 수 없습니다</h1>
        <Link
          href="/worlds"
          className="inline-block text-purple-600 font-semibold hover:text-purple-700"
        >
          월드맵으로 돌아가기 →
        </Link>
      </div>
    </div>
  )
}
