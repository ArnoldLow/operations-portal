import { getViewings, type GetViewingResponseSchema } from "@/app/actions";
import MeetingCard from "@/components/CardMeeting";
import { CardIconEnum } from "@/types/cards";

export default async function ViewingsSection() {
  try {
    const viewings = await getViewings();

    return (
      <div>
        <h2 className="text-2xl text-gray-600 pt-9 lg:pt-0 mb-8">Viewings</h2>
        {!viewings.length ? (
          <p className="text-gray-600">No viewings scheduled</p>
        ) : (
          <div className="space-y-2">
            {viewings.map((viewing: GetViewingResponseSchema) => (
              <MeetingCard
                key={viewing.id}
                roomName={viewing.roomName}
                companyName={viewing.companyName}
                startTime={viewing.startTime}
                date={viewing.date}
                showIcon={CardIconEnum.VIEWINGS}
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Detailed error in ViewingsSection:", error);
    return (
      <div>
        <h2 className="text-2xl text-gray-600 pt-9 lg:pt-0 mb-8">Viewings</h2>
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-500">
            Error loading viewings. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
