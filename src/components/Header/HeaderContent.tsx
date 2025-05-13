"use client";

import React from "react";
import BuildingSelector from "./BuildingSelector";
import { usePathname } from "next/navigation";
import type { SelectOption } from "@/components/common/select";

interface HeaderContentProps {
  buildingOptions: SelectOption[];
}

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/meeting-rooms":
      return "Meeting Room Bookings";
    case "/":
      return "Hey, Joe"; // TODO: change to ${username}, mb mock users in db
    default:
      return "FORA Operations Portal";
  }
};

export default function HeaderContent({ buildingOptions }: HeaderContentProps) {
  const pathname = usePathname();

  return (
    <header className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 pt-7 px-6 md:px-28 pb-9">
      <div className="flex items-center">
        <h1 className="text-2xl text-gray-600">{getPageTitle(pathname)}</h1>
      </div>
      <div className="flex items-center">
        <BuildingSelector initialBuildings={buildingOptions} />
      </div>
    </header>
  );
}
