import { readFileSync } from "node:fs";

const searchTerm = process.argv.slice(2).join(" ").trim().toLowerCase();

if (!searchTerm) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const notes = JSON.parse(
    readFileSync(new URL("./notes/keynote-highlights.json", import.meta.url), "utf8"),
  );
  // Search the title and descriptive text fields for each highlight.
  const matches = notes.highlights.filter(({ title, summary, tryIt }) =>
    [title, summary, tryIt].some((text) => text.toLowerCase().includes(searchTerm)),
  );

  if (matches.length === 0) {
    console.log("No results");
  } else {
    for (const { topic, title, summary, tryIt } of matches) {
      console.log(`${topic}: ${title}`);
      console.log(`  ${summary}`);
      console.log(`  Try it: ${tryIt}`);
    }
  }
}
