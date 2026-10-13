import type { Application } from "../types";
const DAY = 1000 * 60 * 60 * 24;
export function daysSince(dateSent: string, today: Date = new Date()): number {
const sent = new Date(dateSent);
const gap = today.getTime() - sent.getTime();
return Math.floor(gap / DAY);
}
export function needsNudge(job: Application, today: Date = new Date()): boolean {
if (job.stage !== "applied") return false;
return daysSince(job.dateSent, today) > 14;
}