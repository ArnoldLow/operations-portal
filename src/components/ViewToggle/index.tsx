import Toggle from "@/components/common/toggle";
import {
  ViewTypeEnum,
  ToggleVariantEnum,
  ViewOptionType,
  viewOptions,
} from "@/helpers/toggleVariants";

interface ViewToggleProps {
  onChange?: (view: ViewTypeEnum) => void;
  defaultView?: ViewTypeEnum;
  options?: ViewOptionType[];
  variant?: ToggleVariantEnum;
  className?: string;
}

export default function ViewToggle({
  onChange,
  defaultView = ViewTypeEnum.Live,
  options = viewOptions,
  variant = ToggleVariantEnum.Default,
  className,
}: ViewToggleProps) {
  return (
    <Toggle
      options={options}
      defaultSelected={defaultView}
      onChange={onChange}
      className={`
        inline-flex p-1
        ${
          variant === ToggleVariantEnum.Rounded
            ? "rounded-none rounded-r-lg"
            : "rounded-full"
        }
        ${className}
      `}
    />
  );
}
