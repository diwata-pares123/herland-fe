import { useNavigate } from "react-router";
import { Logo } from "../components/Logo";
import { BackgroundShape } from "../components/BackgroundShape";
import { MobileContainer } from "../components/MobileContainer";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div
        className="relative size-full flex flex-col items-center"
        data-name="Log in"
        style={{
          backgroundImage:
            "linear-gradient(88.7631deg, rgb(143, 219, 255) 3.9489%, rgb(61, 173, 226) 99.513%)",
        }}
      >
        <BackgroundShape />
        
        {/* Logo */}
        <div className="mt-[80px]">
          <Logo />
        </div>

        {/* Welcome Text */}
        <div className="mt-[40px] px-6 flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center text-[#184e8d] text-[20px] text-center tracking-[1.6px] w-full max-w-[305px]">
          <p className="leading-[30px]">
            Welcome to Herland Laundry Sales Report and Transaction Logbook
          </p>
        </div>

        {/* Buttons Container */}
        <div className="w-full max-w-[352px] px-4 mt-[80px] flex flex-col gap-4">
          {/* Admin Log In Button */}
          <button
            onClick={() => navigate("/admin-login")}
            className="relative bg-gradient-to-r from-[#20a9ea] h-[47px] rounded-[30px] to-[#006c9f] via-[#118cc6] via-[69.712%] w-full cursor-pointer border-none flex items-center justify-center"
          >
            <p className="font-['Poppins:SemiBold',sans-serif] text-[16px] text-white tracking-[0.8px] leading-[50px]">
              Admin Log In
            </p>
          </button>

          {/* Staff Log In Button */}
          <button
            onClick={() => navigate("/staff-login")}
            className="relative bg-white border-2 border-[#3878c2] border-solid h-[47px] rounded-[30px] w-full cursor-pointer flex items-center justify-center"
          >
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] tracking-[0.8px] leading-[50px]">
              Staff Log In
            </p>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}