import Shift from "./Shift";
import db from "@/db/db";
import shifts from "@/db/schema";
import Header from "./Header";

export default async function Home() {
  const plan = await db.select().from(shifts);

  return (
    <main className="container p-10 max-w-screen-xl">
      <Header />

      <div className="space-y-5">
        {plan.map((shift) => (
          <Shift key={shift.id} {...shift} />
        ))}

        {plan.length === 0 && (
          <p className="text-gray-500">
            Du hast keine Schichten in deinem Dienstplan. 🎉
          </p>
        )}
      </div>
    </main>
  );
}
