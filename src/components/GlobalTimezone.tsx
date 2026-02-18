import React, { useState, useEffect } from "react";

export default function GlobalTimezone() {
  const [timeData, setTimeData] = useState<{
    isOpen: boolean;
    localStart: string;
    localEnd: string;
    timeZone: string;
    currentTime: string;
  } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      // 1. Get current time
      const now = new Date();

      // 2. Calculate IST time (UTC + 5:30)
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istDate = new Date(utcTime + istOffset);
      const istHour = istDate.getHours();
      
      // Support Hours: 9 AM to 6 PM IST
      const isOpen = istHour >= 9 && istHour < 18;

      // 3. Create Date objects for 9:00 AM IST and 6:00 PM IST of the CURRENT day
      // 9:00 AM IST = 03:30 UTC
      // 18:00 PM IST = 12:30 UTC
      
      const startC = new Date();
      startC.setUTCHours(3, 30, 0, 0); 
      
      const endC = new Date();
      endC.setUTCHours(12, 30, 0, 0);

      // Formatting options
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      setTimeData({
        isOpen,
        localStart: startC.toLocaleTimeString([], timeOptions),
        localEnd: endC.toLocaleTimeString([], timeOptions),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        currentTime: istDate.toLocaleTimeString([], timeOptions)
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!timeData) return null;

  return (
    <div
      className={`mb-6 rounded-xl border p-4 transition-all duration-300 ${
        timeData.isOpen
          ? "bg-emerald-50/50 border-emerald-100"
          : "bg-slate-50 border-slate-100"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative mt-1 flex-shrink-0">
          <span
            className={`absolute inline-flex h-3 w-3 animate-ping rounded-full opacity-75 ${
              timeData.isOpen ? "bg-emerald-400" : "bg-slate-400 hidden"
            }`}
          ></span>
          <span
            className={`relative inline-flex h-3 w-3 rounded-full ${
              timeData.isOpen ? "bg-emerald-500" : "bg-slate-400"
            }`}
          ></span>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className={`font-semibold ${timeData.isOpen ? "text-emerald-900" : "text-slate-700"}`}>
              {timeData.isOpen
                ? "Support Team is Online"
                : "Support Team is Currently Offline"}
            </h3>
            {timeData.isOpen && (
               <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                 Fast Response ⚡
               </span>
            )}
          </div>
          
          <p className="text-sm text-slate-600 mb-4">
             {timeData.isOpen 
               ? "We typically respond in under 30 minutes." 
               : "You can still send a message. We'll respond as soon as we're back!"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
             {/* India Time Block */}
             <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  <span>🇮🇳 India (IST)</span>
                </div>
                <div className="font-medium text-slate-900">
                   09:00 AM - 06:00 PM
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  HQ Support Hours
                </div>
             </div>

             {/* Local Time Block */}
             <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  <span>🌍 Your Location</span>
                </div>
                <div className="font-medium text-slate-900">
                   {timeData.localStart} - {timeData.localEnd}
                </div>
                <div className="text-xs text-slate-400 mt-1 truncate" title={timeData.timeZone}>
                  {timeData.timeZone}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
