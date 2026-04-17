interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-[440px] h-screen max-h-[956px] overflow-hidden bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}
