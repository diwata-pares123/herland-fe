export type TransactionStatus = "ON-GOING" | "CLAIMED" | "CANCELLED";

interface StatusBadgeProps {
  status: TransactionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "ON-GOING":
        return "bg-[#f9e79f] text-[#856404]";
      case "CLAIMED":
        return "bg-[#4bad40] text-white";
      case "CANCELLED":
        return "bg-[#e74c3c] text-white";
      default:
        return "bg-[#e0e2e6] text-[#3a3e44]";
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-['Inter:Semi_Bold',sans-serif] text-[10px] ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
}
