import { getMeetings } from "@/app/actions";
import MeetingsList from "@/components/MeetingsList";

export default async function MeetingsSection() {
  try {
    const meetings = await getMeetings();

    return (
      <div>
        <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
        <MeetingsList meetings={meetings} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-500">
            Error loading meetings. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
