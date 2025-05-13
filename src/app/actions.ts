"use server";

import { db, buildings } from "@/db";
import { desc } from "drizzle-orm";
import type { Buildings, NewBuildings } from "@/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
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

// Additional action showcase: CREATE BUILDING
// export async function createBuilding(building: NewBuildings) {
//   try {
//     const newBuilding = await db.insert(buildings).values(building).returning();

//     revalidatePath("/"); // Revalidate any paths that show buildings
//     return newBuilding[0];
//   } catch (error) {
//     console.error("Error creating building:", error);
//     throw new Error("Failed to create building");
//   }
// }

// Additional action showcase: UPDATE BUILDING
// export async function updateBuilding(
//   id: number,
//   building: Partial<NewBuildings>
// ) {
//   try {
//     const updatedBuilding = await db
//       .update(buildings)
//       .set({ ...building, updatedAt: new Date() })
//       .where(eq(buildings.id, id))
//       .returning();

//     revalidatePath("/");
//     return updatedBuilding[0];
//   } catch (error) {
//     console.error("Error updating building:", error);
//     throw new Error("Failed to update building");
//   }
// }

// Additional action showcase: DELETE BUILDING
// export async function deleteBuilding(id: number) {
//   try {
//     await db.delete(buildings).where(eq(buildings.id, id));

//     revalidatePath("/");
//     return { success: true };
//   } catch (error) {
//     console.error("Error deleting building:", error);
//     throw new Error("Failed to delete building");
//   }
// }
