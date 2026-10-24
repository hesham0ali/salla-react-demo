import { motion } from 'framer-motion';
import { VIEWPORT, fadeUp, fadeIn, zoomIn, stagger, staggerItem } from './motion';

const VARIANTS = { fadeUp, fadeIn, zoomIn };

/**
 * <Reveal> — الغلاف الوحيد اللي أي section بيستخدمه عشان يـ animate.
 * self-contained بالكامل: IntersectionObserver خاص بيه عن طريق whileInView.
 *
 * @param {'fadeUp'|'fadeIn'|'zoomIn'} variant
 * @param {number} delay - تأخير بالثواني
 * @param {string} as - العنصر المرسوم (div افتراضيًا)
 */
export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  as = 'div',
  className,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  const base = VARIANTS[variant] ?? fadeUp;

  const variants = {
    hidden: base.hidden,
    visible: {
      ...base.visible,
      transition: { ...base.visible.transition, delay },
    },
  };

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * <RevealGroup> + <RevealItem> — لما يكون عندك list/grid عايز يظهر بالتتابع.
 */
export function RevealGroup({
  children,
  delayChildren = 0,
  staggerChildren = 0.08,
  as = 'div',
  className,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={stagger(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, as = 'div', className, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} variants={staggerItem} {...rest}>
      {children}
    </Tag>
  );
}
