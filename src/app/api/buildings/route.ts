import { NextResponse } from "next/server";
import { db, buildings } from "@/db";

export async function GET() {
  try {
    const allBuildings = db.select().from(buildings).all();
    return NextResponse.json(allBuildings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch buildings" },
      { status: 500 }
    );
  }
}
