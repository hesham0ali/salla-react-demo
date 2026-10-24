const cx = (...parts) => parts.filter(Boolean).join(' ');

export function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  children,
  ...rest
}) {
  const Tag = as;
  return (
    <Tag
      {...(as === 'button' && { type: 'button' })}
      className={cx(
        'ui-btn',
        `ui-btn--${variant}`,
        size !== 'md' && `ui-btn--${size}`,
        block && 'ui-btn--block',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
