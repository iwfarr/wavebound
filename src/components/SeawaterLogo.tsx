import React from 'react';
import logoImage from '../assets/images/seawater_logo_1792936354525.jpg';

interface SeawaterLogoProps {
  variant?: 'icon' | 'horizontal' | 'badge' | 'hero';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const SeawaterLogo: React.FC<SeawaterLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  // Dimensions for the wave icon
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  }[size];

  // Font sizes for typography
  const textClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  const subtextClasses = {
    xs: 'text-[9px]',
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  // Minimal vector wave fallback SVG if image is still loading or for vector rendering
  const WaveVector = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    >
      <defs>
        <linearGradient id="seawaterGradPrimary" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="seawaterGradSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* Outer flowing curl */}
      <path
        d="M6 31C11 31 16 28 20 23C24 18 29 13 36 14C41 15 44 19 44 24C44 32 37 38 29 38C20 38 12 36 6 31Z"
        fill="url(#seawaterGradSecondary)"
        fillOpacity="0.25"
      />
      <path
        d="M6 30C13 30 18 26 23 20C27 15 32 12 38 15C42 17 44 22 43 27C42 34 35 39 27 39C19 39 12 36 6 30Z"
        stroke="url(#seawaterGradPrimary)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Inner crest break */}
      <path
        d="M26 18C28 14 32 13 35 15C38 17 38 21 35 24C32 27 27 28 24 30C21 32 16 33 11 32"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Secondary accent droplet wave */}
      <path
        d="M29 27C32 26 35 27 36 29C37 31 36 33 33 34C30 35 26 35 23 34"
        stroke="#67e8f9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const LogoIcon = (
    <div
      className={`relative rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/30 flex items-center justify-center p-0.5 shadow-md shadow-cyan-950/40 group-hover:border-cyan-400/60 transition-all ${sizeClasses}`}
    >
      <img
        src={logoImage}
        alt="Seawater Logo"
        className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          // In case image fails to load, gracefully fallback to inline vector
          e.currentTarget.style.display = 'none';
        }}
      />
      {/* Subtle overlay glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-slate-200 shadow-sm ${className}`}
      >
        <div className="w-5 h-5 rounded-md overflow-hidden bg-slate-950 border border-cyan-400/30 shrink-0">
          <img src={logoImage} alt="Seawater" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-wider text-xs uppercase bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
            Seawater
          </span>
          <span className="text-[10px] text-cyan-400/80 font-mono">v2.4.0</span>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 ${className}`}>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-950 border-2 border-cyan-400/50 p-1 shadow-2xl">
            <img
              src={logoImage}
              alt="Seawater Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-cyan-950/70 border border-cyan-800 text-[11px] font-mono font-semibold text-cyan-300 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Project Seawater · Policy-as-Code Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-3">
            <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              SEAWATER
            </span>
          </h1>
          {showSubtitle && (
            <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-xl">
              Graph-Based Policy-as-Code Platform for Trusted Research Environments (TRE) &amp; Secure Data Environments (SDE)
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: 'horizontal'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {LogoIcon}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight uppercase bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent ${textClasses}`}
          >
            Seawater
          </span>
          <span className="text-[9px] px-1.5 py-0.2 font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded">
            PaC
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-slate-400 font-mono tracking-wider font-semibold uppercase ${subtextClasses}`}>
            Policy-as-Code Engine
          </span>
        )}
      </div>
    </div>
  );
};
