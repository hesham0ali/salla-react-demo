import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Chevron } from '../../components/ui';
import { Reveal, RevealGroup, RevealItem } from '../../motion/Reveal';
import { DURATION, EASE } from '../../motion/motion';
import './Faq.css';

export const schema = {
  label: 'الأسئلة الشائعة',
  defaults: { layout: 'auto', defaultOpen: 0 },
  settings: [
    { id: 'layout', type: 'select', label: 'التخطيط', options: ['auto', 'split', 'centered'] },
    { id: 'defaultOpen', type: 'number', label: 'السؤال المفتوح افتراضيًا (-1 = لا شيء)' },
  ],
};

export default function Faq({ id, settings, data }) {
  const items = data.items ?? [];
  const [open, setOpen] = useState(settings.defaultOpen ?? 0);

  if (!items.length) return null;

  // auto: لو فيه محتوى تعريفي → عمودين، لو مفيش → السؤال في المنتصف
  const hasIntro = Boolean(data.title || data.body);
  const layout =
    settings.layout === 'auto' ? (hasIntro ? 'split' : 'centered') : settings.layout;

  return (
    <section id={id} className={`section section--subtle faq faq--${layout}`}>
      <div className="container">
        <div className="faq__layout">
          {layout === 'split' && hasIntro && (
            <Reveal className="faq__intro">
              {data.title && <h2 className="faq__title">{data.title}</h2>}
              {data.body && <p className="faq__body">{data.body}</p>}
              {(data.supportNote || data.avgReply) && (
                <div className="faq__support">
                  <div className="faq__avatars" aria-hidden="true">
                    {['س', 'ن', 'م', 'أ'].map((ch) => (
                      <span className="faq__avatar" key={ch}>
                        {ch}
                      </span>
                    ))}
                    <span className="faq__online" />
                  </div>
                  {data.supportNote && <p className="faq__note">{data.supportNote}</p>}
                  {data.avgReply && <p className="faq__note faq__note--muted">{data.avgReply}</p>}
                </div>
              )}
            </Reveal>
          )}

          <RevealGroup className="faq__list" staggerChildren={0.06}>
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <RevealItem key={item.id} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      className="faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`${id}-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      <span>{item.q}</span>
                      <span className="faq__icon">
                        <Chevron dir={isOpen ? 'up' : 'down'} size={14} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${id}-a-${i}`}
                        className="faq__a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: DURATION.base, ease: EASE.standard }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
