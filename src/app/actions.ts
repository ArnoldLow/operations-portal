"use server";

import { db, buildings, customerForce, BookingType } from "@/db";
import { desc, eq, and, gte } from "drizzle-orm";
import type { Buildings, NewBuildings, CustomerForce } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const TIME_CONSTRAINTS = {
  HOURS: {
    MIN: 0,
    MAX: 23,
  },
  MINUTES: {
    MIN: 0,
    MAX: 59,
  },
  START_OF_DAY: {
    HOURS: 0,
    MINUTES: 0,
    SECONDS: 0,
    MILLISECONDS: 0,
  },
};

// Schema for building options
const BuildingOptionSchema = z.object({
  id: z.number(),
  label: z.string(),
});

const BuildingOptionsSchema = z.array(BuildingOptionSchema);

export async function getBuildings() {
  try {
    const allBuildings = await db
      .select({
        id: buildings.id,
        label: buildings.name,
      })
      .from(buildings)
      .orderBy(buildings.name);

    // Validate the response
    const validatedBuildings = BuildingOptionsSchema.parse(allBuildings);
    return validatedBuildings;
  } catch (error) {
    console.error("Error fetching buildings:", error);
    throw new Error("Failed to fetch buildings");
  }
}

// Schema for meetings response
const MeetingResponseSchema = z.object({
  id: z.number(),
  roomName: z.string(),
  companyName: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  date: z.date(),
  qrCode: z.string(),
});

const MeetingsResponseSchema = z.array(MeetingResponseSchema);

export type MeetingResponse = z.infer<typeof MeetingResponseSchema>;
export type MeetingsResponse = z.infer<typeof MeetingsResponseSchema>;

export async function getMeetings(): Promise<MeetingsResponse> {
  try {
    // debug: all meetings
    // const allMeetings = await db
    //   .select({
    //     id: customerForce.id,
    //     roomName: customerForce.roomName,
    //     companyName: customerForce.companyName,
    //     startTime: customerForce.startTime,
    //     endTime: customerForce.endTime,
    //     date: customerForce.date,
    //     qrCode: customerForce.qrCode,
    //     bookingType: customerForce.bookingType,
    //   })
    //   .from(customerForce);

    // console.log("All meetings:", allMeetings);

    // Get today at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("Today date for comparison:", {
      date: today,
      isoString: today.toISOString(),
    });

    const meetings = await db
      .select({
        id: customerForce.id,
        roomName: customerForce.roomName,
        companyName: customerForce.companyName,
        startTime: customerForce.startTime,
        endTime: customerForce.endTime,
        date: customerForce.date,
        qrCode: customerForce.qrCode,
      })
      .from(customerForce)
      .where(
        and(
          eq(customerForce.bookingType, BookingType.MEETING),
          gte(customerForce.date, today)
        )
      )
      .orderBy(customerForce.date, customerForce.startTime);

    console.log("Filtered meetings:", meetings);

    // Validate the response
    const validatedMeetings = MeetingsResponseSchema.parse(meetings);
    console.log("Validated meetings:", validatedMeetings);
    return validatedMeetings;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error fetching meetings:", error.errors);
      throw new Error("Invalid meeting data format");
    }
    console.error("Error fetching meetings:", error);
    throw new Error("Failed to fetch meetings");
  }
}
