export function Star({ filled = true, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.1 1.2-6.5L2.5 9.3l6.6-.9z" />
    </svg>
  );
}

export function Rating({ value = 5, count }) {
  return (
    <span className="ui-rating">
      <span className="ui-rating__stars" aria-label={`${value} من 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} filled={i < Math.round(value)} />
        ))}
      </span>
      {count != null && <span>({count})</span>}
    </span>
  );
}
