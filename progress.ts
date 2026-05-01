import cliProgress from "cli-progress";

/**
 * Reporter passed to updaters so they can stream progress while fetching.
 *
 * Lifecycle for a single phase:
 *   - call beginPhase(name, total) once
 *   - call tick(label, ok) once per processed item
 *
 * An updater may run several phases in sequence (e.g. "discovering", "scraping").
 */
export type ProgressReporter = {
  beginPhase(phase: string, total: number): void;
  tick(label: string, ok: boolean): void;
  log(message: string): void;
};

type Payload = {
  providerIdx: number;
  providerTotal: number;
  provider: string;
  phase: string;
  ok: number;
  err: number;
  label: string;
};

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, Math.max(0, max - 1)) + "…";
}

export class ProgressBar implements ProgressReporter {
  private bar: cliProgress.SingleBar;
  private payload: Payload = {
    providerIdx: 0,
    providerTotal: 0,
    provider: "",
    phase: "idle",
    ok: 0,
    err: 0,
    label: "",
  };
  private active = false;
  private buffered: string[] = [];

  constructor() {
    this.bar = new cliProgress.SingleBar(
      {
        format: (options, params, payload: Payload) => {
          const completeChar = options.barCompleteChar ?? "█";
          const incompleteChar = options.barIncompleteChar ?? "░";
          const size = options.barsize ?? 24;
          const ratio = params.total > 0 ? params.value / params.total : 0;
          const filled = Math.round(ratio * size);
          const bar =
            completeChar.repeat(filled) +
            incompleteChar.repeat(Math.max(0, size - filled));
          const provider = `[${payload.providerIdx}/${payload.providerTotal}] ${payload.provider}`;
          const phase = payload.phase.padEnd(10);
          const counts = `\x1b[32m✓${payload.ok}\x1b[0m \x1b[31m✗${payload.err}\x1b[0m`;
          const value = `${params.value}/${params.total}`;
          const label = payload.label ? `• ${truncate(payload.label, 40)}` : "";

          return `${provider} ${phase} ▕${bar}▏ ${value} ${counts} ${label}`;
        },
        barsize: 24,
        barCompleteChar: "█",
        barIncompleteChar: "░",
        hideCursor: true,
        clearOnComplete: false,
        stopOnComplete: false,
        autopadding: true,
        fps: 20,
      },
      cliProgress.Presets.shades_classic,
    );
  }

  beginProvider(idx: number, total: number, name: string): void {
    this.payload.providerIdx = idx;
    this.payload.providerTotal = total;
    this.payload.provider = name;
    this.payload.ok = 0;
    this.payload.err = 0;
    this.payload.label = "";
    this.payload.phase = "starting";

    if (!this.active) {
      this.bar.start(1, 0, this.payload);
      this.active = true;
    } else {
      this.bar.setTotal(1);
      this.bar.update(0, this.payload);
    }
  }

  beginPhase(phase: string, total: number): void {
    this.payload.phase = phase;
    this.payload.label = "";
    this.payload.ok = 0;
    this.payload.err = 0;
    this.bar.setTotal(Math.max(total, 1));
    this.bar.update(0, this.payload);
  }

  tick(label: string, ok: boolean): void {
    this.payload.label = label;
    if (ok) this.payload.ok++;
    else this.payload.err++;
    this.bar.increment(1, this.payload);
  }

  /** Buffer a log line; printed after the bar stops to avoid clobbering it. */
  log(message: string): void {
    this.buffered.push(message);
  }

  /** Snapshot of counters for the current provider. */
  counts(): { ok: number; err: number } {
    return { ok: this.payload.ok, err: this.payload.err };
  }

  stop(): void {
    if (this.active) {
      this.bar.stop();
      this.active = false;
    }
    if (this.buffered.length > 0) {
      for (const line of this.buffered) {
        console.log(line);
      }
      this.buffered = [];
    }
  }
}
