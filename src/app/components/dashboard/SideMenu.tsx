import { useNavigate } from "react-router";
import svgPaths from "../../../imports/svg-b2n4hksylo";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function SideMenu({ isOpen, onClose, onLogout }: SideMenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar after navigation
  };

  const handleLogout = () => {
    onLogout();
    onClose(); // Close sidebar after logout
  };

  return (
    <div 
      className={`fixed top-0 left-0 bottom-0 w-[244px] bg-[#3878c2] z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center pt-[43px] pb-6">
        <div className="bg-[#8f9297] rounded-full size-[48px] flex items-center justify-center mb-2 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] border border-[#e0e2e6]">
          <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
            <path 
              d={svgPaths.p3b22abb0}
              fill="white" 
            />
            <path 
              d={svgPaths.pf14caf0}
              fill="white" 
            />
          </svg>
        </div>
        <p className="font-['Poppins:SemiBold',sans-serif] text-white text-[16px] leading-[normal]">
          User
        </p>
        <p className="font-['Poppins:ExtraLight',sans-serif] text-white text-[12px] leading-[normal]">
          Admin
        </p>
      </div>

      {/* Divider */}
      <div className="mx-4 h-[1px] bg-[#6999d0] mb-6" />

      {/* Menu Items */}
      <nav className="flex flex-col items-end px-8 gap-6">
        <button 
          onClick={() => handleNavigation("/dashboard")}
          className="font-['Poppins:Regular',sans-serif] text-white text-[16px] leading-[normal] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          Home
        </button>
        <button 
          onClick={() => handleNavigation("/notifications")}
          className="font-['Poppins:Regular',sans-serif] text-white text-[16px] leading-[normal] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          Notifications
        </button>
        <button 
          onClick={() => handleNavigation("/history")}
          className="font-['Poppins:Regular',sans-serif] text-white text-[16px] leading-[normal] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          History
        </button>
        <button 
          onClick={() => handleNavigation("/sales-report")}
          className="font-['Poppins:Regular',sans-serif] text-white text-[16px] leading-[normal] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          Sales Report
        </button>
      </nav>

      {/* Divider */}
      <div className="mx-6 h-[1px] bg-[#6999d0] my-6" />

      {/* Settings */}
      <div className="flex flex-col items-end px-8">
        <button 
          onClick={() => handleNavigation("/profile")}
          className="font-['Poppins:Regular',sans-serif] text-white text-[16px] leading-[normal] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          Settings
        </button>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-[55px] left-[28px] flex items-center gap-2">
        <p className="font-['Poppins:Medium',sans-serif] text-[#78ace7] text-[16px] leading-[normal]">
          Log Out
        </p>
        <button
          onClick={handleLogout}
          className="bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity"
        >
          <svg className="size-[29px]" fill="none" viewBox="0 0 29 28.3824">
            <g clipPath="url(#clip0_6_8476)">
              <g>
                <path 
                  d={svgPaths.p196f9200}
                  stroke="#78ACE7" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.58594" 
                />
                <path 
                  d="M15.25 18.6769V19.8594" 
                  stroke="#78ACE7" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.58594" 
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_6_8476">
                <rect fill="white" height="28.3824" width="29" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}