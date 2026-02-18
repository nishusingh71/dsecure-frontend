import React from "react";

interface TimeZoneEntry {
    flag: string;
    country: string;
    timezone: string;
    startTime: string;
    endTime: string;
}

/**
 * Working Hours data based on Indian Standard Time (IST) 9:00 AM – 6:00 PM
 * Converted to other major business time zones
 */
const workingHoursData: TimeZoneEntry[] = [
    {
        flag: "🇮🇳",
        country: "India",
        timezone: "IST (UTC+5:30)",
        startTime: "9:00 AM",
        endTime: "6:00 PM",
    },
    {
        flag: "🇺🇸",
        country: "USA (East)",
        timezone: "EST (UTC-5)",
        startTime: "10:30 PM*",
        endTime: "7:30 AM",
    },
    {
        flag: "🇺🇸",
        country: "USA (West)",
        timezone: "PST (UTC-8)",
        startTime: "7:30 PM*",
        endTime: "4:30 AM",
    },
    {
        flag: "🇬🇧",
        country: "United Kingdom",
        timezone: "GMT (UTC+0)",
        startTime: "3:30 AM",
        endTime: "12:30 PM",
    },
    {
        flag: "🇩🇪",
        country: "Germany",
        timezone: "CET (UTC+1)",
        startTime: "4:30 AM",
        endTime: "1:30 PM",
    },
    {
        flag: "🇦🇪",
        country: "UAE",
        timezone: "GST (UTC+4)",
        startTime: "7:30 AM",
        endTime: "4:30 PM",
    },
    {
        flag: "🇦🇺",
        country: "Australia",
        timezone: "AEST (UTC+10)",
        startTime: "1:30 PM",
        endTime: "10:30 PM",
    },
];

interface WorkingHoursCardProps {
    /** Optional custom CSS classes */
    className?: string;
    /** Show compact version (no header description) */
    compact?: boolean;
}

/**
 * A reusable card that displays D-Secure working hours (IST 9 AM – 6 PM)
 * and the equivalent contact hours in 6 other countries.
 *
 * Usage:
 * ```tsx
 * <WorkingHoursCard />
 * <WorkingHoursCard compact />
 * <WorkingHoursCard className="my-custom-class" />
 * ```
 */
const WorkingHoursCard: React.FC<WorkingHoursCardProps> = ({
    className = "",
    compact = false,
}) => {
    return (
        <div
            className={`bg-white rounded-2xl shadow-lg border border-slate-200/60 p-5 ${className}`}
        >
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-sm">Working Hours</h3>
                    {!compact && (
                        <p className="text-slate-500 text-[10px]">
                            We contact you during these hours
                        </p>
                    )}
                </div>
            </div>

            {/* Primary Time — India */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🇮🇳</span>
                        <div>
                            <p className="font-semibold text-slate-900 text-xs">
                                India (IST)
                            </p>
                            <p className="text-slate-500 text-[10px]">Primary Timezone</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-blue-700 text-sm">9:00 AM – 6:00 PM</p>
                        <p className="text-slate-500 text-[10px]">Mon – Fri</p>
                    </div>
                </div>
            </div>

            {/* Divider with label */}
            <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    Your Local Time
                </span>
                <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Other Countries */}
            <div className="space-y-1">
                {workingHoursData
                    .filter((entry) => entry.country !== "India")
                    .map((entry, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-base">{entry.flag}</span>
                                <div>
                                    <p className="font-medium text-slate-800 text-xs">
                                        {entry.country}
                                    </p>
                                    <p className="text-slate-400 text-[10px]">{entry.timezone}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-slate-700 text-xs group-hover:text-blue-600 transition-colors">
                                    {entry.startTime} – {entry.endTime}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Footer note */}
            <div className="mt-3 pt-2 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 flex items-start gap-1">
                    <svg
                        className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>
                        * Previous day. Hours may vary during public holidays.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default WorkingHoursCard;