"use client";

import Layout from "@/components/Layout";
import ViewToggle from "@/components/ViewToggle";
import {
  ViewTypeEnum,
  ToggleVariantEnum,
  viewOptions,
} from "@/helpers/toggleVariants";

export default function MeetingRoomsPage() {
  const handleViewChange = (view: ViewTypeEnum) => {
    console.log("Selected view:", view);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 px-6 md:px-28 pb-9">
        {/* Live Availability Section */}
        <section>
          <h2 className="text-2xl text-gray-600 mb-8">Live Availability</h2>
          <ViewToggle
            defaultView={ViewTypeEnum.Live}
            onChange={handleViewChange}
            options={viewOptions}
            variant={ToggleVariantEnum.Rounded}
            className="bg-stone/5"
          />
        </section>
      </div>
    </Layout>
  );
}
