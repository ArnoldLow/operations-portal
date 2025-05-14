import { Suspense } from "react";
import Layout from "@/components/Layout/index";
import MeetingsSection from "@/components/MeetingsSection";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 px-6 md:px-28 pb-9">
        <Suspense
          fallback={
            <section>
              <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded-lg" />
                <div className="h-20 bg-gray-200 rounded-lg" />
                <div className="h-20 bg-gray-200 rounded-lg" />
              </div>
            </section>
          }
        >
          <MeetingsSection />
        </Suspense>

        {/* Viewings Section */}
        <section>
          <h2 className="text-2xl text-gray-600 pt-9 lg:pt-0 mb-8">Viewings</h2>
          {/* <MeetingCard
            title="Meeting 2"
            time={new Date()}
            subtitle="Meeting b"
            showIcon={CardIconEnum.VIEWINGS}
          /> */}
        </section>
      </div>
    </Layout>
  );
}
