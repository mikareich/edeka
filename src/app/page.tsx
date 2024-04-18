import Shift from "./Shift";

export default function Home() {
  return (
    <main className="container px-20 pt-5">
      <header>
        <h1 className="text-3xl font-bold">EDEKA Dienstplan</h1>
        <hr />
      </header>

      <Shift />
    </main>
  );
}
