import { useCallback, useEffect, useState } from "react";
import type { Application, NewApplication } from "../types";
import {
  createApplication,
  deleteApplication,
  fetchApplications,
  updateApplication,
} from "../api/application";

const LOAD_ERROR = "Something went wrong loading your applications.";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // load once when the component using the hook appears
  useEffect(() => {
    let cancelled = false;
    fetchApplications()
      .then((list) => {
        if (!cancelled) setApplications(list);
      })
      .catch(() => {
        if (!cancelled) setError(LOAD_ERROR);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = useCallback(async () => {
    try {
      setError(null);
      setApplications(await fetchApplications());
    } catch {
      setError(LOAD_ERROR);
    }
  }, []);

  // after every write: call the API, then refresh the list
  const add = async (input: NewApplication): Promise<void> => {
    await createApplication(input);
    await reload();
  };

  const update = async (id: string, changes: Partial<Application>): Promise<void> => {
    await updateApplication(id, changes);
    await reload();
  };

  const remove = async (id: string): Promise<void> => {
    await deleteApplication(id);
    await reload();
  };

  return { applications, loading, error, add, update, remove, reload };
}