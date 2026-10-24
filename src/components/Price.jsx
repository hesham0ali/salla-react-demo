export function Price({ now, was, currency = 'ر.س' }) {
  return (
    <span className="ui-price">
      <span className="ui-price__now">
        {now} {currency}
      </span>
      {was && (
        <span className="ui-price__was">
          {was} {currency}
        </span>
      )}
    </span>
  );
}
