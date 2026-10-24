import { useRef, useState, useCallback, useEffect } from 'react';
import { Chevron } from './Chevron';

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
