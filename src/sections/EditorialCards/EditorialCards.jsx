import { SectionHead, Media, Button, Chevron } from '../../components/ui';
import { Reveal, RevealGroup, RevealItem } from '../../motion/Reveal';
import './EditorialCards.css';

export const schema = {
  label: 'بطاقات اكتشاف المنتجات والتصنيفات',
  defaults: { layout: 'mosaic' },
  settings: [
    { id: 'layout', type: 'select', label: 'التوزيع', options: ['mosaic', 'even'] },
  ],
};

export default function EditorialCards({ id, settings, data }) {
  const cards = data.cards ?? [];
  if (!cards.length) return null;

  return (
    <section id={id} className="section section--subtle ed">
      <div className="container">
        <Reveal>
          <SectionHead title={data.title} subtitle={data.subtitle} />
        </Reveal>

        <RevealGroup className={`ed__grid ed__grid--${settings.layout}`} staggerChildren={0.09}>
          {cards.map((card) => (
            <RevealItem key={card.id} className={`ed__cell ed__cell--${card.size ?? 'md'}`}>
              <a className={`ed__card ed__card--${card.theme ?? 'light'}`} href={card.href ?? '#'}>
                {card.image && (
                  <Media src={card.image} alt="" ratio="0" className="ed__media" imgClassName="ed__img" />
                )}
                <div className="ed__body">
                  <h3 className="ed__title">{card.title}</h3>
                  {card.body && <p className="ed__text">{card.body}</p>}
                  {card.cta ? (
                    <Button as="span" variant="light" size="sm" className="ed__btn">
                      {card.cta}
                    </Button>
                  ) : (
                    <span className="ed__link">
                      تصفّح القسم <Chevron dir="end" size={14} />
                    </span>
                  )}
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
