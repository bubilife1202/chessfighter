import Link from 'next/link'

export default function WorldNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">월드를 찾을 수 없습니다</h1>
        <Link href="/worlds" className="text-purple-600 hover:text-purple-800 font-medium">
          ← 월드맵으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
