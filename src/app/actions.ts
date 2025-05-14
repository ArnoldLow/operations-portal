"use server";

import { db, buildings, customerForce, BookingType } from "@/db";
import { eq, and, gte } from "drizzle-orm";
import { z } from "zod";

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
const GetMeetingResponseSchema = z.object({
  id: z.number(),
  roomName: z.string(),
  companyName: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  qrCode: z.string(),
});

const GetMeetingsResponseSchema = z.array(GetMeetingResponseSchema);

export type GetMeetingResponse = z.infer<typeof GetMeetingResponseSchema>;
export type GetMeetingsResponse = z.infer<typeof GetMeetingsResponseSchema>;

export async function getMeetings(): Promise<GetMeetingsResponse> {
  try {
    // Get today at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const meetings = await db
      .select({
        id: customerForce.id,
        roomName: customerForce.roomName,
        companyName: customerForce.companyName,
        startTime: customerForce.startTime,
        endTime: customerForce.endTime,
        qrCode: customerForce.qrCode,
      })
      .from(customerForce)
      .where(
        and(
          eq(customerForce.bookingType, BookingType.MEETING),
          gte(customerForce.date, today)
        )
      )
      .limit(6)
      .orderBy(customerForce.date, customerForce.startTime);

    // Validate the response
    const validatedMeetings = GetMeetingsResponseSchema.parse(meetings);

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

const GetViewingResponseSchema = z.object({
  id: z.number(),
  roomName: z.string(),
  companyName: z.string(),
  startTime: z.number(),
  date: z.date(),
});

const GetViewingsResponseSchema = z.array(GetViewingResponseSchema);

export type GetViewingResponseSchema = z.infer<typeof GetViewingResponseSchema>;
export type GetViewingsResponseSchema = z.infer<
  typeof GetViewingsResponseSchema
>;

export async function getViewings(): Promise<GetViewingsResponseSchema> {
  try {
    // Get today at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const viewings = await db
      .select({
        id: customerForce.id,
        roomName: customerForce.roomName,
        companyName: customerForce.companyName,
        startTime: customerForce.startTime,
        date: customerForce.date,
        qrCode: customerForce.qrCode,
      })
      .from(customerForce)
      .where(
        and(
          eq(customerForce.bookingType, BookingType.VIEWING),
          gte(customerForce.date, today)
        )
      )
      .limit(3)
      .orderBy(customerForce.date, customerForce.startTime);

    // Validate the response using the same schema as meetings
    const validatedViewings = GetViewingsResponseSchema.parse(viewings);
    return validatedViewings;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error fetching viewings:", error.errors);
      throw new Error("Invalid viewing data format");
    }
    console.error("Error fetching viewings:", error);
    throw new Error("Failed to fetch viewings");
  }
}

const GetMoveResponseSchema = z.object({
  id: z.number(),
  roomName: z.string(),
  companyName: z.string(),
  date: z.date(),
});

const GetMovesResponseSchema = z.array(GetMoveResponseSchema);

export type GetMoveResponse = z.infer<typeof GetMoveResponseSchema>;
export type GetMovesResponse = z.infer<typeof GetMovesResponseSchema>;

export async function getMoves(): Promise<GetMovesResponse> {
  try {
    // Get today at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const moves = await db
      .select({
        id: customerForce.id,
        roomName: customerForce.roomName,
        companyName: customerForce.companyName,
        startTime: customerForce.startTime,
        date: customerForce.date,
        qrCode: customerForce.qrCode,
      })
      .from(customerForce)
      .where(
        and(
          eq(customerForce.bookingType, BookingType.MOVE),
          gte(customerForce.date, today)
        )
      )
      .limit(2)
      .orderBy(customerForce.date, customerForce.startTime);

    // Validate the response
    const validatedMoves = GetMovesResponseSchema.parse(moves);
    return validatedMoves;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error fetching moves:", error.errors);
      throw new Error("Invalid move data format");
    }
    console.error("Error fetching moves:", error);
    throw new Error("Failed to fetch moves");
  }
}
