import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { MobileContainer } from "../components/MobileContainer";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { BottomNav } from "../components/dashboard/BottomNav";
import { SideMenu } from "../components/dashboard/SideMenu";
import { TransactionTableRow } from "../components/history/TransactionTableRow";
import { TransactionDetailsModal, Transaction } from "../components/history/TransactionDetailsModal";
import { TransactionStatus } from "../components/history/StatusBadge";

type SortField = "invoice" | "date" | "amount" | "status";
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 5;

export function TransactionHistoryPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "sales" | "history" | "profile">("history");
  
  // Real Data States
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI States
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "ALL">("ALL");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // --- STEP 2: FETCH THE DATA ---
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3000/transactions"); // Make sure this matches your backend URL
        if (!response.ok) throw new Error("Failed to fetch transactions");
        
        const json = await response.json();
        
        // --- STEP 3: INJECT & MAP DATA ---
        // Translate the backend keys to match your frontend Transaction interface
        const liveData = json.data.map((item: any) => ({
          id: item.id,
          invoice: item.invoiceNumber,
          date: item.transactionDate.split("T")[0], // Cuts off the time, keeping just YYYY-MM-DD
          amount: item.totalAmount,
          status: item.serviceStatus.replace("_", "-"), // Translates ON_GOING to ON-GOING
          customer: item.customerName,
          service: item.items && item.items.length > 0 ? item.items[0].service.name : "N/A",
          paymentMethod: item.paymentMethod || "N/A",
          notes: ""
        }));

        setTransactions(liveData);
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleNavigation = (tab: "home" | "sales" | "history" | "profile") => {
    setActiveTab(tab);
    if (tab === "home") navigate("/dashboard");
    else if (tab === "sales") navigate("/sales-report");
    else if (tab === "profile") navigate("/profile");
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  // Filter and sort data using our real 'transactions' state instead of mock data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...transactions];

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    filtered.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === "amount") {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [transactions, statusFilter, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setShowSortMenu(false);
  };

  const handleFilterByStatus = (status: TransactionStatus | "ALL") => {
    setStatusFilter(status);
    setCurrentPage(1); 
    setShowFilterMenu(false);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
      }
    }
    return pages;
  };

  return (
    <MobileContainer>
      <div className="bg-[#f5f5f5] relative size-full flex flex-col overflow-x-hidden">
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          onLogout={() => navigate("/login")}
        />

        <DashboardHeader 
          userName="User"
          onNotificationClick={() => navigate("/notifications")}
          onMenuClick={() => setIsMenuOpen(true)}
          onAvatarClick={() => navigate("/profile")}
          notificationCount={3}
        />

        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-6 pt-4 pb-4 bg-white mb-2">
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[16px] leading-[24px]">
              Welcome back, User
            </p>
            <h1 className="font-['Poppins:Bold',sans-serif] text-[#3878c2] text-[24px] leading-[32px]">
              Transaction History
            </h1>
          </div>

          <div className="px-6 py-4 bg-white mb-2 flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="bg-[#3878c2] flex items-center gap-2 h-[32px] px-[12px] py-[6px] rounded-[4px] border-none cursor-pointer hover:opacity-90"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-white whitespace-nowrap">
                  SORT BY
                </p>
                <ChevronDown className="size-[16px]" color="white" strokeWidth={2} />
              </button>

              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e2e6] rounded shadow-lg z-10 min-w-[150px]">
                  <button onClick={() => handleSort("invoice")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    By Invoice {sortField === "invoice" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                  <button onClick={() => handleSort("date")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    By Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                  <button onClick={() => handleSort("amount")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    By Amount {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                  <button onClick={() => handleSort("status")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    By Status {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`${statusFilter !== "ALL" ? 'bg-[#4bad40]' : 'bg-[#3878c2]'} flex items-center gap-2 h-[32px] px-[12px] py-[6px] rounded-[4px] border-none cursor-pointer hover:opacity-90`}
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-white whitespace-nowrap">
                  {statusFilter === "ALL" ? "ALL STATUS" : statusFilter}
                </p>
                <ChevronDown className="size-[16px]" color="white" strokeWidth={2} />
              </button>

              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e2e6] rounded shadow-lg z-10 min-w-[140px]">
                  <button onClick={() => handleFilterByStatus("ALL")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    All Status {statusFilter === "ALL" && "✓"}
                  </button>
                  <button onClick={() => handleFilterByStatus("ON-GOING")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    On-going {statusFilter === "ON-GOING" && "✓"}
                  </button>
                  <button onClick={() => handleFilterByStatus("CLAIMED")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    Claimed {statusFilter === "CLAIMED" && "✓"}
                  </button>
                  <button onClick={() => handleFilterByStatus("CANCELLED")} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[12px] border-none bg-transparent cursor-pointer">
                    Cancelled {statusFilter === "CANCELLED" && "✓"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 bg-white mb-2">
            <div className="mb-3">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px]">
                Showing {transactions.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} transactions
              </p>
            </div>

            <div className="grid grid-cols-[0.8fr_0.9fr_0.8fr_1fr_0.7fr] gap-2 pb-3 border-b-2 border-[#3878c2]">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[10px]">INVOICE</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[10px]">DATE</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[10px]">AMOUNT</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[10px]">STATUS</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[10px]">ACTION</p>
            </div>

            <div className="flex flex-col">
              {isLoading ? (
                 <div className="py-8 text-center">
                   <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[12px]">Loading live database data...</p>
                 </div>
              ) : currentPageData.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="font-['Inter:Regular',sans-serif] text-[#ababab] text-[12px]">No transactions found</p>
                </div>
              ) : (
                currentPageData.map((transaction) => (
                  <TransactionTableRow
                    key={transaction.id}
                    invoice={transaction.invoice}
                    date={transaction.date}
                    amount={transaction.amount}
                    status={transaction.status}
                    onDetails={() => handleViewDetails(transaction)}
                  />
                ))
              )}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 bg-white mb-2">
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={`flex items-center gap-1 px-3 py-2 rounded-[4px] font-['Inter:Medium',sans-serif] text-[12px] border-none cursor-pointer ${currentPage === 1 ? 'bg-[#e0e2e6] text-[#ababab] cursor-not-allowed' : 'bg-[#f5f5f5] text-[#3a3e44] hover:bg-[#e0e2e6]'}`}>
                  <ChevronLeft className="size-[14px]" strokeWidth={2} />
                  <span>Back</span>
                </button>

                {getPageNumbers().map((page) => (
                  <button key={page} onClick={() => goToPage(page)} className={`min-w-[36px] h-[36px] px-2 rounded-[4px] font-['Inter:Semi_Bold',sans-serif] text-[12px] border-none cursor-pointer ${currentPage === page ? 'bg-[#3878c2] text-white' : 'bg-[#f5f5f5] text-[#3a3e44] hover:bg-[#e0e2e6]'}`}>
                    {page}
                  </button>
                ))}

                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`flex items-center gap-1 px-3 py-2 rounded-[4px] font-['Inter:Medium',sans-serif] text-[12px] border-none cursor-pointer ${currentPage === totalPages ? 'bg-[#e0e2e6] text-[#ababab] cursor-not-allowed' : 'bg-[#f5f5f5] text-[#3a3e44] hover:bg-[#e0e2e6]'}`}>
                  <span>Next</span>
                  <ChevronRight className="size-[14px]" strokeWidth={2} />
                </button>
              </div>
            </div>
          )}
        </div>

        <BottomNav activeTab={activeTab} onTabChange={handleNavigation} />

        <TransactionDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} transaction={selectedTransaction} />
      </div>
    </MobileContainer>
  );
}