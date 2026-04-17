import { useNavigate } from "react-router";
import { MobileContainer } from "../components/MobileContainer";

export function SuccessPage() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="bg-white relative size-full flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-[#4BAD40]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-['Montserrat:Bold',sans-serif] text-[32px] text-[#1e1e1e] mb-4">
            Success!
          </h1>
          <p className="font-['Open_Sans:Regular',sans-serif] text-[16px] text-[#989898] mb-8">
            You have successfully logged in.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-[#20a9ea] to-[#006c9f] via-[#118cc6] via-[62.019%] h-[44px] px-12 rounded-[100px] cursor-pointer border-none"
          >
            <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-white tracking-[0.1px]">
              Return to Home
            </p>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}