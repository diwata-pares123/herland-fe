import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Bell } from "lucide-react";
import { MobileContainer } from "../components/MobileContainer";
import { SettingsToggleRow } from "../components/settings/SettingsToggleRow";

interface NotificationPreferences {
  orderUpdates: boolean;
  paymentNotifications: boolean;
  newOrders: boolean;
  orderCompletion: boolean;
  lowStock: boolean;
  systemUpdates: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export function NotificationSettingsPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    orderUpdates: true,
    paymentNotifications: true,
    newOrders: true,
    orderCompletion: true,
    lowStock: true,
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  });

  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setShowSaveButton(true);
  };

  const handleSave = () => {
    // Mock save action
    alert("Notification settings saved successfully!");
    setShowSaveButton(false);
  };

  const handleReset = () => {
    if (window.confirm("Reset all notification settings to default?")) {
      setPreferences({
        orderUpdates: true,
        paymentNotifications: true,
        newOrders: true,
        orderCompletion: true,
        lowStock: true,
        systemUpdates: false,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
      });
      setShowSaveButton(false);
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
              Notification Settings
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[11px]">
              Manage your notification preferences
            </p>
          </div>
          <Bell className="size-[24px]" color="#3878c2" strokeWidth={2} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Alert Types Section */}
          <div className="px-6 py-4 bg-white mb-2 mt-2">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] mb-4">
              Alert Types
            </h2>
            
            <SettingsToggleRow
              label="Order Updates"
              description="Get notified about order status changes"
              enabled={preferences.orderUpdates}
              onChange={(value) => handleToggle("orderUpdates", value)}
            />
            
            <SettingsToggleRow
              label="Payment Notifications"
              description="Receive alerts when payments are received"
              enabled={preferences.paymentNotifications}
              onChange={(value) => handleToggle("paymentNotifications", value)}
            />
            
            <SettingsToggleRow
              label="New Orders"
              description="Get notified when new orders are placed"
              enabled={preferences.newOrders}
              onChange={(value) => handleToggle("newOrders", value)}
            />
            
            <SettingsToggleRow
              label="Order Completion"
              description="Alerts when orders are completed"
              enabled={preferences.orderCompletion}
              onChange={(value) => handleToggle("orderCompletion", value)}
            />
            
            <SettingsToggleRow
              label="Low Stock Alerts"
              description="Get notified when supplies are running low"
              enabled={preferences.lowStock}
              onChange={(value) => handleToggle("lowStock", value)}
            />
            
            <SettingsToggleRow
              label="System Updates"
              description="Receive notifications about system updates"
              enabled={preferences.systemUpdates}
              onChange={(value) => handleToggle("systemUpdates", value)}
            />
          </div>

          {/* Notification Channels Section */}
          <div className="px-6 py-4 bg-white mb-2">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] mb-4">
              Notification Channels
            </h2>
            
            <SettingsToggleRow
              label="Email Notifications"
              description="Receive notifications via email"
              enabled={preferences.emailNotifications}
              onChange={(value) => handleToggle("emailNotifications", value)}
            />
            
            <SettingsToggleRow
              label="Push Notifications"
              description="Get instant push notifications on this device"
              enabled={preferences.pushNotifications}
              onChange={(value) => handleToggle("pushNotifications", value)}
            />
            
            <SettingsToggleRow
              label="SMS Notifications"
              description="Receive important alerts via SMS"
              enabled={preferences.smsNotifications}
              onChange={(value) => handleToggle("smsNotifications", value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4">
            <button
              onClick={handleReset}
              className="w-full px-4 py-3 bg-[#e0e2e6] text-[#3a3e44] rounded-[6px] border-none cursor-pointer hover:bg-[#d0d2d6] font-['Inter:Semi_Bold',sans-serif] text-[14px] mb-3"
            >
              RESET TO DEFAULT
            </button>
            
            {showSaveButton && (
              <button
                onClick={handleSave}
                className="w-full px-4 py-3 bg-[#3878c2] text-white rounded-[6px] border-none cursor-pointer hover:bg-[#2d6aa8] font-['Inter:Semi_Bold',sans-serif] text-[14px] shadow-sm"
              >
                SAVE CHANGES
              </button>
            )}
          </div>

          {/* Info Note */}
          <div className="px-6">
            <div className="bg-[#d5e9f8] border-l-4 border-[#3878c2] px-4 py-3 rounded-[6px]">
              <p className="font-['Inter:Regular',sans-serif] text-[#002540] text-[11px]">
                <span className="font-['Inter:Semi_Bold',sans-serif]">Note:</span> Some notifications are essential for app functionality and cannot be disabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
