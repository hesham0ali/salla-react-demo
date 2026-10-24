import { Button } from '../components/ui';
import './Footer.css';

const COLUMNS = [
  { title: 'تسوّق', links: ['وصل حديثًا', 'الأكثر مبيعًا', 'العروض', 'بطاقات الهدايا'] },
  { title: 'المساعدة', links: ['الشحن والتوصيل', 'الإرجاع والاستبدال', 'تتبّع الطلب', 'الأسئلة الشائعة'] },
  { title: 'المتجر', links: ['من نحن', 'فروعنا', 'الوظائف', 'تواصل معنا'] },
];

const PAYMENTS = ['Mada', 'Visa', 'Mastercard', 'Apple Pay', 'Tabby'];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="container">
        <div className="ft__top">
          <div className="ft__brand">
            <span className="ft__logo">أورورا</span>
            <p className="ft__tagline">
              منتجات مختارة بعناية، بخامات تدوم وتجربة شراء واضحة من أول خطوة.
            </p>
            <div className="ft__social">
              {['انستقرام', 'تويتر', 'تيك توك', 'سناب'].map((s) => (
                <a href="#" key={s}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav className="ft__col" key={col.title} aria-label={col.title}>
              <h3 className="ft__col-title">{col.title}</h3>
              {col.links.map((l) => (
                <a href="#" key={l}>
                  {l}
                </a>
              ))}
            </nav>
          ))}

          <div className="ft__news">
            <h3 className="ft__col-title">النشرة البريدية</h3>
            <p className="ft__news-body">اعرف بالجديد والعروض قبل غيرك.</p>
            <form className="ft__form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="بريدك الإلكتروني" aria-label="بريدك الإلكتروني" required />
              <Button type="submit" variant="primary" size="sm">
                اشترك
              </Button>
            </form>
          </div>
        </div>

        <div className="ft__bottom">
          <span className="ft__copy">© {new Date().getFullYear()} أورورا. جميع الحقوق محفوظة.</span>
          <div className="ft__pay">
            {PAYMENTS.map((p) => (
              <span className="ft__pay-item" key={p}>
                {p}
              </span>
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
