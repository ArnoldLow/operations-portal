import { useReducer, useEffect, useCallback, RefObject } from "react";
import { SelectOption } from "./select";

interface SelectState {
  isOpen: boolean;
  highlightedIndex: number;
  maxIndex: number;
}

type SelectAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "SET_HIGHLIGHTED_INDEX"; index: number }
  | { type: "NAVIGATE"; direction: "next" | "prev" | "first" | "last" };

function selectReducer(state: SelectState, action: SelectAction): SelectState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true, highlightedIndex: 0 };
    case "CLOSE":
      return { ...state, isOpen: false, highlightedIndex: -1 };
    case "SET_HIGHLIGHTED_INDEX":
      return { ...state, highlightedIndex: action.index };
    case "NAVIGATE":
      if (!state.isOpen) {
        return { ...state, isOpen: true, highlightedIndex: 0 };
      }
      switch (action.direction) {
        case "next":
          return {
            ...state,
            highlightedIndex:
              state.highlightedIndex >= state.maxIndex
                ? 0
                : state.highlightedIndex + 1,
          };
        case "prev":
          return {
            ...state,
            highlightedIndex:
              state.highlightedIndex <= 0
                ? state.maxIndex
                : state.highlightedIndex - 1,
          };
        case "first":
          return { ...state, highlightedIndex: 0 };
        case "last":
          return { ...state, highlightedIndex: state.maxIndex };
        default:
          return state;
      }
    default:
      return state;
  }
}

interface UseSelectProps {
  options: SelectOption[];
  containerRef: RefObject<HTMLDivElement>;
  listboxRef: RefObject<HTMLUListElement>;
  buttonRef: RefObject<HTMLButtonElement>;
  onSelect: (option: SelectOption) => void;
  disabled?: boolean;
}

export function useSelect({
  options,
  containerRef,
  listboxRef,
  buttonRef,
  onSelect,
  disabled = false,
}: UseSelectProps) {
  const [state, dispatch] = useReducer(selectReducer, {
    isOpen: false,
    highlightedIndex: -1,
    maxIndex: options.length - 1,
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          dispatch({ type: "NAVIGATE", direction: "next" });
          break;
        case "ArrowUp":
          event.preventDefault();
          dispatch({ type: "NAVIGATE", direction: "prev" });
          break;
        case "Home":
          event.preventDefault();
          dispatch({ type: "NAVIGATE", direction: "first" });
          break;
        case "End":
          event.preventDefault();
          dispatch({ type: "NAVIGATE", direction: "last" });
          break;
        case "Escape":
          event.preventDefault();
          dispatch({ type: "CLOSE" });
          buttonRef.current?.focus();
          break;
        case "Enter":
        case " ":
          if (state.isOpen && state.highlightedIndex !== -1) {
            event.preventDefault();
            onSelect(options[state.highlightedIndex]);
            dispatch({ type: "CLOSE" });
            buttonRef.current?.focus();
          }
          break;
      }
    },
    [
      state.isOpen,
      state.highlightedIndex,
      options,
      disabled,
      buttonRef,
      onSelect,
    ]
  );

  // Handle outside clicks
  useEffect(() => {
    if (!state.isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: "CLOSE" });
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [state.isOpen, containerRef, buttonRef]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!state.isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state.isOpen, handleKeyDown]);

  // Handle focus management
  useEffect(() => {
    if (state.isOpen && listboxRef.current && state.highlightedIndex !== -1) {
      const highlightedOption = listboxRef.current.children[
        state.highlightedIndex
      ] as HTMLElement;
      if (highlightedOption) {
        highlightedOption.scrollIntoView({ block: "nearest" });
        highlightedOption.focus();
      }
    }
  }, [state.isOpen, state.highlightedIndex, listboxRef]);

  return {
    isOpen: state.isOpen,
    highlightedIndex: state.highlightedIndex,
    openSelect: () => dispatch({ type: "OPEN" }),
    closeSelect: () => dispatch({ type: "CLOSE" }),
    setHighlightedIndex: (index: number) =>
      dispatch({ type: "SET_HIGHLIGHTED_INDEX", index }),
    handleKeyDown,
  };
}
