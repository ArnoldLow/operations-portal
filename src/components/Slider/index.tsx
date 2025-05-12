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
          className="fixed inset-0 right-[500px] bg-white/50 transition-opacity z-[998]"
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
            ${activePanel !== ActivePanel.NONE ? "w-[400px] shadow-2xl" : "w-0"}
            bg-white border-l border-gray-200 overflow-hidden
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
        <div className="fixed right-0 top-0 bottom-0 min-h-screen w-20 border-l border-gray-200 bg-white flex flex-col items-center py-4 space-y-4">
          <button
            className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => handlePanelToggle(ActivePanel.NOTIFICATIONS)}
            aria-label="Notifications"
            aria-expanded={activePanel === ActivePanel.NOTIFICATIONS}
            aria-controls="slider-panel"
          >
            <Image
              src="/icons/notifications.svg"
              width={20}
              height={20}
              alt=""
              className="opacity-60 hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => handlePanelToggle(ActivePanel.TICKETS)}
            aria-label="Tickets"
            aria-expanded={activePanel === ActivePanel.TICKETS}
            aria-controls="slider-panel"
          >
            <Image
              src="/icons/ticket.svg"
              width={20}
              height={20}
              alt=""
              className="opacity-60 hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
}
