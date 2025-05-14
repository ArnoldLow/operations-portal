"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import ViewToggle from "@/components/ViewToggle";
import LiveView from "@/components/MeetingRooms/LiveView";
import CalendarView from "@/components/MeetingRooms/CalendarView";
import {
  ViewTypeEnum,
  ToggleVariantEnum,
  viewOptions,
} from "@/helpers/toggleVariants";

export default function MeetingRoomsPage() {
  const [activeView, setActiveView] = useState<ViewTypeEnum>(ViewTypeEnum.Live);

  const handleViewChange = (view: ViewTypeEnum) => {
    setActiveView(view);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 px-6 md:px-28 pb-9">
        <div className="min-h-screen">
          <h2 className="text-2xl text-gray-600 mb-8">Live Availability</h2>

          <div className="relative">
            <ViewToggle
              defaultView={ViewTypeEnum.Live}
              onChange={handleViewChange}
              options={viewOptions}
              variant={ToggleVariantEnum.Rounded}
              className="bg-stone/5 mb-8"
            />

            <div className="relative w-full">
              <div
                className={`transition-opacity duration-200 ${
                  activeView === ViewTypeEnum.Live
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              >
                <LiveView />
              </div>
              <div
                className={`absolute w-full transition-opacity duration-200 ${
                  activeView === ViewTypeEnum.Calendar
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              >
                <CalendarView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
