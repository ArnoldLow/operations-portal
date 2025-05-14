import { getMeetings } from "@/app/actions";
import MeetingsList from "@/components/MeetingsList";

export default async function MeetingsSection() {
  try {
    console.log("Fetching meetings...");
    const meetings = await getMeetings();
    console.log("Meetings fetched:", meetings);

    return (
      <section>
        <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
        <MeetingsList meetings={meetings} />
      </section>
    );
  } catch (error) {
    console.error("Detailed error in MeetingsSection:", error);
    return (
      <section>
        <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-500">
            Error loading meetings. Please try again later.
          </p>
        </div>
      </section>
    );
  }
}
