// Bring the humans: copy the ad page and its screenshot to /output.
// Deterministic: byte-for-byte copies, no timestamps, no randomness.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
for (const name of ["index.html", "ad.png"]) {
  const src = join(root, name);
  const bytes = statSync(src).size;
  copyFileSync(src, join(outDir, name));
  console.log("copied " + name + " (" + bytes + " bytes)");
}
console.log("done: index.html and ad.png in " + outDir);
