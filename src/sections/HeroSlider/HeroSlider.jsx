import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Media } from '../../components/ui';
import { DURATION, EASE } from '../../motion/motion';
import './HeroSlider.css';

export const schema = {
  label: 'البنر الرئيسي — سلايدر',
  defaults: {
    indicatorStyle: 'dots', // dots | numbers | progress
    indicatorPosition: 'end', // start | center | end
    autoplay: true,
    interval: 6000,
    height: 'tall', // short | tall | full
  },
  settings: [
    { id: 'indicatorStyle', type: 'select', label: 'شكل المؤشر', options: ['dots', 'numbers', 'progress'] },
    { id: 'indicatorPosition', type: 'select', label: 'موضع المؤشر', options: ['start', 'center', 'end'] },
    { id: 'autoplay', type: 'boolean', label: 'تشغيل تلقائي' },
    { id: 'interval', type: 'number', label: 'مدة الشريحة (ms)' },
    { id: 'height', type: 'select', label: 'الارتفاع', options: ['short', 'tall', 'full'] },
  ],
};

export default function HeroSlider({ id, settings, data }) {
  const slides = data.slides ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = useCallback(
    (next) => setActive((prev) => (next + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (!settings.autoplay || paused || slides.length < 2) return undefined;
    timer.current = setTimeout(() => go(active + 1), settings.interval);
    return () => clearTimeout(timer.current);
  }, [active, paused, settings.autoplay, settings.interval, slides.length, go]);

  if (!slides.length) return null;

  const slide = slides[active];

  return (
    <section
      id={id}
      className={`section section--flush hero hero--${settings.height}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="hero__stage">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.id}
            className="hero__slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.slower, ease: EASE.out }}
          >
            <Media src={slide.image} alt="" ratio="0" className="hero__media" />
            <div className="hero__scrim" />
          </motion.div>
        </AnimatePresence>

        <div className="hero__inner container">
          <motion.div
            key={`c-${slide.id}`}
            className={`hero__content hero__content--${slide.align ?? 'start'}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.12 }}
          >
            {slide.eyebrow && <span className="hero__eyebrow">{slide.eyebrow}</span>}
            <h2 className="hero__title">{slide.title}</h2>
            {slide.body && <p className="hero__body">{slide.body}</p>}
            {slide.cta && (
              <Button as="a" href={slide.cta.href} variant="light" size="lg" className="hero__cta">
                {slide.cta.label}
              </Button>
            )}
          </motion.div>
        </div>

        {slides.length > 1 && (
          <div className={`hero__indicators hero__indicators--${settings.indicatorPosition}`}>
            <Indicators
              style={settings.indicatorStyle}
              count={slides.length}
              active={active}
              interval={settings.interval}
              playing={settings.autoplay && !paused}
              onSelect={setActive}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Indicators({ style, count, active, interval, playing, onSelect }) {
  if (style === 'progress') {
    return (
      <div className="hero__progress" role="tablist">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`الشريحة ${i + 1}`}
            className="hero__progress-track"
            onClick={() => onSelect(i)}
          >
            <span
              className="hero__progress-fill"
              style={{
                transform: i < active ? 'scaleX(1)' : i === active ? undefined : 'scaleX(0)',
                animation:
                  i === active && playing
                    ? `hero-progress ${interval}ms linear forwards`
                    : i === active
                      ? 'none'
                      : undefined,
              }}
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`hero__dots hero__dots--${style}`} role="tablist">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`الشريحة ${i + 1}`}
          className={`hero__dot ${i === active ? 'is-active' : ''}`}
          onClick={() => onSelect(i)}
        >
          {style === 'numbers' ? i + 1 : <span className="hero__dot-mark" />}
        </button>
      ))}
    </div>
  );
}
