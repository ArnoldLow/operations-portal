"use client";

import React, { useState } from "react";
import { SelectBuildings } from "@/components/SelectBuildings";
import type { SelectOption } from "@/components/common/select";

interface BuildingSelectorProps {
  initialBuildings: SelectOption[];
  className?: string;
}

const STORAGE_KEY = "selectedBuilding";

export default function BuildingSelector({
  initialBuildings,
  className,
}: BuildingSelectorProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<SelectOption | null>(
    () => {
      // Initialize selected building from localStorage if available
      const storedBuildingId = localStorage.getItem(STORAGE_KEY);
      if (storedBuildingId) {
        const found = initialBuildings.find(
          (b) => b.id.toString() === storedBuildingId
        );
        if (found) {
          return found;
        }
      }
      return null;
    }
  );

  const handleBuildingChange = (building: SelectOption) => {
    setSelectedBuilding(building);
    localStorage.setItem(STORAGE_KEY, building.id.toString());
  };

  return (
    <SelectBuildings
      buildings={initialBuildings}
      value={selectedBuilding || undefined}
      onChange={handleBuildingChange}
      placeholder="Select a building"
      className={className}
    />
  );
}
