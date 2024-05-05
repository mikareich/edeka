import { FORMAT_DATE, FORMAT_TIME, GET_REVENUE, type Shift } from "@/lib/utils";

const Highlighted = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gray-900 font-medium">{children}</span>
);

export default function Shift({
  id,
  type,
  location,
  startDate,
  endDate,
  numberOfBreaks,
}: Shift) {
  return (
    <div
      key={id}
      className="border grid grid-cols-[1fr,auto] gap-y-0.5 items-center text-gray-500 rounded-md shadow-none hover:shadow transition px-4 py-2 cursor-pointer"
    >
      <p className="text-sm">
        {type} {FORMAT_DATE(startDate, "relativ")}
      </p>

      <p className="text-sm">{location}</p>
      <p>
        <Highlighted>{FORMAT_DATE(startDate, "long")}</Highlighted> von{" "}
        <Highlighted>{FORMAT_TIME(startDate)}</Highlighted> bis{" "}
        <Highlighted>{FORMAT_TIME(endDate)}</Highlighted>
      </p>

      <p className="justify-self-end">💸 ~{GET_REVENUE(startDate, endDate)}€</p>
    </div>
  );
}