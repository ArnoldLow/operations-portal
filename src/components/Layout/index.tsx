import { Suspense } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Nav";
import Slider from "@/components/Slider";
interface LayoutProps {
  children: React.ReactNode;
}

// Loading skeleton that matches navigation bar
function NavSkeleton() {
  return (
    <nav className="fixed left-0 top-0 bottom-0 w-20 border-r-2 border-stone bg-white-shell flex flex-col items-center pt-8">
      {/* Logo skeleton */}
      <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse mb-11" />

      {/* Nav items skeleton */}
      <div className="flex flex-col items-center space-y-11">
        <div className="w-6 h-6 bg-gray-300 rounded-lg animate-pulse" />
        <div className="w-6 h-6 bg-gray-300 rounded-lg animate-pulse" />
        <div className="w-6 h-6 bg-gray-300 rounded-lg animate-pulse" />
      </div>

      {/* Bottom buttons skeleton */}
      <div className="mt-auto flex flex-col items-center space-y-11 mb-8">
        <div className="w-6 h-6 bg-gray-300 rounded-lg animate-pulse" />
        <div className="w-6 h-6 bg-gray-300 rounded-lg animate-pulse" />
      </div>
    </nav>
  );
}

// Loading skeleton that matches the header
function HeaderSkeleton() {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 pt-7 px-6 md:px-28 pb-9">
      <div className="flex items-center">
        <div className="h-8 w-64 bg-gray-300 rounded-lg animate-pulse" />
      </div>
      <div className="flex items-center">
        <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse" />
      </div>
    </header>
  );
}

// Content skeleton that matches the page structure
function ContentSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 px-6 md:px-28 pb-9">
      <section>
        <div className="h-8 w-48 bg-gray-300 rounded-lg animate-pulse mb-8" />
        <div className="space-y-4">
          <div className="h-10 w-64 bg-gray-300 rounded-lg animate-pulse" />
          <div className="h-32 w-full bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </section>
    </div>
  );
}

// Server component for layout
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Main content */}
      <div className="flex-1 pl-20">
        <div className="grid grid-cols-[1fr_5rem] min-h-screen relative">
          {/* Left content area */}
          <div className="bg-white-shell">
            <Suspense fallback={<NavSkeleton />}>
              <Navigation />
            </Suspense>
            <Suspense fallback={<HeaderSkeleton />}>
              <Header />
            </Suspense>
            <main>
              <Suspense fallback={<ContentSkeleton />}>{children}</Suspense>
            </main>
          </div>
          <Slider className="z-50" />
        </div>
      </div>
    </div>
  );
}
