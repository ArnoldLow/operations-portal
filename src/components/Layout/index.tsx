"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: "/icons/icon.svg" },
  { name: "Calendar", href: "/calendar", icon: "/icons/calendar.svg" },
  { name: "Check-In", href: "/check-in", icon: "/icons/check-in.svg" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Left Navigation Column */}
      <div className="fixed inset-y-0 left-0 w-20 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex h-20 items-center justify-center">
            <Image
              src="/icons/FORA_logomarque_black_2x.png"
              width={32}
              height={32}
              alt="FORA"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col items-center gap-4 py-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center justify-center w-12 h-12 rounded-lg
                  ${pathname === item.href ? "bg-gray-100" : "hover:bg-gray-50"}
                  transition-colors duration-200
                `}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <Image
                  src={item.icon}
                  width={24}
                  height={24}
                  alt={item.name}
                  className={`
                    ${pathname === item.href ? "opacity-100" : "opacity-60"}
                    transition-opacity duration-200
                  `}
                  aria-hidden="true"
                />
                <span className="sr-only">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pl-20">{children}</main>
    </div>
  );
}
