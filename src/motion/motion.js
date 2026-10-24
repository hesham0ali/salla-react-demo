/**
 * MOTION SYSTEM — نظام الحركة الموحّد
 * ------------------------------------------------------------------
 * ده اللي بيخلي الصفحة تحس إنها قطعة واحدة *من غير* ما يبقى فيه
 * أي coupling تقني بين الأقسام.
 *
 * القاعدة: كل section بيـ animate نفسه لما يدخل الـ viewport.
 * مفيش timeline مشترك، مفيش scroll listener عمومي، مفيش section
 * بيعرف حاجة عن اللي قبله أو بعده. لو اتشال أو اتنقل مكانه،
 * الحركة بتفضل شغالة زي ما هي.
 */

export const DURATION = {
  fast: 0.18,
  base: 0.28,
  slow: 0.48,
  slower: 0.72,
};

export const EASE = {
  standard: [0.22, 0.61, 0.36, 1],
  out: [0.16, 1, 0.3, 1],
  in: [0.55, 0.06, 0.68, 0.19],
  spring: [0.34, 1.3, 0.64, 1],
};

/** الإعداد الموحّد لـ whileInView — نقطة واحدة للتحكم */
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' };

/** الحركة الأساسية: ظهور من تحت */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/** ظهور بدون حركة — للعناصر الكبيرة زي الصور */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slower, ease: EASE.standard } },
};

/** تكبير بسيط — للصور داخل إطار */
export const zoomIn = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slower, ease: EASE.out },
  },
};

/** دخول من الجانب — RTL aware: مرِّر dir من useDirection */
export const slideIn = (dir = 'rtl', distance = 40) => ({
  hidden: { opacity: 0, x: dir === 'rtl' ? distance : -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
});

/** الحاوية اللي بتعمل stagger لأبنائها */
export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

/** عنصر داخل stagger container */
export const staggerItem = fadeUp;
