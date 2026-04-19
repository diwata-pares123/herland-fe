import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { TransactionStatus, StatusBadge } from "./StatusBadge";

export interface Transaction {
  id: number;
  invoice: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  customer: string;
  service: string;
  paymentMethod: string;
  paymentStatus: "UNPAID" | "PAID"; // Added this to track exact payment state
  notes?: string;
}

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSave: (id: number, updates: { paymentStatus?: string, serviceStatus?: string }) => void; // Added onSave prop
}

export function TransactionDetailsModal({ isOpen, onClose, transaction, onSave }: TransactionDetailsModalProps) {
  // Local state to track edits inside the modal
  const [editedPaymentStatus, setEditedPaymentStatus] = useState<"UNPAID" | "PAID">("UNPAID");
  const [editedServiceStatus, setEditedServiceStatus] = useState<TransactionStatus>("ON-GOING");

  // Reset local state whenever the modal opens with a new transaction
  useEffect(() => {
    if (transaction) {
      setEditedPaymentStatus(transaction.paymentStatus || "UNPAID");
      setEditedServiceStatus(transaction.status);
    }
  }, [transaction, isOpen]);

  if (!isOpen || !transaction) return null;

  const hasChanges = 
    editedPaymentStatus !== transaction.paymentStatus || 
    editedServiceStatus !== transaction.status;

  const handleSave = () => {
    onSave(transaction.id, {
      paymentStatus: editedPaymentStatus,
      serviceStatus: editedServiceStatus.replace("-", "_") // Translate ON-GOING back to backend's ON_GOING
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[12px] w-full max-w-[360px] max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#3878c2] px-6 py-4 rounded-t-[12px] flex items-center justify-between">
          <h2 className="font-['Poppins:SemiBold',sans-serif] text-white text-[18px]">
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center bg-white/20 rounded-full border-none cursor-pointer hover:bg-white/30"
          >
            <X className="size-[20px]" color="white" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Invoice Number */}
          <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
              INVOICE NUMBER
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[16px]">
              {transaction.invoice}
            </p>
          </div>

          {/* EDITABLE Service Status */}
          <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-2">
              SERVICE STATUS
            </p>
            <select
              value={editedServiceStatus}
              onChange={(e) => setEditedServiceStatus(e.target.value as TransactionStatus)}
              className="w-full px-3 py-2 border border-[#bec1c6] rounded-[6px] text-[14px] bg-white text-[#3a3e44] focus:outline-none focus:border-[#3878c2]"
            >
              <option value="ON-GOING">ON-GOING</option>
              <option value="CLAIMED">CLAIMED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <div className="mt-2">
               {/* Visual preview of what the badge will look like */}
              <StatusBadge status={editedServiceStatus} />
            </div>
          </div>

           {/* EDITABLE Payment Status */}
           <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-2">
              PAYMENT STATUS
            </p>
            <select
              value={editedPaymentStatus}
              onChange={(e) => setEditedPaymentStatus(e.target.value as "UNPAID" | "PAID")}
              className="w-full px-3 py-2 border border-[#bec1c6] rounded-[6px] text-[14px] bg-white text-[#3a3e44] focus:outline-none focus:border-[#3878c2]"
            >
              <option value="UNPAID">UNPAID</option>
              <option value="PAID">PAID</option>
            </select>
          </div>

          {/* Date */}
          <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
              TRANSACTION DATE
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[14px]">
              {new Date(transaction.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Customer */}
          <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
              CUSTOMER
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[14px]">
              {transaction.customer}
            </p>
          </div>

          {/* Service */}
          <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
              SERVICE
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[14px]">
              {transaction.service}
            </p>
          </div>

          {/* Amount */}
          <div className="mb-4 p-4 bg-[#f5f5f5] rounded-[6px]">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
              TOTAL AMOUNT
            </p>
            <p className="font-['Poppins:Bold',sans-serif] text-[#3878c2] text-[24px]">
              PHP {transaction.amount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className={`font-['Inter:Semi_Bold',sans-serif] text-[14px] rounded-[6px] py-3 cursor-pointer border-none transition-colors ${
              hasChanges ? "w-1/3 bg-gray-200 text-gray-700 hover:bg-gray-300" : "w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {hasChanges ? "CANCEL" : "CLOSE"}
          </button>
          
          {/* Only show SAVE button if the user actually changed the dropdown */}
          {hasChanges && (
            <button
              onClick={handleSave}
              className="w-2/3 bg-[#4bad40] text-white py-3 rounded-[6px] font-['Inter:Semi_Bold',sans-serif] text-[14px] border-none cursor-pointer hover:bg-[#3e8e35]"
            >
              SAVE CHANGES
            </button>
          )}
        </div>
      </div>
    </div>
  );
}