/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

async function run() {
  const pdfPath = path.resolve(__dirname, "..", "public", "resume.pdf");
  const outDir = path.resolve(__dirname, "..", "src", "data");
  const outPath = path.join(outDir, "resume.json");

  if (!fs.existsSync(pdfPath)) {
    console.error("Resume PDF not found at", pdfPath);
    process.exit(1);
  }

  const dataBuffer = fs.readFileSync(pdfPath);
  const parsed = await pdf(dataBuffer);
  const text = parsed.text || "";

  // Heuristic parsing: split by double newlines for sections, single newlines for lines
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Attempt to infer name (first non-empty line)
  const name = lines[0] || "Your Name";

  // Basic keyword bucketing
  const experience = [];
  const projects = [];
  const skills = new Set();
  const about = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (/(experience|work history)/i.test(line)) continue;
    if (/(projects)/i.test(line)) continue;
    if (/(skills|technologies|tech stack|tooling)/i.test(line)) continue;

    if (
      /\b(software|engineer|developer|manager)\b/i.test(line) &&
      /\b(\d{4}|present)\b/i.test(line)
    ) {
      experience.push({ title: line, bullets: [] });
      continue;
    }
    if (/\b(project)\b/i.test(lower) || /github\.com\//i.test(line)) {
      projects.push({ name: line, description: "" });
      continue;
    }
    if (
      /typescript|javascript|react|next|node|postgres|python|java|docker|kubernetes|aws|gcp|azure|graphql|rest|tailwind|css|html/i.test(
        lower
      )
    ) {
      lower
        .split(/[,•|]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => skills.add(s));
      continue;
    }
    if (about.length < 3 && line.length > 40 && !/\d{4}/.test(line)) {
      about.push(line);
    } else if (
      experience.length &&
      experience[experience.length - 1].bullets.length < 4 &&
      /^[•\-–]/.test(line)
    ) {
      experience[experience.length - 1].bullets.push(
        line.replace(/^[•\-–]\s?/, "")
      );
    }
  }

  const result = {
    name,
    headline: "Software Engineer",
    about: about.join(" "),
    experience,
    projects,
    skills: Array.from(skills).slice(0, 20),
  };

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log("Wrote", outPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
