import React from "react";

interface TranscendentLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textClassName?: string;
  dotClassName?: string;
}

/**
 * TranscendentLogoIcon
 * The authentic "Transcendent Gap" geometric N mark.
 * Features the intentional diagonal gap separating the diagonal and right strut,
 * and the accent node symbolizing digital connection.
 */
export function TranscendentLogoIcon({
  className = "w-9 h-9",
  size = 36,
  dotClassName = "fill-blue-600 dark:fill-blue-500",
}: {
  className?: string;
  size?: number | string;
  dotClassName?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="transcendentBlue" x1="20" y1="15" x2="82" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="transcendentSilverLight" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="transcendentSilverDark" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>

      {/* Left Strut */}
      <path
        d="M18 18 C18 16.9 18.9 16 20 16 H38 C39.1 16 40 16.9 40 18 V82 C40 83.1 39.1 84 38 84 H20 C18.9 84 18 83.1 18 82 V18Z"
        className="fill-slate-800 dark:fill-slate-200 transition-colors duration-300"
      />

      {/* Diagonal Strut */}
      <path
        d="M20 16 H40 L82 84 H62 L20 30 V16Z"
        fill="url(#transcendentBlue)"
      />

      {/* Right Strut (with intentional diagonal gap at V54) */}
      <path
        d="M60 16 H80 C81.1 16 82 16.9 82 18 V82 C82 83.1 81.1 84 80 84 H62 C60.9 84 60 83.1 60 82 V54 L60 16Z"
        className="fill-slate-800 dark:fill-slate-200 transition-colors duration-300"
      />

      {/* Digital Connection Node */}
      <circle cx="80" cy="16" r="5" className={dotClassName} />
    </svg>
  );
}

/**
 * TranscendentLogo
 * Full logotype pairing the geometric mark with modern editorial typography.
 */
export default function TranscendentLogo({
  className = "flex items-center gap-3 select-none",
  size = 32,
  showText = true,
  textClassName = "text-lg tracking-tight font-heading",
  dotClassName,
}: TranscendentLogoProps) {
  return (
    <div className={className}>
      <TranscendentLogoIcon size={size} dotClassName={dotClassName} />
      {showText && (
        <span className={`inline-flex items-center ${textClassName}`}>
          <span className="font-bold text-slate-950 dark:text-white tracking-tight">
            NVIT
          </span>
          <span className="text-blue-600 dark:text-blue-500 font-bold mx-px">.</span>
          <span className="font-light text-slate-600 dark:text-slate-300 tracking-wider">
            SPACE
          </span>
        </span>
      )}
    </div>
  );
}
