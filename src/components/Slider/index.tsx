"use client";

import { useState } from "react";
import Image from "next/image";
import { ActivePanel } from "@/types";

interface SliderProps {
  className?: string;
}

export default function Slider({ className }: SliderProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(ActivePanel.NONE);

  const handlePanelToggle = (panel: ActivePanel) => {
    setActivePanel(activePanel === panel ? ActivePanel.NONE : panel);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case ActivePanel.TICKETS:
        return <h2 className="text-xl font-semibold text-gray-900">Tickets</h2>;
      case ActivePanel.NOTIFICATIONS:
        return (
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
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
          className={`
            fixed right-20 top-0 bottom-0 min-h-screen
            transition-all duration-300 ease-in-out 
            ${activePanel !== ActivePanel.NONE ? "w-[400px] shadow-2xl" : "w-0"}
            bg-white border-l border-gray-200 overflow-hidden
          `}
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
