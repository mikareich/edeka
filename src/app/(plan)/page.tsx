import { GET_NEXT_WEEK, GET_TODAY, FORMAT_DATE } from "@/lib/utils";
import getPlan from "./_actions/getPlan";
import Shift from "./_components/Shift";
import Settings from "./_components/Settings";

type SearchParams = {
  from?: string;
  to?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const startDate = new Date(searchParams.from || GET_TODAY().getTime());
  const endDate = new Date(searchParams.to || GET_NEXT_WEEK().getTime());

  console.log(startDate, endDate);

  const plan = await getPlan(
    process.env.PEP_USERNAME!,
    process.env.PEP_PASSWORD!,
    startDate,
    endDate,
  );

  console.log(searchParams);

  return (
    <div className="container pt-10 max-w-prose px-4">
      <header className="space-y-2 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Dein Edeka Dienstplan
        </h1>

        <Settings />
        <hr />
      </header>

      <main className="space-y-4">{plan.map(Shift)}</main>
    </div>
  );
}