import { db } from "./index";
import { buildings, customerForce } from "./schema";
import type { NewBuildings, NewCustomerForce } from "./schema";

// Helper function to convert time string (HH:mm) to minutes since midnight
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

async function seed() {
  try {
    // Define buildings seed data
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

    // Define customer seed data
    const customerData: NewCustomerForce[] = [
      {
        roomName: "MR.0X",
        companyName: "Tech Corp",
        startTime: timeToMinutes("09:00"),
        endTime: timeToMinutes("10:30"),
        date: new Date("2024-06-20"),
        qrCode: `meeting-room-1-${Date.now()}`,
      },
      {
        roomName: "MR.1X",
        companyName: "Design Studios",
        startTime: timeToMinutes("11:00"),
        endTime: timeToMinutes("12:00"),
        date: new Date("2024-06-20"),
        qrCode: `meeting-room-2-${Date.now()}`,
      },
      {
        roomName: "MR.2X",
        companyName: "Finance Plus",
        startTime: timeToMinutes("14:00"),
        endTime: timeToMinutes("16:00"),
        date: new Date("2024-06-20"),
        qrCode: `meeting-room-3-${Date.now()}`,
      },
      {
        roomName: "MR.3X",
        companyName: "Creative Agency",
        startTime: timeToMinutes("10:00"),
        endTime: timeToMinutes("11:30"),
        date: new Date("2024-06-21"),
        qrCode: `meeting-room-4-${Date.now()}`,
      },
      {
        roomName: "MR.4X",
        companyName: "Startup Inc",
        startTime: timeToMinutes("13:00"),
        endTime: timeToMinutes("14:30"),
        date: new Date("2024-06-21"),
        qrCode: `meeting-room-5-${Date.now()}`,
      },
      {
        roomName: "MR.5X",
        companyName: "Film Production",
        startTime: timeToMinutes("13:45"),
        endTime: timeToMinutes("14:30"),
        date: new Date("2024-06-19"),
        qrCode: `meeting-room-6-${Date.now()}`,
      },
      {
        roomName: "MR.6X",
        companyName: "Stream Now",
        startTime: timeToMinutes("16:00"),
        endTime: timeToMinutes("16:30"),
        date: new Date("2024-06-10"),
        qrCode: `meeting-room-7-${Date.now()}`,
      },
      {
        roomName: "MR.7X",
        companyName: "Global Shipping LLC",
        startTime: timeToMinutes("09:00"),
        endTime: timeToMinutes("10:30"),
        date: new Date("2024-06-29"),
        qrCode: `meeting-room-8-${Date.now()}`,
      },
      {
        roomName: "MR.8X",
        companyName: "Insurance Solutions",
        startTime: timeToMinutes("12:00"),
        endTime: timeToMinutes("18:00"),
        date: new Date("2024-06-27"),
        qrCode: `meeting-room-9-${Date.now()}`,
      },
    ];

    // First transaction: Seed buildings
    await db.transaction((tx) => {
      // Clear existing buildings data
      tx.delete(buildings).run();
      console.log("Cleared existing buildings data");

      // Insert all buildings in one batch
      tx.insert(buildings).values(buildingsData).run();
      console.log(`Added ${buildingsData.length} buildings`);
    });

    // Second transaction: Seed customer data
    await db.transaction((tx) => {
      // Clear existing customer data
      tx.delete(customerForce).run();
      console.log("Cleared existing customer data");

      // Insert all customer records in one batch
      tx.insert(customerForce).values(customerData).run();
      console.log(`Added ${customerData.length} customer records`);
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
