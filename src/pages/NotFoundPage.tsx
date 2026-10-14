import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">That page does not exist</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        You may have followed an old link, or mistyped the address.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Back to all applications
      </Link>
    </div>
  );
}