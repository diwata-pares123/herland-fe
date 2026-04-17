interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export function ActionCard({ title, description, buttonText, onClick }: ActionCardProps) {
  return (
    <div className="bg-white rounded-[8px] overflow-hidden border border-[#e0e2e6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]">
      {/* Media Placeholder */}
      <div className="bg-[#bec1c6] h-[140px] w-full" />
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#3a3e44] text-[18px] leading-[28px] mb-1">
          {title}
        </h3>
        <p className="font-['Inter:Regular',sans-serif] text-[#616469] text-[12px] leading-[16px] mb-3">
          {description}
        </p>
        <button
          onClick={onClick}
          className="bg-white border border-[#e0e2e6] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] px-2 py-1 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[12px] leading-[16px]">
            {buttonText}
          </p>
        </button>
      </div>
    </div>
  );
}
