"use client";

import { useState, useEffect } from "react";
import type { Buildings } from "@/db";

export default function Home() {
  const [buildings, setBuildings] = useState<Buildings[]>([]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1>Fora Operations Portal</h1>
      </div>
    </main>
  );
}
