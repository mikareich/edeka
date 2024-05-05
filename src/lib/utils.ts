const ONE_MINUTE_IN_MS = 1000 * 60;
const ONE_HOUR_IN_MS = ONE_MINUTE_IN_MS * 60;
const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24;
const ONE_WEEK_IN_MS = ONE_DAY_IN_MS * 7;

const MINIMUM_VAGE_PER_HOUR = 12.41;

export const GET_TODAY = () => new Date();

export const GET_NEXT_WEEK = () =>
  new Date(GET_TODAY().getTime() + ONE_WEEK_IN_MS);

export type Shift = {
  id: string;
  type: string;
  startDate: Date;
  endDate: Date;
  numberOfBreaks: number;
};

export const FORMAT_DATE = (
  date: Date,
  format: "short" | "week" | "relativ" | "input" = "short",
) => {
  if (format === "input")
    return new Date(date.getTime()).toISOString().split("T")[0];

  if (format === "short") {
    return date.toLocaleDateString("de-DE", {
      dateStyle: "medium",
    });
  }

  if (format === "week") {
    return date.toLocaleDateString("de-DE", {
      weekday: "long",
    });
  }

  const deltaTime = date.getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat("de-DE");

  console.log(deltaTime / ONE_DAY_IN_MS);

  if (Math.abs(deltaTime) > ONE_DAY_IN_MS) {
    const inDays = Math.round(deltaTime / ONE_DAY_IN_MS);
    return rtf.format(inDays, "days");
  }

  if (Math.abs(deltaTime) > ONE_HOUR_IN_MS) {
    const inHours = Math.round(deltaTime / ONE_HOUR_IN_MS);
    return rtf.format(inHours, "hours");
  }

  const inMinutes = Math.round(deltaTime / ONE_MINUTE_IN_MS);
  return rtf.format(inMinutes, "minutes");
};

export const FORMAT_TIME = (date: Date) =>
  date.toLocaleTimeString("de-DE", {
    minute: "2-digit",
    hour: "2-digit",
  });

export const GET_REVENUE = ({ startDate, endDate, numberOfBreaks }: Shift) =>
  Math.round(
    // delta time
    ((endDate.getTime() -
      startDate.getTime() -
      // minus breaks
      numberOfBreaks * 15 * ONE_MINUTE_IN_MS) /
      // in hours
      ONE_HOUR_IN_MS) *
      // times minimum vage per hour
      MINIMUM_VAGE_PER_HOUR *
      // round to 2 decimal places
      100,
  ) / 100;
