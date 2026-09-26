#!/usr/bin/env node
// Inlines the (purged) main.css into every page of the built site so the first
// render doesn't wait on a stylesheet request. Run after `jekyll build` and purgecss.
// https://developer.chrome.com/docs/performance/insights/render-blocking
//
// The site-wide purge keeps every rule used by *any* page. Each page gets its own
// purge against its HTML and the local scripts it loads, so it only carries its own rules.
// https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules

const fs = require("fs");
const path = require("path");
const { PurgeCSS } = require("purgecss");
const { content, css: _css, output, skippedContentGlobs, ...purgeOptions } = require("../purgecss.config.js");

const site = path.resolve(process.argv[2] || "_site");
const linkTag = /<link rel="?stylesheet"? href="?([^"\s>]*\/assets\/css\/main\.css)(?:\?[^"\s>]*)?"?\s*\/?>/;
const scriptSrc = /<script\b[^>]*\bsrc="?([^"\s>]+)/g;

// The minified Bootstrap bundle names every component class (modal, carousel, toast...),
// so scanning it would keep them all on every page. Instead, list only the classes,
// elements and attributes its plugins (v4.6) add at runtime; everything else they
// style is already in the page's markup.
const bootstrapBundle = /\/bootstrap\.bundle(\.min)?\.js$/;
const bootstrapRuntime = `
  <body class="modal-open">
  <div class="show showing hide fade collapse collapsing collapsed width active focus position-static
    modal-backdrop modal-static modal-scrollbar-measure pointer-event
    carousel-item-next carousel-item-prev carousel-item-left carousel-item-right"></div>
  <div class="tooltip bs-tooltip-top bs-tooltip-right bs-tooltip-bottom bs-tooltip-left bs-tooltip-auto"
    x-placement="top right bottom left"><div class="arrow"></div><div class="tooltip-inner"></div></div>
  <div class="popover bs-popover-top bs-popover-right bs-popover-bottom bs-popover-left bs-popover-auto"
    x-placement="top right bottom left"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>
`;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith(".html") ? [full] : [];
  });

// Local scripts a page loads, which may add classes at runtime
const localScripts = (file, html) =>
  [...html.matchAll(scriptSrc)]
    .map((m) => m[1].split(/[?#]/)[0])
    .filter((src) => !/^(https?:)?\/\//.test(src))
    .map((src) => (src.startsWith("/") ? path.join(site, src) : path.resolve(path.dirname(file), src)))
    .filter((script) => fs.existsSync(script));

(async () => {
  let css;
  let count = 0;
  let before = 0;
  let after = 0;
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
        .trim();
    }

    const scripts = localScripts(file, html);
    const pageContent = [{ raw: html, extension: "html" }, ...scripts.filter((s) => !bootstrapBundle.test(s))];
    if (scripts.some((s) => bootstrapBundle.test(s))) pageContent.push({ raw: bootstrapRuntime, extension: "html" });

    const [result] = await new PurgeCSS().purge({ ...purgeOptions, content: pageContent, css: [{ raw: css }] });
    const pageCss = result.css.trim().replace(/<\/style/gi, "<\\/style");

    fs.writeFileSync(
      file,
      html.replace(match[0], () => `<style>${pageCss}</style>`)
    );
    count++;
    before += css.length;
    after += pageCss.length;
  }

  const kib = (n) => (n / Math.max(count, 1) / 1024).toFixed(1);
  console.log(`Inlined main.css into ${count} page(s), purged per page from ${kib(before)} to ${kib(after)} KiB on average`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
