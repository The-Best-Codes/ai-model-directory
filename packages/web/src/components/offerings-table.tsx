"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconArrowDown,
  IconArrowUp,
  IconArrowsUpDown,
} from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import { formatPrice, formatTokenCount } from "#/lib/format";

export type OfferingRow = {
  providerId: string;
  providerName: string;
  modelId: string;
  input?: number;
  output?: number;
  cacheRead?: number;
  context?: number;
  outputLimit?: number;
};

type SortKey = Exclude<keyof OfferingRow, "providerId">;

type Sorting = {
  key: SortKey;
  direction: "asc" | "desc";
};

const columns: {
  key: SortKey;
  label: string;
  format?: (value?: number) => string;
}[] = [
  { key: "providerName", label: "Provider" },
  { key: "modelId", label: "Model ID" },
  { key: "input", label: "Input ($/M)", format: formatPrice },
  { key: "output", label: "Output ($/M)", format: formatPrice },
  { key: "cacheRead", label: "Cache Read ($/M)", format: formatPrice },
  { key: "context", label: "Context", format: formatTokenCount },
  { key: "outputLimit", label: "Output Limit", format: formatTokenCount },
];

function compareValues(
  a: string | number | undefined,
  b: string | number | undefined,
) {
  if (a === b) {
    return 0;
  }

  if (a === undefined) {
    return 1;
  }

  if (b === undefined) {
    return -1;
  }

  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  return a < b ? -1 : 1;
}

function sortRows(rows: OfferingRow[], sorting: Sorting | undefined) {
  if (!sorting) {
    return rows;
  }

  const direction = sorting.direction === "asc" ? 1 : -1;

  return rows.toSorted((a, b) => {
    const valueA = a[sorting.key];
    const valueB = b[sorting.key];

    if (valueA === undefined || valueB === undefined) {
      return compareValues(valueA, valueB);
    }

    return compareValues(valueA, valueB) * direction;
  });
}

function nextSorting(current: Sorting | undefined, key: SortKey) {
  if (current?.key !== key) {
    return { key, direction: "asc" } satisfies Sorting;
  }

  return current.direction === "asc"
    ? ({ key, direction: "desc" } satisfies Sorting)
    : undefined;
}

export function OfferingsTable({ rows }: { rows: OfferingRow[] }) {
  const [sorting, setSorting] = React.useState<Sorting>();
  const sortedRows = React.useMemo(
    () => sortRows(rows, sorting),
    [rows, sorting],
  );

  return (
    <div className="rounded-md border tabular-nums">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const direction =
                sorting?.key === column.key ? sorting.direction : undefined;

              return (
                <TableHead
                  key={column.key}
                  aria-sort={
                    direction === "asc"
                      ? "ascending"
                      : direction === "desc"
                        ? "descending"
                        : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSorting((current) => nextSorting(current, column.key))
                    }
                    className="inline-flex items-center gap-1"
                  >
                    {column.label}
                    {direction === "asc" ? (
                      <IconArrowUp className="size-3" />
                    ) : direction === "desc" ? (
                      <IconArrowDown className="size-3" />
                    ) : (
                      <IconArrowsUpDown className="size-3 text-muted-foreground" />
                    )}
                  </button>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow key={`${row.providerId}/${row.modelId}`}>
              <TableCell>
                <Link href={`/providers/${row.providerId}`}>
                  {row.providerName}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {row.modelId}
              </TableCell>
              {columns.slice(2).map((column) => (
                <TableCell key={column.key}>
                  {column.format?.(row[column.key] as number | undefined)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
