import getPlan from "@/lib/getPlan";
import { GET_DATE_BY_DAYS, ONE_DAY_IN_MS, ONE_HOUR_IN_MS } from "@/lib/utils";
import ical, { ICalEventData, ICalAlarmType } from "ical-generator";

const eventProps = {
  timezone: "Europe/Berlin",
  alarms: [
    {
      type: ICalAlarmType.display,
      trigger: ONE_HOUR_IN_MS / 1000,
    },
    {
      type: ICalAlarmType.display,
      trigger: ONE_DAY_IN_MS / 1000,
    },
  ],
} satisfies Partial<ICalEventData>;

export const GET = async () => {
  const calendar = ical({
    name: "Edeka Dienstplan",
    timezone: "Europe/Berlin",
    prodId: { company: "Edeka Dienstplan", product: "Dienstplan" },
    description: "Dein Edeka Dienstplan",
  });

  const startDate = new Date("01.01.2024");
  const endDate = GET_DATE_BY_DAYS(14);

  const shifts = await getPlan(
    process.env.PEP_USERNAME!,
    process.env.PEP_PASSWORD!,
    startDate,
    endDate,
  );

  shifts.forEach((shift) => calendar.createEvent({ ...shift, ...eventProps }));

  return new Response(calendar.toString());
};
