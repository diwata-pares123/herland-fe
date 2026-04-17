import { useState } from "react";
import { X, Eye, EyeOff, Lock, Check } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Current password validation
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    // New password validation
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = "Password must contain uppercase, lowercase, and number";
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Check if new password is same as current
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mock password change success
      alert("Password changed successfully!");
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
    onClose();
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "#e74c3c" };
    if (strength <= 3) return { strength, label: "Medium", color: "#f9e79f" };
    return { strength, label: "Strong", color: "#4bad40" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-[20px] z-50 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e0e2e6] px-6 py-4 rounded-t-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[20px]">
              Change Password
            </h2>
            <button
              onClick={handleClose}
              className="size-[32px] flex items-center justify-center bg-[#f5f5f5] rounded-full border-none cursor-pointer hover:bg-[#e0e2e6]"
            >
              <X className="size-[18px]" color="#3a3e44" strokeWidth={2} />
            </button>
          </div>
          <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[12px] mt-1">
            Enter your current password and choose a new one
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* Current Password */}
          <div className="mb-4">
            <label className="flex items-center gap-2 mb-2">
              <Lock className="size-[16px]" color="#3878c2" strokeWidth={2} />
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                Current Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className={`w-full px-4 py-3 pr-12 border rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] focus:outline-none bg-white ${
                  errors.currentPassword ? 'border-[#e74c3c]' : 'border-[#bec1c6] focus:border-[#3878c2]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1"
              >
                {showCurrentPassword ? (
                  <EyeOff className="size-[20px]" color="#ababab" strokeWidth={2} />
                ) : (
                  <Eye className="size-[20px]" color="#ababab" strokeWidth={2} />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="font-['Inter:Regular',sans-serif] text-[#e74c3c] text-[11px] mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="flex items-center gap-2 mb-2">
              <Lock className="size-[16px]" color="#3878c2" strokeWidth={2} />
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                New Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className={`w-full px-4 py-3 pr-12 border rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] focus:outline-none bg-white ${
                  errors.newPassword ? 'border-[#e74c3c]' : 'border-[#bec1c6] focus:border-[#3878c2]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1"
              >
                {showNewPassword ? (
                  <EyeOff className="size-[20px]" color="#ababab" strokeWidth={2} />
                ) : (
                  <Eye className="size-[20px]" color="#ababab" strokeWidth={2} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="font-['Inter:Regular',sans-serif] text-[#e74c3c] text-[11px] mt-1">
                {errors.newPassword}
              </p>
            )}
            
            {/* Password Strength Indicator */}
            {newPassword && !errors.newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-[4px] bg-[#e0e2e6] rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-300"
                      style={{ 
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    />
                  </div>
                  <span 
                    className="font-['Inter:Semi_Bold',sans-serif] text-[10px]"
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[10px]">
                  Use 8+ characters with uppercase, lowercase, and numbers
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="flex items-center gap-2 mb-2">
              <Check className="size-[16px]" color="#3878c2" strokeWidth={2} />
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                Confirm New Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className={`w-full px-4 py-3 pr-12 border rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] focus:outline-none bg-white ${
                  errors.confirmPassword ? 'border-[#e74c3c]' : 'border-[#bec1c6] focus:border-[#3878c2]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-[20px]" color="#ababab" strokeWidth={2} />
                ) : (
                  <Eye className="size-[20px]" color="#ababab" strokeWidth={2} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="font-['Inter:Regular',sans-serif] text-[#e74c3c] text-[11px] mt-1">
                {errors.confirmPassword}
              </p>
            )}
            {!errors.confirmPassword && confirmPassword && newPassword === confirmPassword && (
              <p className="font-['Inter:Regular',sans-serif] text-[#4bad40] text-[11px] mt-1 flex items-center gap-1">
                <Check className="size-[12px]" strokeWidth={2} />
                Passwords match
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-[#e0e2e6] text-[#3a3e44] rounded-[6px] border-none cursor-pointer hover:bg-[#d0d2d6] font-['Inter:Semi_Bold',sans-serif] text-[14px]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#3878c2] text-white rounded-[6px] border-none cursor-pointer hover:bg-[#2d6aa8] font-['Inter:Semi_Bold',sans-serif] text-[14px] shadow-sm"
            >
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
