"use client";
import { useMemo, useState } from "react";

type ProjectItem = {
  name?: string;
  description?: string;
  url?: string;
  tech?: string[];
  bullets?: string[];
};

export default function ProjectsSection({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const open = useMemo(
    () => (openIdx === null ? null : projects[openIdx]),
    [openIdx, projects]
  );

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      {projects.length === 0 && (
        <div className="text-sm text-foreground/60">Projects coming soon.</div>
      )}
      {projects.map((p, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => setOpenIdx(idx)}
          className="text-left block rounded-lg border border-foreground/10 p-5 hover:border-foreground/20"
        >
          <p className="font-medium">{p.name || "Project"}</p>
          {p.description && (
            <p className="mt-1 text-sm text-foreground/70">{p.description}</p>
          )}
          {Array.isArray(p.tech) && p.tech.length > 0 && (
            <p className="mt-2 text-xs text-foreground/60">
              Tech: {p.tech.join(", ")}
            </p>
          )}
        </button>
      ))}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="w-full max-w-xl rounded-lg border border-foreground/10 bg-background p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{open.name}</h3>
                {open.url && (
                  <a
                    href={open.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline text-foreground/70 hover:opacity-80"
                  >
                    {open.url}
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpenIdx(null)}
                className="rounded-md border border-foreground/20 px-2 py-1 text-sm hover:bg-foreground/5"
              >
                Close
              </button>
            </div>
            {open.description && (
              <p className="mt-3 text-sm text-foreground/80">
                {open.description}
              </p>
            )}
            {Array.isArray(open.tech) && open.tech.length > 0 && (
              <p className="mt-2 text-xs text-foreground/60">
                Tech: {open.tech.join(", ")}
              </p>
            )}
            {Array.isArray(open.bullets) && open.bullets.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-sm text-foreground/80 space-y-1">
                {open.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
