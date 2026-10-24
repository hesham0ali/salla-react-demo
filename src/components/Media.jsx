import { useState } from 'react';

const cx = (...parts) => parts.filter(Boolean).join(' ');

export function Media({ src, alt = '', ratio = '100%', className, imgClassName, children }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cx('ui-media', className)} style={{ '--ui-media-ratio': ratio }}>
      {!failed && src && (
        <img
          className={cx('ui-media__img', imgClassName)}
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {children}
    </div>
  );
}
