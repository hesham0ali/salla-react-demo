import './Marquee.css';

export const schema = {
  label: 'الشريط الإعلاني',
  defaults: { speed: 'normal', direction: 'rtl', theme: 'inverse', size: 'lg' },
  settings: [
    { id: 'speed', type: 'select', label: 'السرعة', options: ['slow', 'normal', 'fast'] },
    { id: 'direction', type: 'select', label: 'اتجاه الحركة', options: ['rtl', 'ltr'] },
    { id: 'theme', type: 'select', label: 'النمط', options: ['inverse', 'subtle', 'accent'] },
    { id: 'size', type: 'select', label: 'الحجم', options: ['sm', 'md', 'lg'] },
  ],
};

const SPEED = { slow: '48s', normal: '32s', fast: '20s' };

export default function Marquee({ id, settings, data }) {
  const items = data.items ?? [];
  if (!items.length) return null;

  // بنكرّر المحتوى مرتين عشان اللوب يبقى متواصل بدون فراغ
  const track = [...items, ...items];

  return (
    <section
      id={id}
      className={`section section--flush mq mq--${settings.theme} mq--${settings.size}`}
      aria-label="إعلانات المتجر"
    >
      <div
        className="mq__viewport"
        style={{
          '--mq-duration': SPEED[settings.speed] ?? SPEED.normal,
          '--mq-direction': settings.direction === 'ltr' ? 'reverse' : 'normal',
        }}
      >
        <div className="mq__track">
          {track.map((item, i) => (
            <div
              className="mq__item"
              key={i < items.length ? `orig-${i}` : `clone-${i - items.length}`}
              aria-hidden={i >= items.length}
            >
              <span className="mq__text">{item.text}</span>
              {item.image && <img className="mq__img" src={item.image} alt="" loading="lazy" />}
              <span className="mq__sep" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
