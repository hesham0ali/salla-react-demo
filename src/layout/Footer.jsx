import { Button } from '../components/ui';
import './Footer.css';

const COLUMNS = [
  { title: 'تسوّق', links: ['وصل حديثًا', 'الأكثر مبيعًا', 'العروض', 'بطاقات الهدايا'] },
  { title: 'المساعدة', links: ['الشحن والتوصيل', 'الإرجاع والاستبدال', 'تتبّع الطلب', 'الأسئلة الشائعة'] },
  { title: 'المتجر', links: ['من نحن', 'فروعنا', 'الوظائف', 'تواصل معنا'] },
];

const PAYMENTS = ['Mada', 'Visa', 'Mastercard', 'Apple Pay', 'Tabby'];

const SOCIAL = [
  {
    label: 'انستقرام',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'تويتر',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'تيك توك',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5.1 5.1 0 0 0 5 4" />
      </svg>
    ),
  },
  {
    label: 'سناب',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3c-3.87 0-6 2.64-6 5.5V11c-.82.1-1.5.5-1.5 1s.5.9 1.5.9c-.5 1.2-1.5 2-2.5 2.2.5.5 2 .9 4 .9.6 1.1 1.8 1.8 3 2 1.2-.2 2.4-.9 3-2 2 0 3.5-.4 4-.9-1-.2-2-1-2.5-2.2 1 0 1.5-.4 1.5-.9s-.68-.9-1.5-1V8.5C18 5.64 15.87 3 12 3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="container">
        <div className="ft__top">
          <div className="ft__brand">
            <a href="#" className="ft__logo">أورورا</a>
            <p className="ft__tagline">
              منتجات مختارة بعناية، بخامات تدوم وتجربة شراء واضحة من أول خطوة.
            </p>
            <div className="ft__social">
              {SOCIAL.map((s) => (
                <a href="#" key={s.label} className="ft__social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav className="ft__col" key={col.title} aria-label={col.title}>
              <h3 className="ft__col-title">{col.title}</h3>
              {col.links.map((l) => (
                <a href="#" key={l}>{l}</a>
              ))}
            </nav>
          ))}

          <div className="ft__news">
            <h3 className="ft__col-title">النشرة البريدية</h3>
            <p className="ft__news-body">اعرف بالجديد والعروض قبل غيرك.</p>
            <form className="ft__form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="بريدك الإلكتروني" aria-label="بريدك الإلكتروني" required />
              <Button type="submit" variant="primary" size="sm">اشترك</Button>
            </form>
          </div>
        </div>

        <div className="ft__bottom">
          <span className="ft__copy">© {new Date().getFullYear()} أورورا. جميع الحقوق محفوظة.</span>
          <div className="ft__pay">
            {PAYMENTS.map((p) => (
              <span className="ft__pay-item" key={p}>{p}</span>
            ))}
          </div>
          <div className="ft__legal">
            <a href="#">سياسة الخصوصية</a>
            <a href="#">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
