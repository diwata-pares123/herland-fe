interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChange(!checked)}>
      <div className="size-[17px] flex-shrink-0">
        {checked ? (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <g>
              <rect fill="#4BAD40" height="17" width="17" />
              <path
                d="M4 9.2L6.85714 12L13 5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </svg>
        ) : (
          <div className="size-full border-2 border-[#3878c2]" />
        )}
      </div>
      <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[#3878c2] text-[12px] whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}