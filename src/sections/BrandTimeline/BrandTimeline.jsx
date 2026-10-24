import { SectionHead } from '../../components/ui';
import { Reveal, RevealGroup, RevealItem } from '../../motion/Reveal';
import './BrandTimeline.css';

export const schema = {
  label: 'رحلة العلامة التجارية',
  defaults: { layout: 'alternating' },
  settings: [
    { id: 'layout', type: 'select', label: 'التوزيع', options: ['alternating', 'stacked'] },
  ],
};

export default function BrandTimeline({ id, settings, data }) {
  const items = data.milestones ?? [];
  if (!items.length) return null;

  return (
    <section id={id} className={`section section--subtle tl tl--${settings.layout}`}>
      <div className="container container--narrow">
        <Reveal>
          <SectionHead title={data.title} subtitle={data.subtitle} align="center" />
        </Reveal>

        <RevealGroup className="tl__track" staggerChildren={0.12}>
          <span className="tl__spine" aria-hidden="true" />
          {items.map((m, i) => (
            <RevealItem key={m.id} className={`tl__item ${i % 2 ? 'tl__item--flip' : ''}`}>
              <span className="tl__year">{m.year}</span>
              <span className="tl__node" aria-hidden="true" />
              <div className="tl__card">
                <h3 className="tl__title">{m.title}</h3>
                <p className="tl__body">{m.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
