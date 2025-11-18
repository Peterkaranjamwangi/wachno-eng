import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="mb-2 text-9xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for. The page might have been removed,
            had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-primary hover:underline">
              About Us
            </Link>
            <Link href="/services" className="text-primary hover:underline">
              Services
            </Link>
            <Link href="/products" className="text-primary hover:underline">
              Products
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
