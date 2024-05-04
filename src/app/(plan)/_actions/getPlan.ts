"use server";

import { FORMAT_DATE, Shift } from "@/lib/utils";

const { PEP_API_URL } = process.env;

export default async function getPlan(
  username: string,
  password: string,
  from: Date,
  due: Date,
) {
  const AbortTimeout = {
    signal: AbortSignal.timeout(1000),
    store: "no-store",
  };

  // get auth token
  const tokenResponse = await fetch(`${PEP_API_URL}/Core/Authorization/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(
      `username=${username}&password=${password}&grant_type=password&client_id=pepapp`,
    ),
    ...AbortTimeout,
  });

  const { access_token: token } = await tokenResponse.json();

  // transform time span
  const toDateFormat = (date: Date) => date.toISOString().split("T")[0];
  const formattedFrom = FORMAT_DATE(from, "input");
  const formattedDue = FORMAT_DATE(due, "input");

  // fetch shifts
  const shiftsResponse = await fetch(
    `${PEP_API_URL}/EmployeeView/Plan?from=${formattedFrom}&to=${formattedDue}`,
    {
      headers: {
        Host: "haupenthal1674-pepapp.pepbalance.de",
        Authorization: `Bearer ${token}`,
      },
      ...AbortTimeout,
    },
  );

  const shiftsRaw = await shiftsResponse.json();

  // parse shifts
  const plan = shiftsRaw.shifts
    .map((shift: any) => ({
      id: shift.activities[0].id,
      type: shift.activities[0].planningActivity.planningArea.name,
      location:
        shift.activities[0].planningActivity.planningArea.shop.name.trim(),
      startDate: new Date(shift.activities[0].from),
      endDate: new Date(shift.activities[0].to),
      numberOfBreaks: shift.activities[0].breaks.length,
    }))
    .filter(
      (shift: any) => shift.startDate.getTime() >= from.getTime(),
    ) as Shift[];

  return plan;
}
