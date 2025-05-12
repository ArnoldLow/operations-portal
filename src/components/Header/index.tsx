"use client";

import React from "react";
import Select, { SelectOption } from "@/components/common/select";
import { getBuildings } from "@/app/actions";
import type { Buildings } from "@/db";
import { SelectBuildings } from "@/components/SelectBuildings";
import { usePathname } from "next/navigation";

interface HeaderProps {
  title?: string;
}

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

export default async function Header({ title }: HeaderProps) {
  const pathname = usePathname();
  // Fetch buildings data
  let buildingOptions: SelectOption[] = [];

  try {
    const buildingsData = await getBuildings();

    // Transform buildings data to match SelectOption type
    buildingOptions = buildingsData.map((building: Buildings) => ({
      id: building.id,
      label: building.name,
      description: building.address,
    }));
  } catch (error) {
    console.error("Error fetching buildings:", error);
    // Return a simple header without the select if there's an error
    return (
      <header className="sticky top-0 z-40">
        <div className="flex justify-between items-start">
          <h1 className="text-[28px] text-gray-700">
            {getPageTitle(pathname)}
          </h1>
          <div className="flex items-center">
            <p className="text-red-600 mr-4">Error loading buildings</p>
            <SelectBuildings
              buildings={[{ id: 0, label: "Loading failed" }]}
              disabled={true}
            />
          </div>
        </div>
      </header>
    );
  }

  // Only render the BuildingSelect if we have buildings
  return (
    <header className="sticky top-0 z-40">
      <div className="flex justify-between items-start">
        <h1 className="text-[28px] text-gray-700">{getPageTitle(pathname)}</h1>
        {buildingOptions.length > 0 && (
          <SelectBuildings buildings={buildingOptions} />
        )}
      </div>
    </header>
  );
}
