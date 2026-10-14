import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Application, Stage } from "../types";
import { useApplications } from "../hooks/UseApplications";
import { daysSince, formatDate, needsNudge } from "../lib/applications";
import { StageBadge } from "../components/StageBadge";

const backLink = (
  <Link to="/" className="text-sm text-blue-700 hover:underline dark:text-blue-400">
    ← Back to all applications
  </Link>
);

export function ApplicationsPage() {
  const { id } = useParams();
  const { applications, loading, error, update, remove } = useApplications();
  const application = applications.find((a) => a.id === id);

  if (loading) return <p aria-busy="true">Loading…</p>;

  if (error) {
    return (
      <div className="space-y-4">
        {backLink}
        <p role="alert">{error}</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="space-y-4">
        {backLink}
        <h1 className="text-2xl font-bold">We could not find that application</h1>
        <p className="text-slate-600 dark:text-slate-400">It may have been deleted.</p>
      </div>
    );
  }

  return <ApplicationDetail application={application} update={update} remove={remove} />;
}

type DetailProps = {
  application: Application;
  update: (id: string, changes: Partial<Application>) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

function ApplicationDetail({ application, update, remove }: DetailProps) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(application.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function run(action: () => Promise<void>, success?: string) {
    setSaving(true);
    setMessage(null);
    try {
      await action();
      if (success) setMessage(success);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const sent =
    application.stage === "wishlist"
      ? "Not sent yet"
      : `Sent ${formatDate(application.dateSent)} · ${daysSince(application.dateSent)} days ago`;

  return (
    <div className="space-y-6">
      {backLink}

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">{application.company}</h1>
            <p className="text-slate-600 dark:text-slate-400">{application.role}</p>
          </div>
          <StageBadge stage={application.stage} />
        </div>

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {sent}
          {application.link && (
            <>
              {" · "}
              <a
                href={application.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline dark:text-blue-400"
              >
                View the advert ↗
              </a>
            </>
          )}
        </p>

        {needsNudge(application) && (
          <p className="mt-4 inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
            <span aria-hidden="true">⏰</span> Needs a nudge
          </p>
        )}
      </section>

      <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label htmlFor="stage" className="mb-1 block text-sm font-medium">Stage</label>
          <select
            id="stage"
            value={application.stage}
            disabled={saving}
            onChange={(e) => run(() => update(application.id, { stage: e.target.value as Stage }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 sm:w-48"
          >
            <option value="wishlist">Saved</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-sm font-medium">Notes (optional)</label>
          <textarea
            id="notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            type="button"
            disabled={saving}
            onClick={() =>
              run(() => update(application.id, { notes: notes.trim() || undefined }), "Notes saved")
            }
            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save notes"}
          </button>
        </div>

        {message && (
          <p role="status" className="text-sm text-slate-600 dark:text-slate-400">
            {message}
          </p>
        )}
      </section>

      <section className="rounded-xl border border-red-200 p-6 dark:border-red-900">
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            Delete this application
          </button>
        ) : (
          <div role="alertdialog" aria-label="Confirm delete" className="space-y-3">
            <p className="text-sm">
              Delete <strong>{application.company}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  run(async () => {
                    await remove(application.id);
                    navigate("/");
                  })
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {saving ? "Deleting…" : "Yes, delete"}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Keep it
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}