"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

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

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/meeting-rooms":
      return "Meeting Room Bookings";
    case "/viewings":
      return "Viewings";
    case "/":
      return "Hey, Joe"; // TODO: change to ${username}, mb mock users in db
    case "/settings":
      return "Settings";
    case "/check-in":
      return "Check In";
    case "/building":
      return "Building Management";
    default:
      return "Hey, Joe";
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

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

      {/* Main content area */}
      <div className="flex-1 pl-20">
        <div className="grid grid-cols-[1fr_5rem] min-h-screen relative">
          {/* Left content area */}
          <div className="col-span-1">
            <div className="px-6 md:px-28 py-9">
              <Header title={pageTitle} />
            </div>
            <main className="px-6 md:px-28">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
