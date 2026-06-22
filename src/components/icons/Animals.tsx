type IconProps = { size?: number; className?: string };

/** Minimal line-art cow head (beef). */
export function Cow({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* horns */}
      <path d="M4.5 8.2c-.7-1.2-.9-2.7-.5-4 1.3.3 2.5 1.2 3.2 2.5" />
      <path d="M19.5 8.2c.7-1.2.9-2.7.5-4-1.3.3-2.5 1.2-3.2 2.5" />
      {/* ears */}
      <path d="M6.8 8.4C4.8 8 3 8.8 2.4 10.4c1.6.7 3.5.3 4.5-.8" />
      <path d="M17.2 8.4c2-.4 3.8.4 4.4 2-1.6.7-3.5.3-4.5-.8" />
      {/* head */}
      <path d="M7 8.6C7.9 7 9.8 6 12 6s4.1 1 5 2.6c.7 1.4.8 3.1.2 4.7-.9 2.4-2.9 3.9-5.2 3.9s-4.3-1.5-5.2-3.9c-.6-1.6-.5-3.3.2-4.7Z" />
      {/* muzzle */}
      <path d="M9 13.2c.8.7 1.8 1.1 3 1.1s2.2-.4 3-1.1" />
      <circle cx="10.2" cy="14.4" r=".55" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="14.4" r=".55" fill="currentColor" stroke="none" />
      {/* eyes */}
      <circle cx="9.6" cy="10.4" r=".55" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="10.4" r=".55" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Minimal line-art kudu head with twisted horns (game). */
export function Kudu({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* twisted horns */}
      <path d="M10.5 8.5C9 7 10 5.5 8.8 4.2 8 3.3 9 2.2 8 1.5" />
      <path d="M13.5 8.5c1.5-1.5.5-3 1.7-4.3.8-.9-.2-2 .8-2.7" />
      {/* ears */}
      <path d="M9.2 8.6C7.4 7.7 5.4 8.1 4.7 9.5c1.4.6 3.1.4 4-.4" />
      <path d="M14.8 8.6c1.8-.9 3.8-.5 4.5.9-1.4.6-3.1.4-4-.4" />
      {/* long face */}
      <path d="M9 9.2c0 2 .6 4 3 7 2.4-3 3-5 3-7 0-2.1-1.2-3.4-3-3.4S9 7.1 9 9.2Z" />
      {/* eyes + nose */}
      <circle cx="10.5" cy="9.8" r=".5" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="9.8" r=".5" fill="currentColor" stroke="none" />
      <path d="M11.2 14.4h1.6" />
    </svg>
  );
}
