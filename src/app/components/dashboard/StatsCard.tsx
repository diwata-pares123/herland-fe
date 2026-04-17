interface StatsCardProps {
  icon: "chart" | "users";
  title: string;
  value: string;
  decimal?: string;
  change: string;
  changeType: "increase" | "decrease";
}

export function StatsCard({ icon, title, value, decimal, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white rounded-[8px] border border-[#e0e2e6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 min-w-[280px] flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          {/* Icon */}
          {icon === "chart" ? (
            <svg className="size-[20px]" fill="none" viewBox="0 0 16 16">
              <path 
                d="M2 13H14M2 13V3M14 13V7M6 13V9M10 13V5" 
                stroke="#616469" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg className="size-[20px]" fill="none" viewBox="0 0 18 15">
              <path d="M9 6C10.6569 6 12 4.65685 12 3C12 1.34315 10.6569 0 9 0C7.34315 0 6 1.34315 6 3C6 4.65685 7.34315 6 9 6Z" fill="#616469" />
              <path d="M0 13C0 10.7909 1.79086 9 4 9H5.5C7.70914 9 9.5 10.7909 9.5 13V14C9.5 14.5523 9.05228 15 8.5 15H1C0.447715 15 0 14.5523 0 14V13Z" fill="#616469" />
              <path d="M13.5 6C14.8807 6 16 4.88071 16 3.5C16 2.11929 14.8807 1 13.5 1C12.1193 1 11 2.11929 11 3.5C11 4.88071 12.1193 6 13.5 6Z" fill="#616469" />
              <path d="M10.5 13C10.5 11.3431 11.8431 10 13.5 10H14.5C16.1569 10 17.5 11.3431 17.5 13V14C17.5 14.5523 17.0523 15 16.5 15H11C10.7239 15 10.5 14.7761 10.5 14.5V13Z" fill="#616469" />
            </svg>
          )}
          <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[14px] leading-[20px]">
            {title}
          </p>
        </div>
        
        {/* Info Icon */}
        <svg className="size-[20px]" fill="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="7" stroke="#8F9297" strokeWidth="1.5" />
          <path d="M8 12V8M8 6V5" stroke="#8F9297" strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Value */}
      <div className="mb-1">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3a3e44]">
          <span className="text-[30px] leading-[36px]">{value}</span>
          {decimal && <span className="text-[16px] leading-[24px]">{decimal}</span>}
        </p>
      </div>

      {/* Change Badge */}
      <div className="inline-flex items-center gap-1 bg-[#eff0f2] border border-[#d4d8dd] rounded-full px-[10px] py-[2px]">
        {/* Arrow Icon */}
        <svg 
          className={`size-[20px] ${changeType === "increase" ? "rotate-180" : ""}`}
          fill="none" 
          viewBox="0 0 12 14"
        >
          <path 
            d="M6 13V1M6 1L1 6M6 1L11 6" 
            stroke="#3A3E44" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5"
          />
        </svg>
        <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[14px] leading-[20px]">
          {change}
        </p>
      </div>
    </div>
  );
}
