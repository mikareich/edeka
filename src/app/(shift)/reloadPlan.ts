"use server";

import db from "@/db/db";
import shiftsTable, { Shift } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function reloadPlan() {
  const { PEP_USERNAME, PEP_PASSWORD } = process.env;

  // fetch bearer token
  const tokenResponse = await fetch(
    "https://haupenthal1674-pepapp.pepbalance.de/api/Core/Authorization/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${PEP_USERNAME}&password=${PEP_PASSWORD}&grant_type=password&scope=openid+offline_access&client_id=pepapp&resource=https%3A%2F%2Fhaupenthal1674-pepapp.pepbalance.de`,
    }
  );

  const { access_token, error, ...x } = await tokenResponse.json();

  if (error) throw new Error(error);

  // fetch shifts
  const from = `${new Date().toISOString().split("T")[0]}`;
  const to = `${
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
      .toISOString()
      .split("T")[0]
  }`;

  const shiftsResponse = await fetch(
    `https://haupenthal1674-pepapp.pepbalance.de/api/EmployeeView/Plan?from=${from}&to=${to}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const shiftsRaw = await shiftsResponse.json();

  // format shifts
  const shifts = shiftsRaw.shifts.map((shift: any) => ({
    id: shift.activities[0].id,
    type: shift.activities[0].planningActivity.planningArea.name,
    location: shift.activities[0].planningActivity.planningArea.shop.name,
    startDate: new Date(shift.activities[0].from),
    endDate: new Date(shift.activities[0].to),
    breaks: shift.activities[0].breaks.map((breakItem: any) => ({
      startDate: new Date(breakItem.from),
      endDate: new Date(breakItem.to),
    })),
  })) as Shift[];

  // save shifts
  try {
    await db.insert(shiftsTable).values(shifts);
    revalidatePath("/");
  } catch (error) {}
}
