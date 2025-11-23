import ChessGame from '@/components/ChessGame'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ♟️ Chess Quest
          </h1>
          <p className="text-xl text-gray-600">
            The Grandmaster&apos;s Journey
          </p>
          <p className="text-md text-gray-500 mt-2">
            아이의 두뇌를 깨우는 64칸의 모험
          </p>
        </div>

        <ChessGame />
      </div>
    </main>
  )
}
