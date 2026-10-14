import { useState } from "react";
import { Link } from "react-router";
import type { Stage } from "../types";
import { useApplications } from "../hooks/UseApplications";
import { countByStage } from "../lib/applications";
import { StageSummary } from "../components/StageSummary";
import { FilterBar } from "../components/FilterBar";
import { ApplicationList } from "../components/ApplicationList";

export function ApplicationPage() {
  const { applications, loading, error } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  if (loading) {
    return (
      <div aria-busy="true" className="space-y-4">
        <p className="sr-only">Loading…</p>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
        {error}
      </p>
    );
  }

  // derived, never stored
  const counts = countByStage(applications);
  const query = search.trim().toLowerCase();
  const visible = [...applications]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .filter((a) => stage === "all" || a.stage === stage)
    .filter((a) => a.company.toLowerCase().includes(query) || a.role.toLowerCase().includes(query));

  const clearFilters = () => {
    setSearch("");
    setStage("all");
  };

  return (
    <div className="space-y-6">
      <StageSummary counts={counts} />
      <FilterBar search={search} onSearchChange={setSearch} stage={stage} onStageChange={setStage} />

      {applications.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">Nothing here yet. Add your first application.</p>
          <Link to="/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Add application
          </Link>
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">No jobs match your search or filter.</p>
          <button onClick={clearFilters} className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Clear filters
          </button>
        </div>
      ) : (
        <ApplicationList applications={visible} />
      )}
    </div>
  );
}