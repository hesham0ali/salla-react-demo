export function Chevron({ dir = 'end', size = 16 }) {
  // end = اتجاه القراءة التالي (شمال في RTL)
  const rotate = { end: 180, start: 0, down: 270, up: 90 }[dir] ?? 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
