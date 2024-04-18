"use client";

import Link from "next/link";
import reloadPlan from "./reloadPlan";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleReloadPlan = async () => {
    setLoading(true);
    await reloadPlan();
    router.refresh();
    setLoading(false);
  };

  return (
    <header className="border-b mb-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Willkommen, Mika Reich!
      </h1>
      <h2 className="text-xl text-gray-500 mt-2">
        Hier wird dir dein persönlicher EDEKA Dienstplan angezeigt. Du kannst
        ihn außerdem mit deinem Kalendar synchronisieren lassen!
      </h2>

      <nav className="flex gap-4 my-2">
        <Link
          className="underline text-lg"
          href={""}
          onClick={handleReloadPlan}
        >
          {loading ? "Lade..." : "Dienstplan neu laden"}
        </Link>
        <Link className="underline text-lg" href={""}>
          Einstellungen
        </Link>
      </nav>
    </header>
  );
}
