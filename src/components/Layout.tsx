import { Link, Outlet } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Applied
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/new"
              aria-label="Add application"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span aria-hidden="true">+</span> Add
              <span className="hidden sm:inline"> application</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}