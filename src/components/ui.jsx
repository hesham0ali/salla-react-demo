import { useRef, useState, useCallback, useEffect } from 'react';
import './ui.css';

const cx = (...parts) => parts.filter(Boolean).join(' ');

/* ---------- Button ---------- */
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

/* ---------- Section header ---------- */
export function SectionHead({ eyebrow, title, subtitle, align = 'start', action }) {
  if (!title && !subtitle && !eyebrow) return null;
  return (
    <div className={cx('ui-head', align === 'center' && 'ui-head--center')}>
      <div>
        {eyebrow && <span className="ui-head__eyebrow">{eyebrow}</span>}
        {title && <h2 className="ui-head__title">{title}</h2>}
        {subtitle && <p className="ui-head__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="ui-head__action">{action}</div>}
    </div>
  );
}

/* ---------- Media ---------- */
export function Media({ src, alt = '', ratio = '100%', className, imgClassName, children }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cx('ui-media', className)} style={{ '--ui-media-ratio': ratio }}>
      {!failed && src && (
        <img
          className={cx('ui-media__img', imgClassName)}
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {children}
    </div>
  );
}

/* ---------- Badge / Price / Rating ---------- */
export function Badge({ variant, children }) {
  return <span className={cx('ui-badge', variant && `ui-badge--${variant}`)}>{children}</span>;
}

export function Price({ now, was, currency = 'ر.س' }) {
  return (
    <span className="ui-price">
      <span className="ui-price__now">
        {now} {currency}
      </span>
      {was && (
        <span className="ui-price__was">
          {was} {currency}
        </span>
      )}
    </span>
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

/* ---------- Icons (inline، بدون مكتبة) ---------- */
export function Star({ filled = true, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.1 1.2-6.5L2.5 9.3l6.6-.9z" />
    </svg>
  );
}

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

export function Plus({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ---------- Carousel rail hook ---------- */
export function useRail() {
  const ref = useRef(null);
  const [state, setState] = useState({ atStart: true, atEnd: false });

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // في RTL الـ scrollLeft بيبقى سالب أو متناقص حسب المتصفح — نستخدم القيمة المطلقة
    const pos = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth - 1;
    setState({ atStart: pos <= 1, atEnd: pos >= max });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollBy = useCallback((direction) => {
    const el = ref.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    const rtl = getComputedStyle(el).direction === 'rtl';
    const sign = rtl ? -1 : 1;
    el.scrollBy({ left: sign * (direction === 'next' ? step : -step), behavior: 'smooth' });
  }, []);

  return { ref, ...state, scrollBy };
}

export function RailNav({ rail }) {
  return (
    <div className="ui-railnav">
      <button type="button" className="ui-navbtn" aria-label="السابق"
        onClick={() => rail.scrollBy('prev')} disabled={rail.atStart}>
        <Chevron dir="start" />
      </button>
      <button type="button" className="ui-navbtn" aria-label="التالي"
        onClick={() => rail.scrollBy('next')} disabled={rail.atEnd}>
        <Chevron dir="end" />
      </button>
    </div>
  );
}
