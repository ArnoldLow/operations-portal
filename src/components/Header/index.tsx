"use client";

import React, { useState } from "react";
import Select, { SelectOption } from "@/components/common/select";

const buildings: SelectOption[] = [
  {
    id: 1,
    label: "Stanley Building",
    description: "71 Central Street, London EC1V 8AB",
  },
  {
    id: 2,
    label: "Borough Building",
    description: "180 Borough High Street, London SE1 1LB",
  },
  {
    id: 3,
    label: "Soho Building",
    description: "33 Broadwick Street, London W1F 0DQ",
  },
];

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const [selectedBuilding, setSelectedBuilding] = useState<SelectOption>(
    buildings[0]
  );

  return (
    <header className="sticky top-0 z-40">
      <div className="flex justify-between items-start">
        <h1 className="text-[28px] text-gray-700">{title}</h1>
        <Select
          selectId="buildings"
          options={buildings}
          value={selectedBuilding}
          onChange={setSelectedBuilding}
          className="min-w-[240px]"
        />
      </div>
    </header>
  );
};

export default Header;
