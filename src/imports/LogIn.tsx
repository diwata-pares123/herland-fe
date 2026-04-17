import svgPaths from "./svg-bvtvo96jxs";
import imgImage1 from "../assets/logo.png";

function Bg() {
  return (
    <div className="absolute h-[1037px] left-[-251px] top-[154px] w-[902.069px]" data-name="BG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 902.069 1037">
        <g id="BG">
          <path d={svgPaths.p278eb900} fill="url(#paint0_linear_2_635)" id="Rectangle 2" />
          <path d={svgPaths.p24a81b80} fill="var(--fill-0, white)" id="Rectangle 1" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_635" x1="364" x2="567.5" y1="-2.12792e-05" y2="19">
            <stop stopColor="#3878C2" />
            <stop offset="1" stopColor="#4BAD40" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute contents left-[126px] top-[41px]" data-name="Logo">
      <div className="absolute h-[133px] left-[126px] top-[41px] w-[188px]" data-name="image 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[248.86%] left-[-36.29%] max-w-none top-[-36.36%] w-[176.61%]" src={imgImage1} />
        </div>
      </div>
      <div className="absolute h-[35px] left-[168px] top-[174px] w-[105px]" data-name="image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[393.09%] left-[-14.82%] max-w-none top-[-211.98%] w-[131.12%]" src={imgImage1} />
        </div>
      </div>
    </div>
  );
}

function CreateButton() {
  return (
    <div className="absolute contents left-[50px] top-[524px]" data-name="Create Button">
      <div className="absolute bg-gradient-to-r from-[#20a9ea] h-[47px] left-[50px] rounded-[30px] to-[#006c9f] top-[524px] via-[#118cc6] via-[69.712%] w-[352px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[43px] justify-center leading-[0] left-[225.5px] not-italic text-[16px] text-center text-white top-[549.5px] tracking-[0.8px] w-[293px]">
        <p className="leading-[50px]">Admin Log In</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[50px] top-[591px]">
      <div className="absolute bg-white border-2 border-[#3878c2] border-solid h-[47px] left-[50px] rounded-[30px] top-[591px] w-[352px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[43px] justify-center leading-[0] left-[225.5px] not-italic text-[#3878c2] text-[16px] text-center top-[616.5px] tracking-[0.8px] w-[293px]">
        <p className="leading-[50px]">Staff Log In</p>
      </div>
    </div>
  );
}

export default function LogIn() {
  return (
    <div className="relative size-full" data-name="Log in" style={{ backgroundImage: "linear-gradient(88.7631deg, rgb(143, 219, 255) 3.9489%, rgb(61, 173, 226) 99.513%)" }}>
      <Bg />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:SemiBold',sans-serif] h-[100px] justify-center leading-[0] left-[225.5px] not-italic text-[#184e8d] text-[20px] text-center top-[441px] tracking-[1.6px] w-[305px]">
        <p className="leading-[30px]">Welcome to Herland Laundry Sales Report and Transaction Logbook</p>
      </div>
      <Logo />
      <CreateButton />
      <Group />
    </div>
  );
}