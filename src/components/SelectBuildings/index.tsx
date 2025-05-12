"use client";
import React from "react";
import Select, { SelectOption } from "@/components/common/select";

interface SelectBuildingsProps {
  buildings: SelectOption[];
  value?: SelectOption;
  onChange: (building: SelectOption) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function SelectBuildings({
  buildings,
  value,
  onChange,
  disabled,
  placeholder,
  className,
}: SelectBuildingsProps) {
  return (
    <Select
      selectId="buildings"
      options={buildings}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}
