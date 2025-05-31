import yaml from 'js-yaml'
import fs from 'fs'

/**
 * This script fetches the colors of programming languages from GitHub's Linguist library
 * and writes them to a JSON file.
 *
 * Usage:
 * 1. Ensure you have Node.js installed.
 * 2. Run `npm install js-yaml` to install the required package.
 * 3. Run this script using `node update.ts`.
 */

(async () => {
  console.log('ℹ️ fetching colors from linguist...');
  const LINGUIST_URL = "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml"
  const data = await fetch(LINGUIST_URL).then(r => r.text()).then(t => yaml.load(t)) as Record<string, { color: string }>;
  const json = Object.entries(data).reduce((acc, [languageName, { color }]) => {
    if (!color) {
      return acc
    }
    return { ...acc, [languageName]: color.toLowerCase() }
  }, {} as Record<string, string>);

  const languagesCount = Object.keys(json).length;
  console.log(`ℹ️ found ${languagesCount} languages with colors.`);
  if (languagesCount < 500 || languagesCount > 1000) {
    throw new Error('Expected between 500 and 1000, but found ' + languagesCount);
  }

  console.log('ℹ️ writing to colors.json file...');
  fs.writeFileSync('./colors.json', JSON.stringify(json, null, 2), 'utf-8');
  console.log('✅ done')
})()