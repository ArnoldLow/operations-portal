import { Suspense } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Nav";

interface LayoutProps {
  children: React.ReactNode;
}

// Server component for layout
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Main content */}
      <div className="flex-1 pl-20">
        <div className="grid grid-cols-[1fr_5rem] min-h-screen relative">
          {/* Left content area */}
          <div className="col-span-1">
            <Suspense fallback={<div>Loading navigation...</div>}>
              <Navigation />
            </Suspense>
            <Suspense fallback={<div>Loading header...</div>}>
              <Header />
            </Suspense>
            <main className="px-6 md:px-28">
              <Suspense fallback={<div>Loading content...</div>}>
                {children}
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
