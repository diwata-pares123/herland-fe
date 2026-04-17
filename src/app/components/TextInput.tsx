interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  error?: string;
  top: number;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

export function TextInput({
  label,
  value,
  onChange,
  type = "text",
  error,
  top,
  showPasswordToggle,
  onTogglePassword,
  showPassword,
}: TextInputProps) {
  return (
    <div className="absolute left-[73px] w-[307px]" style={{ top: `${top}px` }}>
      <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[#3878c2] text-[15px] whitespace-nowrap mb-2">
        {label}
      </p>
      <div className="relative">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-none outline-none font-['Poppins:Medium',sans-serif] text-[15px] text-[#3878c2] pb-2"
          style={{ caretColor: "#3878c2" }}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-0 top-0 cursor-pointer bg-transparent border-none p-0"
          >
            <EyeOffButton isVisible={!showPassword} />
          </button>
        )}
      </div>
      <div className="h-0 w-full">
        <svg className="block w-full h-[1.5px]" fill="none" preserveAspectRatio="none" viewBox="0 0 307 1.5">
          <line stroke={error ? "#FF0000" : value ? "#EEEEEE" : "#F2F2F2"} strokeWidth="1.5" x2="307" y1="0.75" y2="0.75" />
        </svg>
      </div>
      {error && (
        <p className="font-['Poppins:Medium',sans-serif] text-[12px] text-red-500 mt-1">{error}</p>
      )}
    </div>
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
