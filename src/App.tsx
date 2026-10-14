import { ApplicationsPage } from "./pages/ApplicationPage";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl p-4 sm:p-8 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Applied</h1>
        <ThemeToggle />
      </div>
      <ApplicationsPage />
    </main>
  );
}