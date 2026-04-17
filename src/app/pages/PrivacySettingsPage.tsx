import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Shield, Eye, EyeOff, Download, Trash2 } from "lucide-react";
import { MobileContainer } from "../components/MobileContainer";
import { SettingsToggleRow } from "../components/settings/SettingsToggleRow";

interface PrivacyPreferences {
  profileVisibility: boolean;
  showEmail: boolean;
  showPhone: boolean;
  activityTracking: boolean;
  dataSharing: boolean;
  twoFactorAuth: boolean;
}

export function PrivacySettingsPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<PrivacyPreferences>({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    activityTracking: true,
    dataSharing: false,
    twoFactorAuth: true,
  });

  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleToggle = (key: keyof PrivacyPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setShowSaveButton(true);
  };

  const handleSave = () => {
    // Mock save action
    alert("Privacy settings saved successfully!");
    setShowSaveButton(false);
  };

  const handleDownloadData = () => {
    if (window.confirm("Request a copy of your personal data? You will receive a download link via email.")) {
      alert("Data download request submitted! You will receive an email with your data within 24 hours.");
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
    );
    
    if (confirmed) {
      const doubleConfirm = window.confirm(
        "This is your last chance. Are you absolutely sure you want to delete your account?"
      );
      
      if (doubleConfirm) {
        alert("Account deletion request submitted. You will receive a confirmation email shortly.");
      }
    }
  };

  return (
    <MobileContainer>
      <div className="bg-[#f5f5f5] relative size-full flex flex-col overflow-x-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center gap-4 shadow-sm">
          <button
            onClick={() => navigate("/profile")}
            className="size-[40px] flex items-center justify-center bg-[#f5f5f5] rounded-full border-none cursor-pointer hover:bg-[#e0e2e6]"
          >
            <ArrowLeft className="size-[20px]" color="#3878c2" strokeWidth={2} />
          </button>
          <div className="flex-1">
            <h1 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[20px]">
              Privacy Settings
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[11px]">
              Manage your privacy and security
            </p>
          </div>
          <Shield className="size-[24px]" color="#3878c2" strokeWidth={2} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Profile Privacy Section */}
          <div className="px-6 py-4 bg-white mb-2 mt-2">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] mb-4">
              Profile Privacy
            </h2>
            
            <SettingsToggleRow
              label="Profile Visibility"
              description="Allow other users to see your profile"
              enabled={preferences.profileVisibility}
              onChange={(value) => handleToggle("profileVisibility", value)}
            />
            
            <SettingsToggleRow
              label="Show Email Address"
              description="Display your email on your public profile"
              enabled={preferences.showEmail}
              onChange={(value) => handleToggle("showEmail", value)}
            />
            
            <SettingsToggleRow
              label="Show Phone Number"
              description="Display your phone number on your profile"
              enabled={preferences.showPhone}
              onChange={(value) => handleToggle("showPhone", value)}
            />
          </div>

          {/* Data & Security Section */}
          <div className="px-6 py-4 bg-white mb-2">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] mb-4">
              Data & Security
            </h2>
            
            <SettingsToggleRow
              label="Activity Tracking"
              description="Allow the app to track your activity for analytics"
              enabled={preferences.activityTracking}
              onChange={(value) => handleToggle("activityTracking", value)}
            />
            
            <SettingsToggleRow
              label="Data Sharing"
              description="Share anonymized data with third-party partners"
              enabled={preferences.dataSharing}
              onChange={(value) => handleToggle("dataSharing", value)}
            />
            
            <SettingsToggleRow
              label="Two-Factor Authentication"
              description="Require verification code for login"
              enabled={preferences.twoFactorAuth}
              onChange={(value) => handleToggle("twoFactorAuth", value)}
            />
          </div>

          {/* Data Management Section */}
          <div className="px-6 py-4 bg-white mb-2">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] mb-4">
              Data Management
            </h2>
            
            <button
              onClick={handleDownloadData}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f5f5] rounded-[6px] border-none cursor-pointer hover:bg-[#e0e2e6] mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="size-[36px] bg-[#3878c2] rounded-full flex items-center justify-center">
                  <Download className="size-[18px]" color="white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-['Inter:Medium',sans-serif] text-[#3a3e44] text-[14px]">
                    Download My Data
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[11px]">
                    Request a copy of your personal data
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#fee] rounded-[6px] border border-[#e74c3c] cursor-pointer hover:bg-[#fdd]"
            >
              <div className="flex items-center gap-3">
                <div className="size-[36px] bg-[#e74c3c] rounded-full flex items-center justify-center">
                  <Trash2 className="size-[18px]" color="white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-['Inter:Semi_Bold',sans-serif] text-[#e74c3c] text-[14px]">
                    Delete Account
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[#e74c3c] text-[11px]">
                    Permanently delete your account and data
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Save Button */}
          {showSaveButton && (
            <div className="px-6 py-4">
              <button
                onClick={handleSave}
                className="w-full px-4 py-3 bg-[#3878c2] text-white rounded-[6px] border-none cursor-pointer hover:bg-[#2d6aa8] font-['Inter:Semi_Bold',sans-serif] text-[14px] shadow-sm"
              >
                SAVE CHANGES
              </button>
            </div>
          )}

          {/* Privacy Info */}
          <div className="px-6">
            <div className="bg-[#d5e9f8] border-l-4 border-[#3878c2] px-4 py-3 rounded-[6px]">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
                Your Privacy Matters
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#002540] text-[11px]">
                We take your privacy seriously. Your data is encrypted and secure. We never sell your personal information to third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
