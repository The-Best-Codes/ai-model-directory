import type { DirectoryData } from "#/directory-data";
import { ModelTable } from "#/components/model-table";

export function ListPage({ directory }: { directory: DirectoryData }) {
  return (
    <main className="flex h-[calc(100dvh-3.5rem-1px)] w-full flex-col gap-3 p-3">
      <ModelTable directory={directory} />
    </main>
  );
}
