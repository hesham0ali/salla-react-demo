import { SectionHead, Media, useRail, RailNav } from '../../components/ui';
import { Reveal, RevealGroup, RevealItem } from '../../motion/Reveal';
import './Categories.css';

export const schema = {
  label: 'التصنيفات',
  defaults: { layout: 'circles', columns: 6, showCount: true },
  settings: [
    { id: 'layout', type: 'select', label: 'الشكل', options: ['circles', 'tiles', 'rail'] },
    { id: 'columns', type: 'number', label: 'عدد الأعمدة', min: 3, max: 8 },
    { id: 'showCount', type: 'boolean', label: 'إظهار عدد المنتجات' },
  ],
};

export default function Categories({ id, settings, data }) {
  const items = data.categories ?? [];
  const rail = useRail();
  if (!items.length) return null;

  const isRail = settings.layout === 'rail';

  return (
    <section id={id} className={`section cats cats--${settings.layout}`}>
      <div className="container">
        <Reveal>
          <SectionHead
            title={data.title}
            subtitle={data.subtitle}
            action={isRail ? <RailNav rail={rail} /> : null}
          />
        </Reveal>

        {isRail ? (
          <div className="ui-rail cats__rail" ref={rail.ref}>
            {items.map((cat) => (
              <CategoryItem key={cat.id} cat={cat} settings={settings} />
            ))}
          </div>
        ) : (
          <RevealGroup
            className="cats__grid"
            style={{ '--cats-cols': settings.columns }}
            staggerChildren={0.06}
          >
            {items.map((cat) => (
              <RevealItem key={cat.id}>
                <CategoryItem cat={cat} settings={settings} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}

function CategoryItem({ cat, settings }) {
  const isTile = settings.layout === 'tiles';
  return (
    <a className="cats__item" href={cat.href ?? '#'}>
      <Media
        src={cat.image}
        alt={cat.name}
        ratio={isTile ? '130%' : '100%'}
        className="cats__media"
        imgClassName="cats__img"
      />
      {isTile ? (
        <div className="cats__info">
          <span className="cats__label">{cat.name}</span>
          {settings.showCount && cat.count != null && (
            <span className="cats__count">{cat.count} منتج</span>
          )}
        </div>
      ) : (
        <>
          <span className="cats__label">{cat.name}</span>
          {settings.showCount && cat.count != null && (
            <span className="cats__count">{cat.count} منتج</span>
          )}
        </>
      )}
    </a>
  );
}
