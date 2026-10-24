import { Media, Button } from '../../components/ui';
import { Reveal } from '../../motion/Reveal';
import './AboutUs.css';

export const schema = {
  label: 'نبذة عن العلامة التجارية',
  defaults: { mediaPosition: 'start' },
  settings: [
    { id: 'mediaPosition', type: 'select', label: 'موضع الصور', options: ['start', 'end'] },
  ],
};

export default function AboutUs({ id, settings, data }) {
  const [primary, secondary] = data.images ?? [];

  return (
    <section id={id} className="section about">
      <div className="container">
        <div className={`about__layout about__layout--${settings.mediaPosition}`}>
          <Reveal variant="zoomIn" className="about__media">
            {primary && (
              <Media src={primary} alt="" ratio="120%" className="about__img about__img--primary" />
            )}
            {secondary && (
              <Media src={secondary} alt="" ratio="100%" className="about__img about__img--secondary" />
            )}
          </Reveal>

          <Reveal className="about__content" delay={0.12}>
            {data.eyebrow && <span className="about__eyebrow">{data.eyebrow}</span>}
            <h2 className="about__title">{data.title}</h2>
            <p className="about__body">{data.body}</p>
            {data.cta && (
              <Button as="a" href={data.cta.href} variant="outline" className="about__cta">
                {data.cta.label}
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
