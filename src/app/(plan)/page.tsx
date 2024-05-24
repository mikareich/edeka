import { GET_DATE_BY_DAYS, GET_TODAY, GET_REVENUE } from "@/lib/utils";
import getPlan from "@/lib/getPlan";
import Shift from "./_components/Shift";
import Settings from "./_components/Settings";
import getCalendar from "@/lib/calendar";

type SearchParams = {
  from?: string;
  to?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const startDate = searchParams.from || GET_TODAY();
  const endDate = searchParams.to || GET_DATE_BY_DAYS();

  const plan = await getPlan(
    process.env.PEP_USERNAME!,
    process.env.PEP_PASSWORD!,
    new Date(startDate),
    new Date(endDate),
  );

  const totalRevenue = Math.round(
    plan.reduce((acc, shift) => acc + shift.revenue, 0),
  );

  return (
    <div className="container pt-10 max-w-prose px-4">
      <header className="space-y-2 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Dein Edeka Dienstplan
        </h1>

        <Settings revenue={totalRevenue} />
        <hr />
      </header>

      <main className="space-y-4">{plan.map(Shift)}</main>
    </div>
  );
}
