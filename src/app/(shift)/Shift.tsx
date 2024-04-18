import type { Shift as ShiftType } from "@/db/schema";

export default function Shift({
  startDate,
  endDate,
  location,
  type,
  breaks,
}: ShiftType) {
  // formatted timestamps
  const startDateString = startDate.toLocaleDateString("de-DE");
  const startWeekday = startDate.toLocaleDateString("de-DE", {
    weekday: "long",
  });
  const startTime = startDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = endDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Time diffs
  const now = Date.now();

  const daysUntilStart = Math.round(
    (startDate.getTime() - now) / (1000 * 60 * 60 * 24)
  );

  const hoursOfShift =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  const estimatedRevenue = Math.round(hoursOfShift * 12.4 * 100) / 100;

  return (
    <div className="border rounded-lg px-4 py-2 shadow hover:shadow-md transition-all">
      <div className="flex items-baseline justify-between flex-col sm:flex-row">
        <h2 className="text-xl font-bold">
          💸 {type} (~{estimatedRevenue.toFixed(2)}€)
        </h2>

        <p className="text-gray-500">
          {startWeekday}, {startDateString} um {startTime}
        </p>
      </div>

      <p className="text-gray-500 mt-1">
        {daysUntilStart} Tage bis zum Dienstbeginn
      </p>
      <p className="text-gray-500 mt-1">📍 {location}</p>
      <p className="text-gray-500 mt-1">
        🕛 {startDateString} von {startTime} bis {endTime} ({hoursOfShift}{" "}
        Stunden) mit {breaks.length}x{" "}
        {breaks.length > 1 || breaks.length === 0 ? "Pausen" : "Pause"}
      </p>
    </div>
  );
}
