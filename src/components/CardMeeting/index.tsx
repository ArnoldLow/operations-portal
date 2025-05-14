"use client";

import React from "react";
import Image from "next/image";
import { CardIconEnum } from "@/types/cards";
import { formatMinutesToTime } from "@/helpers/formatMinutesToTime";
interface MeetingCardProps {
  roomName: string;
  companyName: string;
  startTime?: number;
  endTime?: number;
  date?: number;
  qrCode?: string;
  showIcon?: CardIconEnum;
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
  roomName,
  companyName,
  startTime,
  endTime,
  date,
  qrCode,
  showIcon,
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
        {roomName && companyName && (
          <h3
            id="meeting-title"
            className="text-base font-medium text-gray-700"
          >
            {roomName} - {companyName}
          </h3>
        )}
        {startTime && endTime && (
          <p className="text-sm text-gray-600">
            {formatMinutesToTime(startTime)} - {formatMinutesToTime(endTime)}
          </p>
        )}
      </div>

      {showIcon && (
        <button
          type="button"
          onClick={(e) => {
            console.log("Meeting qrCode", qrCode);
          }}
          className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
            showIcon === CardIconEnum.MEETINGS
              ? "rounded-lg p-4 bg-navy-gray"
              : ""
          }`}
          aria-label={getIconProps(showIcon).ariaLabel + roomName}
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
