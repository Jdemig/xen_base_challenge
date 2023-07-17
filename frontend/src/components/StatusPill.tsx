import {statusBackgroudColor, statusColor} from "../utils/statusColor";


type StatusPillProps = {
  status?: string;
  className?: string;
}

const StatusPill = ({ status, className }: StatusPillProps) => {
  return (
    <div
      className={`w-[92px] rounded px-2 py-1 uppercase font-bold text-xs text-center ${statusBackgroudColor(status)} ${statusColor(status)} ${className}`}
    >
      {status}
    </div>
  );
}

export default StatusPill;