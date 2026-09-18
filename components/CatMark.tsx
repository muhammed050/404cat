export function CatMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 210" role="img" aria-label="404 CAT mascot">
      <defs>
        <linearGradient id="fur" x1="0" x2="1">
          <stop offset="0" stopColor="#d7dde3" />
          <stop offset="1" stopColor="#7c8796" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M47 62 36 14l52 34c20-9 47-9 66 0l51-34-12 51c18 18 29 44 29 73 0 49-37 72-102 72S18 187 18 138c0-31 11-57 29-76Z" fill="url(#fur)" stroke="#07131d" strokeWidth="8"/>
      <path d="M44 31 65 51 49 58Z" fill="#ff8f9f"/><path d="m195 31-21 20 16 7Z" fill="#ff8f9f"/>
      <path d="M91 81c-18-5-33 7-34 25 0 18 14 31 31 28 16-3 23-18 19-32-3-11-8-18-16-21Z" fill="#fff" stroke="#07131d" strokeWidth="6"/>
      <path d="M159 81c18-5 33 7 34 25 0 18-14 31-31 28-16-3-23-18-19-32 3-11 8-18 16-21Z" fill="#fff" stroke="#07131d" strokeWidth="6"/>
      <ellipse cx="89" cy="108" rx="12" ry="17" fill="#061018"/><ellipse cx="160" cy="108" rx="12" ry="17" fill="#061018"/>
      <circle cx="84" cy="101" r="4" fill="#fff"/><circle cx="155" cy="101" r="4" fill="#fff"/>
      <path d="M116 129q8-8 16 0-8 10-16 0Z" fill="#ff8f9f" stroke="#07131d" strokeWidth="4"/>
      <path d="M124 138v9m0 0-10 7m10-7 10 7" stroke="#07131d" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M57 151 16 145m43 17-47 7m169-18 42-6m-41 17 46 7" stroke="#dffcff" strokeWidth="4" strokeLinecap="round"/>
      <path d="M86 49 111 74m67-22-28 23" stroke="#28e9ff" strokeWidth="5" opacity=".8" filter="url(#glow)"/>
    </svg>
  );
}
