import { Suspense } from "react";
import Navigation from "@/components/Nav";
import Slider from "@/components/Slider";
import Header from "@/components/Header";
import { getBuildings } from "@/app/actions";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operations Portal",
  description: "Fora Operations Portal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const buildingsData = await getBuildings();

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <div className="flex-1 pl-20">
            <div className="grid grid-cols-[1fr_5rem] min-h-screen relative">
              <div className="bg-white-shell">
                <Suspense
                  fallback={<div className="animate-pulse h-20 bg-gray-200" />}
                >
                  <Navigation />
                </Suspense>
                <Suspense
                  fallback={<div className="animate-pulse h-20 bg-gray-200" />}
                >
                  <Header buildingOptions={buildingsData} />
                </Suspense>
                <main>
                  <Suspense
                    fallback={
                      <div className="animate-pulse h-96 bg-gray-200" />
                    }
                  >
                    {children}
                  </Suspense>
                </main>
              </div>
              <Slider className="z-50" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
