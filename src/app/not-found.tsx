import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-light text-center px-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-secondary mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold mb-8">Page Not Found</h2>
      <p className="mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-secondary text-primary font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 border-2 border-light"
      >
        Go Back Home
      </Link>
    </main>
  );
} 