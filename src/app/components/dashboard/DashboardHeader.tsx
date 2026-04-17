import svgPaths from "../../../imports/svg-dlgn01bc9z";

interface DashboardHeaderProps {
  userName: string;
  onNotificationClick: () => void;
  onMenuClick: () => void;
  onAvatarClick?: () => void;
  notificationCount?: number;
}

export function DashboardHeader({ 
  userName, 
  onNotificationClick, 
  onMenuClick, 
  onAvatarClick,
  notificationCount = 0 
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white">
      {/* User Avatar */}
      <button
        onClick={onAvatarClick}
        className="bg-[#8f9297] content-stretch flex items-center justify-center rounded-full size-[48px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] border border-[#e0e2e6] cursor-pointer p-0 hover:opacity-80 transition-opacity"
      >
        <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
          <path 
            d="M12 4C13.6569 4 15 5.34315 15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4Z" 
            fill="white" 
          />
          <path 
            d="M5 20C5 16.6863 7.68629 14 11 14H13C16.3137 14 19 16.6863 19 20V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V20Z" 
            fill="white" 
          />
        </svg>
      </button>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Notification Button */}
        <button
          onClick={onNotificationClick}
          className="relative flex items-center justify-center size-[44px] bg-transparent border-none cursor-pointer p-0"
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.9024 44">
            <ellipse cx="21.9512" cy="22" fill="#D5E9F8" rx="21.9512" ry="22" />
            <g>
              <path 
                d={svgPaths.p32821e00}
                stroke="#006C9F" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
              />
            </g>
          </svg>
          {/* Notification Count Badge */}
          {notificationCount > 0 && (
            <div className="absolute top-0 right-0 bg-[#e74c3c] text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-['Inter:Bold',sans-serif] border-2 border-white">
              {notificationCount > 99 ? '99+' : notificationCount}
            </div>
          )}
        </button>

        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center size-[44px] bg-transparent border-none cursor-pointer p-0"
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.9025 44">
            <ellipse cx="21.9512" cy="22" fill="#D5E9F8" rx="21.9512" ry="22" />
            <g>
              <path 
                d={svgPaths.p9881bf0}
                stroke="#006C9F" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}