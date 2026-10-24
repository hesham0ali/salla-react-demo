# ثيم المتجر — نموذج أولي (React)

نموذج للصفحة الرئيسية مبني بـ React + Vite + Framer Motion، RTL افتراضي، كل البيانات mock.
الهدف: تقريب الفكرة بصريًا قبل النقل لمنصة سلة.

## التشغيل

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

> خط `IBM Plex Sans Arabic` بيتحمّل من Google Fonts، والصور placeholder من `picsum.photos` — محتاج اتصال إنترنت أول تشغيل.

---

## المبدأ المعماري: كل قسم مستقل

الشرط اللي محكوم بيه المشروع: التاجر على المنصة هيقدر يغيّر ترتيب الأقسام أو يخفي أي واحد منها — ولازم مفيش حاجة تتأثر.

عشان كده:

```
الصفحة الرئيسية  =  array من section instances
                   ↓
            SectionRenderer
                   ↓
            registry (type → component)
```

**القواعد المطبّقة:**

| القاعدة | التنفيذ |
|---|---|
| مفيش قسم بيعرف ترتيبه | الـ `SectionRenderer` بيمرّر `settings` و`data` بس — مفيش `index` ولا `siblings` |
| مفيش قسم بيـ import قسم تاني | الـ components المشتركة كلها في `src/components/` |
| مفيش اعتماد على الجار في CSS | كل قسم بياخد مسافته بـ `padding` من جوّاه — **ممنوع margin بين الأقسام**، وممنوع `:nth-child` أو `+`/`~` على مستوى الأقسام |
| مفيش state مشترك | كل قسم بيدير حالته محليًا |
| قسم بيقع ≠ الصفحة بتقع | `SectionBoundary` (error boundary) حوالين كل قسم |
| الحركة مستقلة | كل قسم بيـ animate نفسه بـ `whileInView` — مفيش timeline عام |

**الترابط البصري** بييجي من نظام حركة موحّد (`src/motion/`) — نفس المدد والمنحنيات وأسلوب الدخول — مش من ربط تقني بين الأقسام.

### جرّبها بنفسك

شغّل `npm run dev` وافتح لوحة **"ترتيب الأقسام"** تحت على الشمال: غيّر الترتيب، أو اضغط "ترتيب عشوائي"، أو أخفِ أي قسم. الصفحة بتفضل سليمة. اللوحة dev-only وبتتشال عند النقل.

---

## هيكل المشروع

```
src/
├── styles/
│   ├── tokens.css          ← كل القيم البصرية (انظر docs/design-tokens.md)
│   └── base.css            ← reset + layout primitives
├── motion/
│   ├── motion.js           ← المدد والمنحنيات والـ variants
│   └── Reveal.jsx          ← <Reveal> / <RevealGroup> / <RevealItem>
├── components/
│   ├── ui.jsx              ← Button, SectionHead, Media, Badge, Price, Rating, useRail
│   └── ui.css
├── layout/
│   ├── Header.jsx          ← مستقل عن الأقسام
│   └── Footer.jsx
├── sections/
│   ├── registry.js         ← type → component
│   ├── SectionRenderer.jsx ← الراسم + error boundary
│   └── <SectionName>/
│       ├── <SectionName>.jsx    ← default export + named export `schema`
│       └── <SectionName>.css
├── data/
│   ├── homepage.js         ← ترتيب الأقسام + إعداداتها + بياناتها
│   └── products.js
└── dev/
    └── SectionOrderPanel.jsx    ← dev-only
```

---

## الأقسام (12)

| # | النوع (`type`) | القسم |
|---|---|---|
| 1 | `hero-slider` | البنر الرئيسي — سلايدر (مؤشر: نقاط / أرقام / progress، وموضعه قابل للتغيير) |
| 2 | `announcement-marquee` | الشريط الإعلاني المتحرك |
| 3 | `categories` | **التصنيفات** (دوائر / بلاطات / شريط) |
| 4 | `editorial-cards` | بطاقات اكتشاف المنتجات والتصنيفات (mosaic) |
| 5 | `shoppable-hero` | البنر التفاعلي — نقاط على المنتجات داخل الصورة |
| 6 | `product-cards` | بطاقات المنتجات (تبديل الصورة عند hover) |
| 7 | `featured-product` | المنتج المميز (معرض + خيارات + إضافة للسلة) |
| 8 | `store-stats` | أرقام المتجر والشراكات (عدّاد متحرك) |
| 9 | `brand-timeline` | رحلة العلامة التجارية |
| 10 | `about-us` | نبذة عن العلامة |
| 11 | `testimonials` | آراء العملاء |
| 12 | `faq` | الأسئلة الشائعة (عمودين، أو متوسّطة لو مفيش محتوى تعريفي) |

كل قسم بيـ export `schema` فيه إعداداته بشكل مقارب لـ section settings في سلة — عشان الترجمة بعدين تبقى ميكانيكية مش إعادة كتابة.

---

## إضافة قسم جديد

1. مجلد جديد تحت `src/sections/`
2. `export default` للـ component + `export const schema`
3. سجّله في `src/sections/registry.js`
4. ضيفه في `src/data/homepage.js`

مفيش ملف تاني محتاج يتعدّل.

---

## حدود النموذج

- **mock data** — مفيش API؛ `data/` بيحاكي شكل الـ response المتوقع.
- السلة والبحث والحساب **واجهة بس** — مفيش منطق وراهم.
- الصور placeholder خارجية.
- اللوحة الجانبية dev-only ومش جزء من الثيم.

---

## القرارات المفتوحة للمراجعة

1. **لوحة الألوان والخط** اختيار مبدئي (محايد editorial + IBM Plex Sans Arabic) — التغيير من `tokens.css` بس.
2. **البنر الرئيسي** عنده 3 أشكال مؤشر و3 ارتفاعات؛ محتاج نثبّت الافتراضي.
3. **زر الشراء أسود** مش بلون الهوية — القرار والسبب مشروحين في `docs/design-tokens.md § 2`.
4. **الـ Shoppable Hero** مطبّق بـ "إضافة للسلة" مباشرة؛ البديل "عرض المنتج". محتاج قرار.
