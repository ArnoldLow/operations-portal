"use client";

import { useState } from "react";
import type { Buildings } from "@/db";
import UILayout from "@/components/Layout/index";

export default function Home() {
  const [buildings, setBuildings] = useState<Buildings[]>([]);

  return (
    <UILayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 px-6 md:px-28 pb-9">
        {/* Meetings Section */}
        <section>
          <h2 className="text-2xl text-gray-600 mb-8">Meetings</h2>
        </section>

        {/* Viewings Section */}
        <section>
          <h2 className="text-2xl text-gray-600 pt-9 lg:pt-0 mb-8">Viewings</h2>
        </section>
      </div>
    </UILayout>
  );
}
