import { Suspense } from "react";
import Layout from "@/components/Layout/index";
import MeetingsSection from "@/components/MeetingsSection";
import ViewingsSection from "@/components/ViewingsSection";
import MovesSection from "@/components/MovesSection";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 px-6 md:px-28 pb-9">
        <Suspense
          fallback={
            <div>
              <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded-lg" />
                <div className="h-20 bg-gray-200 rounded-lg" />
                <div className="h-20 bg-gray-200 rounded-lg" />
              </div>
            </div>
          }
        >
          <MeetingsSection />
        </Suspense>

        <div className="space-y-8">
          <Suspense
            fallback={
              <div>
                <h2 className="text-2xl text-gray-600 pt-9 mb-8">Viewings</h2>
                <div className="animate-pulse space-y-4">
                  <div className="h-20 bg-gray-200 rounded-lg" />
                  <div className="h-20 bg-gray-200 rounded-lg" />
                  <div className="h-20 bg-gray-200 rounded-lg" />
                </div>
              </div>
            }
          >
            <ViewingsSection />
          </Suspense>

          <Suspense
            fallback={
              <div>
                <h2 className="text-2xl text-gray-600 mb-8">Move In/Out</h2>
                <div className="animate-pulse space-y-4">
                  <div className="h-20 bg-gray-200 rounded-lg" />
                  <div className="h-20 bg-gray-200 rounded-lg" />
                  <div className="h-20 bg-gray-200 rounded-lg" />
                </div>
              </div>
            }
          >
            <MovesSection />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
