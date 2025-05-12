"use client";

import React, {
  useRef,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useSelect } from "./useSelect";
import { useFocusTrap } from "./useFocusTrap";

type IconProps = {
  className: string;
};

type IconComponent = React.ComponentType<IconProps>;

export interface SelectOption {
  id: number;
  label: string;
  description?: string;
  icon?: IconComponent;
  iconLabel?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption) => void;
  selectId: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  icon?: IconComponent;
}

export default function Select({
  options,
  value,
  onChange,
  selectId,
  error,
  disabled = false,
  required = false,
  className = "",
  icon: Icon,
}: SelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = `select-${selectId}`;
  const describedBy = error ? `${id}-error` : undefined;

  const {
    isOpen,
    highlightedIndex,
    openSelect,
    closeSelect,
    setHighlightedIndex,
    handleKeyDown,
  } = useSelect({
    options,
    containerRef,
    listboxRef,
    buttonRef,
    onSelect: onChange,
    disabled,
  });

  useFocusTrap(isOpen, containerRef, closeSelect);

  useEffect(() => {
    if (isOpen && listboxRef.current) {
      const firstOption =
        listboxRef.current.querySelector<HTMLElement>('li[role="option"]');
      if (firstOption) {
        firstOption.focus();
      }
    }
  }, [isOpen]);

  const handleOptionKeyDown = (
    e: ReactKeyboardEvent<HTMLLIElement>,
    option: SelectOption,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(option);
      closeSelect();
      buttonRef.current?.focus();
    } else {
      handleKeyDown(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-owns={`${id}-listbox`}
      aria-controls={`${id}-listbox`}
    >
      <button
        ref={buttonRef}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-describedby={describedBy}
        aria-required={required}
        aria-controls={`${id}-listbox`}
        disabled={disabled}
        tabIndex={isOpen ? -1 : 0}
        className={`
          w-full flex items-center justify-between px-3 py-2 text-left
          border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${error ? "border-red-300" : "border-gray-300"}
          ${
            disabled
              ? "bg-gray-50 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-50"
          }
        `}
        onClick={() => (isOpen ? closeSelect() : openSelect())}
        onKeyDown={handleKeyDown}
      >
        <span className="flex items-center">
          <span className="block truncate">{value.label}</span>
        </span>
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}

      {isOpen && (
        <ul
          ref={listboxRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.id === value.id}
              tabIndex={0}
              className={`
                cursor-pointer select-none relative py-2 pl-3 pr-9
                ${highlightedIndex === index ? "bg-gray-100" : ""}
                ${option.id === value.id ? "text-gray-900" : "text-gray-700"}
                hover:bg-gray-100 focus:outline-none focus:bg-gray-100
              `}
              onClick={(e) => {
                e.preventDefault();
                onChange(option);
                closeSelect();
                buttonRef.current?.focus();
              }}
              onKeyDown={(e) => handleOptionKeyDown(e, option, index)}
              onFocus={() => setHighlightedIndex(index)}
            >
              <div className="flex items-center">
                {option.icon && (
                  <option.icon className="mr-3 h-5 w-5 text-gray-400" />
                )}
                <span className="block truncate font-normal">
                  {option.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
