interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function PrimaryButton({ children, onClick, type = "button" }: PrimaryButtonProps) {
  return (
    <div className="absolute contents left-[45px] top-[664px]" data-name="Guest">
      <div className="absolute bg-gradient-to-r from-[#20a9ea] h-[47px] left-[45px] rounded-[30px] to-[#006c9f] top-[664px] via-[#118cc6] via-[69.712%] w-[352px]" />
      <button
        type={type}
        onClick={onClick}
        className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[43px] justify-center leading-[0] left-[220.5px] not-italic text-[16px] text-center text-white top-[689.5px] tracking-[0.8px] w-[293px] cursor-pointer bg-transparent border-none"
      >
        <p className="leading-[50px]">{children}</p>
      </button>
    </div>
  );
}
