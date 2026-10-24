import HeroSlider, { schema as heroSchema } from './HeroSlider/HeroSlider';
import ShoppableHero, { schema as shoppableSchema } from './ShoppableHero/ShoppableHero';
import Marquee, { schema as marqueeSchema } from './Marquee/Marquee';
import Categories, { schema as categoriesSchema } from './Categories/Categories';
import EditorialCards, { schema as editorialSchema } from './EditorialCards/EditorialCards';
import ProductCards, { schema as productCardsSchema } from './ProductCards/ProductCards';
import FeaturedProduct, { schema as featuredSchema } from './FeaturedProduct/FeaturedProduct';
import StoreStats, { schema as statsSchema } from './StoreStats/StoreStats';
import BrandTimeline, { schema as timelineSchema } from './BrandTimeline/BrandTimeline';
import AboutUs, { schema as aboutSchema } from './AboutUs/AboutUs';
import Testimonials, { schema as testimonialsSchema } from './Testimonials/Testimonials';
import Faq, { schema as faqSchema } from './Faq/Faq';

/**
 * SECTION REGISTRY
 * ------------------------------------------------------------------
 * المصدر الوحيد اللي بيربط `type` بـ component.
 *
 * عشان تضيف section جديد:
 *   1. اعمل مجلد جديد تحت src/sections/
 *   2. صدّر default component + named export اسمه `schema`
 *   3. سجّله هنا
 *   4. ضيفه في src/data/homepage.js
 *
 * مفيش أي ملف تاني محتاج يتعدّل. ومفيش section بيـ import section تاني.
 */
export const SECTION_REGISTRY = {
  'hero-slider': { component: HeroSlider, schema: heroSchema },
  'shoppable-hero': { component: ShoppableHero, schema: shoppableSchema },
  'announcement-marquee': { component: Marquee, schema: marqueeSchema },
  categories: { component: Categories, schema: categoriesSchema },
  'editorial-cards': { component: EditorialCards, schema: editorialSchema },
  'product-cards': { component: ProductCards, schema: productCardsSchema },
  'featured-product': { component: FeaturedProduct, schema: featuredSchema },
  'store-stats': { component: StoreStats, schema: statsSchema },
  'brand-timeline': { component: BrandTimeline, schema: timelineSchema },
  'about-us': { component: AboutUs, schema: aboutSchema },
  testimonials: { component: Testimonials, schema: testimonialsSchema },
  faq: { component: Faq, schema: faqSchema },
};

export const getSection = (type) => SECTION_REGISTRY[type] ?? null;

export const listSectionTypes = () =>
  Object.entries(SECTION_REGISTRY).map(([type, entry]) => ({
    type,
    label: entry.schema?.label ?? type,
  }));
