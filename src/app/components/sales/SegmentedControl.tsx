export type TabType = "unpaid" | "paid" | "claimed";

interface SegmentedControlProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function SegmentedControl({ activeTab, onTabChange }: SegmentedControlProps) {
  return (
    <div className="flex bg-[#e0e2e6] rounded-[6px] p-1 gap-1">
      <button
        onClick={() => onTabChange("unpaid")}
        className={`flex-1 py-2 px-4 rounded-[4px] font-['Inter:Semi_Bold',sans-serif] text-[12px] border-none cursor-pointer transition-all ${
          activeTab === "unpaid"
            ? "bg-[#e74c3c] text-white shadow-sm"
            : "bg-transparent text-[#3a3e44] hover:bg-[#d0d2d6]"
        }`}
      >
        UNPAID
      </button>
      <button
        onClick={() => onTabChange("paid")}
        className={`flex-1 py-2 px-4 rounded-[4px] font-['Inter:Semi_Bold',sans-serif] text-[12px] border-none cursor-pointer transition-all ${
          activeTab === "paid"
            ? "bg-[#4bad40] text-white shadow-sm"
            : "bg-transparent text-[#3a3e44] hover:bg-[#d0d2d6]"
        }`}
      >
        PAID
      </button>
      <button
        onClick={() => onTabChange("claimed")}
        className={`flex-1 py-2 px-4 rounded-[4px] font-['Inter:Semi_Bold',sans-serif] text-[12px] border-none cursor-pointer transition-all ${
          activeTab === "claimed"
            ? "bg-[#3878c2] text-white shadow-sm"
            : "bg-transparent text-[#3a3e44] hover:bg-[#d0d2d6]"
        }`}
      >
        CLAIMED
      </button>
    </div>
  );
}
