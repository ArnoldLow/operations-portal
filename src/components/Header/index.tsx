"use client";

import React from "react";
import { getBuildings } from "@/app/actions";
import type { Buildings } from "@/db";
import type { SelectOption } from "@/components/common/select";
import BuildingSelector from "./BuildingSelector";
import { usePathname } from "next/navigation";

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
      return "FORA Operations Portal";
  }
};

export default async function Header() {
  const pathname = usePathname();

  let buildingOptions: SelectOption[] = [];

  try {
    const buildingsData = await getBuildings();
    buildingOptions = buildingsData.map((building: Buildings) => ({
      id: building.id,
      label: building.name,
      description: building.address,
    }));
  } catch (err) {
    console.error("Error fetching buildings:", err);
  }

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
