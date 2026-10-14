import { Link } from "react-router";
import type { Application } from "../types";
import { daysSince, needsNudge } from "../lib/applications";
import { StageBadge } from "./StageBadge";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" });

export function ApplicationCard({ application }: { application: Application }) {
  const nudge = needsNudge(application);
  const sent =
    application.stage === "wishlist"
      ? "Not sent yet"
      : `Sent ${formatDate(application.dateSent)} · ${daysSince(application.dateSent)} days ago`;

  return (
    <article className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
            <Link
              to={`/applications/${application.id}`}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {application.company}
            </Link>
          </h3>
          <p className="truncate text-sm text-slate-600 dark:text-slate-400">{application.role}</p>
        </div>
        <StageBadge stage={application.stage} />
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{sent}</p>
      {nudge && (
        <p className="mt-3 inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
          <span aria-hidden="true">⏰</span> Needs a nudge
        </p>
      )}
    </article>
  );
}