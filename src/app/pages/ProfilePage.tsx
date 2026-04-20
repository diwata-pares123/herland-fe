import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, LogOut } from "lucide-react";
import { MobileContainer } from "../components/MobileContainer";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { BottomNav } from "../components/dashboard/BottomNav";
import { SideMenu } from "../components/dashboard/SideMenu";
import { SettingsRow } from "../components/settings/SettingsRow";
import { ChangePasswordModal } from "../components/settings/ChangePasswordModal";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  role: string;
}

export function ProfilePage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "sales" | "history" | "profile">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Loading...",
    email: "Loading...",
    phone: "Loading...",
    address: "Loading...",
    joinDate: "Loading...",
    role: "Loading...",
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  // --- KONEKSYON SA BACKEND ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Kunin ang token mula sa storage
        const token = localStorage.getItem("access_token");

        // Kung walang token, ibalik sa login page
        if (!token) {
          console.warn("Walang token na nakita. Banalik sa login...");
          navigate("/login");
          return;
        }

        // Tawagin ang API
        const response = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile. Baka expired na ang token.");
        }

        const data = await response.json();

        // I-format ang petsa (e.g., "April 2026")
        const joinDateFormatted = new Date(data.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric"
        });

        // Ilagay ang data mula database papunta sa UI
        const fetchedData = {
          name: data.name,
          email: data.email,
          phone: data.phone || "Not provided",
          address: data.location || "Not provided",
          joinDate: joinDateFormatted,
          role: data.role === "ADMIN" ? "Administrator" : "Staff",
        };

        setProfileData(fetchedData);
        setEditData(fetchedData);
      } catch (error) {
        console.error("Error:", error);
        // Tanggalin ang sirang token at ibalik sa login
        localStorage.removeItem("access_token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleNavigation = (tab: "home" | "sales" | "history" | "profile") => {
    setActiveTab(tab);
    if (tab === "home") {
      navigate("/dashboard");
    } else if (tab === "sales") {
      navigate("/sales-report");
    } else if (tab === "history") {
      navigate("/history");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // BURAHIN ANG TOKEN PAG NAG LOGOUT
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  return (
    <MobileContainer>
      <div className="bg-[#f5f5f5] relative size-full flex flex-col overflow-x-hidden">
        {/* Side Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        {/* Side Menu */}
        <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          onLogout={handleLogout}
        />

        {/* Header */}
        <DashboardHeader 
          userName={isLoading ? "Loading..." : profileData.name}
          onNotificationClick={() => navigate("/notifications")}
          onMenuClick={() => setIsMenuOpen(true)}
          onAvatarClick={() => navigate("/profile")}
          notificationCount={3}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Profile Header Section */}
          <div className="px-6 pt-6 pb-4 bg-white mb-2">
            <div className="flex flex-col items-center">
              {/* Profile Avatar */}
              <div className="relative mb-4">
                <div className="size-[100px] rounded-full bg-gradient-to-br from-[#3878c2] to-[#63bce6] flex items-center justify-center shadow-lg">
                  <User className="size-[50px]" color="white" strokeWidth={2} />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 size-[32px] bg-[#3878c2] rounded-full flex items-center justify-center shadow-md border-2 border-white cursor-pointer hover:bg-[#2d6aa8]">
                    <Edit2 className="size-[16px]" color="white" strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* Name and Role */}
              <h1 className="font-['Poppins:Bold',sans-serif] text-[#3878c2] text-[24px] leading-[32px] text-center mb-1">
                {profileData.name}
              </h1>
              <p className="font-['Inter:Medium',sans-serif] text-[#ababab] text-[14px] mb-4">
                {profileData.role}
              </p>

              {/* Edit/Save Buttons */}
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-[#3878c2] text-white px-6 py-2 rounded-[6px] border-none cursor-pointer hover:bg-[#2d6aa8] shadow-sm"
                >
                  <Edit2 className="size-[16px]" strokeWidth={2} />
                  <span className="font-['Inter:Semi_Bold',sans-serif] text-[12px]">EDIT PROFILE</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-[#e0e2e6] text-[#3a3e44] px-6 py-2 rounded-[6px] border-none cursor-pointer hover:bg-[#d0d2d6] shadow-sm"
                  >
                    <X className="size-[16px]" strokeWidth={2} />
                    <span className="font-['Inter:Semi_Bold',sans-serif] text-[12px]">CANCEL</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#4bad40] text-white px-6 py-2 rounded-[6px] border-none cursor-pointer hover:bg-[#3d9633] shadow-sm"
                  >
                    <Save className="size-[16px]" strokeWidth={2} />
                    <span className="font-['Inter:Semi_Bold',sans-serif] text-[12px]">SAVE</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="px-6 py-4 bg-white mb-2">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[18px] mb-4">
              Profile Information
            </h2>

            {/* Email Field */}
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-2">
                <Mail className="size-[16px]" color="#3878c2" strokeWidth={2} />
                <span className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                  Email Address
                </span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-[#bec1c6] rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#3878c2] bg-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-[#f5f5f5] rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] text-[#3a3e44]">
                  {profileData.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-2">
                <Phone className="size-[16px]" color="#3878c2" strokeWidth={2} />
                <span className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                  Phone Number
                </span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-[#bec1c6] rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#3878c2] bg-white"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-[#f5f5f5] rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] text-[#3a3e44]">
                  {profileData.phone}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-2">
                <MapPin className="size-[16px]" color="#3878c2" strokeWidth={2} />
                <span className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                  Address
                </span>
              </label>
              {isEditing ? (
                <textarea
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-[#bec1c6] rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#3878c2] bg-white resize-none"
                />
              ) : (
                <p className="w-full px-4 py-3 bg-[#f5f5f5] rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] text-[#3a3e44]">
                  {profileData.address}
                </p>
              )}
            </div>

            {/* Join Date (Read-only) */}
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-2">
                <Calendar className="size-[16px]" color="#3878c2" strokeWidth={2} />
                <span className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                  Member Since
                </span>
              </label>
              <p className="w-full px-4 py-3 bg-[#f5f5f5] rounded-[6px] text-[14px] font-['Inter:Regular',sans-serif] text-[#3a3e44]">
                {profileData.joinDate}
              </p>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="px-6 py-4 bg-white mb-2">
            <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[18px] mb-4">
              Account Settings
            </h2>

            <SettingsRow
              label="Change Password"
              onClick={() => setIsChangePasswordOpen(true)}
            />

            <SettingsRow
              label="Notification Settings"
              onClick={() => navigate("/settings/notifications")}
            />

            <SettingsRow
              label="Privacy Settings"
              onClick={() => navigate("/settings/privacy")}
            />
          </div>

          {/* Logout Section */}
          <div className="px-6 py-4 bg-white mb-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#e74c3c] text-white rounded-[6px] border-none cursor-pointer hover:bg-[#c0392b] shadow-sm"
            >
              <LogOut className="size-[20px]" strokeWidth={2} />
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[14px]">LOGOUT</span>
            </button>
          </div>

          {/* App Info */}
          <div className="px-6 py-4 text-center">
            <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[10px]">
              Laundry Management System
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[10px]">
              Version 1.0.0
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab}
          onTabChange={handleNavigation}
        />

        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
        />
      </div>
    </MobileContainer>
  );
}