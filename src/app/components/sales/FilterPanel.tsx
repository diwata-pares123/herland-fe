import { X } from "lucide-react";

export interface FilterOptions {
  paymentMethod: string;
  service: string;
  dateFrom: string;
  dateTo: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FilterPanel({ isOpen, onClose, filters, onFilterChange, onApply, onReset }: FilterPanelProps) {
  if (!isOpen) return null;

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative bg-white rounded-lg shadow-xl w-[350px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e2e6]">
          <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#3878c2] text-[18px]">
            Filter Sales
          </h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer p-0"
          >
            <X className="size-[24px]" color="#3878c2" />
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-4">
          {/* Payment Method */}
          <div className="mb-4">
            <label className="block font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-2">
              Payment Method
            </label>
            <select
              value={filters.paymentMethod}
              onChange={(e) => onFilterChange({ ...filters, paymentMethod: e.target.value })}
              className="w-full px-3 py-2 border border-[#bec1c6] rounded-[4px] text-[14px] focus:outline-none focus:border-[#3878c2]"
            >
              <option value="ALL">All Methods</option>
              <option value="CASH">CASH</option>
              <option value="GCASH">GCASH</option>
              <option value="CARD">CARD</option>
              <option value="BANK TRANSFER">BANK TRANSFER</option>
            </select>
          </div>

          {/* Service */}
          <div className="mb-4">
            <label className="block font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-2">
              Service
            </label>
            <select
              value={filters.service}
              onChange={(e) => onFilterChange({ ...filters, service: e.target.value })}
              className="w-full px-3 py-2 border border-[#bec1c6] rounded-[4px] text-[14px] focus:outline-none focus:border-[#3878c2]"
            >
              <option value="ALL">All Services</option>
              <option value="WASH">WASH</option>
              <option value="DRY">DRY</option>
              <option value="FOLD">FOLD</option>
              <option value="WASH & DRY">WASH & DRY</option>
              <option value="WASH & FOLD">WASH & FOLD</option>
              <option value="FULL SERVICE">FULL SERVICE</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="mb-4">
            <label className="block font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-2">
              Date From
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-[#bec1c6] rounded-[4px] text-[14px] focus:outline-none focus:border-[#3878c2]"
            />
          </div>

          <div className="mb-6">
            <label className="block font-['Inter:Semi_Bold',sans-serif] text-[#002540] text-[12px] mb-2">
              Date To
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-[#bec1c6] rounded-[4px] text-[14px] focus:outline-none focus:border-[#3878c2]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-[#e0e2e6] text-[#3a3e44] rounded-[4px] font-['Inter:Medium',sans-serif] text-[12px] border-none cursor-pointer hover:bg-[#d0d2d6]"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#3878c2] text-white rounded-[4px] font-['Inter:Medium',sans-serif] text-[12px] border-none cursor-pointer hover:bg-[#2d6aa8]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
