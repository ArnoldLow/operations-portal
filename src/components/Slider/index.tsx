"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ActivePanel } from "@/types";
import { useFocusTrap } from "@/components/common/useFocusTrap";

interface SliderProps {
  className?: string;
}

export default function Slider({ className }: SliderProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(ActivePanel.NONE);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(
    activePanel !== ActivePanel.NONE,
    panelRef,
    () => setActivePanel(ActivePanel.NONE),
    {
      initialFocus: true,
      restoreFocus: true,
    }
  );

  const handlePanelToggle = (panel: ActivePanel) => {
    setActivePanel(activePanel === panel ? ActivePanel.NONE : panel);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case ActivePanel.TICKETS:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Tickets</h2>
            <div className="space-y-2">ticket comps</div>
          </div>
        );
      case ActivePanel.NOTIFICATIONS:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Notifications
            </h2>
            <div className="space-y-2">notifications comps</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Content Overlay when open */}
      {activePanel !== ActivePanel.NONE && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity z-[998]"
          aria-hidden="true"
          onClick={() => setActivePanel(ActivePanel.NONE)}
        />
      )}

      {/* Right Panel Container */}
      <div className={`relative z-[999] ${className}`}>
        {/* Slider panel */}
        <div
          ref={panelRef}
          className={`
            fixed right-20 top-0 bottom-0 min-h-screen
            transition-all duration-300 ease-in-out 
            ${
              activePanel !== ActivePanel.NONE
                ? "w-[413px] shadow-2xl border-l border-gray-200"
                : "w-0"
            }
            bg-white-shell overflow-hidden rounded-l-2xl
          `}
          role="dialog"
          aria-modal="true"
          aria-label={
            activePanel !== ActivePanel.NONE
              ? `${activePanel} Panel`
              : undefined
          }
        >
          {activePanel !== ActivePanel.NONE && (
            <div className="p-6 bg-white h-full">
              <div className="flex justify-between items-center mb-6">
                {renderPanelContent()}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="fixed right-0 top-0 bottom-0 min-h-screen w-20 border-l-2 border-stone bg-white-shell flex flex-col items-center py-4 space-y-4">
          <button
            className={`
              w-12 h-12 flex items-center justify-center rounded-full
              transition-all duration-200
              ${
                activePanel === ActivePanel.NOTIFICATIONS
                  ? "border border-black bg-beige-light"
                  : "hover:border hover:border-black hover:bg-beige-light"
              }
            `}
            onClick={() => handlePanelToggle(ActivePanel.NOTIFICATIONS)}
            aria-label="Notifications"
            aria-expanded={activePanel === ActivePanel.NOTIFICATIONS}
            aria-controls="slider-panel"
          >
            <Image
              src="/icons/notifications.svg"
              width={24}
              height={24}
              alt=""
              className="transition-opacity text-navy-grey"
              aria-hidden="true"
            />
          </button>
          <button
            className={`
              w-12 h-12 flex items-center justify-center rounded-full
              transition-all duration-200
              ${
                activePanel === ActivePanel.TICKETS
                  ? "border border-gray-200 bg-beige-light"
                  : "hover:border hover:border-gray-200 hover:bg-beige-light"
              }
            `}
            onClick={() => handlePanelToggle(ActivePanel.TICKETS)}
            aria-label="Tickets"
            aria-expanded={activePanel === ActivePanel.TICKETS}
            aria-controls="slider-panel"
          >
            <Image
              src="/icons/ticket.svg"
              width={18}
              height={18}
              alt=""
              className="transition-opacity text-navy-grey"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
}
