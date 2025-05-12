"use client";
import React from "react";
import Select, { SelectOption } from "@/components/common/select";

interface SelectBuildingsProps {
  buildings: SelectOption[];
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function SelectBuildings({
  buildings,
  disabled,
  placeholder,
  className,
}: SelectBuildingsProps) {
  const [selectedBuilding, setSelectedBuilding] = React.useState<SelectOption>(
    buildings[0]
  );

  return (
    <Select
      selectId="buildings"
      options={buildings}
      value={selectedBuilding}
      onChange={setSelectedBuilding}
      className={className}
      disabled={disabled}
    />
  );
}
