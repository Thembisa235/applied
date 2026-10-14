import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

export function ApplicationList({ applications }: { applications: Application[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {applications.map((a) => (
        <li key={a.id}>
          <ApplicationCard application={a} />
        </li>
      ))}
    </ul>
  );
}