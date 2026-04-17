import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-g07m81oedr";
import { MobileContainer } from "../components/MobileContainer";

export function ForgotPassword2FAPage() {
  const navigate = useNavigate();
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const code = codes.join("");
    if (code.length === 6) {
      navigate("/set-new-password");
    }
  };

  return (
    <MobileContainer>
      <div className="bg-white relative size-full flex flex-col" data-name="Forgot Password 2FA">
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
        <div className="flex-1 flex flex-col items-center px-6 pt-12">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold text-[#1e1e1e] text-[20px] leading-[19.098px] mb-6">
            Check your email
          </p>

          <div className="font-['Open_Sans:Regular',sans-serif] font-normal text-[#989898] text-[14px] text-center leading-[24px] max-w-[340px] mb-12" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="mb-0">We sent a reset link to juandelacruz@gmail.com</p>
            <p>enter 6 digit code that mentioned in the email</p>
          </div>

          {/* Six Digit Input */}
          <div className="flex gap-[10px] justify-center w-full mb-12">
            {codes.map((code, index) => (
              <div key={index} className="rounded-[10px] size-[50px] border border-[#e1e1e1] flex items-center justify-center">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-full text-center text-[20px] font-semibold border-none outline-none bg-transparent"
                  style={{ caretColor: "#3878c2" }}
                />
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <div className="w-full max-w-[371px] mb-8">
            <button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-[#20a9ea] h-[44px] rounded-[100px] to-[#006c9f] via-[#118cc6] via-[62.019%] w-full cursor-pointer border-none flex items-center justify-center"
            >
              <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-white tracking-[0.1px]">
                Confirm
              </p>
            </button>
          </div>

          {/* Resend Code */}
          <p className="font-['Open_Sans:Regular',sans-serif] font-normal text-[12px] text-center whitespace-nowrap">
            <span className="text-[#989898]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Didn't get the code?{" "}
            </span>
            <button
              onClick={() => {/* Resend code logic */}}
              className="[text-decoration-skip-ink:none] decoration-solid text-[#648ddb] underline bg-transparent border-none cursor-pointer font-['Open_Sans:Regular',sans-serif] text-[12px] p-0"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Resend code
            </button>
          </p>
        </div>
      </div>
    </MobileContainer>
  );
}