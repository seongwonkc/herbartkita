const { HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Rewrites root-relative URLs for the GitHub Pages project path (/herbartkita/).
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Blank fields in site.json are omitted from the page, never shown as placeholders.
  // List them at build time so nothing ships half-filled by accident.
  eleventyConfig.on("eleventy.before", () => {
    const site = require("./src/_data/site.json");
    const missing = [];
    const walk = (obj, path) => {
      for (const [k, v] of Object.entries(obj)) {
        const p = path ? `${path}.${k}` : k;
        if (v && typeof v === "object" && !Array.isArray(v)) walk(v, p);
        else if (v === "") missing.push(p);
      }
    };
    walk(site, "");
    if (missing.length) {
      console.warn(`[herbartkita] site.json fields still blank (hidden on the site): ${missing.join(", ")}`);
    }
  });

  return {
    // Set PATH_PREFIX=/ once a custom domain points at the site.
    pathPrefix: process.env.PATH_PREFIX ?? "/herbartkita/",
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
