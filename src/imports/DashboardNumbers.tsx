import svgPaths from "./svg-ljyyma3wgk";

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[20px]" data-name="Utility Icons (heroicons-mini)">
        <div className="absolute inset-[10%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p2fa3800} fill="var(--fill-0, #616469)" id="vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#3a3e44] text-[14px]">Total sales</p>
      <div className="bg-[#eff0f2] content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="badges">
        <div aria-hidden="true" className="absolute border border-[#d4d8dd] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
        <div className="relative shrink-0 size-[20px]" data-name="Utility Icons (heroicons-mini)">
          <div className="absolute inset-[15%_20%]" data-name="vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
              <path clipRule="evenodd" d={svgPaths.pf84d000} fill="var(--fill-0, #3A3E44)" fillRule="evenodd" id="vector" />
            </svg>
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3a3e44] text-[14px] whitespace-nowrap">-1.21%</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center relative shrink-0 w-full" data-name="header">
      <Frame />
      <div className="relative shrink-0 size-[20px]" data-name="Utility Icons (heroicons-mini)">
        <div className="absolute inset-[10%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p13e86a00} fill="var(--fill-0, #8F9297)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative" data-name="data">
      <p className="font-['Inter:Bold',sans-serif] font-['Inter:Semi_Bold',sans-serif] font-bold font-semibold leading-[0] not-italic relative shrink-0 text-[#3a3e44] text-[0px] w-full">
        <span className="leading-[36px] text-[30px]">₱15,521</span>
        <span className="leading-[24px] text-[16px]">.50</span>
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <Data />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[20px]" data-name="Utility Icons (heroicons-mini)">
        <div className="absolute inset-[15%_5%_10%_5%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 15">
            <g id="vector">
              <path d={svgPaths.p74f7300} fill="var(--fill-0, #616469)" />
              <path d={svgPaths.p2f5e9d00} fill="var(--fill-0, #616469)" />
              <path d={svgPaths.pdeb7ac0} fill="var(--fill-0, #616469)" />
              <path d={svgPaths.p255d280} fill="var(--fill-0, #616469)" />
              <path d={svgPaths.p3f560800} fill="var(--fill-0, #616469)" />
              <path d={svgPaths.p2dc66580} fill="var(--fill-0, #616469)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#3a3e44] text-[14px]">New customers</p>
      <div className="bg-white content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="badges">
        <div aria-hidden="true" className="absolute border border-[#e0e2e6] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
        <div className="relative shrink-0 size-[20px]" data-name="Utility Icons (heroicons-mini)">
          <div className="absolute flex inset-[15%_20%] items-center justify-center">
            <div className="flex-none h-[14px] rotate-180 w-[12px]">
              <div className="relative size-full" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                  <path clipRule="evenodd" d={svgPaths.pf84d000} fill="var(--fill-0, #3A3E44)" fillRule="evenodd" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3a3e44] text-[14px] whitespace-nowrap">+5.25%</p>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center relative shrink-0 w-full" data-name="header">
      <Frame2 />
      <div className="relative shrink-0 size-[20px]" data-name="Utility Icons (heroicons-mini)">
        <div className="absolute inset-[10%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p13e86a00} fill="var(--fill-0, #8F9297)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative" data-name="data">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#3a3e44] text-[30px] w-full">389</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <Data1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[300px] rounded-[8px] top-0 w-[288.25px]">
      <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-[-4px] pointer-events-none rounded-[12px]" />
      <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="data display card">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[6px] items-start px-[24px] py-[20px] relative w-full">
            <Header1 />
            <Frame4 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e0e2e6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}

export default function DashboardNumbers() {
  return (
    <div className="relative size-full" data-name="Dashboard Numbers">
      <div className="absolute bg-white left-0 rounded-[8px] top-0 w-[288.25px]" data-name="data display card">
        <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip px-[24px] py-[20px] relative rounded-[inherit] w-full">
          <Header />
          <Frame3 />
          <div className="h-[40px] relative shrink-0 w-full" data-name="sparkline">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 344 40">
              <path d={svgPaths.p3657500} fill="var(--fill-0, #EFF0F2)" id="Vector 9" />
            </svg>
            <div className="absolute inset-[0_0_81.82%_0]">
              <div className="absolute inset-[-6.88%_-0.15%_-6.89%_-0.15%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 345 8.27381">
                  <path d={svgPaths.p17dfb0e8} id="Vector 10" stroke="var(--stroke-0, #8F9297)" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e0e2e6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      </div>
      <Frame6 />
    </div>
  );
}