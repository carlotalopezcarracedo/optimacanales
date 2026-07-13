(() => {
  const config = window.OPTIMA_SITE || {};
  const brandName = config.commercialName || "Óptima Canales";
  const legalName = config.legalName || "ÓPTIMA MERCADO ENERGÉTICO SL";
  const contactEmail = config.contactEmail || "info@optimamercado.com";

  const normalizeUrl = (value) => String(value || "").trim().replace(/\/+$/, "");
  const pageRoute = () => {
    const file = window.location.pathname.split("/").pop() || "";
    return !file || file === "index.html" ? "/" : `/${file}`;
  };
  const currentPageUrl = () => {
    const configured = normalizeUrl(config.siteUrl);
    const route = pageRoute();
    if (configured) {
      return route === "/" ? `${configured}/` : `${configured}${route}`;
    }
    if (window.location.protocol.startsWith("http")) {
      const url = new URL(window.location.href);
      url.hash = "";
      url.search = "";
      return url.href;
    }
    return pageRoute();
  };

  document.querySelectorAll("[data-brand]").forEach((node) => {
    node.textContent = brandName;
  });

  document.querySelectorAll("[data-legal-name]").forEach((node) => {
    node.textContent = legalName;
  });

  document.querySelectorAll("[data-email-link]").forEach((node) => {
    node.setAttribute("href", `mailto:${contactEmail}`);
    if (node.textContent.trim().toLowerCase() === "email") {
      node.textContent = contactEmail;
    }
  });

  document.querySelectorAll("[data-b2c-link]").forEach((node) => {
    node.setAttribute("href", config.b2cSiteUrl || "#");
  });

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", currentPageUrl());
  }
})();
