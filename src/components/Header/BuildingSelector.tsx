"use client";

import React, { useEffect, useState } from "react";
import { SelectBuildings } from "@/components/SelectBuildings";
import type { SelectOption } from "@/components/common/select";

interface BuildingSelectorProps {
  initialBuildings: SelectOption[];
}

export default function BuildingSelector({
  initialBuildings,
}: BuildingSelectorProps) {
  const [isLoading, setIsLoading] = useState(initialBuildings.length === 0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialBuildings.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setError(false);
    }
  }, [initialBuildings]);

  if (error) {
    return (
      <div className="flex items-center">
        <p className="text-red-600 mr-4">Error loading buildings</p>
        <SelectBuildings
          buildings={[{ id: 0, label: "Loading failed" }]}
          disabled={true}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <SelectBuildings
        buildings={[{ id: 0, label: "Loading..." }]}
        disabled={true}
      />
    );
  }

  return <SelectBuildings buildings={initialBuildings} />;
}
