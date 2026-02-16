import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Smart Bookmark Manager
        </h1>
        <p className="text-xl text-gray-600">
          Save and organize your favorite links
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}