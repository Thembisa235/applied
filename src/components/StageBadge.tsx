import type { Stage } from "../types";

const styles: Record<Stage, { label: string; classes: string }> = {
  wishlist:  { label: "Saved",     classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  applied:   { label: "Applied",   classes: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
  interview: { label: "Interview", classes: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300" },
  offer:     { label: "Offer",     classes: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
  closed:    { label: "Closed",    classes: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" },
};

export function StageBadge({ stage }: { stage: Stage }) {
  const { label, classes } = styles[stage];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${classes}`}>
      {label}
    </span>
  );
}