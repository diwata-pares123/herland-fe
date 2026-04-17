import { PenLine, Trash2 } from "lucide-react";

export type TabType = "unpaid" | "paid" | "claimed";

interface SalesTableRowProps {
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
  onDelete 
}: SalesTableRowProps) {
  
  // Unpaid: Customer | Service | Amount | Date | Actions
  if (tabType === "unpaid") {
    return (
      <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.7fr_60px] gap-3 py-4 border-b border-[#e0e2e6]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px] truncate">
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
            title="Delete"
          >
            <Trash2 className="size-[14px]" color="#e74c3c" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    );
  }

  // Paid: Customer | Payment Method | Service | Amount | Date | Actions
  if (tabType === "paid") {
    return (
      <div className="grid grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.6fr_60px] gap-3 py-4 border-b border-[#e0e2e6]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px] truncate">
          {name}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px]">
          {paymentMethod || "N/A"}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px]">
          {service}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#4bad40] text-[10px]">
          ₱{amount.toFixed(2)}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[9px]">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
        <div className="flex items-center gap-2">
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
            title="Delete"
          >
            <Trash2 className="size-[14px]" color="#e74c3c" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    );
  }

  // Claimed: Customer | Classification | Wash Date | Amount | Claim Date | Actions
  return (
    <div className="grid grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.7fr_60px] gap-3 py-4 border-b border-[#e0e2e6]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px] truncate">
        {name}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[10px]">
        {classification || "N/A"}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[9px]">
        {washDate ? new Date(washDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#3878c2] text-[10px]">
        ₱{amount.toFixed(2)}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] text-[#ababab] text-[9px]">
        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
      <div className="flex items-center gap-2">
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
          title="Delete"
        >
          <Trash2 className="size-[14px]" color="#e74c3c" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
