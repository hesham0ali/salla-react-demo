import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chevron } from '../../components/ui';
import { Reveal } from '../../motion/Reveal';
import { DURATION, EASE } from '../../motion/motion';
import './Testimonials.css';

export const schema = {
  label: 'آراء العملاء',
  defaults: { style: 'quote', showNav: true },
  settings: [
    { id: 'style', type: 'select', label: 'النمط', options: ['quote', 'cards'] },
    { id: 'showNav', type: 'boolean', label: 'أزرار التنقل' },
  ],
};

export default function Testimonials({ id, settings, data }) {
  const items = data.items ?? [];
  const [active, setActive] = useState(0);
  if (!items.length) return null;

  if (settings.style === 'cards') {
    return (
      <section id={id} className="section section--subtle tm">
        <div className="container">
          <div className="tm__cards">
            {items.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08} className="tm__card">
                <p className="tm__card-quote">{t.quote}</p>
                <footer className="tm__meta">
                  <strong>{t.author}</strong>
                  {t.role && <span>{t.role}</span>}
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const item = items[active];

  return (
    <section id={id} className="section section--subtle tm">
      <div className="container">
        <Reveal className="tm__panel">
          <span className="tm__mark" aria-hidden="true">
            ”
          </span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item.id}
              className="tm__quote"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DURATION.base, ease: EASE.out }}
            >
              <p>{item.quote}</p>
              <footer className="tm__meta">
                <strong>{item.author}</strong>
                {item.role && <span>{item.role}</span>}
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {settings.showNav && items.length > 1 && (
            <div className="tm__nav">
              <button
                type="button"
                className="ui-navbtn"
                aria-label="السابق"
                onClick={() => setActive((a) => (a - 1 + items.length) % items.length)}
              >
                <Chevron dir="start" />
              </button>
              <button
                type="button"
                className="ui-navbtn"
                aria-label="التالي"
                onClick={() => setActive((a) => (a + 1) % items.length)}
              >
                <Chevron dir="end" />
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
