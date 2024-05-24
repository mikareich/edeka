"use server";

import { FORMAT_DATE, Shift } from "@/lib/utils";

const { PEP_API_URL } = process.env;

export default async function getPlan(
  username: string,
  password: string,
  from: Date,
  due: Date,
) {
  // get auth token
  const tokenResponse = await fetch(`${PEP_API_URL}/Core/Authorization/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(
      `username=${username}&password=${password}&grant_type=password&client_id=pepapp&scope=openid offline_access&resource=https://haupenthal1674-pepapp.pepbalance.de`,
    ),
    next: { revalidate: 3600 },
  });

  const { access_token: token } = await tokenResponse.json();

  // fetch shifts
  const shiftsResponse = await fetch(
    `${PEP_API_URL}/EmployeeView/Plan?from=${FORMAT_DATE(from, "input")}&to=${FORMAT_DATE(due, "input")}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const shiftsRaw = await shiftsResponse.json();

  // parse shifts
  const plan = shiftsRaw.shifts
    .map((shift: any) => ({
      id: shift.activities[0].id,
      type: shift.activities[0].planningActivity.planningArea.name,
      startDate: new Date(shift.activities[0].from),
      endDate: new Date(shift.activities[0].to),
      numberOfBreaks: shift.activities[0].breaks.length,
    }))
    .filter(
      (shift: any) => shift.startDate.getTime() >= from.getTime(),
    ) as Shift[];

  return plan;
}
