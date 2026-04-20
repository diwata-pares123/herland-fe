import { useState, useEffect, useMemo } from "react";
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

  // State to hold our backend data
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  // NEW: State specifically for the chart data
  const [transactionsData, setTransactionsData] = useState<any[]>([]);

  // Fetch data from NestJS backend when the page loads
  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        // --- FIX: KUNIN ANG TOKEN MULA SA LOCAL STORAGE ---
        // Palitan ang "access_token" ng "token" kung yun ang ginamit mo sa login page mo
        const token = localStorage.getItem("access_token") || localStorage.getItem("token"); 

        // 1. Fetch Summary for Stats Cards (May Headers na!)
        const summaryResponse = await fetch("http://localhost:3000/reports/summary", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (summaryResponse.ok) {
          const summaryJson = await summaryResponse.json();
          setDashboardData(summaryJson);
        }

        // 2. Fetch Transactions for the Daily Sales Chart (May Headers na rin!)
        const transResponse = await fetch("http://localhost:3000/transactions", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (transResponse.ok) {
          const transJson = await transResponse.json();
          setTransactionsData(Array.isArray(transJson) ? transJson : (transJson.data || []));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardInfo();
  }, []);

  // Compute Chart Data exactly like in SalesReportPage
  const chartData = useMemo(() => {
    const grouped = transactionsData.reduce((acc: any, curr: any) => {
      const pStatus = String(curr.paymentStatus || "").toUpperCase();
      const sStatus = String(curr.serviceStatus || "").toUpperCase();
      
      // Isama lang sa chart kung nabayaran na o na-claim na
      if (pStatus !== "PAID" && sStatus !== "CLAIMED") return acc;

      const dateStr = curr.transactionDate 
        ? curr.transactionDate.split("T")[0] 
        : new Date().toISOString().split("T")[0];
      
      if (!acc[dateStr]) {
        acc[dateStr] = { val1: 0, val2: 0, val3: 0 };
      }

      const amount = Number(curr.totalAmount || curr.amount) || 0;
      const serviceName = (curr.serviceName || curr.items?.[0]?.service?.name || "").toUpperCase();

      // I-distribute sa 3 bars (WASH, DRY, Iba pa/FOLD)
      if (serviceName === "WASH") {
        acc[dateStr].val1 += amount;
      } else if (serviceName === "DRY") {
        acc[dateStr].val2 += amount;
      } else {
        acc[dateStr].val3 += amount;
      }

      return acc;
    }, {});

    // I-sort by date (Oldest to Newest) at kunin ang huling 7 days
    const sortedDates = Object.keys(grouped).sort();
    return sortedDates.map(date => {
      const d = new Date(date);
      const label = isNaN(d.getTime()) ? date : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      
      return {
        label,
        val1: grouped[date].val1,
        val2: grouped[date].val2,
        val3: grouped[date].val3
      };
    }).slice(-7);
  }, [transactionsData]);

  const handleNavigation = (tab: "home" | "sales" | "history" | "profile") => {
    setActiveTab(tab);
    if (tab === "sales") navigate("/sales-report");
    else if (tab === "profile") navigate("/profile");
    else if (tab === "history") navigate("/history");
  };

  // Safely extract the data (fallback to 0 if loading)
  const totalSales = dashboardData?.overview?.totalSalesAmount || 0;
  const totalCustomers = dashboardData?.overview?.totalCustomers || 0;

  // Format the currency to match your Figma design
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
            <StatsCard
              icon="chart"
              title="Total sales"
              value={`₱${formattedSalesWhole}`}
              decimal={formattedSalesDecimal}
              change="+0.00%" 
              changeType="increase"
            />
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
            <DailySalesChart data={chartData} /> 
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