import { useState } from 'react';
import { getSection } from '../sections/registry';
import './SectionOrderPanel.css';

/**
 * لوحة تطوير — إثبات عملي لشرط استقلالية الأقسام.
 * بتسمح بإعادة ترتيب أو إخفاء أي section live، زي ما التاجر هيعمل
 * بالظبط من لوحة تحكم المنصة.
 *
 * مش جزء من الثيم النهائي — بتتشال عند النقل للمنصة.
 */
export default function SectionOrderPanel({ sections, onChange }) {
  const [open, setOpen] = useState(false);

  const move = (index, delta) => {
    const next = [...sections];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const toggle = (index) => {
    const next = [...sections];
    next[index] = { ...next[index], hidden: !next[index].hidden };
    onChange(next);
  };

  const shuffle = () => {
    const next = [...sections];
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    onChange(next);
  };

  return (
    <div className={`dev ${open ? 'is-open' : ''}`}>
      <button type="button" className="dev__toggle" onClick={() => setOpen((o) => !o)}>
        {open ? 'إغلاق' : 'ترتيب الأقسام'}
      </button>

      {open && (
        <div className="dev__panel">
          <div className="dev__head">
            <strong>أقسام الصفحة</strong>
            <button type="button" className="dev__shuffle" onClick={shuffle}>
              ترتيب عشوائي
            </button>
          </div>

          <ol className="dev__list">
            {sections.map((s, i) => (
              <li className={`dev__row ${s.hidden ? 'is-hidden' : ''}`} key={s.id}>
                <span className="dev__name">{getSection(s.type)?.schema?.label ?? s.type}</span>
                <span className="dev__controls">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="لأعلى">
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === sections.length - 1}
                    aria-label="لأسفل"
                  >
                    ↓
                  </button>
                  <button type="button" onClick={() => toggle(i)} aria-label="إخفاء">
                    {s.hidden ? '👁' : '✕'}
                  </button>
                </span>
              </li>
            ))}
          </ol>

          <p className="dev__hint">
            غيّر الترتيب أو أخفِ أي قسم — مفيش حاجة في الصفحة بتتأثر.
          </p>
        </div>
      )}
    </div>
  );
}
