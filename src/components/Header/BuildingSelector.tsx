"use client";

import React, { useEffect, useState } from "react";
import { SelectBuildings } from "@/components/SelectBuildings";
import type { SelectOption } from "@/components/common/select";

interface BuildingSelectorProps {
  initialBuildings: SelectOption[];
}

const STORAGE_KEY = "selectedBuilding";

const LOADING_OPTION: SelectOption = { id: 0, label: "Loading..." };
const ERROR_OPTION: SelectOption = { id: 0, label: "Loading failed" };

export default function BuildingSelector({
  initialBuildings,
}: BuildingSelectorProps) {
  const [isLoading, setIsLoading] = useState(initialBuildings.length === 0);
  const [error, setError] = useState(false);
  const [buildings, setBuildings] = useState<SelectOption[]>(initialBuildings);
  const [selectedBuilding, setSelectedBuilding] = useState<SelectOption | null>(
    null
  );

  // Initialize buildings and selected building
  useEffect(() => {
    if (initialBuildings.length > 0) {
      setBuildings(initialBuildings);
      setIsLoading(false);
      setError(false);

      // Try to restore selected building from localStorage
      const storedBuildingId = localStorage.getItem(STORAGE_KEY);
      if (storedBuildingId) {
        const found = initialBuildings.find(
          (b) => b.id.toString() === storedBuildingId
        );
        if (found) {
          setSelectedBuilding(found);
        }
      }
    } else {
      setIsLoading(true);
    }
  }, [initialBuildings]);

  const handleBuildingChange = (building: SelectOption) => {
    setSelectedBuilding(building);
    localStorage.setItem(STORAGE_KEY, building.id.toString());
  };

  if (error) {
    return (
      <div className="flex items-center">
        <p className="text-red-600 mr-4">Error loading buildings</p>
        <SelectBuildings
          buildings={[ERROR_OPTION]}
          value={ERROR_OPTION}
          onChange={() => {}}
          disabled={true}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <SelectBuildings
        buildings={[LOADING_OPTION]}
        value={LOADING_OPTION}
        onChange={() => {}}
        disabled={true}
      />
    );
  }

  return (
    <SelectBuildings
      buildings={buildings}
      value={selectedBuilding || undefined}
      onChange={handleBuildingChange}
      placeholder="Select a building..."
    />
  );
}
