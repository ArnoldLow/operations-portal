import { db } from "./index";
import { buildings } from "./schema";

async function seed() {
  try {
    const buildingsData = [
      {
        name: "Whitechapel High Street",
      },
      {
        name: "Borough High Street",
      },
      {
        name: "Eastbourne Terrace",
      },
      {
        name: "Liverpool Street",
      },
      {
        name: "Blue Fin Building",
      },
    ];

    console.log("Seeding buildings...");

    for (const building of buildingsData) {
      await db.insert(buildings).values(building);
      console.log(`Added building: ${building.name}`);
    }

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
