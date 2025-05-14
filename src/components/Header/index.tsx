import React from "react";
import type { SelectOption } from "@/components/common/select";
import HeaderContent from "@/components/Header/HeaderContent";

interface HeaderProps {
  buildingOptions: SelectOption[];
}

export default function Header({ buildingOptions }: HeaderProps) {
  return <HeaderContent buildingOptions={buildingOptions} />;
}
