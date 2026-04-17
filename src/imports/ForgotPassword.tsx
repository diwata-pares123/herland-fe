import svgPaths from "./svg-9h72xqgus4";

function StateLayer() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="state-layer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.1px] whitespace-nowrap">
            <p className="leading-[20px]">Confirm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return <div className="absolute h-[75px] left-[54px] top-[161px] w-[333px]" />;
}

function Input() {
  return (
    <div className="bg-white min-w-[240px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Poppins:Regular',sans-serif] leading-none min-h-px min-w-px not-italic relative text-[#757575] text-[16px]">Email or Phone Number</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function EmailAddressField1() {
  return (
    <div className="absolute contents left-[54px] top-[156px]" data-name="emailAddressField">
      <Frame />
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[54px] top-[156px] w-[333px]" data-name="Input Field">
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[#141414] text-[16px] w-[min-content]">Email Address or Phone Number</p>
        <Input />
      </div>
    </div>
  );
}

function EmailAddressField() {
  return (
    <div className="absolute contents left-[35px] top-[156px]" data-name="emailAddressField">
      <div className="absolute flex h-[1.544px] items-center justify-center left-[68px] top-[377.07px] w-[294px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-0.3deg] skew-x-[-0.3deg]">
          <div className="h-0 relative w-[294.004px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Line 2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-gradient-to-r content-stretch cursor-pointer flex flex-col from-[#20a9ea] h-[44px] items-center justify-center left-[35px] overflow-clip rounded-[100px] to-[#006c9f] top-[285px] via-[#118cc6] via-[62.019%] w-[371px]" data-name="Confirm">
        <StateLayer />
      </div>
      <EmailAddressField1 />
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <div className="bg-white relative size-full" data-name="Forgot Password">
      <EmailAddressField />
      <p className="-translate-x-1/2 absolute font-['Montserrat:Light',sans-serif] font-light h-[16px] leading-[14.715px] left-[calc(50%-1.5px)] text-[#757575] text-[12px] text-center top-[96px] w-[289px]">Please enter your email to reset your password.</p>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18px] left-[calc(50%-166px)] top-[calc(50%-415px)] w-[10px]" data-name="Return Symbol">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 18">
          <path clipRule="evenodd" d={svgPaths.p42a1500} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="Return Symbol" />
        </svg>
      </div>
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium h-[17px] leading-[14.715px] left-[calc(50%-92px)] text-[#002540] text-[19.62px] top-[57px] w-[170px]">Forgot Password</p>
    </div>
  );
}