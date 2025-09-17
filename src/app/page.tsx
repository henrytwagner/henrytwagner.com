import resumeData from "@/data/resume.json";
import ThemeToggle from "./components/ThemeToggle";
import ProjectsSection from "./components/ProjectsSection";

type ExperienceItem = {
  title: string;
  bullets?: string[];
  dates?: string;
};

type ProjectItem = {
  name?: string;
  description?: string;
  url?: string;
  tech?: string[];
};

type ResumeData = {
  name?: string;
  headline?: string;
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
  about?: string;
  education?: Array<{
    school: string;
    location?: string;
    degree?: string;
    date?: string;
    gpa?: string;
    honors?: string[];
    coursework?: string[];
  }>;
  experience?: ExperienceItem[];
  projects?: ProjectItem[];
  skills?: string[];
  involvement?: Array<{
    name: string;
    dates?: string;
    bullets?: string[];
  }>;
};

const data = resumeData as ResumeData;

export default function Home() {
  const name = data?.name || "Henry T. Wagner";
  const headline = data?.headline || "Software Engineer";
  const about =
    data?.about || "I build reliable, user-centered web applications.";
  const experience: ExperienceItem[] = data?.experience || [];
  const projects: ProjectItem[] = data?.projects || [];
  const skills: string[] = (data?.skills || []).flatMap((s) =>
    s
      .split("/")
      .map((t) => t.trim())
      .filter(Boolean)
  );
  const education = data?.education || [];
  const involvement = data?.involvement || [];
  const contact = data?.contact;
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-foreground/10">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="font-semibold">
            Henry T. Wagner
          </a>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">
              About
            </a>
            <a href="#education" className="hover:opacity-80">
              Education
            </a>
            <a href="#experience" className="hover:opacity-80">
              Experience
            </a>
            <a href="#projects" className="hover:opacity-80">
              Projects
            </a>
            <a href="#skills" className="hover:opacity-80">
              Skills
            </a>
            <a href="#involvement" className="hover:opacity-80">
              Involvement
            </a>
            <a href="#contact" className="hover:opacity-80">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-sm uppercase tracking-widest text-foreground/60">
            {headline}
          </p>
          <h1 className="mt-2 text-3xl sm:text-5xl font-semibold leading-tight">
            {name}
          </h1>
          <p className="mt-4 max-w-2xl text-foreground/80">{about}</p>
          <div className="mt-6 flex gap-3">
            <a
              href="#projects"
              className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5"
            >
              Download Resume
            </a>
          </div>
          {contact && (
            <div className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              {contact.email && (
                <div className="rounded-lg border border-foreground/10 p-4">
                  <p className="text-foreground/60">Email</p>
                  <a
                    className="font-medium underline hover:opacity-80"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div className="rounded-lg border border-foreground/10 p-4">
                  <p className="text-foreground/60">Phone</p>
                  <a
                    className="font-medium"
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.linkedin && (
                <div className="rounded-lg border border-foreground/10 p-4">
                  <p className="text-foreground/60">LinkedIn</p>
                  <a
                    className="font-medium underline hover:opacity-80"
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.linkedin.replace("https://", "")}
                  </a>
                </div>
              )}
              {contact.github && (
                <div className="rounded-lg border border-foreground/10 p-4">
                  <p className="text-foreground/60">GitHub</p>
                  <a
                    className="font-medium underline hover:opacity-80"
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.github.replace("https://", "")}
                  </a>
                </div>
              )}
            </div>
          )}
        </section>

        <section
          id="about"
          className="mx-auto max-w-5xl px-6 py-16 border-t border-foreground/10"
        >
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-3 text-foreground/80">{about}</p>
        </section>

        <section
          id="experience"
          className="mx-auto max-w-5xl px-6 py-16 border-t border-foreground/10"
        >
          <h2 className="text-xl font-semibold">Experience</h2>
          <ul className="mt-6 space-y-6">
            {(!Array.isArray(experience) || experience.length === 0) && (
              <li className="text-sm text-foreground/60">
                Experience details coming soon.
              </li>
            )}
            {Array.isArray(experience) &&
              experience.map((item: ExperienceItem, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start justify-between gap-6"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    {Array.isArray(item.bullets) && item.bullets.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-foreground/70 space-y-1">
                        {item.bullets.map((b: string, j: number) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {item.dates && (
                    <span className="text-sm text-foreground/60 whitespace-nowrap">
                      {item.dates}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </section>

        <section
          id="education"
          className="mx-auto max-w-5xl px-6 py-16 border-t border-foreground/10"
        >
          <h2 className="text-xl font-semibold">Education</h2>
          <ul className="mt-6 space-y-6">
            {education.map((ed, idx) => (
              <li key={idx} className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-medium">
                    {ed.school}
                    {ed.location ? ` — ${ed.location}` : ""}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {ed.degree}
                    {ed.gpa ? ` • GPA: ${ed.gpa}` : ""}
                  </p>
                  {Array.isArray(ed.honors) && ed.honors.length > 0 && (
                    <p className="mt-1 text-xs text-foreground/60">
                      Honors: {ed.honors.join(", ")}
                    </p>
                  )}
                  {Array.isArray(ed.coursework) && ed.coursework.length > 0 && (
                    <p className="mt-1 text-xs text-foreground/60">
                      Coursework: {ed.coursework.slice(0, 8).join(", ")}
                      {ed.coursework.length > 8 ? "…" : ""}
                    </p>
                  )}
                </div>
                {ed.date && (
                  <span className="text-sm text-foreground/60 whitespace-nowrap">
                    {ed.date}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="projects"
          className="mx-auto max-w-5xl px-6 py-16 border-t border-foreground/10"
        >
          <h2 className="text-xl font-semibold">Projects</h2>
          <ProjectsSection projects={projects} />
        </section>

        <section
          id="skills"
          className="mx-auto max-w-5xl px-6 py-16 border-t border-foreground/10"
        >
          <h2 className="text-xl font-semibold">Skills</h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {Array.isArray(skills) &&
              skills.slice(0, 30).map((s: string, idx: number) => (
                <li
                  key={idx}
                  className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1"
                >
                  {s}
                </li>
              ))}
          </ul>
        </section>

        <section
          id="involvement"
          className="mx-auto max-w-5xl px-6 py-16 border-t border-foreground/10"
        >
          <h2 className="text-xl font-semibold">Campus & Community</h2>
          <ul className="mt-6 space-y-6">
            {involvement.map((inv, idx) => (
              <li key={idx} className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-medium">{inv.name}</p>
                  {Array.isArray(inv.bullets) && inv.bullets.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-sm text-foreground/70 space-y-1">
                      {inv.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {inv.dates && (
                  <span className="text-sm text-foreground/60 whitespace-nowrap">
                    {inv.dates}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-5xl px-6 py-16 border-t border-foreground/10"
        >
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-3 text-foreground/80">
            Email:{" "}
            <a
              className="underline hover:opacity-80"
              href="mailto:henry@henrytwagner.com"
            >
              henry@henrytwagner.com
            </a>
          </p>
          <p className="mt-1 text-foreground/80">
            LinkedIn:{" "}
            <a
              className="underline hover:opacity-80"
              href="https://www.linkedin.com/in/henrytzwagner"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/henrytzwagner
            </a>
          </p>
          <p className="mt-1 text-foreground/80">
            GitHub:{" "}
            <a
              className="underline hover:opacity-80"
              href="https://github.com/henrytwagner"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/henrytwagner
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-foreground/10">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-foreground/60">
          © {new Date().getFullYear()} Henry T. Wagner
        </div>
      </footer>
    </div>
  );
}
