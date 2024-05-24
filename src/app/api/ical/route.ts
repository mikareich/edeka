import getPlan from "@/lib/getPlan";
import { GET_DATE_BY_DAYS } from "@/lib/utils";
import ical from "ical-generator";

export const GET = async () => {
  const calendar = ical({
    name: "Edeka Dienstplan",
    timezone: "Europe/Berlin",
    prodId: { company: "Edeka Dienstplan", product: "Dienstplan" },
    description: "Dein Edeka Dienstplan",
    scale: "GREGORIAN",
  });

  const startDate = new Date("01.01.2024");
  const endDate = GET_DATE_BY_DAYS(14);

  const shifts = await getPlan(
    process.env.PEP_USERNAME!,
    process.env.PEP_PASSWORD!,
    startDate,
    endDate,
  );

  shifts.forEach((shift) => {
    calendar.createEvent(shift);
  });

  return new Response(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
};
