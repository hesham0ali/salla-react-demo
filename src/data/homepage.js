import { products, featuredProduct, categories } from './products';

const img = (seed, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/**
 * HOMEPAGE CONFIG
 * ------------------------------------------------------------------
 * الصفحة الرئيسية = array مرتّب من section instances.
 * كل عنصر: { id, type, settings, data }
 *
 *  - `type`      → بيـ resolve لـ component من registry.js
 *  - `settings`  → الإعدادات اللي هتظهر للتاجر في لوحة التحكم (schema)
 *  - `data`      → mock data (هتتبدل بـ API response عند النقل للمنصة)
 *
 * لتغيير الترتيب: غيّر ترتيب العناصر في الـ array — وبس.
 * مفيش أي section بيعرف مين قبله أو بعده.
 */
export const homepageSections = [
  {
    id: 'sec-hero',
    type: 'hero-slider',
    settings: { indicatorStyle: 'numbers', indicatorPosition: 'end', autoplay: true, interval: 6000, height: 'tall' },
    data: {
      slides: [
        { id: 's1', eyebrow: 'مجموعة الصوتيات', title: 'صوت نقي بتفاصيل لا تُسمع عادة', body: 'سماعات مصمّمة لمن يفرّق بين الجيد والاستثنائي.', cta: { label: 'اكتشف المجموعة', href: '#' }, image: img('hero-audio', 1800, 1000), align: 'start' },
        { id: 's2', eyebrow: 'وصل حديثًا', title: 'تصميم يبقى بعد انتهاء الموسم', body: 'قطع مختارة بخامات تدوم ولا تتبع الموضة السريعة.', cta: { label: 'تسوّق الجديد', href: '#' }, image: img('hero-lifestyle', 1800, 1000), align: 'center' },
        { id: 's3', eyebrow: 'عرض محدود', title: 'خصم حتى 30% على الإكسسوارات', body: 'لفترة محدودة وحتى نفاد الكمية.', cta: { label: 'شاهد العروض', href: '#' }, image: img('hero-sale', 1800, 1000), align: 'start' },
      ],
    },
  },
  {
    id: 'sec-marquee',
    type: 'announcement-marquee',
    settings: { speed: 'normal', direction: 'rtl', theme: 'inverse', size: 'lg' },
    data: {
      items: [
        { text: 'شحن مجاني فوق 300 ريال', image: img('mq-1', 200, 160) },
        { text: 'إرجاع خلال 14 يوم' },
        { text: 'وصل حديثًا: مجموعة الشتاء', image: img('mq-2', 200, 160) },
        { text: 'الدفع عند الاستلام متاح' },
      ],
    },
  },
  {
    id: 'sec-categories',
    type: 'categories',
    settings: { layout: 'tiles', columns: 6, showCount: true },
    data: { title: 'تسوّق حسب التصنيف', subtitle: 'ابدأ من القسم اللي يهمك.', categories },
  },
  {
    id: 'sec-editorial',
    type: 'editorial-cards',
    settings: { layout: 'mosaic' },
    data: {
      title: 'اكتشف المتجر',
      cards: [
        { id: 'e1', size: 'lg', title: 'التقنية', body: 'أحدث ما وصل من أجهزة صوتية.', href: '#', image: img('ed-tech', 1000, 800), theme: 'light' },
        { id: 'e2', size: 'sm', title: 'المعدات', body: 'كل ما تحتاجه لإعداد مساحتك.', href: '#', image: img('ed-gear', 700, 700), theme: 'light' },
        { id: 'e3', size: 'sm', title: 'الإكسسوارات', body: 'تفاصيل صغيرة تصنع الفرق.', href: '#', image: img('ed-acc', 700, 700), theme: 'light' },
        { id: 'e5', size: 'sm', title: 'وصل حديثًا', body: 'أبرز ما أضفناه هذا الموسم.', href: '#', image: img('ed-new', 700, 700), theme: 'light' },
        { id: 'e4', size: 'md', title: 'تجربة مكانية جديدة', body: 'مجموعة مختارة لعشاق التصميم الهادئ.', href: '#', image: null, theme: 'dark', cta: 'تصفّح المنتجات' },
      ],
    },
  },
  {
    id: 'sec-shoppable',
    type: 'shoppable-hero',
    settings: { hotspotStyle: 'plus', action: 'add-to-cart', overlay: 'gradient' },
    data: {
      title: 'بسيط بالتصميم',
      body: 'خامات ناعمة وحركة مريحة — قطع مصمّمة للارتداء المتكرر.',
      cta: { label: 'تسوّق الإطلالة', href: '#' },
      image: img('shop-hero', 1800, 1100),
      hotspots: [
        { id: 'h1', x: 28, y: 46, product: products[0] },
        { id: 'h2', x: 52, y: 38, product: products[2] },
        { id: 'h3', x: 72, y: 58, product: products[5] },
      ],
    },
  },
  {
    id: 'sec-products',
    type: 'product-cards',
    settings: { layout: 'rail', showHoverImage: true, showRating: true, showTags: true },
    data: { title: 'الأكثر مبيعًا', subtitle: 'اختيارات العملاء هذا الشهر.', viewAll: { label: 'كل المنتجات', href: '#' }, products },
  },
  {
    id: 'sec-featured',
    type: 'featured-product',
    settings: { galleryPosition: 'start', showHighlights: true, background: 'muted' },
    data: { eyebrow: 'المنتج المميز', product: featuredProduct },
  },
  {
    id: 'sec-stats',
    type: 'store-stats',
    settings: { showPartners: true, countUp: true },
    data: {
      title: 'إنجازاتنا باختصار',
      stats: [
        { id: 'st1', value: 12, suffix: '', label: 'سنة في السوق' },
        { id: 'st2', value: 5000, suffix: '+', label: 'عميل سعيد' },
        { id: 'st3', value: 30, suffix: '', label: 'علامة تجارية' },
        { id: 'st4', value: 98, suffix: '%', label: 'نسبة رضا العملاء' },
      ],
      partnersTitle: 'نعمل مع علامات نثق بها',
      partnersBody: 'نختار كل علامة بعد تجربة فعلية لمنتجاتها.',
      partners: ['Aurora', 'Nova', 'Pulse', 'Lumo', 'Atelier', 'Mono'],
    },
  },
  {
    id: 'sec-timeline',
    type: 'brand-timeline',
    settings: { layout: 'alternating' },
    data: {
      title: 'قصّتنا',
      subtitle: 'من متجر صغير إلى علامة يثق بها آلاف العملاء.',
      milestones: [
        { id: 'm1', year: '2015', title: 'البداية', body: 'بدأنا بفكرة بسيطة: منتجات مختارة بعناية بدل الكمّ.' },
        { id: 'm2', year: '2018', title: 'أول متجر إلكتروني', body: 'نقلنا التجربة أونلاين مع تركيز على سهولة الشراء.' },
        { id: 'm3', year: '2021', title: 'توسّع إقليمي', body: 'شحن لأكثر من دولة وشراكات مع موردين جدد.' },
        { id: 'm4', year: '2024', title: 'تجربة أذكى', body: 'ترشيحات مخصّصة وشحن أسرع وخدمة عملاء على مدار اليوم.' },
        { id: 'm5', year: '2026', title: 'ما بعد التجارة', body: 'تغليف مستدام وتوسّع في الفئات الجديدة.' },
      ],
    },
  },
  {
    id: 'sec-about',
    type: 'about-us',
    settings: { mediaPosition: 'start' },
    data: {
      eyebrow: 'من نحن',
      title: 'نصمّم ونختار من قلب المدينة',
      body: 'بدأت الفكرة من ورشة صغيرة، وتحوّلت إلى فريق يختبر كل منتج قبل عرضه. نؤمن أن المنتج الجيد لا يحتاج إلى مبالغة في الوصف — يكفي أن يُستخدم مرة واحدة.',
      cta: { label: 'تعرّف علينا', href: '#' },
      images: [img('about-1', 900, 1100), img('about-2', 700, 700)],
    },
  },
  {
    id: 'sec-testimonials',
    type: 'testimonials',
    settings: { style: 'quote', showNav: true },
    data: {
      items: [
        { id: 't1', quote: 'الجودة فاقت توقعاتي بصراحة، والتغليف كان مرتّب بشكل محترم. طلبت تاني بعدها بأسبوع.', author: 'نورة العتيبي', role: 'عميلة منذ 2023' },
        { id: 't2', quote: 'خدمة العملاء ردّت عليّ خلال دقائق وحلّت المشكلة من غير أي تعقيد. ده اللي خلّاني أكمل معاهم.', author: 'خالد الدوسري', role: 'عميل منذ 2021' },
        { id: 't3', quote: 'أفضل تجربة شراء أونلاين مريت بيها من ناحية الوضوح — الأسعار والشحن كل حاجة واضحة من الأول.', author: 'سارة المالكي', role: 'عميلة منذ 2024' },
      ],
    },
  },
  {
    id: 'sec-faq',
    type: 'faq',
    settings: { layout: 'auto', defaultOpen: 0 },
    data: {
      title: 'عندك سؤال؟ إحنا هنا.',
      body: 'تصفّح الأسئلة الأكثر تكرارًا من عملائنا. لو ما لقيت إجابتك، تواصل معنا مباشرة.',
      supportNote: 'خدمة العملاء متاحة من الأحد للخميس: 9ص – 9م',
      avgReply: 'متوسط وقت الرد: 4 ساعات',
      items: [
        { id: 'q1', q: 'هل تشحنون خارج المملكة؟', a: 'نعم، نشحن لمعظم دول الخليج والشرق الأوسط. تُحتسب تكلفة الشحن تلقائيًا في صفحة الدفع حسب الوجهة والوزن.' },
        { id: 'q2', q: 'هل أحتاج حساب لإتمام الطلب؟', a: 'لا، تقدر تطلب كزائر. لكن إنشاء حساب بيخليك تتابع طلباتك وتحفظ عناوينك للمرات الجاية.' },
        { id: 'q3', q: 'هل يتوفر تغليف هدايا؟', a: 'نعم، تقدر تختار التغليف كهدية في صفحة السلة وتضيف رسالة مكتوبة بدون أي تكلفة إضافية.' },
        { id: 'q4', q: 'كم يستغرق وصول الطلب؟', a: 'داخل المدن الرئيسية من 2 إلى 4 أيام عمل، وخارجها من 3 إلى 7 أيام عمل.' },
        { id: 'q5', q: 'ما هي سياسة الإرجاع؟', a: 'تقدر ترجع أي منتج خلال 14 يوم من الاستلام بشرط يكون بحالته الأصلية وبغلافه.' },
      ],
    },
  },
];
