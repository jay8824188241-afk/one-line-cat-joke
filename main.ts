// One-Line Cat Joke That Lands — entry program (Node 22, stdlib only).
//
// Writes exactly one original joke about cats, a single line under
// 200 characters, to /output/entry.txt. Nothing else goes in the entry.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "My cat knocked my phone off the table, watched it fall, then looked at me like I was the one who dropped it.";

const ENTRY_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// Character-count helper, kept explicit so the entry-length rule is
// checked in one place. The joke is plain ASCII, so JS string length
// (UTF-16 code units) equals the visible character count — 108 for
// the current joke, under the 200-character limit.
function countChars(text: string): number {
  return text.length;
}

function validateLength(joke: string): void {
  const chars = countChars(joke);
  if (chars === 0 || chars >= MAX_CHARS) {
    throw new Error(`joke must be 1-${MAX_CHARS - 1} characters, got ${chars}`);
  }
  if (joke.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
}

function validateSingleLine(joke: string): void {
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must be a single line");
  }
}

function checkJoke(joke: string): void {
  validateLength(joke);
  validateSingleLine(joke);
}

function main(): void {
  checkJoke(JOKE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(ENTRY_PATH, JOKE + "\n", "utf8");
  console.log(`wrote ${JOKE.length} characters to ${ENTRY_PATH}`);
}

main();
