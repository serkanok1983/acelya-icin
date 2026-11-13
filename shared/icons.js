/**
 * Site favicon — tum sayfalarda dogru yol ve PNG yedegi
 */
(function () {
  "use strict";

  function siteBase() {
    const path = location.pathname || "/";
    const last = path.lastIndexOf("/");
    return last >= 0 ? path.slice(0, last + 1) : "/";
  }

  function ensureIcons() {
    const base = siteBase();
    const links = [
      { rel: "icon", type: "image/png", sizes: "32x32", href: base + "favicon-32.png" },
      { rel: "icon", type: "image/svg+xml", href: base + "favicon.svg" },
      { rel: "apple-touch-icon", sizes: "180x180", href: base + "apple-touch-icon.png" },
    ];
    links.forEach((cfg) => {
      const sel =
        cfg.rel === "icon" && cfg.type
          ? `link[rel="icon"][type="${cfg.type}"]`
          : `link[rel="${cfg.rel}"]`;
      if (document.querySelector(sel)) return;
      const link = document.createElement("link");
      Object.assign(link, cfg);
      document.head.appendChild(link);
    });
  }

  if (document.head) ensureIcons();
  else document.addEventListener("DOMContentLoaded", ensureIcons);

  window.AcelyaIcons = { ensureIcons, siteBase };
})();
