import { getMoves, type GetMoveResponse } from "@/app/actions";
import MeetingCard from "@/components/CardMeeting";
import { CardIconEnum } from "@/types/cards";

export default async function MovesSection() {
  try {
    const moves = await getMoves();

    return (
      <div>
        <h2 className="text-2xl text-gray-600 my-8">Move In/Out</h2>
        {!moves.length ? (
          <p className="text-gray-600">No moves scheduled</p>
        ) : (
          <div className="space-y-2">
            {moves.map((move: GetMoveResponse) => (
              <MeetingCard
                key={move.id}
                roomName={move.roomName}
                companyName={move.companyName}
                date={move.date}
                showIcon={CardIconEnum.MOVEINOUT}
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h2 className="text-2xl text-gray-600 pt-9 lg:pt-0 mb-8">
          Move In/Out
        </h2>
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-500">
            Error loading moves. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
