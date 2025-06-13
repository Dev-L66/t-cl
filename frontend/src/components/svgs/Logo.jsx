const Logo = ({ width, height }) => (
  <div>
    <svg width={width} height={height} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a0738" stopOpacity="1" />
          <stop offset="100%" stopColor="#3a0738" stopOpacity="1" />
        </linearGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="4" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
          <feDropShadow dx="2" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
          <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Original path with outline */}
      <path
        d="M30 20 Q40 20 40 30 V65 Q40 70 45 70 H65 Q70 70 70 75 V80 Q70 80 65 80 H30 Q30 80 30 75 Z"
        fill="url(#grad1)"
        filter="url(#shadow)"
        stroke="#000000"  /* White outline */
        // strokeWidth="1"   /* Outline thickness */
        strokeLinejoin="round"  /* Smooth corners */
      />
    </svg>
  </div>
);

export default Logo;