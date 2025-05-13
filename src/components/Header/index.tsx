import React from "react";
import { getBuildings } from "@/app/actions";
import type { Buildings } from "@/db";
import HeaderContent from "@/components/Header/HeaderContent";

export default async function Header() {
  // Fetch buildings data server-side
  const buildingsData = await getBuildings();

  return <HeaderContent buildingOptions={buildingsData} />;
}
