import type { Stage } from "../types";

type Props = {
  counts: Record<Stage, number>;
};

const items: { stage: Stage; label: string; classes: string }[] = [
  { stage: "wishlist",  label: "Saved",     classes: "text-slate-700 dark:text-slate-300" },
  { stage: "applied",   label: "Applied",   classes: "text-blue-700 dark:text-blue-300" },
  { stage: "interview", label: "Interview", classes: "text-violet-700 dark:text-violet-300" },
  { stage: "offer",     label: "Offer",     classes: "text-emerald-700 dark:text-emerald-300" },
  { stage: "closed",    label: "Closed",    classes: "text-rose-700 dark:text-rose-300" },
];

export function StageSummary({ counts }: Props) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {items.map(({ stage, label, classes }) => (
        <div
          key={stage}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {label}
          </dt>
          <dd className={`mt-1 text-2xl font-bold ${classes}`}>{counts[stage]}</dd>
        </div>
      ))}
    </dl>
  );
}