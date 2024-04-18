type ShiftProps = {
  id: string;
  from: string;
  to: string;
  type: string;
  location: string;
  breaks: { from: string; to: string }[];
};

export default function Shift({}: ShiftProps) {
  return <div></div>;
}
