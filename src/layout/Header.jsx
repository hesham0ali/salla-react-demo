import { useEffect, useState } from 'react';
import { Chevron } from '../components/ui';
import './Header.css';

const NAV = [
  { label: 'الرئيسية', href: '#' },
  { label: 'التصنيفات', href: '#', children: ['الصوتيات', 'الساعات', 'الكاميرات', 'الإكسسوارات'] },
  { label: 'وصل حديثًا', href: '#' },
  { label: 'العروض', href: '#' },
  { label: 'من نحن', href: '#' },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className={`hd ${stuck ? 'is-stuck' : ''}`}>
      <div className="hd__bar container">
        <button
          type="button"
          className="hd__burger"
          aria-label="القائمة"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="hd__logo" href="#">
          أورورا
        </a>

        <nav className="hd__nav" aria-label="التنقل الرئيسي">
          {NAV.map((item) => (
            <div className="hd__nav-item" key={item.label}>
              <a href={item.href}>
                {item.label}
                {item.children && <Chevron dir="down" size={12} />}
              </a>
              {item.children && (
                <div className="hd__dropdown">
                  {item.children.map((c) => (
                    <a href="#" key={c}>
                      {c}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hd__actions">
          <button type="button" className="hd__icon" aria-label="بحث">
            <SearchIcon />
          </button>
          <button type="button" className="hd__icon" aria-label="حسابي">
            <UserIcon />
          </button>
          <button type="button" className="hd__icon hd__cart" aria-label="السلة">
            <BagIcon />
            <span className="hd__count">3</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="hd__mobile" aria-label="قائمة الجوال">
          {NAV.map((item) => (
            <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" strokeLinecap="round" />
  </svg>
);

const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
    <path d="M9 8V6a3 3 0 016 0v2" strokeLinecap="round" />
  </svg>
);
