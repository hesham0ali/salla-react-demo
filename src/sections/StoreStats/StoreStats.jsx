import { SectionHead, CountUp } from '../../components/ui';
import { Reveal, RevealGroup, RevealItem } from '../../motion/Reveal';
import './StoreStats.css';

export const schema = {
  label: 'أرقام المتجر والشراكات',
  defaults: { showPartners: true, countUp: true },
  settings: [
    { id: 'showPartners', type: 'boolean', label: 'إظهار الشركاء' },
    { id: 'countUp', type: 'boolean', label: 'تحريك الأرقام' },
  ],
};

export default function StoreStats({ id, settings, data }) {
  const stats = data.stats ?? [];

  return (
    <section id={id} className="section section--subtle stats">
      <div className="container">
        <Reveal>
          <SectionHead title={data.title} align="center" />
        </Reveal>

        <RevealGroup className="stats__grid" staggerChildren={0.08}>
          {stats.map((s) => (
            <RevealItem key={s.id} className="stats__card">
              <span className="stats__value">
                {settings.countUp ? <CountUp to={s.value} /> : s.value}
                {s.suffix}
              </span>
              <span className="stats__label">{s.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        {settings.showPartners && data.partners?.length > 0 && (
          <Reveal className="stats__partners" delay={0.1}>
            <h3 className="stats__partners-title">{data.partnersTitle}</h3>
            {data.partnersBody && <p className="stats__partners-body">{data.partnersBody}</p>}
            <div className="stats__logos">
              {data.partners.map((name) => (
                <span className="stats__logo" key={name}>
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

