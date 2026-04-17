import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MobileContainer } from "../components/MobileContainer";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { StatsCard } from "../components/dashboard/StatsCard";
import { DailySalesChart } from "../components/dashboard/DailySalesChart";
import { ActionCard } from "../components/dashboard/ActionCard";
import { BottomNav } from "../components/dashboard/BottomNav";
import { SideMenu } from "../components/dashboard/SideMenu";

export function DashboardPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "sales" | "history" | "profile">("home");

  // NEW: State to hold our backend data
  const [dashboardData, setDashboardData] = useState<any>(null);

  // NEW: Fetch data from NestJS backend when the page loads
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:3000/reports/summary");
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchSummary();
  }, []);

  const handleNavigation = (tab: "home" | "sales" | "history" | "profile") => {
    setActiveTab(tab);
    if (tab === "sales") navigate("/sales-report");
    else if (tab === "profile") navigate("/profile");
    else if (tab === "history") navigate("/history");
  };

  // NEW: Safely extract the data (fallback to 0 if loading)
  const totalSales = dashboardData?.overview?.totalSalesAmount || 0;
  const totalCustomers = dashboardData?.overview?.totalCustomers || 0;

  // NEW: Format the currency to match your Figma design (separating whole number and decimal)
  const formattedSalesWhole = totalSales.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const formattedSalesDecimal = (totalSales % 1).toFixed(2).substring(1); // extracts ".00"

  return (
    <MobileContainer>
      <div className="bg-white relative size-full flex flex-col overflow-x-hidden">
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
          onNotificationClick={() => navigate("/notifications")}
          onMenuClick={() => setIsMenuOpen(true)}
          onAvatarClick={() => navigate("/profile")}
          notificationCount={3}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Welcome Section */}
          <div className="px-6 pt-4 pb-2">
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[20px] leading-[30px]">
              Welcome back, User
            </p>
            <h1 className="font-['Poppins:Bold',sans-serif] text-[#3878c2] text-[28px] leading-[36px]">
              Dashboard
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="px-6 mb-4 flex gap-3 overflow-x-auto scrollbar-hide">
            {/* UPDATED: Total Sales using real backend data */}
            <StatsCard
              icon="chart"
              title="Total sales"
              value={`₱${formattedSalesWhole}`}
              decimal={formattedSalesDecimal}
              change="+0.00%" // We can calculate real percentages later!
              changeType="increase"
            />
            {/* UPDATED: Total Customers using real backend data */}
            <StatsCard
              icon="users"
              title="New customers"
              value={totalCustomers.toString()}
              change="+0.00%"
              changeType="increase"
            />
          </div>

          {/* Daily Sales Chart */}
          <div className="px-6 mb-4">
            <DailySalesChart /> 
            {/* Note: We will pass graphData into this component next! */}
          </div>

          {/* Action Cards */}
          <div className="px-6 pb-6 flex flex-col gap-4">
            <ActionCard
              title="Sales Report"
              description="View, modify, and update current sales database."
              buttonText="Go to Sales Report"
              onClick={() => navigate("/sales-report")}
            />
            <ActionCard
              title="Transaction History"
              description="View and edit current status of an order. View past transactions."
              buttonText="Go to Transaction History"
              onClick={() => navigate("/history")}
            />
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