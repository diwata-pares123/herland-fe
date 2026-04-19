import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bell, Check, Trash2, X } from "lucide-react";
import { MobileContainer } from "../components/MobileContainer";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { BottomNav } from "../components/dashboard/BottomNav";
import { SideMenu } from "../components/dashboard/SideMenu";

// In-update ko ang id para pwede ring string in case UUID ang gamit mo sa Prisma
interface Notification {
  id: number | string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "info" | "success" | "warning" | "error";
}

export function NotificationsPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "sales" | "history" | "profile">("home");
  
  // Naka-empty array na ito sa simula instead of mock data
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH REAL DATA ---
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/notifications");
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const json = await response.json();
      
      const notifsArray = Array.isArray(json) ? json : (json.data || []);
      setNotifications(notifsArray);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNavigation = (tab: "home" | "sales" | "history" | "profile") => {
    setActiveTab(tab);
    if (tab === "home") {
      navigate("/dashboard");
    } else if (tab === "sales") {
      navigate("/sales-report");
    } else if (tab === "history") {
      navigate("/history");
    } else if (tab === "profile") {
      navigate("/profile");
    }
  };

  // --- UPDATE TO BACKEND ---
  const handleMarkAsRead = async (id: number | string) => {
    try {
      // API call para i-update sa database (Assuming PATCH method ang gamit mo)
      const response = await fetch(`http://localhost:3000/notifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true })
      });

      if (!response.ok) throw new Error("Failed to mark as read");

      // Update UI
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  // --- DELETE FROM BACKEND ---
  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        const response = await fetch(`http://localhost:3000/notifications/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error("Failed to delete notification");

        // Update UI
        setNotifications(prev => prev.filter(notif => notif.id !== id));
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Optional: Kung may endpoint ka for bulk update, dito mo ilalagay. 
      // For now, ina-assume ko na meron kang /notifications/mark-all-read endpoint
      await fetch("http://localhost:3000/notifications/mark-all-read", {
        method: 'PATCH'
      });

      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      try {
        // Optional: Endpoint for bulk delete
        await fetch("http://localhost:3000/notifications/clear-all", {
          method: 'DELETE'
        });

        setNotifications([]);
      } catch (error) {
        console.error("Error clearing notifications:", error);
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info": return "border-l-[#3878c2]";
      case "success": return "border-l-[#4bad40]";
      case "warning": return "border-l-[#f9e79f]";
      case "error": return "border-l-[#e74c3c]";
      default: return "border-l-[#3878c2]";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "Just now";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
          onLogout={() => navigate("/login")}
        />

        {/* Header */}
        <DashboardHeader 
          userName="User"
          onNotificationClick={() => {/* Already on notifications page */}}
          onMenuClick={() => setIsMenuOpen(true)}
          onAvatarClick={() => navigate("/profile")}
          notificationCount={unreadCount}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-6 pt-4 pb-4 bg-white mb-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] leading-[24px]">
                  Welcome back, User
                </p>
                <h1 className="font-['Poppins:Bold',sans-serif] text-[#3878c2] text-[24px] leading-[32px]">
                  Notifications
                </h1>
              </div>
              <div className="relative">
                <Bell className="size-[32px]" color="#3878c2" strokeWidth={2} />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-[#e74c3c] text-white rounded-full size-[20px] flex items-center justify-center text-[10px] font-['Inter:Bold',sans-serif]">
                    {unreadCount}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {notifications.length > 0 && (
              <div className="flex gap-2 mt-4">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="flex items-center gap-1 px-3 py-2 bg-[#3878c2] text-white rounded-[4px] text-[11px] font-['Inter:Semi_Bold',sans-serif] border-none cursor-pointer hover:bg-[#2d6aa8]"
                  >
                    <Check className="size-[14px]" strokeWidth={2} />
                    MARK ALL READ
                  </button>
                )}
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1 px-3 py-2 bg-[#e74c3c] text-white rounded-[4px] text-[11px] font-['Inter:Semi_Bold',sans-serif] border-none cursor-pointer hover:bg-[#c0392b]"
                >
                  <Trash2 className="size-[14px]" strokeWidth={2} />
                  CLEAR ALL
                </button>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex flex-col gap-2">
            {isLoading ? (
               <div className="bg-white px-6 py-12 text-center text-[#ababab]">
                 Loading notifications...
               </div>
            ) : notifications.length === 0 ? (
              <div className="bg-white px-6 py-12 text-center">
                <Bell className="size-[48px] mx-auto mb-4 opacity-30" color="#3878c2" strokeWidth={1.5} />
                <p className="font-['Poppins:SemiBold',sans-serif] text-[#3a3e44] text-[16px] mb-2">
                  No Notifications
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[12px]">
                  You're all caught up! No new notifications at this time.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white px-6 py-4 border-l-4 ${getNotificationColor(notification.type)} ${
                    !notification.isRead ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-['Poppins:SemiBold',sans-serif] text-[#002540] text-[14px]">
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <span className="bg-[#3878c2] text-white text-[8px] px-2 py-0.5 rounded-full font-['Inter:Bold',sans-serif]">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[12px] mb-2">
                        {notification.message}
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[10px]">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="size-[28px] flex items-center justify-center bg-[#4bad40] rounded-full border-none cursor-pointer hover:bg-[#3d9633]"
                          title="Mark as read"
                        >
                          <Check className="size-[14px]" color="white" strokeWidth={2.5} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="size-[28px] flex items-center justify-center bg-[#e74c3c] rounded-full border-none cursor-pointer hover:bg-[#c0392b]"
                        title="Delete"
                      >
                        <X className="size-[14px]" color="white" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab}
          onTabChange={handleNavigation}
        />
      </div>
    </MobileContainer>
  );
}