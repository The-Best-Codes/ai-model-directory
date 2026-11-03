import type { DirectoryData } from "#/directory-data";
import { ModelTable } from "#/components/model-table";
import type { ModelSlugOverrides } from "#/model-groups";

export function ListPage({
  directory,
  modelSlugs,
}: {
  directory: DirectoryData;
  modelSlugs: ModelSlugOverrides;
}) {
  return (
    <main className="flex h-[calc(100dvh-3.5rem-1px)] w-full flex-col gap-3 p-3">
      <ModelTable
        directory={directory}
        modelSlugs={modelSlugs}
        title={
          <h1 className="text-xl font-semibold tracking-tight">
            All AI models
          </h1>
        }
      />
    </main>
  );
}
