import React from 'react';
import logoImage from '../assets/images/wavebound_wave_logo.png';

interface WaveboundLogoProps {
  variant?: 'icon' | 'horizontal' | 'badge' | 'hero';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const WaveboundLogo: React.FC<WaveboundLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  // Dimensions for the wave icon - scaled to fill container boldly
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
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

  // Vector SVG mirroring the Wavebound curling wave emblem
  const WaveVector = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
    >
      <defs>
        <linearGradient id="silverWave" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="cyanInnerWave" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* Dark Navy Background */}
      <rect width="100" height="100" rx="16" fill="#0b172a" />
      {/* Soft rounded frame */}
      <rect x="18" y="14" width="64" height="72" rx="12" stroke="#64748b" strokeWidth="2.2" strokeOpacity="0.75" />

      {/* Outer Silvery-Blue Wave Arch */}
      <path
        d="M12 59 C28 59, 24 23, 48 23 C68 23, 80 48, 92 73 C78 68, 64 50, 56 36 C46 29, 32 32, 28 46 C25 56, 34 60, 42 58 C32 60, 20 60, 12 59 Z"
        fill="url(#silverWave)"
      />

      {/* Inner Vibrant Cyan Wave Spiral */}
      <path
        d="M18 64 C28 64, 38 63, 44 56 C49 50, 46 41, 38 41 C34 41, 32 44, 35 48 C38 43, 43 45, 41 51 C39 55, 33 58, 26 59 C22 59, 19 62, 18 64 Z"
        fill="url(#cyanInnerWave)"
      />
      {/* Lower Cyan Swell Ribbon */}
      <path
        d="M28 71 C40 73, 50 67, 56 59 C59 66, 68 73, 76 75 C68 70, 62 64, 60 58 C52 64, 42 68, 28 71 Z"
        fill="url(#cyanInnerWave)"
      />
    </svg>
  );

  const LogoIcon = (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#0b172a] border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/60 group-hover:border-cyan-400 transition-all ${sizeClasses}`}
      title="Wavebound: Ontology-led Governance (Inward Security & Outward Governance)"
    >
      <img
        src={logoImage}
        alt="Wavebound Wave Logo"
        className="w-full h-full object-contain p-0.5 transform scale-110 group-hover:scale-115 transition-transform duration-300"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      {/* Fallback container if image fails to render */}
      <div className="absolute inset-0 flex items-center justify-center p-0.5 pointer-events-none opacity-0 img-fallback:opacity-100">
        {WaveVector}
      </div>
      {/* Subtle atmospheric edge vignette */}
      <div className="absolute inset-0 ring-1 ring-inset ring-cyan-400/20 rounded-xl pointer-events-none" />
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0C2340] border border-cyan-500/40 text-slate-200 shadow-sm hover:border-cyan-400 transition-colors ${className}`}
      >
        <div className="w-6 h-6 rounded-md overflow-hidden bg-[#071628] border border-cyan-400/40 shrink-0 flex items-center justify-center">
          <img src={logoImage} alt="Wavebound" className="w-full h-full object-contain p-0.5 transform scale-110" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-wider text-xs uppercase bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
            Wavebound
          </span>
          <span className="text-[10px] text-cyan-400 font-mono font-semibold">v2.4.0</span>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 ${className}`}>
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-85 transition duration-500" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#071628] border-2 border-cyan-400/60 shadow-2xl flex items-center justify-center">
            <img
              src={logoImage}
              alt="Wavebound Wave Logo"
              className="w-full h-full object-contain p-1 transform scale-110 group-hover:scale-115 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="text-center sm:text-left space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-cyan-950/70 border border-slate-300 dark:border-cyan-800 text-[11px] font-mono font-semibold text-slate-800 dark:text-cyan-300 uppercase tracking-wider mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005EB8] dark:bg-cyan-400 animate-pulse" />
            Project Wavebound · Ontology-led Governance
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-3">
            <span className="bg-gradient-to-r from-[#0C2340] via-[#005EB8] to-[#00A389] dark:from-cyan-200 dark:via-sky-300 dark:to-teal-300 bg-clip-text text-transparent">
              WAVEBOUND
            </span>
          </h1>
          {showSubtitle && (
            <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium max-w-xl leading-relaxed">
              Ontology-led information governance playbook and reference architecture. The IG OWL/RDF model connects decisions and proposed safeguards through a Dual-Wave Policy-as-Code Architecture: <strong>Inward Enclave Security</strong> (access and admission) and <strong>Outward Governance</strong> (output review and public transparency).
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: 'horizontal'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {LogoIcon}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight uppercase bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent ${textClasses}`}
          >
            Wavebound
          </span>
          <span className="text-[9px] px-1.5 py-0.5 font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-700/80 rounded">
            PaC
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-slate-400 font-mono tracking-wider font-semibold uppercase mt-0.5 ${subtextClasses}`}>
            Ontology-led Governance
          </span>
        )}
      </div>
    </div>
  );
};
