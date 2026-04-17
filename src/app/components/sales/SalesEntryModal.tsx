import { useState, useEffect } from "react";
import { X } from "lucide-react";

export type TabType = "unpaid" | "paid" | "claimed";

export interface SalesEntry {
  id: number;
  status: TabType;
  name: string;
  service: string;
  amount: number;
  date: string;
  // Paid-specific fields
  paymentMethod?: string;
  // Claimed-specific fields
  classification?: string;
  washDate?: string;
}

interface SalesEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Omit<SalesEntry, "id"> | SalesEntry) => void;
  entry?: SalesEntry | null;
  mode: "add" | "edit";
  tabType: TabType;
}

export function SalesEntryModal({ isOpen, onClose, onSave, entry, mode, tabType }: SalesEntryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    service: "WASH",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "CASH",
    classification: "REGULAR",
    washDate: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (entry && mode === "edit") {
        setFormData({
          name: entry.name,
          service: entry.service,
          amount: entry.amount.toString(),
          date: entry.date,
          paymentMethod: entry.paymentMethod || "CASH",
          classification: entry.classification || "REGULAR",
          washDate: entry.washDate || new Date().toISOString().split("T")[0],
        });
      } else {
        setFormData({
          name: "",
          service: "WASH",
          amount: "",
          date: new Date().toISOString().split("T")[0],
          paymentMethod: "CASH",
          classification: "REGULAR",
          washDate: new Date().toISOString().split("T")[0],
        });
      }
      setErrors({});
    }
  }, [entry, mode, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required";
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Construct the payload with proper types
    const baseEntryData = {
      status: tabType,
      name: formData.name.trim().toUpperCase(),
      service: formData.service,
      amount: parseFloat(formData.amount),
      date: formData.date,
      ...(tabType === "paid" && { paymentMethod: formData.paymentMethod }),
      ...(tabType === "claimed" && { 
        classification: formData.classification,
        washDate: formData.washDate 
      }),
    };

    const entryData: Omit<SalesEntry, "id"> | SalesEntry = mode === "edit" && entry?.id
      ? { ...baseEntryData, id: entry.id }
      : baseEntryData;

    onSave(entryData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-[400px] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e2e6] shrink-0">
          <h2 className="font-['Poppins:SemiBold',sans-serif] font-semibold text-[#3878c2] text-[18px] m-0">
            {mode === "add" ? "Add New Entry" : "Edit Entry"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3878c2]"
            aria-label="Close modal"
          >
            <X className="size-[20px]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 overflow-y-auto">
          <div className="space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#002540] text-[13px] mb-1.5">
                Customer Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-[6px] text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-[#bec1c6] focus:border-[#3878c2] focus:ring-[#3878c2]'
                }`}
                placeholder="JUAN DE LA CRUZ"
              />
              {errors.name && (
                <p className="text-red-500 text-[11px] mt-1.5 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Service & Amount Row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#002540] text-[13px] mb-1.5">
                  Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 border border-[#bec1c6] rounded-[6px] text-[14px] transition-colors focus:outline-none focus:border-[#3878c2] focus:ring-2 focus:ring-[#3878c2] focus:ring-opacity-50 bg-white"
                >
                  <option value="WASH">WASH</option>
                  <option value="DRY">DRY</option>
                  <option value="FOLD">FOLD</option>
                  <option value="WASH & DRY">WASH & DRY</option>
                  <option value="WASH & FOLD">WASH & FOLD</option>
                  <option value="FULL SERVICE">FULL SERVICE</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#002540] text-[13px] mb-1.5">
                  Amount (PHP)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-[6px] text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-[#bec1c6] focus:border-[#3878c2] focus:ring-[#3878c2]'
                  }`}
                  placeholder="0.00"
                />
                {errors.amount && (
                  <p className="text-red-500 text-[11px] mt-1.5 font-medium">{errors.amount}</p>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#002540] text-[13px] mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-[#bec1c6] rounded-[6px] text-[14px] transition-colors focus:outline-none focus:border-[#3878c2] focus:ring-2 focus:ring-[#3878c2] focus:ring-opacity-50"
              />
            </div>

            {/* Conditional Fields based on Tab */}
            {tabType === "paid" && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="block font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#002540] text-[13px] mb-1.5">
                  Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-[#bec1c6] rounded-[6px] text-[14px] transition-colors focus:outline-none focus:border-[#3878c2] focus:ring-2 focus:ring-[#3878c2] focus:ring-opacity-50 bg-white"
                >
                  <option value="CASH">CASH</option>
                  <option value="GCASH">GCASH</option>
                  <option value="CARD">CARD</option>
                  <option value="BANK TRANSFER">BANK TRANSFER</option>
                </select>
              </div>
            )}

            {tabType === "claimed" && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="block font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#002540] text-[13px] mb-1.5">
                    Classification
                  </label>
                  <select
                    value={formData.classification}
                    onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bec1c6] rounded-[6px] text-[14px] transition-colors focus:outline-none focus:border-[#3878c2] focus:ring-2 focus:ring-[#3878c2] focus:ring-opacity-50 bg-white"
                  >
                    <option value="REGULAR">REGULAR</option>
                    <option value="VIP">VIP</option>
                    <option value="MEMBER">MEMBER</option>
                  </select>
                </div>

                <div>
                  <label className="block font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#002540] text-[13px] mb-1.5">
                    Wash Date
                  </label>
                  <input
                    type="date"
                    value={formData.washDate}
                    onChange={(e) => setFormData({ ...formData, washDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bec1c6] rounded-[6px] text-[14px] transition-colors focus:outline-none focus:border-[#3878c2] focus:ring-2 focus:ring-[#3878c2] focus:ring-opacity-50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-[#e0e2e6]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-[6px] font-['Inter:Medium',sans-serif] font-medium text-[13px] hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#3878c2] text-white rounded-[6px] font-['Inter:Medium',sans-serif] font-medium text-[13px] hover:bg-[#2d6aa8] shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3878c2] focus:ring-offset-2"
            >
              {mode === "add" ? "Add Entry" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}