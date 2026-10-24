# نظام التصميم — Design Tokens

المرجع الموحّد لكل القيم البصرية في الثيم. أي صفحة داخلية (المنتج، التصنيف، السلة، الدفع، الحساب) لازم تبني على القيم دي — مفيش قيمة بصرية تتكتب hard-coded في أي component.

**ملف التنفيذ:** `src/styles/tokens.css`
**الاستخدام:** `var(--token-name)`

---

## 1. القاعدة الأساسية

النظام على طبقتين:

| الطبقة | المثال | الاستخدام |
|---|---|---|
| **Primitive** | `--clr-ink-900` | القيمة الخام. **لا تُستخدم مباشرة في الـ components.** |
| **Semantic** | `--color-text` | الاستخدام الفعلي. بتشاور على primitive. |

ليه؟ لما العميل يغيّر الهوية، بنعدّل الـ primitives أو ربط الـ semantic بيهم — من غير ما نلمس سطر واحد في أي section.

```css
/* ✅ صح */
color: var(--color-text-secondary);
padding: var(--space-6);
border-radius: var(--radius-md);

/* ❌ غلط */
color: #5c636d;
color: var(--clr-ink-600);   /* primitive مباشر */
padding: 24px;
border-radius: 12px;
```

---

## 2. الألوان

### Primitives

| المجموعة | التدرّجات |
|---|---|
| `--clr-ink-*` | `900` `800` `700` `600` `500` `400` `300` `200` `100` `050` — الرمادي/الأسود |
| `--clr-sand-*` | `100` `200` `300` — خلفيات دافئة |
| `--clr-clay-*` | `700` `600` `500` `100` — لون الهوية (Accent) |
| حالات | `--clr-green-600` `--clr-green-100` `--clr-amber-600` `--clr-red-600` `--clr-white` |

> **درجات غير مستخدمة حاليًا:** `--clr-clay-500` · `--clr-ink-050` · `--clr-ink-400` · `--clr-ink-700` · `--clr-sand-300`. موجودة كـ palette reserves لاستخدامها في أقسام مستقبلية أو تخصيصات العميل.

### Semantic

**الخلفيات**

| Token | القيمة | الاستخدام |
|---|---|---|
| `--color-bg` | أبيض | خلفية الصفحة والبطاقات |
| `--color-bg-subtle` | `sand-100` | أقسام متبادلة لفصل بصري خفيف |
| `--color-bg-muted` | `sand-200` | بطاقات داخل قسم، حالات hover |
| `--color-bg-inverse` | `ink-900` | أقسام داكنة، الفوتر، الشريط الإعلاني |

**النص**

| Token | الاستخدام |
|---|---|
| `--color-text` | العناوين والنص الأساسي |
| `--color-text-secondary` | الفقرات والأوصاف |
| `--color-text-muted` | التفاصيل الثانوية (عدد المنتجات، الضريبة) |
| `--color-text-inverse` | النص فوق خلفية داكنة |
| `--color-text-on-accent` | النص فوق لون الهوية |

**الحدود**

`--color-border` · `--color-border-strong` · `--color-border-inverse`

**الهوية والحالات**

| Token | الاستخدام |
|---|---|
| `--color-accent` / `--color-accent-hover` / `--color-accent-subtle` | لون الهوية — الخصومات، الـ eyebrow، التأكيد |
| `--color-primary` / `--color-primary-hover` | أزرار الإجراء الأساسي (أسود) |
| `--color-success` / `--color-success-subtle` | المخزون المتاح، التأكيدات |
| `--color-warning` · `--color-danger` | التنبيهات والأخطاء |
| `--color-overlay` | طبقة التعتيم فوق الصور والـ modals |

> **ملاحظة قرار:** زر الشراء الأساسي أسود (`--color-primary`) مش بلون الهوية — ده يخلي الـ accent محتفظ بقوته للخصومات والتأكيدات بدل ما يتوزّع على كل حاجة. لو العميل عايز العكس، التغيير في سطر واحد.

**Overlay · On-Dark** — طبقات التعتيم والنص فوق الخلفيات الداكنة:

| Token | الشفافية | الاستخدام |
|---|---|---|
| `--color-overlay-strong` | 75% | تعتيم كامل تقريبًا (modals) |
| `--color-overlay` | 55% | البنرات الإعلانية، الصور الكاملة |
| `--color-overlay-soft` | 15% | طبقة خفيفة فوق صور المنتجات |
| `--color-overlay-none` | 0% | بداية gradient شفافة |
| `--color-on-dark-strong` | 75% | حواجز بارزة فوق خلفيات داكنة |
| `--color-on-dark` | 40% | نص ثانوي فوق خلفية داكنة |
| `--color-on-dark-soft` | 14% | حدود خفيفة على الداكن |

**القنوات الخام (RGB)**

| Token | الاستخدام |
|---|---|
| `--rgb-ink` | قنوات `--clr-ink-900` — للاستخدام في `rgb(var(--rgb-ink) / 0.x)` |
| `--rgb-on-dark` | قنوات `--clr-white` — للنص والحدود فوق الداكن |
| `--rgb-clay` | قنوات `--clr-clay-600` — يُستخدم حاليًا في `--shadow-focus` |

**Skeleton / States**

| Token | الاستخدام |
|---|---|
| `--color-skeleton` | خلفية shimmer لحالة التحميل (مُعدّ للاستخدام المستقبلي) |

---

## 3. الخطوط

```css
--font-family-base:    'IBM Plex Sans Arabic', system-ui, sans-serif;
--font-family-display: var(--font-family-base);  /* alias — لو العميل احتاج عائلة خط مختلفة للعناوين */
--font-family-mono:    ui-monospace, 'SFMono-Regular', Menlo, monospace;
```

عربي + لاتيني في عائلة واحدة، بتغطي الأرقام والرموز من غير اختلاف في الشكل. `--font-family-display` alias جاهز لتغيير خط العناوين بشكل مستقل عن الجسم.

**الأوزان:** `--font-weight-light` 300 · `regular` 400 · `medium` 500 · `semibold` 600 · `bold` 700

**المقاسات** — المقاسات الكبيرة `clamp()` فبتتدرّج مع عرض الشاشة تلقائيًا:

| Token | القيمة | الاستخدام |
|---|---|---|
| `--text-2xs` | 11px | الشارات (badges) |
| `--text-xs` | 12px | التفاصيل، التقييم، الفوتر |
| `--text-sm` | 13px | الأزرار، الروابط، نص البطاقات |
| `--text-base` | 15px | النص الافتراضي |
| `--text-md` | 16px | الفقرات التعريفية |
| `--text-lg` | 18px | عناوين فرعية |
| `--text-xl` | 20–22px | عناوين البطاقات |
| `--text-2xl` | 24–30px | عناوين ثانوية |
| `--text-3xl` | 30–40px | **عناوين الأقسام** |
| `--text-4xl` | 36–56px | عنوان البنر الرئيسي |
| `--text-5xl` | 44–80px | العناوين العملاقة |

**ارتفاع السطر:** `--leading-tight` 1.15 (عناوين) · `snug` 1.35 · `normal` 1.6 (افتراضي) · `relaxed` 1.85 (فقرات طويلة)

**تباعد الحروف:** `--tracking-tight` (عناوين كبيرة) · `normal` · `wide` · `wider` (نص uppercase صغير)

---

## 4. المسافات

قاعدة **4px**. الاسم = المضاعف.

`--space-1` 4px · `2` 8px · `3` 12px · `4` 16px · `5` 20px · `6` 24px · `8` 32px · `10` 40px · `12` 48px · `16` 64px · `20` 80px · `24` 96px · `32` 128px

**مسافات الأقسام** — مهمة لشرط الاستقلالية:

| Token | الاستخدام |
|---|---|
| `--section-padding-y` | المسافة الرأسية داخل كل قسم (56–96px) |
| `--section-padding-y-sm` | نسخة مضغوطة |
| `--section-gap-header` | بين عنوان القسم ومحتواه |

> **قاعدة إلزامية:** كل قسم بياخد مسافته بـ `padding` من جوّاه. **ممنوع** `margin` بين الأقسام — لأن ده بيخلي المسافة تعتمد على الجار، والعميل لما يغيّر الترتيب التباعد بيتكسر.

---

## 5. التخطيط

| Token | القيمة |
|---|---|
| `--container-max` | 1320px — العرض الافتراضي |
| `--container-narrow` | 880px — المحتوى النصي (الأسئلة الشائعة، القصة) |
| `--container-wide` | 1600px — الأقسام العريضة |
| `--container-padding` | 16–40px — الهوامش الجانبية |
| `--grid-gutter` | 12–24px — المسافة بين خلايا الشبكة |

**Breakpoints** (مرجع — الـ CSS vars مش بتشتغل جوّه media queries):

| الاسم | العرض | ملاحظة |
|---|---|---|
| `sm` | 480px | |
| `md` | 768px | |
| — | 640px | mobile-landscape — مستخدم في EditorialCards، ProductCards، Categories، EditorialCards mobile |
| — | 900px | مستخدم في About، FAQ، Header، Testimonials |
| `lg` | 1024px | |
| `xl` | 1280px | |
| `2xl` | 1536px | |
| — | 560px | مستخدم في Footer فقط |

الأقسام تستخدم `max-width` (desktop-first) وليس `min-width`. الـ breakpoints على 640px و900px و560px غير مُدرجة في الجدول الرسمي لكنها مستخدمة فعليًا — موثّقة هنا كمرجع.

---

## 6. الحواف والزوايا

| Token | القيمة | الاستخدام |
|---|---|---|
| `--radius-none` | 0 | إلغاء الحواف (صور كاملة الحافة) |
| `--radius-xs` | 4px | عناصر صغيرة |
| `--radius-sm` | 8px | الصور المصغّرة |
| `--radius-md` | 12px | **البطاقات** (`--card-radius`) |
| `--radius-lg` | 18px | الحاويات الكبيرة |
| `--radius-xl` | 26px | الأقسام ذات الخلفية |
| `--radius-2xl` | 36px | عناصر بارزة (مُعدّ للاستخدام) |
| `--radius-pill` | 999px | **الأزرار** (`--control-radius`) |
| `--radius-circle` | 50% | الأفاتار، نقاط التفاعل |

**الحدود:** `--border-width` 1px · `--border-width-thick` 2px
**مختصرات جاهزة:** `--border` · `--border-strong` · `--border-inverse`

---

## 7. الظلال

| Token | الاستخدام |
|---|---|
| `--shadow-xs` | فصل خفيف جدًا |
| `--shadow-sm` | البطاقات في حالة السكون |
| `--shadow-md` | hover على البطاقات |
| `--shadow-lg` | القوائم المنسدلة، البطاقات العائمة |
| `--shadow-focus` | حلقة التركيز (keyboard focus) |

---

## 8. الحركة

| Token | القيمة | الاستخدام |
|---|---|---|
| `--duration-instant` | 100ms | تغيّر فوري |
| `--duration-fast` | 180ms | hover، تغيير لون |
| `--duration-base` | 280ms | فتح/غلق، انتقالات |
| `--duration-slow` | 480ms | ظهور العناصر |
| `--duration-slower` | 720ms | الصور والبنرات |

**منحنيات:** `--ease-standard` (افتراضي) · `--ease-out` (دخول) · `--ease-in` (خروج) · `--ease-spring` (ارتداد خفيف)

**حركة الظهور:** `--reveal-distance` 24px · `--reveal-stagger` 0.08s

المقابل في JS موجود في `src/motion/motion.js` — نفس القيم بالظبط عشان Framer Motion و CSS يفضلوا متطابقين.

> `prefers-reduced-motion` متعامَل معاه: كل المدد بتتحوّل لـ 1ms والمسافات لـ 0. مفيش component محتاج يتعامل مع ده بنفسه.

---

## 9. الطبقات (z-index)

`--z-base` 0 · `--z-raised` 10 · `--z-sticky` 100 · `--z-header` 200 · `--z-overlay` 300 · `--z-modal` 400 · `--z-toast` 500

> ممنوع أي `z-index` برقم مباشر. أي تعارض في الطبقات بيتحل من هنا.

---

## 10. تokens المكوّنات

| Token | القيمة |
|---|---|
| `--control-height-sm` / `-md` / `-lg` | 36 / 44 / 54px |
| `--control-padding-x` | 24px |
| `--control-radius` | pill |
| `--card-radius` / `--card-bg` / `--card-border` | 12px / أبيض / حد 1px |
| `--header-height` / `--header-height-compact` | 72 / 60px |
| `--media-bg` | placeholder داكن خلف الصور full-bleed قبل التحميل |
| `--media-placeholder` | النهاية الفاتحة لـ gradient الـ loading skeleton |

> **ملاحظة:** `--card-bg` معرَّف في `tokens.css` لكنه غير مستخدم حاليًا — الأقسام تستخدم `--color-bg` مباشرة. التوحيد عليه مؤجَّل.

---

## 11. تغيير الهوية البصرية

لتبديل هوية العميل بالكامل، التعديل في `tokens.css` بس:

```css
:root {
  /* 1. لون الهوية */
  --clr-clay-600: #0f766e;   /* الأساسي */
  --clr-clay-700: #115e59;   /* hover */
  --clr-clay-100: #e0f2f1;   /* خلفية خفيفة */

  /* 2. الخط (مع تحديث الـ link في index.html) */
  --font-family-base: 'Tajawal', system-ui, sans-serif;

  /* 3. حدّة الزوايا — مثال: ثيم حاد */
  --radius-md: 2px;
  --control-radius: 2px;
}
```

مفيش ملف تاني محتاج يتعدّل.

---

## 12. عند النقل لمنصة سلة

- `tokens.css` بيتنقل كما هو — CSS variables مدعومة بالكامل.
- الـ tokens اللي المتجر لازم يقدر يغيّرها من لوحة التحكم (لون الهوية، الخط، الزوايا) بتتحوّل لـ theme settings وبتتحقن في `:root` عند الـ render.
- الباقي يفضل ثابت في الملف — مش كل قيمة لازم تبقى قابلة للتعديل من اللوحة، ده بيضيّع تماسك التصميم.
