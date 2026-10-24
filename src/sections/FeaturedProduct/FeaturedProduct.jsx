import { useState } from 'react';
import { Media, Button, Price, Badge, Chevron } from '../../components/ui';
import { Reveal } from '../../motion/Reveal';
import './FeaturedProduct.css';

export const schema = {
  label: 'المنتج المميز',
  defaults: { galleryPosition: 'start', showHighlights: true, background: 'muted' },
  settings: [
    { id: 'galleryPosition', type: 'select', label: 'موضع المعرض', options: ['start', 'end'] },
    { id: 'showHighlights', type: 'boolean', label: 'إظهار المزايا' },
    { id: 'background', type: 'select', label: 'الخلفية', options: ['default', 'subtle', 'muted'] },
  ],
};

export default function FeaturedProduct({ id, settings, data }) {
  const p = data.product;
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [choices, setChoices] = useState(() =>
    Object.fromEntries((p?.options ?? []).map((o) => [o.label, o.values[0]]))
  );
  const [openHighlight, setOpenHighlight] = useState(null);

  if (!p) return null;

  const bg = settings.background === 'default' ? '' : `section--${settings.background}`;

  return (
    <section id={id} className={`section ${bg} fp`}>
      <div className="container">
        <Reveal>
          <div className={`fp__layout fp__layout--${settings.galleryPosition}`}>
            {/* Gallery */}
            <div className="fp__gallery">
              <div className="fp__thumbs">
                {p.gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={`fp__thumb ${i === activeImg ? 'is-active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`صورة ${i + 1}`}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
              <Media src={p.gallery[activeImg]} alt={p.name} ratio="100%" className="fp__main" />
            </div>

            {/* Info */}
            <div className="fp__info">
              {data.eyebrow && <span className="fp__eyebrow">{data.eyebrow}</span>}
              <span className="fp__brand">{p.brand}</span>
              <h2 className="fp__name">{p.name}</h2>
              <p className="fp__desc">{p.description}</p>

              <div className="fp__price">
                <Price now={p.price} was={p.compareAt} currency={p.currency} />
              </div>

              <div className="fp__stock">
                <Badge variant="success">متوفر — {p.stock} قطعة</Badge>
                <span className="fp__tax">شامل الضريبة · الشحن يُحسب عند الدفع</span>
              </div>

              {p.options?.map((opt) => (
                <div className="fp__option" key={opt.label}>
                  <span className="fp__option-label">{opt.label}</span>
                  <div className="fp__swatches">
                    {opt.values.map((v) => (
                      <button
                        key={v}
                        type="button"
                        className={`fp__swatch ${choices[opt.label] === v ? 'is-active' : ''}`}
                        onClick={() => setChoices((c) => ({ ...c, [opt.label]: v }))}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="fp__buy">
                <div className="fp__qty">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="إنقاص">
                    −
                  </button>
                  <span>{qty}</span>
                  <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="زيادة">
                    +
                  </button>
                </div>
                <Button variant="primary" size="lg" className="fp__add">
                  أضف للسلة
                </Button>
                <Button variant="outline" size="lg">
                  اشترِ الآن
                </Button>
              </div>

              {settings.showHighlights && p.highlights?.length > 0 && (
                <div className="fp__highlights">
                  {p.highlights.map((h, i) => (
                    <div className="fp__highlight" key={h.title}>
                      <button
                        type="button"
                        className="fp__highlight-head"
                        aria-expanded={openHighlight === i}
                        onClick={() => setOpenHighlight(openHighlight === i ? null : i)}
                      >
                        <span>{h.title}</span>
                        <Chevron dir={openHighlight === i ? 'up' : 'down'} size={14} />
                      </button>
                      {openHighlight === i && <p className="fp__highlight-body">{h.body}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
