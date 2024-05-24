"use server";

import { FORMAT_DATE, GET_REVENUE, Shift } from "@/lib/utils";

const { PEP_API_URL } = process.env;

export default async function getPlan(
  username: string,
  password: string,
  startPlan: Date,
  endPlan: Date,
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
    `${PEP_API_URL}/EmployeeView/Plan?from=${FORMAT_DATE(startPlan, "input")}&to=${FORMAT_DATE(endPlan, "input")}`,
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
    .map((shift: any) => {
      const start = new Date(shift.activities[0].from);
      const end = new Date(shift.activities[0].to);
      const numberOfBreaks = shift.activities[0].breaks.length;

      const revenue = GET_REVENUE({ start, end, numberOfBreaks });

      const description = `⏸️ Anzahl Pausen: ${numberOfBreaks || "keine :("} \n💸 ~${revenue}€`;

      return {
        id: shift.activities[0].id,
        summary: shift.activities[0].planningActivity.planningArea.name.trim(),
        description,
        start,
        end,
        location: "Saarstraße 92, 54290 Trier",
        revenue,
        numberOfBreaks,
      } satisfies Shift;
    })
    .filter(
      (shift: Shift) => shift.start.getTime() >= startPlan.getTime(),
    ) as Shift[];

  return plan;
}
