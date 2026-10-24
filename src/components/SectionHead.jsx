const cx = (...parts) => parts.filter(Boolean).join(' ');

export function SectionHead({ eyebrow, title, subtitle, align = 'start', action, as: Tag = 'h2' }) {
  if (!title && !subtitle && !eyebrow) return null;
  return (
    <div className={cx('ui-head', align === 'center' && 'ui-head--center')}>
      <div>
        {eyebrow && <span className="ui-head__eyebrow">{eyebrow}</span>}
        {title && <Tag className="ui-head__title">{title}</Tag>}
        {subtitle && <p className="ui-head__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="ui-head__action">{action}</div>}
    </div>
  );
}
