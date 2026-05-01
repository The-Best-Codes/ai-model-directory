import cliProgress from "cli-progress";

export type ProgressReporter = {
  beginPhase(phase: string, total: number): void;
  tick(label: string, ok: boolean): void;
  log(message: string): void;
};

type Payload = {
  providerIndex: number;
  providerTotal: number;
  providerName: string;
  phase: string;
  ok: number;
  error: number;
  label: string;
};

const terminalControlPattern = /[\u0000-\u001f\u007f-\u009f]/g;

export function sanitizeTerminalText(text: string): string {
  return text.replace(terminalControlPattern, "");
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 1))}…`;
}

export class ProgressBar implements ProgressReporter {
  private readonly bar: cliProgress.SingleBar;
  private readonly payload: Payload = {
    providerIndex: 0,
    providerTotal: 0,
    providerName: "",
    phase: "idle",
    ok: 0,
    error: 0,
    label: "",
  };
  private active = false;
  private readonly buffered: string[] = [];

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

          return `[${payload.providerIndex}/${payload.providerTotal}] ${payload.providerName} ${payload.phase.padEnd(10)} ▕${bar}▏ ${params.value}/${params.total} \x1b[32m✓${payload.ok}\x1b[0m \x1b[31m✗${payload.error}\x1b[0m${payload.label ? ` • ${truncate(payload.label, 40)}` : ""}`;
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

  beginProvider(index: number, total: number, name: string): void {
    this.payload.providerIndex = index;
    this.payload.providerTotal = total;
    this.payload.providerName = sanitizeTerminalText(name);
    this.payload.phase = "starting";
    this.payload.ok = 0;
    this.payload.error = 0;
    this.payload.label = "";

    if (!this.active) {
      this.bar.start(1, 0, this.payload);
      this.active = true;
      return;
    }

    this.bar.setTotal(1);
    this.bar.update(0, this.payload);
  }

  beginPhase(phase: string, total: number): void {
    this.payload.phase = phase;
    this.payload.ok = 0;
    this.payload.error = 0;
    this.payload.label = "";
    this.bar.setTotal(Math.max(1, total));
    this.bar.update(0, this.payload);
  }

  tick(label: string, ok: boolean): void {
    this.payload.label = sanitizeTerminalText(label);

    if (ok) {
      this.payload.ok += 1;
    } else {
      this.payload.error += 1;
    }

    this.bar.increment(1, this.payload);
  }

  log(message: string): void {
    this.buffered.push(sanitizeTerminalText(message));
  }

  stop(): void {
    if (this.active) {
      this.bar.stop();
      this.active = false;
    }

    while (this.buffered.length > 0) {
      const line = this.buffered.shift();

      if (line) {
        console.log(line);
      }
    }
  }
}
