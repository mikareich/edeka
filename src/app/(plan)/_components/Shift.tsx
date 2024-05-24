import {
  FORMAT_DATE,
  FORMAT_TIME,
  GET_REVENUE,
  type ShiftEvent,
} from "@/lib/utils";
import Highlighted from "./Highlighted";

export default function Shift({
  id,
  summary,
  start,
  end,
  revenue,
}: ShiftEvent) {
  return (
    <div
      key={id}
      className="border grid grid-cols-[1fr,auto] gap-y-0.5 gap-x-1 items-center text-gray-500 rounded-md shadow-none hover:shadow transition px-4 py-2 cursor-pointer"
    >
      <p className="text-sm">
        {summary} {FORMAT_DATE(start, "relativ")}
      </p>

      <p className="text-sm justify-self-end">💸 ~{revenue}€</p>

      <p className="truncate">
        <Highlighted>{FORMAT_DATE(start, "week")}</Highlighted> von{" "}
        <Highlighted>{FORMAT_TIME(start)}</Highlighted> bis{" "}
        <Highlighted>{FORMAT_TIME(end)}</Highlighted>
      </p>

      <p className="justify-self-end text-gray-900">
        {FORMAT_DATE(start, "short")}
      </p>
    </div>
  );
}
