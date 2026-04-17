import { useEffect } from "react";
import { useNavigate } from "react-router";
import { MobileContainer } from "../components/MobileContainer";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to login selection after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileContainer>
      <div className="bg-gradient-to-br from-[#3878c2] to-[#63bce6] relative size-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Pattern - Optional decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 size-[100px] rounded-full bg-white/20" />
          <div className="absolute bottom-20 right-10 size-[150px] rounded-full bg-white/20" />
          <div className="absolute top-1/3 right-20 size-[80px] rounded-full bg-white/20" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8">
          {/* Logo Container */}
          <div className="mb-8 relative">
            {/* Logo Circle Background */}
            <div className="size-[140px] rounded-full bg-white shadow-2xl flex items-center justify-center mb-6">
              {/* Laundry Icon */}
              <svg 
                className="size-[80px]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#3878c2" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Washing machine icon */}
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="12" cy="14" r="5" />
                <path d="M7 6h.01M10 6h.01" />
                <circle cx="12" cy="14" r="3" />
              </svg>
            </div>
          </div>

          {/* Brand Name */}
          <div className="text-center">
            <h1 className="font-['Poppins:Bold',sans-serif] text-white text-[36px] leading-[44px] mb-2 tracking-wide">
              Herland
            </h1>
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-white text-[28px] leading-[36px] mb-4 tracking-wide">
              Laundry
            </h2>
            <div className="h-[3px] w-[120px] bg-white/80 rounded-full mx-auto mb-6" />
            <p className="font-['Inter:Medium',sans-serif] text-white/90 text-[14px] tracking-wider">
              MANAGEMENT SYSTEM
            </p>
          </div>

          {/* Loading Indicator */}
          <div className="mt-12">
            <div className="flex gap-2">
              <div 
                className="size-[10px] rounded-full bg-white animate-bounce"
                style={{ animationDelay: "0ms", animationDuration: "1s" }}
              />
              <div 
                className="size-[10px] rounded-full bg-white animate-bounce"
                style={{ animationDelay: "150ms", animationDuration: "1s" }}
              />
              <div 
                className="size-[10px] rounded-full bg-white animate-bounce"
                style={{ animationDelay: "300ms", animationDuration: "1s" }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center">
          <p className="font-['Inter:Regular',sans-serif] text-white/70 text-[11px]">
            Version 1.0.0
          </p>
        </div>
      </div>
    </MobileContainer>
  );
}
