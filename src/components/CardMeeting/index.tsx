"use client";

import React from "react";
import Image from "next/image";
import { CardIconEnum } from "@/types/cards";

interface MeetingCardProps {
  title: string;
  time?: Date | { start: Date; end: Date };
  subtitle?: string;
  showIcon?: CardIconEnum;
  onIconClick?: () => void;
  onClick?: () => void;
}

const getIconProps = (type: CardIconEnum) => {
  switch (type) {
    case CardIconEnum.MEETINGS:
      return {
        icon: "/icons/check-in.svg",
        ariaLabel: "Open QR Code for ",
        height: 18,
        width: 18,
        alt: "Check in icon",
        styles: "p-4 bg-navy-grey",
      };
    case CardIconEnum.VIEWINGS:
      return {
        icon: "/icons/ticket.svg",
        ariaLabel: "View viewing meeting details for ",
        height: 24,
        width: 24,
        alt: "Viewing icon",
        styles: "",
      };
    case CardIconEnum.MOVEINOUT:
      return {
        icon: "/icons/ticket.svg",
        ariaLabel: "View move in and out details for ",
        height: 24,
        width: 24,
        alt: "Move in and out icon",
        styles: "",
      };
  }
};

const MeetingCard = ({
  title,
  time,
  subtitle,
  showIcon,
  onIconClick,
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

      {showIcon && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIconClick?.();
          }}
          className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
            showIcon === CardIconEnum.MEETINGS
              ? "rounded-lg p-4 bg-navy-gray"
              : ""
          }`}
          aria-label={getIconProps(showIcon).ariaLabel + title}
        >
          <Image
            src={getIconProps(showIcon).icon}
            alt={getIconProps(showIcon).alt}
            width={getIconProps(showIcon).width}
            height={getIconProps(showIcon).height}
            className="text-white-default"
          />
        </button>
      )}
    </div>
  );
};

export default MeetingCard;
