import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Filter, Plus, Download } from "lucide-react";
import { MobileContainer } from "../components/MobileContainer";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { BottomNav } from "../components/dashboard/BottomNav";
import { SideMenu } from "../components/dashboard/SideMenu";
import { DailySalesChart } from "../components/dashboard/DailySalesChart";
import { SalesTableRow } from "../components/sales/SalesTableRow";
import { SalesEntryModal, SalesEntry, TabType } from "../components/sales/SalesEntryModal";
import { FilterPanel, FilterOptions } from "../components/sales/FilterPanel";
import { SegmentedControl } from "../components/sales/SegmentedControl";

type SortField = "name" | "service" | "amount" | "date" | "paymentMethod" | "classification" | "washDate";
type SortOrder = "asc" | "desc";

export function SalesReportPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "sales" | "history" | "profile text-blue-500">("sales");
  
  // Tab state
  const [currentTabType, setCurrentTabType] = useState<TabType>("unpaid");
  
  // Data state
  const [salesData, setSalesData] = useState<SalesEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [editingEntry, setEditingEntry] = useState<SalesEntry | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  
  // Sort state
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  
  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    paymentMethod: "ALL",
    service: "ALL",
    dateFrom: "",
    dateTo: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>(filters);

  // --- FETCH REAL DATA ---
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      // Kunin ang token, checking both possible keys
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      const response = await fetch("http://localhost:3000/transactions", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to fetch data");
      const json = await response.json();

      const transactionsArray = Array.isArray(json) ? json : (json.data || []);

      const liveData = transactionsArray.map((item: any): SalesEntry => {
        const pStatus = String(item.paymentStatus || "").trim().toUpperCase();
        const sStatus = String(item.serviceStatus || "").trim().toUpperCase();

        let mappedStatus: TabType = "unpaid";
        if (sStatus === "CLAIMED") {
          mappedStatus = "claimed";
        } else if (pStatus === "PAID") {
          mappedStatus = "paid";
        } else {
          mappedStatus = "unpaid";
        }

        const parsedTransactionDate = item.transactionDate ? item.transactionDate.split("T")[0] : new Date().toISOString().split("T")[0];
        const parsedWashDate = item.washDate ? item.washDate.split("T")[0] : parsedTransactionDate;

        return {
          id: String(item.id), 
          status: mappedStatus,
          name: item.customerName || "Unknown",
          service: item.serviceName || (item.items?.[0]?.service?.name || "N/A"),
          amount: item.amount !== undefined ? Number(item.amount) : (Number(item.totalAmount) || 0),
          date: parsedTransactionDate,
          paymentMethod: item.paymentMethod || undefined,
          classification: item.classification || "REGULAR",
          washDate: parsedWashDate
        };
      });

      setSalesData(liveData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter and Sort Logic
  const tabFilteredData = useMemo(() => {
    return salesData.filter(entry => entry.status === currentTabType);
  }, [salesData, currentTabType]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...tabFilteredData];

    if (appliedFilters.paymentMethod !== "ALL" && currentTabType === "paid") {
      filtered = filtered.filter(entry => entry.paymentMethod === appliedFilters.paymentMethod);
    }
    if (appliedFilters.service !== "ALL") {
      filtered = filtered.filter(entry => entry.service === appliedFilters.service);
    }
    if (appliedFilters.dateFrom) {
      filtered = filtered.filter(entry => entry.date >= appliedFilters.dateFrom);
    }
    if (appliedFilters.dateTo) {
      filtered = filtered.filter(entry => entry.date <= appliedFilters.dateTo);
    }

    filtered.sort((a, b) => {
      let aVal: any = a[sortField as keyof SalesEntry];
      let bVal: any = b[sortField as keyof SalesEntry];

      if (sortField === "amount") {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tabFilteredData, appliedFilters, sortField, sortOrder, currentTabType]);

  const totalIncome = useMemo(() => {
    const total = filteredAndSortedData.reduce((sum, entry) => sum + entry.amount, 0);
    return `PHP ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [filteredAndSortedData]);

  // --- COMPUTE DATA FOR THE CHART ---
  const chartData = useMemo(() => {
    const grouped = salesData.reduce((acc: any, curr: any) => {
      if (curr.status !== "paid" && curr.status !== "claimed") return acc;

      const dateStr = curr.date;
      if (!acc[dateStr]) {
        acc[dateStr] = { val1: 0, val2: 0, val3: 0 };
      }

      const amount = Number(curr.amount) || 0;
      const serviceName = (curr.service || "").toUpperCase();

      if (serviceName === "WASH") {
        acc[dateStr].val1 += amount;
      } else if (serviceName === "DRY") {
        acc[dateStr].val2 += amount;
      } else {
        acc[dateStr].val3 += amount; 
      }

      return acc;
    }, {});

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
  }, [salesData]);

  const handleTabChange = (tab: TabType) => {
    setCurrentTabType(tab);
    handleResetFilters();
  };

  const handleEditEntry = (entry: SalesEntry) => {
    setModalMode("edit");
    setEditingEntry(entry);
    setShowEntryModal(true);
  };

  // --- DELETE LOGIC ---
  const handleDeleteEntry = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const token = localStorage.getItem("access_token") || localStorage.getItem("token");
        if (!token) {
          alert("Session expired. Please log in again.");
          return;
        }

        const response = await fetch(`http://localhost:3000/transactions/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to delete from database");

        setSalesData(prev => prev.filter(entry => entry.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Could not delete the entry. Please try again.");
      }
    }
  };

  // --- SAVE/UPDATE LOGIC ---
  const handleSaveEntry = async (entry: Omit<SalesEntry, "id"> | SalesEntry) => {
    
    const payload = {
      customerName: entry.name, 
      serviceName: entry.service, 
      amount: Number(entry.amount), 
      paymentMethod: entry.paymentMethod || "CASH", 
      paymentStatus: entry.status === "paid" || entry.status === "claimed" ? "PAID" : "UNPAID",
      serviceStatus: entry.status === "claimed" ? "CLAIMED" : "ON_GOING", 
      transactionDate: entry.date ? new Date(entry.date).toISOString() : new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        return;
      }

      if ("id" in entry) {
        // UPDATE
        const response = await fetch(`http://localhost:3000/transactions/${entry.id}`, {
          method: "PATCH", 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || "Update failed");
        }

        setSalesData(prev => prev.map(e => e.id === entry.id ? (entry as SalesEntry) : e));
      } else {
        // CREATE
        const response = await fetch("http://localhost:3000/transactions", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = Array.isArray(errorData.message) 
            ? errorData.message.join("\n") 
            : errorData.message || "Creation failed";
          
          throw new Error(errorMessage);
        }
        
        const savedRecord = await response.json();
        const newId = String(savedRecord.id || savedRecord.data?.id || Date.now());

        const newEntry: SalesEntry = {
          ...entry,
          id: newId,
          status: entry.status || currentTabType, 
        };
        
        setSalesData(prev => [...prev, newEntry]);
      }
      setShowEntryModal(false);
    } catch (error: any) {
      console.error("Save error:", error);
      alert(`Backend Error:\n${error.message}`); 
    }
  };

  // Filter/Sort Helpers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setShowSortMenu(false);
  };

  const handleApplyFilters = () => setAppliedFilters(filters);

  const handleResetFilters = () => {
    const reset = { paymentMethod: "ALL", service: "ALL", dateFrom: "", dateTo: "" };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const handleDownload = () => {
    const headers = currentTabType === "unpaid" 
      ? ["Customer", "Service", "Amount", "Date"] 
      : ["Customer", "Payment", "Service", "Amount", "Date"];
    
    const rows = filteredAndSortedData.map(e => [
      e.name, 
      currentTabType === "paid" ? e.paymentMethod : e.service, 
      e.service, 
      e.amount.toFixed(2), 
      e.date
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales-${currentTabType}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const hasActiveFilters = appliedFilters.paymentMethod !== "ALL" || 
                           appliedFilters.service !== "ALL" || 
                           appliedFilters.dateFrom !== "" || 
                           appliedFilters.dateTo !== "";

  return (
    <MobileContainer>
      <div className="bg-[#f5f5f5] relative size-full flex flex-col overflow-x-hidden">
        {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />}
        
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onLogout={() => navigate("/login")} />

        <DashboardHeader 
          userName="User" 
          onMenuClick={() => setIsMenuOpen(true)} 
          onNotificationClick={() => navigate("/notifications")} 
          onAvatarClick={() => navigate("/profile")} 
        />

        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-6 pt-4 pb-2 bg-white">
            <p className="font-semibold text-[#3878c2] text-[16px]">Welcome back, User</p>
            <h1 className="font-bold text-[#3878c2] text-[24px] mb-4">Sales Report</h1>
            <SegmentedControl activeTab={currentTabType} onTabChange={handleTabChange} />
          </div>

          <div className="px-6 py-4 bg-white mb-2 mt-2">
            <DailySalesChart data={chartData} />
          </div>

          <div className="px-6 py-3 bg-white mb-2">
            <h2 className="font-semibold text-[#3878c2] text-[18px]">
              {currentTabType === "unpaid" ? "Unpaid Sales" : currentTabType === "paid" ? "Paid Sales" : "Claimed Items"}
            </h2>
          </div>

          <div className="px-6 py-4 bg-white flex items-center gap-3 mb-2">
            <button onClick={() => setShowFilterPanel(true)} className={`${hasActiveFilters ? 'bg-[#4bad40]' : 'bg-[#3878c2]'} flex items-center gap-2 h-[30px] px-2 rounded text-white text-[12px]`}>
              <Filter size={16} /> FILTER {hasActiveFilters && "!"}
            </button>

            <div className="relative">
              <button onClick={() => setShowSortMenu(!showSortMenu)} className="bg-[#3878c2] flex items-center gap-2 h-[30px] px-2 rounded text-white text-[12px]">
                SORT <ChevronDown size={16} />
              </button>
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-[150px]">
                  {["name", "service", "amount", "date"].map((field) => (
                    <button key={field} onClick={() => handleSort(field as SortField)} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] capitalize">
                      By {field} {sortField === field && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => { setModalMode("add"); setEditingEntry(null); setShowEntryModal(true); }} className="bg-[#3878c2] flex items-center gap-2 h-[30px] px-2 rounded text-white text-[12px] flex-1">
              <Plus size={16} /> ADD ENTRY
            </button>
          </div>

          <div className="px-6 py-4 bg-white">
            <div className="flex flex-col">
              {isLoading ? (
                <p className="py-8 text-center text-gray-400 text-[12px]">Loading...</p>
              ) : filteredAndSortedData.length === 0 ? (
                <p className="py-8 text-center text-gray-400 text-[12px]">No entries found</p>
              ) : (
                filteredAndSortedData.map((row) => (
                  <SalesTableRow
                    key={row.id}
                    tabType={currentTabType}
                    {...row}
                    onEdit={() => handleEditEntry(row)}
                    onDelete={() => handleDeleteEntry(row.id)}
                  />
                ))
              )}
            </div>

            {filteredAndSortedData.length > 0 && (
              <div className="mt-4 pt-4 border-t-2 border-[#002540] flex justify-between items-center">
                <p className="font-semibold text-[#002540] text-[10px]">TOTAL</p>
                <p className="font-bold text-[#002540] text-[12px]">{totalIncome}</p>
              </div>
            )}

            {filteredAndSortedData.length > 0 && (
              <div className="flex justify-end mt-4">
                <button onClick={handleDownload} className="bg-[#4bad40] flex items-center gap-2 h-[30px] px-2 rounded text-white text-[12px]">
                  <Download size={18} /> DOWNLOAD CSV
                </button>
              </div>
            )}
          </div>
        </div>

        <BottomNav activeTab="sales" onTabChange={(tab) => navigate(tab === "home" ? "/dashboard" : `/${tab}`)} />

        <SalesEntryModal
          isOpen={showEntryModal}
          onClose={() => setShowEntryModal(false)}
          onSave={handleSaveEntry}
          entry={editingEntry}
          mode={modalMode}
          tabType={currentTabType}
        />

        <FilterPanel
          isOpen={showFilterPanel}
          onClose={() => setShowFilterPanel(false)}
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
        
      </div>
    </MobileContainer>
  );
}