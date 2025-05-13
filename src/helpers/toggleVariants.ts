export enum ViewTypeEnum {
  Live = "live",
  Calendar = "calendar",
}

export enum ToggleVariantEnum {
  Default = "default",
  Rounded = "rounded",
}

export interface ViewOptionType {
  id: ViewTypeEnum;
  label: string;
}

export const viewOptions: ViewOptionType[] = [
  { id: ViewTypeEnum.Live, label: "Live Availability" },
  { id: ViewTypeEnum.Calendar, label: "Calendar" },
];
