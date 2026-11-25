// Decorative circuit traces echoing the logo
export function CircuitPattern({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern id="circuit" width="220" height="220" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M0 40h60l30 30h70l20-20h40" />
            <path d="M30 220v-60l30-30h40" />
            <path d="M140 220v-50l40-40V90" />
            <path d="M220 160h-50" />
            <circle cx="108" cy="130" r="8" />
            <circle cx="180" cy="82" r="8" />
            <circle cx="162" cy="160" r="8" />
            <rect x="52" y="78" width="14" height="14" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}
