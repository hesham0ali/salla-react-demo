import { SectionHead, Media, Badge, Price, Rating, Button, useRail, RailNav } from '../../components/ui';
import { Reveal, RevealGroup, RevealItem } from '../../motion/Reveal';
import './ProductCards.css';

export const schema = {
  label: 'بطاقات المنتجات',
  defaults: { layout: 'rail', showHoverImage: true, showRating: true, showTags: true, columns: 4 },
  settings: [
    { id: 'layout', type: 'select', label: 'العرض', options: ['rail', 'grid'] },
    { id: 'columns', type: 'number', label: 'عدد الأعمدة (grid)', min: 2, max: 5 },
    { id: 'showHoverImage', type: 'boolean', label: 'تبديل الصورة عند Hover' },
    { id: 'showRating', type: 'boolean', label: 'إظهار التقييم' },
    { id: 'showTags', type: 'boolean', label: 'إظهار الوسوم' },
  ],
};

export default function ProductCards({ id, settings, data }) {
  const items = data.products ?? [];
  const rail = useRail();
  if (!items.length) return null;

  const isRail = settings.layout === 'rail';

  return (
    <section id={id} className="section pc">
      <div className="container">
        <Reveal>
          <SectionHead
            title={data.title}
            subtitle={data.subtitle}
            action={
              <div className="pc__actions">
                {data.viewAll && (
                  <Button as="a" href={data.viewAll.href} variant="ghost" size="sm">
                    {data.viewAll.label}
                  </Button>
                )}
                {isRail && <RailNav rail={rail} />}
              </div>
            }
          />
        </Reveal>

        {isRail ? (
          <div className="ui-rail pc__rail" ref={rail.ref}>
            {items.map((p) => (
              <ProductCard key={p.id} product={p} settings={settings} />
            ))}
          </div>
        ) : (
          <RevealGroup
            className="pc__grid"
            style={{ '--pc-cols': settings.columns }}
            staggerChildren={0.07}
          >
            {items.map((p) => (
              <RevealItem key={p.id}>
                <ProductCard product={p} settings={settings} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, settings }) {
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round((1 - product.price / product.compareAt) * 100)
      : null;

  return (
    <article className="pc__card">
      <a className="pc__thumb" href={product.href ?? '#'}>
        <Media src={product.image} alt={product.name} ratio="125%" imgClassName="pc__img pc__img--main" />
        {settings.showHoverImage && product.hoverImage && (
          <img className="pc__img pc__img--hover" src={product.hoverImage} alt="" loading="lazy" />
        )}

        <div className="pc__flags">
          {discount && <Badge variant="accent">-{discount}%</Badge>}
          {product.badge && <Badge variant="dark">{product.badge}</Badge>}
          {!product.inStock && <Badge>نفدت الكمية</Badge>}
        </div>

        <div className="pc__quick">
          <Button variant="light" size="sm" block disabled={!product.inStock}>
            {product.inStock ? 'إضافة سريعة' : 'غير متوفر'}
          </Button>
        </div>
      </a>

      <div className="pc__body">
        <Price now={product.price} was={product.compareAt} />
        <h3 className="pc__name">
          <a href={product.href ?? '#'}>{product.name}</a>
        </h3>
        {settings.showRating && <Rating value={product.rating} count={product.reviews} />}
        {settings.showTags && product.tags?.length > 0 && (
          <div className="pc__tags">
            {product.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
