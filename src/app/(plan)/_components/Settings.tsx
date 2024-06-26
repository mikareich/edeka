"use client";

import { FORMAT_DATE, GET_DATE_BY_DAYS, GET_TODAY } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Highlighted from "./Highlighted";

type SettingsProps = {
  revenue: number;
};

export default function Settings({ revenue }: SettingsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { initalEndDate, initalStartDate } = useMemo(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const initalStartDate = new Date(from || GET_TODAY());
    const initalEndDate = new Date(to || GET_DATE_BY_DAYS());

    return {
      initalStartDate,
      initalEndDate,
    };
  }, []);

  const [startDate, setStartDate] = useState(initalStartDate);
  const [endDate, setEndDate] = useState(initalEndDate);

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

  useEffect(() => {
    router.push(
      `/?from=${FORMAT_DATE(startDate, "input")}&to=${FORMAT_DATE(endDate, "input")}`,
    );
    router.refresh();
  }, [startDate, endDate, router]);

  return (
    <section>
      <p>
        Vom <Highlighted>{FORMAT_DATE(startDate)}</Highlighted> bis zum{" "}
        <Highlighted>{FORMAT_DATE(endDate)}</Highlighted> hast du{" "}
        <span>{revenue > 0 ? `mindestens ${revenue}€` : "kein Geld"}</span>{" "}
        verdient.
      </p>

      <form>
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
        />
      </form>
    </section>
  );
}
