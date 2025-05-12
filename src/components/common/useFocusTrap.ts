import { useEffect, RefObject } from "react";

const DEFAULT_FOCUSABLE_ELEMENTS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapOptions {
  focusElementSelector?: string;
  initialFocus?: boolean;
  restoreFocus?: boolean;
}

export function useFocusTrap(
  isActive: boolean,
  containerRef: RefObject<HTMLElement>,
  onEscape?: () => void,
  options: UseFocusTrapOptions = {}
) {
  const {
    focusElementSelector = DEFAULT_FOCUSABLE_ELEMENTS,
    initialFocus = true,
    restoreFocus = true,
  } = options;

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocusedElement = document.activeElement;

    // Focus the first focusable element when the trap is activated
    if (initialFocus) {
      const firstFocusable =
        container.querySelector<HTMLElement>(focusElementSelector);
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = Array.from(
          container.querySelectorAll<HTMLElement>(focusElementSelector)
        ).filter((el) => {
          const style = window.getComputedStyle(el);
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            !el.hasAttribute("disabled")
          );
        });

        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        const isTabbing = !e.shiftKey;

        if (!container.contains(document.activeElement)) {
          e.preventDefault();
          (isTabbing ? firstFocusable : lastFocusable).focus();
          return;
        }

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
          return;
        }

        if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      // Restore focus when the trap is deactivated
      if (
        restoreFocus &&
        previouslyFocusedElement instanceof HTMLElement &&
        typeof previouslyFocusedElement.focus === "function"
      ) {
        previouslyFocusedElement.focus();
      }
    };
  }, [
    isActive,
    containerRef,
    onEscape,
    focusElementSelector,
    initialFocus,
    restoreFocus,
  ]);
}
