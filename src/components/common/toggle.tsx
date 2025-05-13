import { useState } from "react";
import { ViewTypeEnum } from "@/helpers/toggleVariants";

interface ToggleProps {
  options: { id: ViewTypeEnum; label: string }[];
  defaultSelected?: ViewTypeEnum;
  onChange?: (selectedId: ViewTypeEnum) => void;
  className?: string;
}

export default function Toggle({
  options,
  defaultSelected = ViewTypeEnum.Live,
  onChange,
  className,
}: ToggleProps) {
  const [selectedId, setSelectedId] = useState<ViewTypeEnum>(defaultSelected);

  const handleSelect = (id: ViewTypeEnum) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <div role="tablist" aria-label="View options" className={className}>
      {options.map((option) => (
        <button
          key={option.id}
          role="tab"
          aria-selected={selectedId === option.id}
          aria-controls={`panel-${option.id}`}
          id={`tab-${option.id}`}
          onClick={() => handleSelect(option.id)}
          className={`
            px-6 py-3 text-base rounded-full transition-all duration-200
            ${
              selectedId === option.id
                ? "bg-white text-navy-grey shadow-sm"
                : "text-stone hover:text-navy-grey"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
