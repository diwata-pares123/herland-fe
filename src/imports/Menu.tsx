import svgPaths from "./svg-b2n4hksylo";

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Home</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Notifications</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Sales Report</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[25px] items-end left-[131px] top-[186px] w-[100px]">
      <Frame />
      <Frame1 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">History</p>
      <Frame2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Settings</p>
    </div>
  );
}

function Frame6() {
  return <div className="h-[24px] shrink-0 w-0" />;
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[25px] items-end left-[131px] top-[425px] w-[100px]">
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function DoorIconBlue() {
  return (
    <div className="absolute h-[28.382px] left-[93px] top-[901px] w-[29px]" data-name="Door icon (Blue)">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 28.3824">
        <g clipPath="url(#clip0_6_8476)" id="Door icon (Blue)">
          <g id="backgr" />
          <g id="group">
            <path d={svgPaths.p196f9200} id="primary" stroke="var(--stroke-0, #78ACE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.58594" />
            <path d="M15.25 18.6769V19.8594" id="secondary" stroke="var(--stroke-0, #78ACE7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.58594" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6_8476">
            <rect fill="white" height="28.3824" width="29" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogOut() {
  return (
    <div className="absolute contents left-[28px] top-[901px]" data-name="Log Out">
      <p className="-translate-x-full absolute font-['Poppins:Medium',sans-serif] h-[20.553px] leading-[normal] left-[90px] not-italic text-[#78ace7] text-[16px] text-right top-[905.89px] w-[62px]">Log Out</p>
      <DoorIconBlue />
    </div>
  );
}

export default function Menu() {
  return (
    <div className="relative size-full" data-name="Menu">
      <div className="absolute bg-[#3878c2] h-[956px] left-0 top-0 w-[244px]" />
      <div className="absolute bg-[#8f9297] content-stretch flex flex-col items-center justify-center left-[165px] p-[12px] rounded-[99999px] size-[48px] top-[43px]" data-name="avatar">
        <div aria-hidden="true" className="absolute border border-[#e0e2e6] border-solid inset-0 pointer-events-none rounded-[99999px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
        <div className="relative shrink-0 size-[24px]" data-name="Utility Icons (heroicons-mini)">
          <div className="absolute inset-[10%_16.9%_10%_16.93%]" data-name="vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8799 19.2">
              <g id="vector">
                <path d={svgPaths.p3b22abb0} fill="var(--fill-0, white)" />
                <path d={svgPaths.pf14caf0} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[normal] left-[172px] not-italic text-[16px] text-white top-[95px] whitespace-nowrap">User</p>
      <Frame3 />
      <Frame4 />
      <p className="absolute font-['Poppins:ExtraLight',sans-serif] leading-[normal] left-[169px] not-italic text-[12px] text-white top-[119px] whitespace-nowrap">Admin</p>
      <div className="absolute h-0 left-[17px] top-[163.51px] w-[211.002px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 211.002 1">
            <line id="Line 3" stroke="var(--stroke-0, #6999D0)" x2="211.002" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[25px] top-[403px] w-[211.002px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 211.002 1">
            <line id="Line 3" stroke="var(--stroke-0, #6999D0)" x2="211.002" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <LogOut />
    </div>
  );
}