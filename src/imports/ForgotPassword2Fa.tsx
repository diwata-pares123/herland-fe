import svgPaths from "./svg-g07m81oedr";

function Boxes() {
  return (
    <div className="col-1 h-[50px] ml-0 mt-0 relative row-1 w-[312px]" data-name="Boxes">
      <div className="-translate-x-1/2 absolute left-[calc(50%+193px)] rounded-[10px] size-[50px] top-0">
        <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(50%+131px)] rounded-[10px] size-[50px] top-0">
        <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(50%+66px)] rounded-[10px] size-[50px] top-0">
        <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
      <div className="-translate-x-1/2 absolute left-1/2 rounded-[10px] size-[50px] top-0">
        <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(50%-65px)] rounded-[10px] size-[50px] top-0">
        <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(50%-131px)] rounded-[10px] size-[50px] top-0">
        <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
    </div>
  );
}

function SixDigit() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Six Digit">
      <Boxes />
    </div>
  );
}

function SixDigitConfirmation() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[33px] top-[256px] w-[374px]" data-name="Six Digit Confirmation">
      <SixDigit />
    </div>
  );
}

function CheckYourEmail() {
  return (
    <div className="absolute contents left-[51px] top-[118px]" data-name="Check your email">
      <div className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[24px] left-[221px] text-[#989898] text-[14px] text-center top-[153.07px] w-[340px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">We sent a reset link to juandelacruz@gmail.com</p>
        <p>enter 6 digit code that mentioned in the email</p>
      </div>
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[19.098px] left-[calc(50%-90px)] text-[#1e1e1e] text-[20px] top-[118px] whitespace-nowrap">Check your email</p>
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

export default function ForgotPassword2Fa() {
  return (
    <div className="bg-white relative size-full" data-name="Forgot Password 2FA">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-['Open_Sans:Regular',sans-serif] font-normal font-semibold leading-[0] left-[calc(50%+0.5px)] not-italic text-[#2a2a2a] text-[0px] text-[12px] text-center top-[433px] whitespace-nowrap">
        <span className="leading-[normal] text-[#989898]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Didn’t get the code?
        </span>
        <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>{` `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] text-[#648ddb] underline" style={{ fontVariationSettings: "'wdth' 100" }}>
          Resend code
        </span>
      </p>
      <SixDigitConfirmation />
      <CheckYourEmail />
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium h-[17px] leading-[14.715px] left-[calc(50%-85px)] text-[#002540] text-[19.62px] top-[57px] w-[170px]">Forgot Password</p>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18px] left-[calc(50%-157px)] top-[calc(50%-413px)] w-[10px]" data-name="Return Symbol">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 18">
          <path clipRule="evenodd" d={svgPaths.p42a1500} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="Return Symbol" />
        </svg>
      </div>
      <div className="absolute bg-gradient-to-r content-stretch cursor-pointer flex flex-col from-[#20a9ea] h-[44px] items-center justify-center left-[34px] overflow-clip rounded-[100px] to-[#006c9f] top-[375px] via-[#118cc6] via-[62.019%] w-[371px]" data-name="Confirm">
        <StateLayer />
      </div>
    </div>
  );
}