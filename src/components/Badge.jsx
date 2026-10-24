const cx = (...parts) => parts.filter(Boolean).join(' ');

export function Badge({ variant, className, children }) {
  return <span className={cx('ui-badge', variant && `ui-badge--${variant}`, className)}>{children}</span>;
}
