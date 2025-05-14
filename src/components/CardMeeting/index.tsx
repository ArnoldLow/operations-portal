"use client";

import React from "react";

interface MeetingCardProps {
  title: string;
  time?: Date | { start: Date; end: Date };
  subtitle?: string;
  showQrCode?: boolean;
  showChevron?: boolean;
  onQrCodeClick?: () => void;
  onChevronClick?: () => void;
  onClick?: () => void;
}

const MeetingCard = ({
  title,
  time,
  subtitle,
  showQrCode = false,
  showChevron = false,
  onQrCodeClick,
  onChevronClick,
  onClick,
}: MeetingCardProps) => {
  return (
    <div
      className="flex items-center justify-between h-20 p-4 bg-white-default rounded-lg"
      role="listitem"
      aria-labelledby="meeting-title"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={onClick ? 0 : -1}
    >
      <div className="flex flex-col gap-1">
        {title && (
          <h3
            id="meeting-title"
            className="text-base font-medium text-gray-700"
          >
            {title}
          </h3>
        )}
        {/* {time && <p className="text-sm text-gray-600">{formatTime(time)}</p>} */}
        {subtitle && (
          <p
            className="text-sm text-gray-600"
            aria-label={`Additional details: ${subtitle}`}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div
        className="flex items-center gap-4"
        role="toolbar"
        aria-label="Meeting actions"
      >
        {showQrCode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQrCodeClick?.();
            }}
            className="p-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:border-4 hover:border-site-beige-light transition-all duration-200 ease-in-out border-4 border-transparent"
            aria-label="View QR Code for this meeting"
          >
            QR
          </button>
        )}

        {showChevron && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChevronClick?.();
            }}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors hover:border-4 hover:border-site-beige-light duration-200 ease-in-out border-4 border-transparent"
            aria-label="View meeting details"
          >
            {/* // icon here */}CHEV
          </button>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
