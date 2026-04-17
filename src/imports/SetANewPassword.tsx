import svgPaths from "./svg-qxe6vjfraj";

function ConfirmNewPassword() {
  return (
    <div className="bg-white min-w-[240px] relative rounded-[8px] shrink-0 w-full" data-name="Confirm new password">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic relative text-[#757575] text-[16px]">Confirm new password</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function EnterANewPassword() {
  return (
    <div className="bg-white min-w-[240px] relative rounded-[8px] shrink-0 w-full" data-name="Enter a new password">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic relative text-[#757575] text-[16px]">Enter new password</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function Headings() {
  return (
    <div className="absolute contents left-[44px] top-[148px] whitespace-nowrap" data-name="Headings">
      <div className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[44px] text-[#989898] text-[15.279px] top-[184.29px]">
        <p className="mb-0">Create a new password. Ensure it differs from</p>
        <p>previous ones for security</p>
      </div>
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[19.098px] left-[44px] text-[#1e1e1e] text-[18px] top-[148px]">Set a new password</p>
    </div>
  );
}

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

export default function SetANewPassword() {
  return (
    <div className="bg-white relative size-full" data-name="Set a new Password">
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[53px] top-[330px] w-[333px]" data-name="Confirm Password">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-[min-content]">Confirm Password</p>
        <ConfirmNewPassword />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[53px] top-[251px] w-[333px]" data-name="New Password">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-[min-content]">New Password</p>
        <EnterANewPassword />
      </div>
      <Headings />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18px] left-[calc(50%-178px)] top-[calc(50%-389px)] w-[10px]" data-name="Return symbol">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 18">
          <path clipRule="evenodd" d={svgPaths.p42a1500} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="Return Symbol" />
        </svg>
      </div>
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium h-[17px] leading-[14.715px] left-[calc(50%-85px)] text-[#002540] text-[19.62px] top-[81px] w-[170px]">Forgot Password</p>
      <div className="absolute bg-gradient-to-r content-stretch cursor-pointer flex flex-col from-[#20a9ea] h-[44px] items-center justify-center left-[34px] overflow-clip rounded-[100px] to-[#006c9f] top-[450px] via-[#118cc6] via-[62.019%] w-[371px]" data-name="Confirm">
        <StateLayer />
      </div>
    </div>
  );
}