import { db } from "./index";
import { buildings } from "./schema";
import type { NewBuildings } from "./schema";

async function seed() {
  try {
    // Define seed data with proper typing from schema
    const buildingsData: NewBuildings[] = [
      {
        name: "Whitechapel High Street",
        address: "71 Central Street, London EC1V 8AB",
        description: "Office space in Whitechapel, London",
      },
      {
        name: "Borough High Street",
        address: "180 Borough High Street, London SE1 1LB",
        description: "Office space in Borough, London",
      },
      {
        name: "Eastbourne Terrace",
        address: "33 Broadwick Street, London W1F 0DQ",
        description: "Office space in Soho, London",
      },
      {
        name: "Liverpool Street",
        address: "100 Liverpool Street, London EC2M 7PP",
        description: "Office space in Liverpool Street, London",
      },
      {
        name: "Blue Fin Building",
        address: "110 Borough High Street, London SE1 1AA",
        description: "Office space in Borough, London",
      },
    ];

    console.log("Seeding buildings");

    // ensure all inserts succeed or none do
    await db.transaction(async (tx) => {
      // Clear existing data
      await tx.delete(buildings);
      console.log("Cleared existing buildings data");

      // Insert all buildings in one batch
      await tx.insert(buildings).values(buildingsData);
      console.log(`Added ${buildingsData.length} buildings`);
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
