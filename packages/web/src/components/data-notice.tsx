import type { ReactNode } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";

export function DataNotice({ children }: { children: ReactNode }) {
  return (
    <aside className="flex gap-2 rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
      <IconAlertTriangle className="mt-0.5 size-4 shrink-0" />
      <p>{children}</p>
    </aside>
  );
}
