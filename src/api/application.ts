import type { Application, NewApplication } from "../types";
import { seedApplications } from "./seed";

const KEY = "applied.applications";
const DELAY_MS = 300;

const wait = () => new Promise<void>((resolve) => setTimeout(resolve, DELAY_MS));

function readAll(): Application[] {
  const raw = localStorage.getItem(KEY);
  if (raw === null) {
    // first visit: start with the sample data
    localStorage.setItem(KEY, JSON.stringify(seedApplications));
    return seedApplications;
  }
  try {
    return JSON.parse(raw) as Application[];
  } catch {
    throw new Error("Saved data could not be read");
  }
}

function writeAll(list: Application[]): void {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export async function fetchApplications(): Promise<Application[]> {
  await wait();
  return readAll();
}

export async function createApplication(input: NewApplication): Promise<Application> {
  await wait();
  const application: Application = {
    ...input,
    link: input.link?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeAll([application, ...readAll()]);
  return application;
}

export async function updateApplication(
  id: string,
  changes: Partial<Application>,
): Promise<Application> {
  await wait();
  const list = readAll();
  const index = list.findIndex((a) => a.id === id);
  if (index === -1) throw new Error("Application not found");
  const updated = { ...list[index], ...changes };
  writeAll(list.map((a) => (a.id === id ? updated : a)));
  return updated;
}

export async function deleteApplication(id: string): Promise<void> {
  await wait();
  writeAll(readAll().filter((a) => a.id !== id));
}