import { promises as fs } from 'fs';
import path from 'path';

const LOG_DIR = process.env.MONITOR_LOG_DIR || '/tmp';
const LOG_FILE = path.join(LOG_DIR, 'monitor-events.jsonl');

type MonitorEvent = {
  ts: string; // ISO
  type: 'CONTACT_EMAIL_FAIL' | 'SHEETS_FAIL';
  message: string;
  meta?: Record<string, any>;
};

async function ensureDir() {
  await fs.mkdir(LOG_DIR, { recursive: true });
}

export async function logMonitorEvent(evt: MonitorEvent) {
  try {
    await ensureDir();
    await fs.appendFile(LOG_FILE, JSON.stringify(evt) + '\n', 'utf8');
  } catch {
    // If logging fails, we do not crash the app.
  }
}

export async function countRecentFailures(hours = 24) {
  try {
    const raw = await fs.readFile(LOG_FILE, 'utf8');
    const cutoff = Date.now() - hours * 60 * 60 * 1000;

    let count = 0;
    for (const line of raw.split('\n')) {
      if (!line.trim()) continue;
      try {
        const evt = JSON.parse(line) as MonitorEvent;
        if (!evt.ts) continue;
        if (new Date(evt.ts).getTime() >= cutoff) count++;
      } catch {
        // ignore bad lines
      }
    }
    return count;
  } catch {
    return 0;
  }
}
