export function DailySalesChart() {
  const chartData = [
    { jan: 20, feb: 30, march: 25 },
    { jan: 25, feb: 35, march: 30 },
    { jan: 50, feb: 45, march: 55 },
    { jan: 35, feb: 55, march: 50 },
    { jan: 30, feb: 35, march: 40 },
    { jan: 60, feb: 65, march: 75 },
  ];

  const maxValue = 120;
  const gridLines = [120, 100, 80, 60, 40, 20, 0];

  return (
    <div className="bg-white rounded-[8px] border border-[#e0e2e6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6">
      {/* Title */}
      <h3 className="font-['Poppins:Medium',sans-serif] text-[#3a3e44] text-[18px] leading-[28px] mb-2">
        Daily Sales
      </h3>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <div className="size-[8px] rounded-full bg-[#3878c2]" />
          <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[10px]">Jan</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-[8px] rounded-full bg-[#4bad40]" />
          <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[10px]">Feb</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-[8px] rounded-full bg-[#63bce6]" />
          <p className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[10px]">March</p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex gap-2 h-[180px]">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between py-1 text-right">
          {gridLines.map((value) => (
            <p key={value} className="font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[10px] leading-[10px]">
              {value}
            </p>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-1">
            {gridLines.slice(0, -1).map((_, index) => (
              <div 
                key={index} 
                className="border-t border-dashed border-[#bec1c6] w-full"
              />
            ))}
            <div className="border-t border-[#bec1c6] w-full" />
          </div>

          {/* Bars */}
          <div className="absolute inset-x-0 bottom-6 top-0 flex items-end justify-around gap-1 px-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex items-end gap-[2px] h-full">
                <div 
                  className="flex-1 bg-[#3878c2] rounded-t"
                  style={{ height: `${(data.jan / maxValue) * 100}%` }}
                />
                <div 
                  className="flex-1 bg-[#4bad40] rounded-t"
                  style={{ height: `${(data.feb / maxValue) * 100}%` }}
                />
                <div 
                  className="flex-1 bg-[#63bce6] rounded-t"
                  style={{ height: `${(data.march / maxValue) * 100}%` }}
                />
              </div>
            ))}
          </div>

          {/* X-Axis Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-around px-2">
            {chartData.map((_, index) => (
              <p 
                key={index} 
                className="flex-1 font-['Inter:Regular',sans-serif] text-[#3a3e44] text-[10px] text-center"
              >
                000
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
