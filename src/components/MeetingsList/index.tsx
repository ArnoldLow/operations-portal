"use client";

import React from "react";
import MeetingCard from "@/components/CardMeeting";
import { CardIconEnum } from "@/types/cards";
import type { GetMeetingsResponse } from "@/app/actions";

interface MeetingsListProps {
  meetings: GetMeetingsResponse;
}

export default function MeetingsList({ meetings }: MeetingsListProps) {
  if (!meetings.length) {
    return <p className="text-gray-600">No meetings scheduled</p>;
  }

  return (
    <div className="space-y-2">
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          roomName={meeting.roomName}
          companyName={meeting.companyName}
          startTime={meeting.startTime}
          endTime={meeting.endTime}
          qrCode={meeting.qrCode}
          showIcon={CardIconEnum.MEETINGS}
        />
      ))}
    </div>
  );
}
