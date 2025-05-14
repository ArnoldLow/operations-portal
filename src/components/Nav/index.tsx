"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}

const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: "/icons/icon.svg",
    iconWidth: 18,
    iconHeight: 18,
  },
  {
    name: "Meeting Rooms",
    href: "/meeting-rooms",
    icon: "/icons/calendar.svg",
    iconWidth: 18,
    iconHeight: 18,
  },
  {
    name: "Check In",
    href: "/check-in",
    icon: "/icons/check-in.svg",
    iconWidth: 24,
    iconHeight: 24,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-20 border-r-2 border-stone bg-white-shell flex flex-col items-center pt-8">
      {/* Branding */}
      <Link href="/" className="flex items-center justify-center mb-11">
        <Image
          src="/icons/FORA_logomarque_black_1_2x.png"
          alt="Logo"
          width={32}
          height={32}
          priority
          style={{ width: "32px", height: "32px" }}
        />
      </Link>
      {/* Navigation items */}
      <div className="flex flex-col items-center space-y-11">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ${
              pathname === item.href ? "bg-gray-100" : ""
            }`}
            aria-label={item.name}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={item.iconWidth}
              height={item.iconHeight}
              priority
              style={{
                width: `${item.iconWidth}px`,
                height: `${item.iconHeight}px`,
              }}
            />
          </Link>
        ))}
      </div>
      {/* Bottom aligned buttons */}
      <div className="mt-auto flex flex-col items-center space-y-11 mb-8">
        <button
          onClick={() => console.log("Building button clicked!")}
          className={`flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ${
            pathname === "/buildings" ? "bg-gray-100" : ""
          }`}
          aria-label="Buildings"
          type="button"
        >
          <Image
            src="/icons/building.svg"
            alt="Buildings"
            width={24}
            height={24}
            priority
            style={{ width: "24px", height: "24px" }}
          />
        </button>
        <button
          onClick={() => console.log("Logout button clicked!")}
          className={`flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ${
            pathname === "/logout" ? "bg-gray-100" : ""
          }`}
          aria-label="Logout"
          type="button"
        >
          <Image
            src="/icons/log-out.svg"
            alt="Logout"
            width={18}
            height={18}
            priority
            style={{ width: "18px", height: "18px" }}
          />
        </button>
      </div>
    </nav>
  );
}
