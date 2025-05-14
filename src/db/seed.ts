import { db } from "./index";
import {
  buildings,
  customerForce,
  BookingType,
  availabilityForce,
} from "./schema";
import type {
  NewAvailabilityForce,
  NewBuildings,
  NewCustomerForce,
} from "./schema";

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
        date: new Date("2025-06-20"),
        qrCode: `meeting-room-1-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.1X",
        companyName: "Design Studios",
        startTime: timeToMinutes("11:00"),
        endTime: timeToMinutes("12:00"),
        date: new Date("2025-06-20"),
        qrCode: `meeting-room-2-${Date.now()}`,
        bookingType: BookingType.VIEWING,
      },
      {
        roomName: "MR.2X",
        companyName: "Finance Plus",
        startTime: timeToMinutes("14:00"),
        endTime: timeToMinutes("16:00"),
        date: new Date("2025-06-20"),
        qrCode: `meeting-room-3-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.3X",
        companyName: "Creative Agency",
        startTime: timeToMinutes("10:00"),
        endTime: timeToMinutes("11:30"),
        date: new Date("2025-06-21"),
        qrCode: `meeting-room-4-${Date.now()}`,
        bookingType: BookingType.MOVE,
      },
      {
        roomName: "MR.4X",
        companyName: "Startup Inc",
        startTime: timeToMinutes("13:00"),
        endTime: timeToMinutes("14:30"),
        date: new Date("2025-06-21"),
        qrCode: `meeting-room-5-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.5X",
        companyName: "Film Production",
        startTime: timeToMinutes("13:45"),
        endTime: timeToMinutes("14:30"),
        date: new Date("2025-06-19"),
        qrCode: `meeting-room-6-${Date.now()}`,
        bookingType: BookingType.VIEWING,
      },
      {
        roomName: "MR.6X",
        companyName: "Stream Now",
        startTime: timeToMinutes("16:00"),
        endTime: timeToMinutes("16:30"),
        date: new Date("2025-06-10"),
        qrCode: `meeting-room-7-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.7X",
        companyName: "Global Shipping LLC",
        startTime: timeToMinutes("09:00"),
        endTime: timeToMinutes("10:30"),
        date: new Date("2025-06-29"),
        qrCode: `meeting-room-8-${Date.now()}`,
        bookingType: BookingType.MOVE,
      },
      {
        roomName: "MR.8X",
        companyName: "Insurance Solutions",
        startTime: timeToMinutes("12:00"),
        endTime: timeToMinutes("18:00"),
        date: new Date("2025-06-27"),
        qrCode: `meeting-room-9-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.9X",
        companyName: "Digital Dynamics",
        startTime: timeToMinutes("10:00"),
        endTime: timeToMinutes("11:30"),
        date: new Date("2025-06-28"),
        qrCode: `meeting-room-10-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.10X",
        companyName: "Cloud Systems",
        startTime: timeToMinutes("14:00"),
        endTime: timeToMinutes("15:30"),
        date: new Date("2025-06-28"),
        qrCode: `meeting-room-11-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.11X",
        companyName: "Data Analytics Co",
        startTime: timeToMinutes("16:00"),
        endTime: timeToMinutes("17:00"),
        date: new Date("2025-06-28"),
        qrCode: `meeting-room-12-${Date.now()}`,
        bookingType: BookingType.MEETING,
      },
      {
        roomName: "MR.12X",
        companyName: "Relocation Experts",
        startTime: timeToMinutes("09:00"),
        endTime: timeToMinutes("17:00"),
        date: new Date("2025-06-29"),
        qrCode: `meeting-room-13-${Date.now()}`,
        bookingType: BookingType.MOVE,
      },
      {
        roomName: "MR.13X",
        companyName: "Office Movers Ltd",
        startTime: timeToMinutes("08:00"),
        endTime: timeToMinutes("18:00"),
        date: new Date("2025-06-30"),
        qrCode: `meeting-room-14-${Date.now()}`,
        bookingType: BookingType.MOVE,
      },
      {
        roomName: "MR.14X",
        companyName: "Startup Ventures",
        startTime: timeToMinutes("11:00"),
        endTime: timeToMinutes("12:00"),
        date: new Date("2025-07-01"),
        qrCode: `meeting-room-15-${Date.now()}`,
        bookingType: BookingType.VIEWING,
      },
      {
        roomName: "MR.15X",
        companyName: "Growth Partners",
        startTime: timeToMinutes("14:30"),
        endTime: timeToMinutes("15:30"),
        date: new Date("2025-07-01"),
        qrCode: `meeting-room-16-${Date.now()}`,
        bookingType: BookingType.VIEWING,
      },
      {
        roomName: "MR.16X",
        companyName: "Future Space Inc",
        startTime: timeToMinutes("16:30"),
        endTime: timeToMinutes("17:30"),
        date: new Date("2025-07-01"),
        qrCode: `meeting-room-17-${Date.now()}`,
        bookingType: BookingType.VIEWING,
      },
    ];

    // Define availability force seed data
    const availabilityData: NewAvailabilityForce[] = [
      {
        roomName: "MR.0Y",
        capacity: 4,
        cost: 20,
        isAvailable: true,
      },
      {
        roomName: "MR.1Y",
        capacity: 8,
        cost: 35,
        isAvailable: true,
      },
      {
        roomName: "MR.2Y",
        capacity: 12,
        cost: 50,
        isAvailable: false,
      },
      {
        roomName: "MR.3Y",
        capacity: 6,
        cost: 25,
        isAvailable: true,
      },
      {
        roomName: "MR.4Y",
        capacity: 20,
        cost: 75,
        isAvailable: true,
      },
      {
        roomName: "MR.5Y",
        capacity: 10,
        cost: 45,
        isAvailable: true,
      },
      {
        roomName: "MR.6Y",
        capacity: 15,
        cost: 60,
        isAvailable: true,
      },
      {
        roomName: "MR.7Y",
        capacity: 4,
        cost: 20,
        isAvailable: false,
      },
      {
        roomName: "MR.8Y",
        capacity: 8,
        cost: 35,
        isAvailable: false,
      },
      {
        roomName: "MR.9Y",
        capacity: 16,
        cost: 65,
        isAvailable: true,
      },
      {
        roomName: "MR.10Y",
        capacity: 6,
        cost: 30,
        isAvailable: true,
      },
      {
        roomName: "MR.11Y",
        capacity: 12,
        cost: 50,
        isAvailable: false,
      },
      {
        roomName: "MR.12Y",
        capacity: 24,
        cost: 90,
        isAvailable: true,
      },
      {
        roomName: "MR.13Y",
        capacity: 8,
        cost: 35,
        isAvailable: false,
      },
      {
        roomName: "MR.14Y",
        capacity: 14,
        cost: 55,
        isAvailable: true,
      },
      {
        roomName: "MR.15Y",
        capacity: 18,
        cost: 70,
        isAvailable: false,
      },
      {
        roomName: "MR.16Y",
        capacity: 4,
        cost: 20,
        isAvailable: true,
      },
      {
        roomName: "MR.17Y",
        capacity: 10,
        cost: 45,
        isAvailable: true,
      },
      {
        roomName: "MR.18Y",
        capacity: 30,
        cost: 100,
        isAvailable: true,
      },
      {
        roomName: "MR.19Y",
        capacity: 8,
        cost: 35,
        isAvailable: false,
      },
    ];

    // First transaction: Seed buildings
    db.transaction((tx) => {
      // Clear existing buildings data
      tx.delete(buildings).run();
      console.log("Cleared existing buildings data");

      // Insert all buildings in one batch
      tx.insert(buildings).values(buildingsData).run();
      console.log(`Added ${buildingsData.length} buildings`);
    });

    // Second transaction: Seed customer data
    db.transaction((tx) => {
      // Clear existing customer data
      tx.delete(customerForce).run();
      console.log("Cleared existing customer data");

      // Insert all customer records in one batch
      tx.insert(customerForce).values(customerData).run();
      console.log(`Added ${customerData.length} customer records`);
    });

    // Third transaction: Seed availability force data
    db.transaction((tx) => {
      // Clear existing availability force data
      tx.delete(availabilityForce).run();
      console.log("Cleared existing availability force data");

      // Insert all availability force records in one batch
      tx.insert(availabilityForce).values(availabilityData).run();
      console.log(
        `Added ${availabilityData.length} availability force records`
      );
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
