import { Link } from "react-router";
import type { Application } from "../types";
import { daysSince, needsNudge } from "../lib/applications";
import { StageBadge } from "./StageBadge";
type Props = {
  application: Application;
};
export function ApplicationCard({ application }: Props) {
  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);
  return (
    <article className="rounded-lg border p-4">
      <Link to={`/applications/${application.id}`}>
        <h3 className="font-semibold">{application.company}</h3>
      </Link>
      <p className="text-sm">{application.role}</p>
      <StageBadge stage={application.stage} />
      <p className="text-xs">Sent {days} days ago</p>
      {nudge && <p className="text-xs font-semibold">Needs a nudge</p>}
    </article>
  );
}