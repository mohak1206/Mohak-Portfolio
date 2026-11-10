type LogoProps = { className?: string };

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <svg
      viewBox="6 6 100 52"
      className={className}
      role="img"
      aria-label="MA, Mohak Agrawal"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M12 52 V14 L32 38 L52 14 V52" />
        <path d="M66 52 V32 A18 18 0 0 1 102 32 V52" />
        <path d="M66 40 H102" strokeWidth="2.4" />
      </g>
    </svg>
  );
}
