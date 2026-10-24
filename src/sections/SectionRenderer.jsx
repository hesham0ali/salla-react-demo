import { Component } from 'react';
import { getSection } from './registry';

/**
 * Error boundary لكل section على حدة.
 * لو section وقع، الباقي بيفضل شغّال — ده شرط أساسي للاستقلالية.
 */
class SectionBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error(`[section:${this.props.type}]`, error);
  }

  render() {
    if (this.state.failed) {
      if (!import.meta.env.DEV) return null;
      return (
        <div
          style={{
            padding: 'var(--space-8)',
            textAlign: 'center',
            background: 'var(--color-accent-subtle)',
            color: 'var(--color-accent-hover)',
            fontSize: 'var(--text-sm)',
          }}
        >
          فشل تحميل القسم: <code>{this.props.type}</code>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * بيحوّل section instance واحد إلى component.
 * ملاحظة: مفيش index ولا siblings بتتمرّر — القسم مش بيعرف مكانه في الصفحة.
 */
export function SectionRenderer({ section }) {
  const entry = getSection(section.type);

  if (!entry) {
    if (import.meta.env.DEV) {
      console.warn(`[SectionRenderer] نوع غير مسجّل: "${section.type}"`);
    }
    return null;
  }

  const SectionComponent = entry.component;
  const settings = { ...(entry.schema?.defaults ?? {}), ...(section.settings ?? {}) };

  return (
    <SectionBoundary type={section.type}>
      <SectionComponent id={section.id} settings={settings} data={section.data ?? {}} />
    </SectionBoundary>
  );
}

/** بيرسم الصفحة كلها من الـ config array */
export function SectionList({ sections }) {
  return sections.map((section) => <SectionRenderer key={section.id} section={section} />);
}
