import { writeFileSync } from "fs";

const LINGUIST_URL =
  "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml";
const JSON_FILE_PATH = "./colors.json";
const MIN_COLORS_COUNT = 500;

const resp = await fetch(LINGUIST_URL);
if (!resp.ok)
  throw new Error(`fetch failed: ${resp.status} ${resp.statusText}`);
const yamlText = await resp.text();

const result = {};
let currentLang = null;

for (const line of yamlText.split("\n")) {
  if (
    line.length > 0 &&
    line[0] !== " " &&
    line[0] !== "#" &&
    line.endsWith(":")
  ) {
    currentLang = line.slice(0, -1);
  } else if (currentLang !== null) {
    const m = line.match(/^  color:\s+"?(#[0-9A-Fa-f]+)"?/);
    if (m) result[currentLang] = m[1].toLowerCase();
  }
}

const langs = Object.entries(result).sort(([a], [b]) =>
  a < b ? -1 : a > b ? 1 : 0,
);

if (langs.length < MIN_COLORS_COUNT) {
  throw new Error(`too few languages (${langs.length})`);
}

writeFileSync(
  JSON_FILE_PATH,
  JSON.stringify(Object.fromEntries(langs), null, 2),
);
console.log("done");
