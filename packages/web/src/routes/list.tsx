import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	type ColumnDef,
	type HeaderContext,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	IconArrowDown,
	IconArrowUp,
	IconArrowsUpDown,
	IconInfoCircle,
	IconSearch,
} from "@tabler/icons-react";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";

export const Route = createFileRoute("/list")({
	loader: async () => {
		const response = await fetch(
			"https://raw.githubusercontent.com/The-Best-Codes/ai-model-directory/main/data/all.min.json",
			{ headers: { accept: "application/json" } },
		);

		if (!response.ok) {
			throw new Error(`Failed to load model directory: ${response.status}`);
		}

		return response.json() as Promise<DirectoryData>;
	},
	component: ListPage,
});

const ROW_HEIGHT = 56;
const OVERSCAN = 10;

type DirectoryData = Record<string, ProviderRecord>;

type ProviderRecord = {
	id: string;
	name?: string;
	website?: string;
	apiBaseUrl?: string;
	aiSdk?: {
		npmPackage?: string;
		defaultApiKeyEnv?: string[];
	};
	models: Record<string, ModelRecord>;
};

type ModelRecord = {
	id: string;
	name?: string;
	knowledge_cutoff?: string;
	release_date?: string;
	last_updated?: string;
	open_weights?: boolean;
	features?: {
		attachment?: boolean;
		reasoning?: boolean;
		tool_call?: boolean;
		structured_output?: boolean;
		temperature?: boolean;
	};
	pricing?: {
		input?: number;
		output?: number;
		reasoning?: number;
		cache_read?: number;
		cache_write?: number;
		input_audio?: number;
		output_audio?: number;
	};
	limit?: {
		context?: number;
		input?: number;
		output?: number;
	};
	modalities?: {
		input?: string[];
		output?: string[];
	};
};

type ModelRow = {
	providerId: string;
	providerName: string;
	providerWebsite?: string;
	providerApiBaseUrl?: string;
	providerSdkPackage?: string;
	providerApiKeyEnv: string[];
	modelId: string;
	modelName: string;
	pricingInput?: number;
	pricingOutput?: number;
	pricingReasoning?: number;
	pricingCacheRead?: number;
	pricingCacheWrite?: number;
	pricingInputAudio?: number;
	pricingOutputAudio?: number;
	limitContext?: number;
	limitInput?: number;
	limitOutput?: number;
	releaseDate?: string;
	lastUpdated?: string;
	knowledgeCutoff?: string;
	openWeights?: boolean;
	features: string[];
	modalitiesInput: string[];
	modalitiesOutput: string[];
	searchText: string;
};

const columnDescriptions = {
	providerName: "The model provider or platform.",
	modelName: "The model display name and its API identifier.",
	providerSdkPackage:
		"The provider package name exposed through the AI SDK integration.",
	providerApiKeyEnv:
		"Environment variables commonly used for this provider's API key.",
	providerApiBaseUrl: "The provider's documented API base URL.",
	pricingInput: "Price per one million input tokens.",
	pricingOutput: "Price per one million output tokens.",
	pricingReasoning:
		"Price per one million reasoning tokens when billed separately.",
	pricingCacheRead:
		"Price per one million cached input tokens read from prompt cache.",
	pricingCacheWrite: "Price per one million tokens written into prompt cache.",
	pricingInputAudio: "Price per one million input audio tokens.",
	pricingOutputAudio: "Price per one million output audio tokens.",
	limitContext: "Maximum total context window in tokens.",
	limitInput: "Maximum input tokens accepted in one request.",
	limitOutput: "Maximum output tokens generated in one response.",
	releaseDate: "Model release date from the directory metadata.",
	lastUpdated: "Most recent model metadata update timestamp.",
	knowledgeCutoff: "Knowledge cutoff timestamp for the model.",
	openWeights: "Whether the model weights are publicly available.",
	features: "Supported product features and capabilities.",
	modalitiesInput: "Supported input modalities for this model.",
	modalitiesOutput: "Supported output modalities for this model.",
} as const;

function buildHeader<TValue>(label: string, description: string) {
	return ({ column }: HeaderContext<ModelRow, TValue>) => (
		<ColumnHeader
			label={label}
			description={description}
			canSort={column.getCanSort()}
			isSorted={column.getIsSorted()}
			onToggle={column.getToggleSortingHandler()}
		/>
	);
}

const columns: ColumnDef<ModelRow>[] = [
	{
		id: "providerName",
		header: buildHeader("Provider", columnDescriptions.providerName),
		accessorFn: (row: ModelRow) => row.providerName,
		size: 180,
		cell: ({ row }) => {
			const { providerName, providerWebsite } = row.original;

			if (!providerWebsite) {
				return providerName;
			}

			return (
				<a href={providerWebsite} target="_blank" rel="noreferrer">
					{providerName}
				</a>
			);
		},
	},
	{
		id: "modelName",
		header: buildHeader("Model", columnDescriptions.modelName),
		accessorFn: (row: ModelRow) => row.modelName,
		size: 240,
		cell: ({ row }) => (
			<div>
				<div>{row.original.modelName}</div>
				<div className="text-sm text-muted-foreground">
					{row.original.modelId}
				</div>
			</div>
		),
	},
	{
		id: "pricingInput",
		header: buildHeader("Input ($/M)", columnDescriptions.pricingInput),
		accessorFn: (row: ModelRow) => row.pricingInput,
		size: 132,
		cell: ({ row }) => formatPrice(row.original.pricingInput),
	},
	{
		id: "pricingOutput",
		header: buildHeader("Output ($/M)", columnDescriptions.pricingOutput),
		accessorFn: (row: ModelRow) => row.pricingOutput,
		size: 144,
		cell: ({ row }) => formatPrice(row.original.pricingOutput),
	},
	{
		id: "pricingReasoning",
		header: buildHeader("Reasoning ($/M)", columnDescriptions.pricingReasoning),
		accessorFn: (row: ModelRow) => row.pricingReasoning,
		size: 166,
		cell: ({ row }) => formatPrice(row.original.pricingReasoning),
	},
	{
		id: "pricingCacheRead",
		header: buildHeader(
			"Cache Read ($/M)",
			columnDescriptions.pricingCacheRead,
		),
		accessorFn: (row: ModelRow) => row.pricingCacheRead,
		size: 178,
		cell: ({ row }) => formatPrice(row.original.pricingCacheRead),
	},
	{
		id: "pricingCacheWrite",
		header: buildHeader(
			"Cache Write ($/M)",
			columnDescriptions.pricingCacheWrite,
		),
		accessorFn: (row: ModelRow) => row.pricingCacheWrite,
		size: 178,
		cell: ({ row }) => formatPrice(row.original.pricingCacheWrite),
	},
	{
		id: "pricingInputAudio",
		header: buildHeader("Audio In ($/M)", columnDescriptions.pricingInputAudio),
		accessorFn: (row: ModelRow) => row.pricingInputAudio,
		size: 160,
		cell: ({ row }) => formatPrice(row.original.pricingInputAudio),
	},
	{
		id: "pricingOutputAudio",
		header: buildHeader(
			"Audio Out ($/M)",
			columnDescriptions.pricingOutputAudio,
		),
		accessorFn: (row: ModelRow) => row.pricingOutputAudio,
		size: 160,
		cell: ({ row }) => formatPrice(row.original.pricingOutputAudio),
	},
	{
		id: "limitContext",
		header: buildHeader("Context", columnDescriptions.limitContext),
		accessorFn: (row: ModelRow) => row.limitContext,
		size: 140,
		cell: ({ row }) => formatTokenCount(row.original.limitContext),
	},
	{
		id: "limitInput",
		header: buildHeader("Input Limit", columnDescriptions.limitInput),
		accessorFn: (row: ModelRow) => row.limitInput,
		size: 140,
		cell: ({ row }) => formatTokenCount(row.original.limitInput),
	},
	{
		id: "limitOutput",
		header: buildHeader("Output Limit", columnDescriptions.limitOutput),
		accessorFn: (row: ModelRow) => row.limitOutput,
		size: 150,
		cell: ({ row }) => formatTokenCount(row.original.limitOutput),
	},
	{
		id: "features",
		header: buildHeader("Features", columnDescriptions.features),
		accessorFn: (row: ModelRow) => row.features.join(", "),
		size: 220,
		cell: ({ row }) => <TagList values={row.original.features} />,
	},
	{
		id: "modalitiesInput",
		header: buildHeader("Input Modalities", columnDescriptions.modalitiesInput),
		accessorFn: (row: ModelRow) => row.modalitiesInput.join(", "),
		size: 180,
		cell: ({ row }) => (
			<TagList
				values={row.original.modalitiesInput}
				formatLabel={formatBadgeLabel}
			/>
		),
	},
	{
		id: "modalitiesOutput",
		header: buildHeader(
			"Output Modalities",
			columnDescriptions.modalitiesOutput,
		),
		accessorFn: (row: ModelRow) => row.modalitiesOutput.join(", "),
		size: 180,
		cell: ({ row }) => (
			<TagList
				values={row.original.modalitiesOutput}
				formatLabel={formatBadgeLabel}
			/>
		),
	},
	{
		id: "releaseDate",
		header: buildHeader("Release", columnDescriptions.releaseDate),
		accessorFn: (row: ModelRow) => row.releaseDate,
		size: 140,
		cell: ({ row }) => formatUnixDate(row.original.releaseDate),
	},
	{
		id: "lastUpdated",
		header: buildHeader("Updated", columnDescriptions.lastUpdated),
		accessorFn: (row: ModelRow) => row.lastUpdated,
		size: 140,
		cell: ({ row }) => formatUnixDate(row.original.lastUpdated),
	},
	{
		id: "knowledgeCutoff",
		header: buildHeader("Cutoff", columnDescriptions.knowledgeCutoff),
		accessorFn: (row: ModelRow) => row.knowledgeCutoff,
		size: 140,
		cell: ({ row }) => formatUnixDate(row.original.knowledgeCutoff),
	},
	{
		id: "openWeights",
		header: buildHeader("Open Weights", columnDescriptions.openWeights),
		accessorFn: (row: ModelRow) => row.openWeights,
		size: 150,
		cell: ({ row }) => formatBoolean(row.original.openWeights),
	},
	{
		id: "providerSdkPackage",
		header: buildHeader("SDK", columnDescriptions.providerSdkPackage),
		accessorFn: (row: ModelRow) => row.providerSdkPackage,
		size: 180,
		cell: ({ row }) => row.original.providerSdkPackage ?? "-",
	},
	{
		id: "providerApiKeyEnv",
		header: buildHeader("API Key Env", columnDescriptions.providerApiKeyEnv),
		accessorFn: (row: ModelRow) => row.providerApiKeyEnv.join(", "),
		size: 190,
		cell: ({ row }) => (
			<TagList values={row.original.providerApiKeyEnv} compact />
		),
	},
	{
		id: "providerApiBaseUrl",
		header: buildHeader("API Base", columnDescriptions.providerApiBaseUrl),
		accessorFn: (row: ModelRow) => row.providerApiBaseUrl,
		size: 220,
		cell: ({ row }) => row.original.providerApiBaseUrl ?? "-",
	},
];

function ListPage() {
	const directory = Route.useLoaderData();
	const { modelRows, modelCount, providerCount } = React.useMemo(
		() => buildRows(directory),
		[directory],
	);
	const [search, setSearch] = React.useState("");
	const deferredSearch = React.useDeferredValue(search.trim().toLowerCase());
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const viewportRef = React.useRef<HTMLDivElement | null>(null);
	const [viewportHeight, setViewportHeight] = React.useState(600);
	const [scrollTop, setScrollTop] = React.useState(0);
	const [headerHeight, setHeaderHeight] = React.useState(0);
	const [scrollShadows, setScrollShadows] = React.useState({
		top: false,
		bottom: false,
		left: false,
		right: false,
	});

	const headerObserverRef = React.useRef<ResizeObserver | null>(null);
	const headerRef = React.useCallback(
		(element: HTMLTableSectionElement | null) => {
			headerObserverRef.current?.disconnect();
			headerObserverRef.current = null;

			if (!element) {
				setHeaderHeight(0);
				return;
			}

			setHeaderHeight(element.offsetHeight);
			const observer = new ResizeObserver(() => {
				setHeaderHeight(element.offsetHeight);
			});
			observer.observe(element);
			headerObserverRef.current = observer;
		},
		[],
	);

	React.useEffect(() => {
		const element = viewportRef.current;

		if (!element) {
			return;
		}

		const update = () => {
			setViewportHeight(element.clientHeight);
			setScrollTop(element.scrollTop);
			const threshold = 1;
			setScrollShadows({
				top: element.scrollTop > threshold,
				bottom:
					element.scrollTop + element.clientHeight <
					element.scrollHeight - threshold,
				left: element.scrollLeft > threshold,
				right:
					element.scrollLeft + element.clientWidth <
					element.scrollWidth - threshold,
			});
		};

		update();

		const observer = new ResizeObserver(update);
		observer.observe(element);
		element.addEventListener("scroll", update, { passive: true });

		return () => {
			observer.disconnect();
			element.removeEventListener("scroll", update);
		};
	}, []);

	const filteredRows = React.useMemo(() => {
		if (!deferredSearch) {
			return modelRows;
		}

		return modelRows.filter((row) => row.searchText.includes(deferredSearch));
	}, [deferredSearch, modelRows]);

	const resetScroll = React.useCallback(() => {
		const element = viewportRef.current;

		if (!element) {
			return;
		}

		element.scrollTo({ top: 0, left: 0 });
		setScrollTop(0);
		setScrollShadows((current) => ({
			...current,
			top: false,
			left: false,
		}));
	}, []);

	React.useEffect(() => {
		resetScroll();
	}, [deferredSearch, resetScroll]);

	const table = useReactTable({
		data: filteredRows,
		columns,
		defaultColumn: {
			minSize: 110,
			size: 140,
		},
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const columnSizeVars = React.useMemo(() => {
		const vars: Record<string, string> = {};

		for (const header of table.getFlatHeaders()) {
			vars[`--column-${header.column.id}-size`] = `${header.getSize()}px`;
		}

		return vars as React.CSSProperties;
	}, [table, table.getState().columnSizing, table.getState().columnSizingInfo]);

	const rows = table.getRowModel().rows;
	const totalRows = rows.length;
	const totalHeight = totalRows * ROW_HEIGHT;
	const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
	const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT) + OVERSCAN * 2;
	const end = Math.min(totalRows, start + visibleCount);
	const visibleRows = rows.slice(start, end);
	const topSpacer = start * ROW_HEIGHT;
	const bottomSpacer = Math.max(
		0,
		totalHeight - topSpacer - visibleRows.length * ROW_HEIGHT,
	);
	const visibleColumns = table.getVisibleLeafColumns();

	return (
		<main className="flex h-screen w-full flex-col gap-3 p-3 tabular-nums">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
					<InputGroup className="sm:max-w-md">
						<InputGroupAddon>
							<IconSearch />
						</InputGroupAddon>
						<InputGroupInput
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Search models, providers, features, or modalities"
						/>
					</InputGroup>
					<p className="text-sm text-muted-foreground">
						<span className="sm:hidden">
							{totalRows.toLocaleString()} of {modelCount.toLocaleString()}{" "}
							models
						</span>
						<span className="hidden sm:inline">
							Showing {totalRows.toLocaleString()} of{" "}
							{modelCount.toLocaleString()} models from {providerCount}{" "}
							providers
						</span>
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						onClick={() => {
							setSearch("");
							setSorting([]);
							resetScroll();
						}}
					>
						Reset
					</Button>
					<Button asChild>
						<Link to="/">Home</Link>
					</Button>
				</div>
			</div>

			<div className="relative flex-1 overflow-hidden rounded-md border">
				<div ref={viewportRef} className="h-full w-full overflow-auto">
					{rows.length === 0 ? (
						<div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
							No models match your search.
						</div>
					) : (
						<table
							className="w-max table-fixed caption-bottom text-sm"
							style={{
								...columnSizeVars,
								width: table.getTotalSize(),
							}}
						>
							<colgroup>
								{visibleColumns.map((column) => (
									<col key={column.id} style={getColumnSizeStyle(column.id)} />
								))}
							</colgroup>
							<TableHeader ref={headerRef}>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead
													key={header.id}
													className="sticky top-0 z-10 bg-background"
													style={getColumnSizeStyle(header.column.id)}
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{topSpacer > 0 ? (
									<TableRow>
										<TableCell
											colSpan={visibleColumns.length}
											className="p-0"
											style={{ height: topSpacer }}
										/>
									</TableRow>
								) : null}

								{visibleRows.map((row) => (
									<TableRow key={row.id} className="h-14">
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												style={getColumnSizeStyle(cell.column.id)}
											>
												<div className="max-w-full overflow-x-auto whitespace-nowrap">
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</div>
											</TableCell>
										))}
									</TableRow>
								))}

								{bottomSpacer > 0 ? (
									<TableRow>
										<TableCell
											colSpan={visibleColumns.length}
											className="p-0"
											style={{ height: bottomSpacer }}
										/>
									</TableRow>
								) : null}
							</TableBody>
						</table>
					)}
				</div>
				<div
					aria-hidden="true"
					data-shadow-position="top"
					className="pointer-events-none absolute left-0 z-20 h-12 bg-linear-to-b from-black/20 via-black/10 to-transparent transition-opacity duration-150 dark:h-24 dark:from-black/80 dark:via-black/40"
					style={{
						top: headerHeight,
						right: "0.5rem",
						opacity: scrollShadows.top ? 1 : 0,
					}}
				/>
				<div
					aria-hidden="true"
					data-shadow-position="bottom"
					className="pointer-events-none absolute left-0 z-20 h-12 bg-linear-to-t from-black/20 via-black/10 to-transparent transition-opacity duration-150 dark:h-24 dark:from-black/80 dark:via-black/40"
					style={{
						right: "0.5rem",
						bottom: "0.5rem",
						opacity: scrollShadows.bottom ? 1 : 0,
					}}
				/>
				<div
					aria-hidden="true"
					data-shadow-position="left"
					className="pointer-events-none absolute bottom-0 left-0 z-20 w-12 bg-linear-to-r from-black/20 via-black/10 to-transparent transition-opacity duration-150 dark:w-24 dark:from-black/80 dark:via-black/40"
					style={{
						top: 0,
						bottom: "0.5rem",
						opacity: scrollShadows.left ? 1 : 0,
					}}
				/>
				<div
					aria-hidden="true"
					data-shadow-position="right"
					className="pointer-events-none absolute bottom-0 right-0 z-20 w-12 bg-linear-to-l from-black/20 via-black/10 to-transparent transition-opacity duration-150 dark:w-24 dark:from-black/80 dark:via-black/40"
					style={{
						top: 0,
						bottom: "0.5rem",
						right: "0.5rem",
						opacity: scrollShadows.right ? 1 : 0,
					}}
				/>
			</div>
		</main>
	);
}

function TagList({
	values,
	compact = false,
	formatLabel = identity,
}: {
	values: string[];
	compact?: boolean;
	formatLabel?: (value: string) => string;
}) {
	if (values.length === 0) {
		return <span className="text-sm text-muted-foreground">-</span>;
	}

	return (
		<div className="flex flex-nowrap gap-1">
			{values.map((value) => (
				<Badge
					key={value}
					variant="secondary"
					className={compact ? "shrink-0 px-1.5 py-0 text-[11px]" : "shrink-0"}
				>
					{formatLabel(value)}
				</Badge>
			))}
		</div>
	);
}

function ColumnHeader({
	label,
	description,
	canSort,
	isSorted,
	onToggle,
}: {
	label: string;
	description: string;
	canSort: boolean;
	isSorted: false | "asc" | "desc";
	onToggle: ReturnType<
		HeaderContext<ModelRow, unknown>["column"]["getToggleSortingHandler"]
	>;
}) {
	return (
		<div className="flex items-center gap-1">
			{canSort ? (
				<button
					type="button"
					onClick={onToggle}
					className="inline-flex min-w-0 items-center gap-1 text-left"
				>
					<span className="truncate">{label}</span>
					{isSorted === "asc" ? (
						<IconArrowUp className="size-3 shrink-0" />
					) : isSorted === "desc" ? (
						<IconArrowDown className="size-3 shrink-0" />
					) : (
						<IconArrowsUpDown className="size-3 shrink-0" />
					)}
				</button>
			) : (
				<span className="truncate">{label}</span>
			)}
			<HeaderInfoTooltip label={label} description={description} />
		</div>
	);
}

function HeaderInfoTooltip({
	label,
	description,
}: {
	label: string;
	description: string;
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					<IconInfoCircle className="size-3" />
					<span className="sr-only">{label} info</span>
				</button>
			</TooltipTrigger>
			<TooltipContent side="top" sideOffset={4} className="max-w-64">
				{description}
			</TooltipContent>
		</Tooltip>
	);
}

function buildRows(directory: DirectoryData): {
	modelRows: ModelRow[];
	modelCount: number;
	providerCount: number;
} {
	const providerEntries = Object.values(directory).sort((a, b) =>
		compareStrings(a.name ?? a.id, b.name ?? b.id),
	);

	const rows = providerEntries.flatMap((provider) => {
		const models = Object.values(provider.models).sort((a, b) =>
			compareStrings(a.name ?? a.id, b.name ?? b.id),
		);

		return models.map((model) => {
			const features = [
				model.features?.reasoning ? "Reasoning" : undefined,
				model.features?.tool_call ? "Tools" : undefined,
				model.features?.structured_output ? "Structured output" : undefined,
				model.features?.attachment ? "Files" : undefined,
				model.features?.temperature ? "Temperature" : undefined,
				model.open_weights ? "Open weights" : undefined,
			].filter((value): value is string => Boolean(value));

			const modalitiesInput = model.modalities?.input ?? [];
			const modalitiesOutput = model.modalities?.output ?? [];
			const providerApiKeyEnv = provider.aiSdk?.defaultApiKeyEnv ?? [];

			const row: ModelRow = {
				providerId: provider.id,
				providerName: provider.name ?? provider.id,
				providerWebsite: provider.website,
				providerApiBaseUrl: provider.apiBaseUrl,
				providerSdkPackage: provider.aiSdk?.npmPackage,
				providerApiKeyEnv,
				modelId: model.id,
				modelName: model.name ?? model.id,
				pricingInput: model.pricing?.input,
				pricingOutput: model.pricing?.output,
				pricingReasoning: model.pricing?.reasoning,
				pricingCacheRead: model.pricing?.cache_read,
				pricingCacheWrite: model.pricing?.cache_write,
				pricingInputAudio: model.pricing?.input_audio,
				pricingOutputAudio: model.pricing?.output_audio,
				limitContext: model.limit?.context,
				limitInput: model.limit?.input,
				limitOutput: model.limit?.output,
				releaseDate: model.release_date,
				lastUpdated: model.last_updated,
				knowledgeCutoff: model.knowledge_cutoff,
				openWeights: model.open_weights,
				features,
				modalitiesInput,
				modalitiesOutput,
				searchText: "",
			};

			row.searchText = [
				row.providerId,
				row.providerName,
				row.providerApiBaseUrl,
				row.providerSdkPackage,
				row.providerApiKeyEnv.join(" "),
				row.modelId,
				row.modelName,
				formatUnixDate(row.releaseDate),
				formatUnixDate(row.lastUpdated),
				formatUnixDate(row.knowledgeCutoff),
				row.features.join(" "),
				row.modalitiesInput.join(" "),
				row.modalitiesOutput.join(" "),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			return row;
		});
	});

	return {
		modelRows: rows,
		modelCount: rows.length,
		providerCount: providerEntries.length,
	};
}

function compareStrings(a: string, b: string): number {
	return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function identity(value: string): string {
	return value;
}

function getColumnSizeStyle(columnId: string): React.CSSProperties {
	const size = `var(--column-${columnId}-size)`;

	return {
		width: size,
		minWidth: size,
		maxWidth: size,
	};
}

function formatBadgeLabel(value: string): string {
	return value
		.replaceAll(/[_-]+/g, " ")
		.replaceAll(/\b\w/g, (match) => match.toUpperCase());
}

const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 0,
	maximumFractionDigits: 4,
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
	notation: "compact",
	compactDisplay: "short",
	maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

function formatPrice(value?: number): string {
	if (value === undefined) {
		return "-";
	}

	return priceFormatter.format(value);
}

function formatTokenCount(value?: number): string {
	if (value === undefined) {
		return "-";
	}

	return compactNumberFormatter.format(value);
}

function formatBoolean(value?: boolean): string {
	if (value === undefined) {
		return "-";
	}

	return value ? "Yes" : "No";
}

function formatUnixDate(value?: string): string {
	if (!value) {
		return "-";
	}

	const timestamp = Number(value);

	if (!Number.isFinite(timestamp)) {
		return value;
	}

	return dateFormatter.format(new Date(timestamp * 1000));
}
