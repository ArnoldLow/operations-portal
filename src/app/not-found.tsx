import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white-shell">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-navy-grey">404</h1>
        <h2 className="text-2xl text-stone">Page Not Found</h2>
        <p className="text-stone/80 max-w-md mx-auto">
          The page you are looking for does not exist or has been temporarily
          removed.
        </p>
        <Link
          href="/"
          role="button"
          type="button"
          className="inline-block px-6 py-3 text-sm text-navy-grey border border-navy-grey rounded-full hover:bg-navy-grey hover:text-white transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
