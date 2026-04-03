import React from "react";

/**
 * SolutionHeroGraphic Component
 * Yeh reusable component sabhi solution pages ke hero section mein use hoga.
 * Cards circle ke exact angles pe place hote hain toh dotted lines se perfectly align hote hain.
 */

// Har peripheral device ki config type
interface PeripheralDevice {
  label: string;
  icon: React.ReactNode;
}

interface SolutionHeroGraphicProps {
  /** Center SVG icon jo hub represent karta hai */
  centerIcon: React.ReactNode;
  /** Center label text */
  centerLabel: string;
  /** 5 peripheral device configs (top, left, right, bottom-left, bottom-right) */
  devices: PeripheralDevice[];
}

// CSS keyframes
const keyframesStyle = `
  @keyframes shg-float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
    50% { transform: translate(-50%, -50%) translateY(-6px); }
  }
  @keyframes shg-float-reverse {
    0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
    50% { transform: translate(-50%, -50%) translateY(6px); }
  }
  @keyframes shg-pulse-ring {
    0% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.06); opacity: 0.12; }
    100% { transform: scale(1); opacity: 0.3; }
  }
  @keyframes shg-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.15); }
    50% { box-shadow: 0 0 35px rgba(16,185,129,0.3); }
  }
  @keyframes shg-dash {
    to { stroke-dashoffset: -22; }
  }
  @keyframes shg-orbit-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes shg-orbit-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes shg-center-breathe {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.04); }
  }
`;

// Circle ke 5 angles — 72° apart, top (-90°) se clockwise evenly distributed
const CARD_ANGLES = [-90, -18, 54, 126, 198];
// Orbit radius (% of container width/2)
const ORBIT_RADIUS_PERCENT = 42; // cards outer orbit pe baithenge

// Angle se x,y % position calculate karna
const getPositionFromAngle = (angleDeg: number, radiusPercent: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  const x = 50 + radiusPercent * Math.cos(rad); // center 50%
  const y = 50 + radiusPercent * Math.sin(rad); // center 50%
  return { x, y };
};

// Connection lines ke liye same angles use, lekin SVG viewBox 400x400 ke andar
const CENTER = { x: 200, y: 200 };
const LINE_RADIUS = 70; // center se kitni door line start hogi
const LINE_END_RADIUS = 160; // line end radius (card ke paas)

const SolutionHeroGraphic: React.FC<SolutionHeroGraphicProps> = ({
  centerIcon,
  centerLabel,
  devices,
}) => {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: "1 / 1" }}>
      {/* Keyframes inject */}
      <style>{keyframesStyle}</style>

      {/* Outer animated glow ring */}
      <div
        className="absolute inset-4 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          animation: "shg-pulse-ring 4s ease-in-out infinite",
        }}
      />

      {/* Outer orbital ring - slowly rotating */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
        style={{ animation: "shg-orbit-slow 60s linear infinite" }}
      >
        <defs>
          <linearGradient id="shg-orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="175"
          fill="none"
          stroke="url(#shg-orbit-grad-1)"
          strokeWidth="1.5"
          strokeDasharray="10 6"
        />
      </svg>

      {/* Inner orbital ring - reverse rotation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
        style={{ animation: "shg-orbit-reverse 45s linear infinite" }}
      >
        <defs>
          <linearGradient id="shg-orbit-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="url(#shg-orbit-grad-2)"
          strokeWidth="1.5"
          strokeDasharray="8 5"
        />
      </svg>

      {/* Animated connection lines - center se cards tak */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
      >
        {CARD_ANGLES.slice(0, devices.length).map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          // Line ka start point (center ke thoda bahar)
          const startX = CENTER.x + LINE_RADIUS * Math.cos(rad);
          const startY = CENTER.y + LINE_RADIUS * Math.sin(rad);
          // Line ka end point (card ke paas)
          const endX = CENTER.x + LINE_END_RADIUS * Math.cos(rad);
          const endY = CENTER.y + LINE_END_RADIUS * Math.sin(rad);
          const dur = `${1.5 + i * 0.2}s`;

          return (
            <line
              key={`line-${i}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="6,5"
              strokeOpacity="0.5"
              style={{ animation: `shg-dash ${dur} linear infinite` }}
            />
          );
        })}
      </svg>

      {/* Center Hub - breathing animation */}
      <div
        className="absolute z-10"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "shg-center-breathe 4s ease-in-out infinite",
        }}
      >
        {/* Glow behind center */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
        <div
          className="relative flex flex-col items-center justify-center"
          style={{ animation: "shg-glow 3s ease-in-out infinite" }}
        >
          {centerIcon}
          <span
            className="mt-1 text-[10px] font-black tracking-[0.2em] text-emerald-700 uppercase"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
          >
            {centerLabel}
          </span>
        </div>
      </div>

      {/* Peripheral Device Cards — circle ke exact angles pe placed */}
      {devices.slice(0, 5).map((device, i) => {
        const angle = CARD_ANGLES[i];
        const pos = getPositionFromAngle(angle, ORBIT_RADIUS_PERCENT);
        const floatAnim = i % 2 === 0 ? "shg-float" : "shg-float-reverse";
        const duration = 2.5 + i * 0.3;
        const delay = i * 0.25;

        return (
          <div
            key={device.label}
            className="absolute z-20 group cursor-pointer"
            style={{
              top: `${pos.y}%`,
              left: `${pos.x}%`,
              transform: "translate(-50%, -50%)",
              animation: `${floatAnim} ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <div
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-emerald-100/60 
                         shadow-lg hover:shadow-xl hover:shadow-emerald-200/30
                         w-[82px] flex flex-col items-center justify-center gap-[4px]
                         py-[10px] px-[6px] pb-[8px]
                         transition-all duration-300 
                         hover:scale-110 hover:border-emerald-300 hover:-translate-y-1"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {device.icon}
              </div>
              <span className="text-[8px] font-bold text-slate-600 tracking-wider text-center leading-tight uppercase">
                {device.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Decorative floating particles */}
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-emerald-400/20 pointer-events-none"
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            top: `${15 + i * 14}%`,
            left: `${10 + (i * 17) % 80}%`,
            animation: `shg-float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SolutionHeroGraphic;
