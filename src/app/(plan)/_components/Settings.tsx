"use client";

import { FORMAT_DATE, GET_NEXT_WEEK, GET_TODAY } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";

const dateReducer = (current: string, date: Date) => {
  try {
    return FORMAT_DATE(date, "input");
  } catch {
    return current;
  }
};

export default function Settings() {
  const [startDate, setStartDate] = useReducer(
    dateReducer,
    FORMAT_DATE(GET_TODAY(), "input"),
  );
  const [endDate, setEndDate] = useReducer(
    dateReducer,
    FORMAT_DATE(GET_NEXT_WEEK(), "input"),
  );

  const router = useRouter();

  useEffect(() => {
    router.push(`/?from=${startDate}&to=${endDate}`);
    router.refresh();
  }, [startDate, endDate, router]);

  return (
    <section className="flex gap-2">
      <span className="text-gray-500">
        Vom{" "}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />{" "}
        bis zum{" "}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </span>

      <button className="underline ml-auto text-gray-900">
        Dienstplan neu laden
      </button>
    </section>
  );
}
