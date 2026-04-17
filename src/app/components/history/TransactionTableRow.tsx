import { TransactionStatus, StatusBadge } from "./StatusBadge";

interface TransactionTableRowProps {
  invoice: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  onDetails: () => void;
}

export function TransactionTableRow({ 
  invoice, 
  date, 
  amount, 
  status, 
  onDetails 
}: TransactionTableRowProps) {
  return (
    <div className="grid grid-cols-[0.8fr_0.9fr_0.8fr_1fr_0.7fr] gap-2 py-3 border-b border-[#e0e2e6] items-center">
      <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[11px]">
        {invoice}
      </p>
      <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[10px]">
        {new Date(date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}
      </p>
      <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[11px]">
        PHP {amount}
      </p>
      <div className="flex items-center">
        <StatusBadge status={status} />
      </div>
      <button
        onClick={onDetails}
        className="bg-transparent border border-[#3878c2] text-[#3878c2] px-2 py-1 rounded-[4px] font-['Inter:Semi_Bold',sans-serif] text-[9px] cursor-pointer hover:bg-[#3878c2] hover:text-white transition-colors"
      >
        DETAILS
      </button>
    </div>
  );
}
