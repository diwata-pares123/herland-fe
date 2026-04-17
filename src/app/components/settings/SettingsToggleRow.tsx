interface SettingsToggleRowProps {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function SettingsToggleRow({ label, description, enabled, onChange }: SettingsToggleRowProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#f5f5f5] rounded-[6px] mb-3">
      <div className="flex-1">
        <p className="font-['Inter:Medium',sans-serif] text-[#3a3e44] text-[14px] mb-0.5">
          {label}
        </p>
        {description && (
          <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[11px]">
            {description}
          </p>
        )}
      </div>
      
      {/* Toggle Switch */}
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors focus:outline-none border-none cursor-pointer ${
          enabled ? 'bg-[#4bad40]' : 'bg-[#bec1c6]'
        }`}
      >
        <span
          className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-[24px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
    </div>
  );
}
