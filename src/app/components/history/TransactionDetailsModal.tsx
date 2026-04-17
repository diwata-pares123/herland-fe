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
  notes?: string;
}

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  if (!isOpen || !transaction) return null;

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

          {/* Status */}
          <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-2">
              STATUS
            </p>
            <StatusBadge status={transaction.status} />
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

          {/* Payment Method */}
          <div className="mb-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
              PAYMENT METHOD
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[14px]">
              {transaction.paymentMethod}
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

          {/* Notes */}
          {transaction.notes && (
            <div className="mb-4">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-1">
                NOTES
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[14px]">
                {transaction.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-[#3878c2] text-white py-3 rounded-[6px] font-['Inter:Semi_Bold',sans-serif] text-[14px] border-none cursor-pointer hover:bg-[#2d6aa8]"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
