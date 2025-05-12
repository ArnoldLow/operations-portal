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

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-20 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center h-full py-6">
        {/* Logo */}
        <Link href="/" className="mb-8">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            priority
          />
        </Link>
        <div className="flex-1 flex flex-col items-center space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`p-2 rounded-lg hover:bg-gray-100 ${
                pathname === item.href ? "bg-gray-100" : ""
              }`}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                priority
              />
            </Link>
          ))}
        </div>

        <Link
          href="/settings"
          className={`p-2 rounded-lg hover:bg-gray-100 ${
            pathname === "/settings" ? "bg-gray-100" : ""
          }`}
        >
          <Image
            src="/icons/settings.svg"
            alt="Settings"
            width={24}
            height={24}
            priority
          />
        </Link>
      </div>
    </nav>
  );
}
