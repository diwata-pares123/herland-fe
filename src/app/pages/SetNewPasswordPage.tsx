import { useState } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-qxe6vjfraj";
import { MobileContainer } from "../components/MobileContainer";

export function SetNewPasswordPage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!newPassword.trim()) {
      setError("New password is required");
      return;
    }
    if (!confirmPassword.trim()) {
      setError("Please confirm your password");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("*Password does not match.");
      return;
    }
    setError("");
    navigate("/dashboard");
  };

  const showError = error && newPassword && confirmPassword;

  return (
    <MobileContainer>
      <div className="bg-white relative size-full flex flex-col" data-name="Set a new Password">
        {/* Header with Back Button */}
        <div className="relative flex items-center justify-center pt-[81px] px-6">
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
        <div className="flex-1 flex flex-col px-6 pt-12">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold text-[#1e1e1e] text-[18px] leading-[19.098px] mb-4">
            Set a new password
          </p>

          <div className="font-['Montserrat:Medium',sans-serif] font-medium text-[#989898] text-[15.279px] leading-[normal] mb-10">
            <p className="mb-0">Create a new password. Ensure it differs from</p>
            <p>previous ones for security</p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-[333px]">
            {/* New Password */}
            <div className="mb-6">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#1e1e1e] text-[16px] mb-2">
                New Password
              </p>
              <div className="bg-white relative rounded-[8px] w-full">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-[16px] py-[12px] rounded-[8px] font-['Inter:Regular',sans-serif] text-[16px] text-[#141414] placeholder:text-[#757575] border border-[#d9d9d9] outline-none focus:border-[#3878c2]"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#1e1e1e] text-[16px] mb-2">
                Confirm Password
              </p>
              <div className="bg-white relative rounded-[8px] w-full">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-[16px] py-[12px] rounded-[8px] font-['Inter:Regular',sans-serif] text-[16px] text-[#141414] placeholder:text-[#757575] border border-[#d9d9d9] outline-none focus:border-[#3878c2]"
                />
              </div>
              {showError && (
                <p className="font-['Inter:Light',sans-serif] font-light leading-[normal] text-[#ba1200] text-[12px] text-center mt-2">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="w-full max-w-[371px] mt-8">
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