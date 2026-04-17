import logo from "../../assets/logo.png";

export function Logo() {
  return (
    <div className="flex flex-col items-center">
      <img
        src={logo}
        alt="Herland Laundry"
        className="w-[180px] object-contain"
      />
    </div>
  );
}