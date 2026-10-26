import { Badge } from "#/components/ui/badge";
import { formatPrice } from "#/lib/format";
import type { PriceQuote } from "#/model-groups";

export function TagList({
  values,
  formatLabel = (value: string) => value,
}: {
  values: string[];
  formatLabel?: (value: string) => string;
}) {
  if (values.length === 0) {
    return <span className="text-muted-foreground">-</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {values.map((value) => (
        <Badge key={value} variant="secondary">
          {formatLabel(value)}
        </Badge>
      ))}
    </div>
  );
}

export function PriceQuoteValue({
  quote,
}: {
  quote?: PriceQuote;
}) {
  if (!quote) {
    return "-";
  }

  return (
    <>
      {formatPrice(quote.price)}
      <span className="text-sm font-normal text-muted-foreground">
        {" "}
        via {quote.providerName}
      </span>
    </>
  );
}
