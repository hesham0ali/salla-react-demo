import { useState } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { SectionList } from './sections/SectionRenderer';
import { homepageSections } from './data/homepage';
import SectionOrderPanel from './dev/SectionOrderPanel';

export default function App() {
  // في المنصة الـ array ده هييجي من إعدادات التاجر.
  // هنا state محلي عشان نقدر نجرّب إعادة الترتيب live.
  const [sections, setSections] = useState(homepageSections);

  return (
    <>
      <Header />
      <main>
        <SectionList sections={sections.filter((s) => !s.hidden)} />
      </main>
      <Footer />
      {import.meta.env.DEV && (
        <SectionOrderPanel sections={sections} onChange={setSections} />
      )}
    </>
  );
}
