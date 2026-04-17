function Sms() {
  return (
    <div className="absolute contents left-[19px] top-[20px]" data-name="SMS">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[24px] left-[19px] text-[#989898] text-[14px] top-[56.07px] w-[340px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">We sent a reset link to +63091.......511</p>
        <p>enter 6 digit code that mentioned in the text.</p>
      </div>
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[19.098px] left-[calc(50%-67.5px)] text-[#1e1e1e] text-[18px] top-[20px] whitespace-nowrap">Check your SMS</p>
    </div>
  );
}

function SmsNotification() {
  return (
    <div className="absolute contents left-0 top-0" data-name="SMS Notification">
      <div className="absolute bg-[#d9d9d9] h-[124px] left-0 top-0 w-[359px]" data-name="Rectangle" />
      <Sms />
    </div>
  );
}

export default function CheckYourSms() {
  return (
    <div className="relative size-full" data-name="Check your SMS">
      <SmsNotification />
    </div>
  );
}