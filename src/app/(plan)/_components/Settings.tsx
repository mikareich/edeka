"use client";

import { FORMAT_DATE, GET_NEXT_WEEK, GET_TODAY } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SettingsProps = {
  revenue: number;
};

export default function Settings({ revenue }: SettingsProps) {
  const [startDate, setStartDate] = useState(GET_TODAY());
  const [endDate, setEndDate] = useState(GET_NEXT_WEEK());

  const handleDateChange =
    (type: "startDate" | "endDate") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value);
      const time = date.getTime();

      if (isNaN(time)) return;

      if (type === "startDate" && time <= endDate.getTime()) {
        return setStartDate(date);
      }

      if (type === "endDate" && time >= startDate.getTime()) {
        setEndDate(date);
      }
    };

  const router = useRouter();

  useEffect(() => {
    router.push(
      `/?from=${FORMAT_DATE(startDate, "input")}&to=${FORMAT_DATE(endDate, "input")}`,
    );
    router.refresh();
  }, [startDate, endDate, router]);

  return (
    <section className="text-gray-500 text-justify">
      Vom{" "}
      <input
        type="date"
        value={FORMAT_DATE(startDate, "input")}
        onChange={handleDateChange("startDate")}
      />{" "}
      bis zum{" "}
      <input
        type="date"
        value={FORMAT_DATE(endDate, "input")}
        onChange={handleDateChange("endDate")}
      />{" "}
      hast du <span>{revenue > 0 ? `min. ${revenue}€` : "kein Geld"}</span>{" "}
      verdient.
    </section>
  );
}
