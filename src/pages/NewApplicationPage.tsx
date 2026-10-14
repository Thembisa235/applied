import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { NewApplication } from "../types";
import { useApplications } from "../hooks/UseApplications";
// Today as YYYY-MM-DD in the user's own time zone
const today = () => new Date().toLocaleDateString("en-CA");

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600 dark:bg-slate-900 dark:text-slate-100 ${
    hasError ? "border-red-500" : "border-slate-300 dark:border-slate-700"
  }`;

const labelClass = "mb-1 block text-sm font-medium";
const errorClass = "mt-1 text-sm text-red-600 dark:text-red-400";

export function NewApplicationPage() {
  const navigate = useNavigate();
  const { add } = useApplications();
  const companyRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewApplication>({
    defaultValues: {
      company: "",
      role: "",
      link: "",
      dateSent: today(),
      stage: "wishlist",
      notes: "",
    },
  });

  // Focus the first field when the form opens
  useEffect(() => {
    companyRef.current?.focus();
  }, []);

  // register() hands back its own ref; we need to give the same element to our useRef too
  const company = register("company", {
    validate: (v) => v.trim().length >= 2 || "Company is required",
  });

  const onSubmit = async (values: NewApplication) => {
  try {
    await add(values);
    navigate("/");
  } catch {
    setError("root", { message: "Could not save. Please try again." });
  }
};

{errors.root && (
  <p role="alert" className={errorClass}>
    {errors.root.message}
  </p>
)}

  return (
    <div className="mx-auto max-w-xl">
      <Link to="/" className="text-sm text-blue-700 hover:underline dark:text-blue-400">
        ← Back to all applications
      </Link>
      <h1 className="mt-4 mb-6 text-2xl font-bold tracking-tight">Add an application</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input
            id="company"
            type="text"
            {...company}
            ref={(el) => {
              company.ref(el);
              companyRef.current = el;
            }}
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={inputClass(!!errors.company)}
          />
          {errors.company && (
            <p id="company-error" role="alert" className={errorClass}>
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="role" className={labelClass}>Job title</label>
          <input
            id="role"
            type="text"
            {...register("role", {
              validate: (v) => v.trim().length >= 2 || "Job title is required",
            })}
            aria-invalid={errors.role ? "true" : "false"}
            aria-describedby={errors.role ? "role-error" : undefined}
            className={inputClass(!!errors.role)}
          />
          {errors.role && (
            <p id="role-error" role="alert" className={errorClass}>
              {errors.role.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="link" className={labelClass}>Link to the advert (optional)</label>
          <input
            id="link"
            type="text"
            inputMode="url"
            placeholder="https://careers.example.com/…"
            {...register("link", {
              validate: (v) => {
                if (!v || v.trim() === "") return true;
                try {
                  const url = new URL(v.trim());
                  return url.protocol === "http:" || url.protocol === "https:" || "That does not look like a link";
                } catch {
                  return "That does not look like a link";
                }
              },
            })}
            aria-invalid={errors.link ? "true" : "false"}
            aria-describedby={errors.link ? "link-error" : undefined}
            className={inputClass(!!errors.link)}
          />
          {errors.link && (
            <p id="link-error" role="alert" className={errorClass}>
              {errors.link.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="dateSent" className={labelClass}>Date sent</label>
            <input
              id="dateSent"
              type="date"
              max={today()}
              {...register("dateSent", {
                required: "Date sent is required",
                validate: (v) => v <= today() || "You cannot have sent it tomorrow",
              })}
              aria-invalid={errors.dateSent ? "true" : "false"}
              aria-describedby={errors.dateSent ? "dateSent-error" : undefined}
              className={inputClass(!!errors.dateSent)}
            />
            {errors.dateSent && (
              <p id="dateSent-error" role="alert" className={errorClass}>
                {errors.dateSent.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="stage" className={labelClass}>Stage</label>
            <select id="stage" {...register("stage")} className={inputClass(false)}>
              <option value="wishlist">Saved</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>Notes (optional)</label>
          <textarea id="notes" rows={4} {...register("notes")} className={inputClass(false)} />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving…" : "Save application"}
          </button>
          <Link
            to="/"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}