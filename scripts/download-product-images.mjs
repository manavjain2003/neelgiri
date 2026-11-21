/*
  Downloads every product photo from lib/catalog.json into public/products/
  and writes lib/local-images.json so the site serves local copies.

  Run from the project root, on a machine with normal internet access:

      node scripts/download-product-images.mjs

  For each product it tries the largest size first (-500x500, -250x250) and falls
  back to the original 125x125 thumbnail listed in the catalogue.
*/
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "lib/catalog.json"), "utf8"));
const outDir = path.join(root, "public/products");
await mkdir(outDir, { recursive: true });

const candidates = (url) =>
  /-125x125\.[a-z]+$/i.test(url)
    ? [url.replace("-125x125.", "-500x500."), url.replace("-125x125.", "-250x250."), url]
    : [url];

const extFor = (type, url) => {
  if (type?.includes("webp")) return "webp";
  if (type?.includes("png")) return "png";
  if (type?.includes("jpeg") || type?.includes("jpg")) return "jpg";
  return path.extname(new URL(url).pathname).slice(1) || "jpg";
};

const mapping = {};
let ok = 0;
const failed = [];

for (const item of catalog) {
  if (!item.image) continue;
  let saved = false;
  for (const url of candidates(item.image)) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !type.startsWith("image/")) continue;
      const file = `${item.slug}.${extFor(type, url)}`;
      await writeFile(path.join(outDir, file), Buffer.from(await res.arrayBuffer()));
      mapping[item.slug] = `/products/${file}`;
      saved = true;
      ok++;
      console.log(`✔ ${item.slug}  ←  ${url}`);
      break;
    } catch {
      /* try the next size */
    }
  }
  if (!saved) {
    failed.push(item.slug);
    console.log(`✘ ${item.slug}`);
  }
}

await writeFile(path.join(root, "lib/local-images.json"), JSON.stringify(mapping, null, 2) + "\n");
console.log(`\nSaved ${ok} images to public/products. ${failed.length} failed (they keep using the remote URL).`);
