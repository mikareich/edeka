import { FORMAT_DATE, FORMAT_TIME, GET_REVENUE, type Shift } from "@/lib/utils";
import Highlighted from "./Highlighted";

export default function Shift(shift: Shift) {
  const { id, type, startDate, endDate } = shift;

  return (
    <div
      key={id}
      className="border grid grid-cols-[1fr,auto] gap-y-0.5 gap-x-1 items-center text-gray-500 rounded-md shadow-none hover:shadow transition px-4 py-2 cursor-pointer"
    >
      <p className="text-sm">
        {type} {FORMAT_DATE(startDate, "relativ")}
      </p>

      <p className="text-sm justify-self-end">💸 ~{GET_REVENUE(shift)}€</p>

      <p className="truncate">
        <Highlighted>{FORMAT_DATE(startDate, "week")}</Highlighted> von{" "}
        <Highlighted>{FORMAT_TIME(startDate)}</Highlighted> bis{" "}
        <Highlighted>{FORMAT_TIME(endDate)}</Highlighted>
      </p>

      <p className="justify-self-end text-gray-900">
        {FORMAT_DATE(startDate, "short")}
      </p>
    </div>
  );
}
