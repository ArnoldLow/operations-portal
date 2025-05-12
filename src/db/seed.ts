import { db } from "./index";
import { buildings } from "./schema";

async function seed() {
  try {
    const buildingsData = [
      {
        id: 1,
        name: "Whitechapel High Street",
        address: "71 Central Street, London EC1V 8AB",
        description: "Office space in Whitechapel, London",
      },
      {
        id: 2,
        name: "Borough High Street",
        address: "180 Borough High Street, London SE1 1LB",
        description: "Office space in Borough, London",
      },
      {
        id: 3,
        name: "Eastbourne Terrace",
        address: "33 Broadwick Street, London W1F 0DQ",
        description: "Office space in Soho, London",
      },
      {
        id: 4,
        name: "Liverpool Street",
        address: "100 Liverpool Street, London EC2M 7PP",
        description: "Office space in Liverpool Street, London",
      },
      {
        id: 5,
        name: "Blue Fin Building",
        address: "110 Borough High Street, London SE1 1AA",
        description: "Office space in Borough, London",
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
