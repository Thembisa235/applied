import type { Application, Stage } from "../types";
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

export function countByStage(
  applications: Application[]
): Record<Stage, number> {
  const counts: Record<Stage, number> = {
    wishlist: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    closed: 0,
  };

  for (const application of applications) {
    counts[application.stage]++;
  }

  return counts;
}

export function formatDate(dateSent: string): string {
  return new Date(dateSent).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}