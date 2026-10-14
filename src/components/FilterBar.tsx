import type { Stage } from "../types";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  stage: Stage | "all";
  onStageChange: (value: Stage | "all") => void;
};

const field =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

export function FilterBar({ search, onSearchChange, stage, onStageChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Search company or job title</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search company or job title…"
          className={`w-full ${field}`}
        />
      </label>
      <label>
        <span className="sr-only">Filter by stage</span>
        <select
          value={stage}
          onChange={(e) => onStageChange(e.target.value as Stage | "all")}
          className={`w-full sm:w-44 ${field}`}
        >
          <option value="all">All stages</option>
          <option value="wishlist">Saved</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="closed">Closed</option>
        </select>
      </label>
    </div>
  );
}