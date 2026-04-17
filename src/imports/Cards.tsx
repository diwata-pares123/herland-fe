function MediaPlaceholder() {
  return <div className="bg-[#bec1c6] h-[140px] shrink-0 w-full" data-name="media placeholder" />;
}

function Title() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="title">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px min-w-px not-italic relative text-[#3a3e44] text-[18px]">Sales Report</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Title />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#616469] text-[12px] w-full">View, modify, and update current sales database.</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="content">
      <Frame />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Content1 />
        <div className="bg-white content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="button">
          <div aria-hidden="true" className="absolute border border-[#e0e2e6] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#3a3e44] text-[12px] whitespace-nowrap">{`Go to Sales Report `}</p>
        </div>
      </div>
    </div>
  );
}

function MediaPlaceholder1() {
  return <div className="bg-[#bec1c6] h-[140px] shrink-0 w-full" data-name="media placeholder" />;
}

function Title1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="title">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px min-w-px not-italic relative text-[#3a3e44] text-[18px]">Transaction History</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Title1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#616469] text-[12px] w-full">{`View and edit current status of an order. View past transactions. `}</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="content">
      <Frame1 />
    </div>
  );
}

function Content2() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Content3 />
        <div className="bg-white content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="button">
          <div aria-hidden="true" className="absolute border border-[#e0e2e6] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#3a3e44] text-[12px] whitespace-nowrap">Go to Transaction History</p>
        </div>
      </div>
    </div>
  );
}

export default function Cards() {
  return (
    <div className="relative size-full" data-name="Cards">
      <div className="absolute bg-white content-stretch flex flex-col items-start left-0 overflow-clip rounded-[8px] top-0 w-[263px]" data-name="card">
        <MediaPlaceholder />
        <Content />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-start left-[276px] overflow-clip rounded-[8px] top-0 w-[263px]" data-name="card">
        <MediaPlaceholder1 />
        <Content2 />
      </div>
    </div>
  );
}