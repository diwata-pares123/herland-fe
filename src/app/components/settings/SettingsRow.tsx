import { ChevronRight } from "lucide-react";

interface SettingsRowProps {
  label: string;
  onClick: () => void;
}

export function SettingsRow({ label, onClick }: SettingsRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f5f5] rounded-[6px] border-none cursor-pointer hover:bg-[#e0e2e6] mb-3 active:bg-[#d0d2d6] transition-colors"
    >
      <span className="font-['Inter:Medium',sans-serif] text-[#3a3e44] text-[14px]">
        {label}
      </span>
      <ChevronRight className="size-[20px]" color="#3a3e44" strokeWidth={2} />
    </button>
  );
}
