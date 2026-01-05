"use client";

export function BottleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottle body */}
      <path
        d="M20 24C20 22 22 20 24 20H40C42 20 44 22 44 24V52C44 56 40 60 32 60C24 60 20 56 20 52V24Z"
        stroke="url(#bottle-gradient)"
        strokeWidth="2"
        fill="none"
      />
      {/* Bottle neck */}
      <path
        d="M26 20V14C26 12 28 10 32 10C36 10 38 12 38 14V20"
        stroke="url(#bottle-gradient)"
        strokeWidth="2"
        fill="none"
      />
      {/* Cork */}
      <rect
        x="28"
        y="6"
        width="8"
        height="6"
        rx="1"
        stroke="url(#bottle-gradient)"
        strokeWidth="2"
        fill="none"
      />
      {/* Letter/scroll inside */}
      <path
        d="M27 32H37M27 38H35M27 44H33"
        stroke="url(#letter-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rolled paper edge */}
      <path
        d="M38 28C40 28 41 30 41 32V46C41 48 40 50 38 50"
        stroke="url(#letter-gradient)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Water waves at bottom */}
      <path
        d="M8 54C12 52 16 56 20 54C24 52 28 56 32 54C36 52 40 56 44 54C48 52 52 56 56 54"
        stroke="url(#wave-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M4 58C8 56 12 60 16 58C20 56 24 60 28 58C32 56 36 60 40 58C44 56 48 60 52 58C56 56 60 60 64 58"
        stroke="url(#wave-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      <defs>
        <linearGradient id="bottle-gradient" x1="20" y1="6" x2="44" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="letter-gradient" x1="27" y1="28" x2="41" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
        <linearGradient id="wave-gradient" x1="4" y1="54" x2="64" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}
