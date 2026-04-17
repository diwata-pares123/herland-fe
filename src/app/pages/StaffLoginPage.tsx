import { useState } from "react";
import { useNavigate } from "react-router";
import { Logo } from "../components/Logo";
import { BackgroundShape } from "../components/BackgroundShape";
import { TextInput } from "../components/TextInput";
import { Checkbox } from "../components/Checkbox";
import { MobileContainer } from "../components/MobileContainer";

export function StaffLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleLogin = () => {
    const newErrors = { username: "", password: "" };
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      // Navigate to dashboard (staff don't need 2FA)
      navigate("/dashboard");
    }
  };

  return (
    <MobileContainer>
      <div
        className="relative size-full flex flex-col items-center"
        data-name="Log in (Staff)"
        style={{
          backgroundImage:
            "linear-gradient(88.7631deg, rgb(143, 219, 255) 3.9489%, rgb(61, 173, 226) 99.513%)",
        }}
      >
        <BackgroundShape />
        
        {/* Logo */}
        <div className="mt-[60px]">
          <Logo />
        </div>

        {/* Welcome Back Title */}
        <div className="mt-[60px] flex flex-col font-['Poppins:SemiBold',sans-serif] h-[43px] justify-center leading-[0] not-italic text-[#184e8d] text-[32px] text-center tracking-[1.6px] w-[293px]">
          <p className="leading-[50px]">Welcome Back!</p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[307px] px-4 mt-[20px]">
          {/* Username Field */}
          <div className="mb-[20px]">
            <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[#184e8d] text-[15px] mb-2">
              Username
            </p>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-white/90 border-2 border-[#3878c2]/30 rounded-lg px-4 py-3 outline-none font-['Poppins:Regular',sans-serif] text-[15px] text-[#184e8d] placeholder:text-[#3878c2]/50 focus:border-[#3878c2] focus:bg-white transition-colors"
                style={{ caretColor: "#3878c2" }}
              />
            </div>
            {errors.username && (
              <p className="font-['Poppins:Medium',sans-serif] text-[12px] text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-[15px]">
            <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[#184e8d] text-[15px] mb-2">
              Password
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white/90 border-2 border-[#3878c2]/30 rounded-lg px-4 py-3 pr-12 outline-none font-['Poppins:Regular',sans-serif] text-[15px] text-[#184e8d] placeholder:text-[#3878c2]/50 focus:border-[#3878c2] focus:bg-white transition-colors"
                style={{ caretColor: "#3878c2" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-1 flex items-center justify-center"
              >
                <EyeOffButton isVisible={!showPassword} />
              </button>
            </div>
            {errors.password && (
              <p className="font-['Poppins:Medium',sans-serif] text-[12px] text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mt-[20px] mb-[40px]">
            <Checkbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Remember Me"
            />
            <button
              onClick={() => navigate("/forgot-password")}
              className="decoration-solid font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[#4bad40] text-[12px] text-right underline whitespace-nowrap bg-transparent border-none cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Login Button */}
        <div className="w-full max-w-[352px] px-4 mt-[20px]">
          <button
            onClick={handleLogin}
            className="relative bg-gradient-to-r from-[#20a9ea] h-[47px] rounded-[30px] to-[#006c9f] via-[#118cc6] via-[69.712%] w-full flex items-center justify-center cursor-pointer border-none"
          >
            <p className="font-['Poppins:SemiBold',sans-serif] text-[16px] text-white tracking-[0.8px] leading-[50px]">
              Log in as Staff
            </p>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}

function EyeOffButton({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="h-[21px] w-[23px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 21">
        <g clipPath="url(#clip0_2_849)">
          <path
            d="M1.82143 10.15C3.29286 6.9 7.22143 4.25 11.9107 4.25C16.6 4.25 20.5286 6.9 22 10.15C20.5286 13.4 16.6 16.05 11.9107 16.05C7.22143 16.05 3.29286 13.4 1.82143 10.15Z"
            stroke="#63BCE6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M11.9107 13.15C13.5676 13.15 14.9107 11.8069 14.9107 10.15C14.9107 8.49315 13.5676 7.15 11.9107 7.15C10.2539 7.15 8.91071 8.49315 8.91071 10.15C8.91071 11.8069 10.2539 13.15 11.9107 13.15Z"
            stroke="#63BCE6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          {!isVisible && (
            <path
              d="M0.821429 0L23 20.3"
              stroke="#63BCE6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          )}
        </g>
        <defs>
          <clipPath id="clip0_2_849">
            <rect fill="white" height="21" width="23" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}