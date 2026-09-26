#!/usr/bin/env node
// Inlines the (purged) main.css into every page of the built site so the first
// render doesn't wait on a stylesheet request. Run after `jekyll build` and purgecss.
// https://developer.chrome.com/docs/performance/insights/render-blocking

const fs = require("fs");
const path = require("path");

const site = path.resolve(process.argv[2] || "_site");
const linkTag = /<link rel="?stylesheet"? href="?([^"\s>]*\/assets\/css\/main\.css)(?:\?[^"\s>]*)?"?\s*\/?>/;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith(".html") ? [full] : [];
  });

let css;
let count = 0;
for (const file of walk(site)) {
  const html = fs.readFileSync(file, "utf8");
  const match = html.match(linkTag);
  if (!match) continue;

  if (css === undefined) {
    const href = match[1]; // e.g. /assets/css/main.css
    const cssDir = path.posix.dirname(href);
    css = fs
      .readFileSync(path.join(site, href), "utf8")
      .replace(/\/\*# sourceMappingURL=[^*]*\*\//g, "")
      // Relative urls were relative to the stylesheet; make them absolute so they work from any page
      .replace(/url\((["']?)(?!data:|https?:|\/|#)([^"')]+)\1\)/g, (_, q, p) => `url(${q}${path.posix.join(cssDir, p)}${q})`)
      .replace(/<\/style/gi, "<\\/style")
      .trim();
  }

  fs.writeFileSync(
    file,
    html.replace(match[0], () => `<style>${css}</style>`)
  );
  count++;
}

console.log(`Inlined main.css into ${count} page(s)`);
