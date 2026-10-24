import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Media, Button, Price, Plus } from '../../components/ui';
import { Reveal } from '../../motion/Reveal';
import { DURATION, EASE } from '../../motion/motion';
import './ShoppableHero.css';

export const schema = {
  label: 'البنر التفاعلي (Shoppable)',
  defaults: { hotspotStyle: 'plus', action: 'add-to-cart', overlay: 'gradient' },
  settings: [
    { id: 'hotspotStyle', type: 'select', label: 'شكل النقطة', options: ['plus', 'dot'] },
    { id: 'action', type: 'select', label: 'إجراء البطاقة', options: ['add-to-cart', 'view-product'] },
    { id: 'overlay', type: 'select', label: 'التعتيم', options: ['gradient', 'none'] },
  ],
};

export default function ShoppableHero({ id, settings, data }) {
  const [open, setOpen] = useState(null);
  const hotspots = data.hotspots ?? [];

  return (
    <section id={id} className="section section--flush shop">
      <div className="shop__frame">
        <Media src={data.image} alt="" ratio="0" className="shop__media" />
        {settings.overlay === 'gradient' && <div className="shop__scrim" />}

        {hotspots.map((spot, i) => (
          <div
            key={spot.id}
            className="shop__spot"
            style={{ insetInlineStart: `${spot.x}%`, insetBlockStart: `${spot.y}%` }}
          >
            <motion.button
              type="button"
              className={`shop__dot shop__dot--${settings.hotspotStyle} ${open === spot.id ? 'is-open' : ''}`}
              aria-label={`عرض ${spot.product.name}`}
              aria-expanded={open === spot.id}
              onClick={() => setOpen(open === spot.id ? null : spot.id)}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.base, ease: EASE.spring, delay: 0.3 + i * 0.12 }}
            >
              <Plus size={16} />
            </motion.button>

            <AnimatePresence>
              {open === spot.id && (
                <motion.div
                  className="shop__card"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: DURATION.base, ease: EASE.out }}
                >
                  <Media src={spot.product.image} alt="" ratio="100%" className="shop__card-media" />
                  <div className="shop__card-body">
                    <span className="shop__card-brand">{spot.product.brand}</span>
                    <strong className="shop__card-name">{spot.product.name}</strong>
                    <Price now={spot.product.price} was={spot.product.compareAt} />
                    <Button variant="primary" size="sm" block>
                      {settings.action === 'add-to-cart' ? 'أضف للسلة' : 'عرض المنتج'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="shop__inner container">
          <Reveal className="shop__content" variant="fadeUp">
            {data.title && <h2 className="shop__title">{data.title}</h2>}
            {data.body && <p className="shop__body">{data.body}</p>}
            {data.cta && (
              <Button as="a" href={data.cta.href} variant="light" className="shop__cta">
                {data.cta.label}
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
