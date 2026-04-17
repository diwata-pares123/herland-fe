import { useState } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-9h72xqgus4";
import { MobileContainer } from "../components/MobileContainer";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!emailOrPhone.trim()) {
      setError("Email or Phone Number is required");
      return;
    }
    setError("");
    navigate("/forgot-password-2fa");
  };

  return (
    <MobileContainer>
      <div className="bg-white relative size-full flex flex-col" data-name="Forgot Password">
        {/* Header with Back Button */}
        <div className="relative flex items-center justify-center pt-[57px] px-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 h-[18px] w-[10px] bg-transparent border-none cursor-pointer p-0"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 18">
              <path
                clipRule="evenodd"
                d={svgPaths.p42a1500}
                fill="black"
                fillOpacity="0.7"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <p className="font-['Montserrat:Medium',sans-serif] font-medium text-[#002540] text-[19.62px] leading-[14.715px]">
            Forgot Password
          </p>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col items-center px-6 pt-10">
          <p className="font-['Montserrat:Light',sans-serif] font-light text-[#757575] text-[12px] text-center leading-[14.715px] max-w-[289px] mb-14">
            Please enter your email to reset your password.
          </p>

          {/* Form */}
          <div className="w-full max-w-[333px]">
            <p className="font-['Poppins:Regular',sans-serif] leading-[1.4] text-[#141414] text-[16px] mb-2">
              Email Address or Phone Number
            </p>
            <div className="bg-white relative rounded-[8px] w-full">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email or Phone Number"
                className="w-full px-[16px] py-[12px] rounded-[8px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#141414] placeholder:text-[#757575] border border-[#d9d9d9] outline-none focus:border-[#3878c2]"
              />
            </div>
            {error && (
              <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-red-500 mt-1">{error}</p>
            )}
          </div>

          {/* Confirm Button */}
          <div className="w-full max-w-[371px] mt-14">
            <button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-[#20a9ea] h-[44px] rounded-[100px] to-[#006c9f] via-[#118cc6] via-[62.019%] w-full cursor-pointer border-none flex items-center justify-center"
            >
              <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-white tracking-[0.1px]">
                Confirm
              </p>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}