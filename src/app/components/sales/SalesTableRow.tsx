import { PenLine, Trash2, CheckCircle2 } from "lucide-react"; // Added CheckCircle2

export type TabType = "unpaid" | "paid" | "claimed";

interface SalesTableRowProps {
  id: string; // Ensure ID is passed down
  tabType: TabType;
  name: string;
  service: string;
  amount: number;
  date: string;
  paymentMethod?: string;
  classification?: string;
  washDate?: string;
  onEdit: () => void;
  onDelete: () => void;
  onMarkAsPaid?: () => void; // Added new prop for status change
}

export function SalesTableRow({ 
  tabType, 
  name, 
  service, 
  amount, 
  date, 
  paymentMethod, 
  classification, 
  washDate,
  onEdit, 
  onDelete,
  onMarkAsPaid 
}: SalesTableRowProps) {
  
  // Unpaid: Customer | Service | Amount | Date | Actions
  if (tabType === "unpaid") {
    return (
      <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.7fr_80px] gap-3 py-4 border-b border-[#e0e2e6]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px] truncate uppercase">
          {name}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px]">
          {service}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#e74c3c] text-[10px]">
          ₱{amount.toFixed(2)}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[9px]">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
        <div className="flex items-center gap-2">
          {/* NEW: Quick Mark as Paid Button */}
          <button
            onClick={onMarkAsPaid}
            className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0 hover:scale-110 transition-transform"
            title="Mark as Paid"
          >
            <CheckCircle2 className="size-[14px]" color="#4bad40" strokeWidth={2} />
          </button>
          
          <button
            onClick={onEdit}
            className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0 hover:opacity-70"
            title="Edit"
          >
            <PenLine className="size-[14px]" color="#3878c2" strokeWidth={1.5} />
          </button>
          
          <button
            onClick={onDelete}
            className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0 hover:opacity-70"
            title="Delete Permanently"
          >
            <Trash2 className="size-[14px]" color="#e74c3c" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    );
  }

  // Paid and Claimed tabs use your existing logic (Updated to include Hard Delete)
  // ... (Keeping your existing UI for Paid/Claimed below)
  
  const isPaid = tabType === "paid";
  const gridCols = isPaid 
    ? "grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.6fr_60px]" 
    : "grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.7fr_60px]";

  return (
    <div className={`grid ${gridCols} gap-3 py-4 border-b border-[#e0e2e6]`}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px] truncate uppercase">
        {name}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px]">
        {isPaid ? (paymentMethod || "N/A") : (classification || "N/A")}
      </p>
      {/* Dynamic Column for Paid (Service) or Claimed (Wash Date) */}
      {isPaid ? (
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px]">
          {service}
        </p>
      ) : (
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[9px]">
          {washDate ? new Date(washDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}
        </p>
      )}
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[10px] ${isPaid ? 'text-[#4bad40]' : 'text-[#3878c2]'}`}>
        ₱{amount.toFixed(2)}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[9px]">
        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
      <div className="flex items-center gap-2">
        <button onClick={onEdit} className="hover:opacity-70" title="Edit">
          <PenLine className="size-[14px]" color="#3878c2" strokeWidth={1.5} />
        </button>
        <button onClick={onDelete} className="hover:opacity-70" title="Delete Permanently">
          <Trash2 className="size-[14px]" color="#e74c3c" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}