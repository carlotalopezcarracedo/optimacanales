import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

await import(pathToFileURL(path.join(root, "site-config.js")).href);

const config = globalThis.OPTIMA_SITE || {};
const configuredSiteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  config.siteUrl ||
  "";

function normalizeSiteUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function githubPagesFallback() {
  const repository = process.env.GITHUB_REPOSITORY || "";
  const [owner, repo] = repository.split("/");
  if (!owner || !repo) {
    return "http://localhost:8080";
  }

  const userPageRepo = `${owner}.github.io`.toLowerCase();
  const repoPart = repo.toLowerCase() === userPageRepo ? "" : `/${repo}`;
  return `https://${owner}.github.io${repoPart}`;
}

const siteUrl = normalizeSiteUrl(configuredSiteUrl || githubPagesFallback());
const routes = ["/", "/privacidad.html", "/aviso-legal.html", "/cookies.html"];
const today = new Date().toISOString().slice(0, 10);
const htmlRoutes = new Map([
  ["index.html", "/"],
  ["privacidad.html", "/privacidad.html"],
  ["aviso-legal.html", "/aviso-legal.html"],
  ["cookies.html", "/cookies.html"],
]);

function absoluteUrl(route) {
  return route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function replaceTagAttribute(html, tagPattern, attribute, value) {
  const expression = new RegExp(`(<${tagPattern}[^>]*\\s${attribute}=")[^"]*(")`, "i");
  return html.replace(expression, `$1${value}$2`);
}

function updateHtmlUrls() {
  for (const [fileName, route] of htmlRoutes) {
    const filePath = path.join(root, fileName);
    if (!fs.existsSync(filePath)) continue;

    const pageUrl = absoluteUrl(route);
    let html = fs.readFileSync(filePath, "utf8");
    html = replaceTagAttribute(html, 'link[^>]*rel="canonical"', "href", pageUrl);

    if (fileName === "index.html") {
      html = replaceTagAttribute(html, 'meta[^>]*property="og:url"', "content", pageUrl);
      html = replaceTagAttribute(html, 'meta[^>]*property="og:image"', "content", `${siteUrl}/public/optima-logo-color.png`);
      html = replaceTagAttribute(html, 'meta[^>]*name="twitter:image"', "content", `${siteUrl}/public/optima-logo-color.png`);
    }

    fs.writeFileSync(filePath, html, "utf8");
  }
}

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemapItems = routes
  .map((route) => {
    const loc = absoluteUrl(route);
    const priority = route === "/" ? "1.0" : "0.5";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems}
</urlset>
`;

if (process.env.DRY_RUN === "1") {
  console.log(robots);
  console.log(sitemap);
} else {
  fs.writeFileSync(path.join(root, "robots.txt"), robots, "utf8");
  fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
  updateHtmlUrls();
}

console.log(`SEO files generated for ${siteUrl}`);
