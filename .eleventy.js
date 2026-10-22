const { HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Rewrites root-relative URLs for the GitHub Pages project path (/herbartkita/).
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  // Nunjucks selectattr only tests truthiness; this one matches a value.
  eleventyConfig.addFilter("where", (arr, key, value) => (arr || []).filter((x) => x[key] === value));

  // Blank fields in site.json are omitted from the page, never shown as placeholders.
  // List them at build time so nothing ships half-filled by accident.
  // Program details (programs.json) are the opposite: blanks show as a visible [TBD] mark.
  eleventyConfig.on("eleventy.before", () => {
    const blanks = (obj, path = "", out = []) => {
      for (const [k, v] of Object.entries(obj)) {
        const p = path ? `${path}.${k}` : k;
        if (v && typeof v === "object" && !Array.isArray(v)) blanks(v, p, out);
        else if (v === "" || (Array.isArray(v) && v.length === 0)) out.push(p);
      }
      return out;
    };
    const site = blanks(require("./src/_data/site.json"));
    if (site.length) {
      console.warn(`[herbartkita] site.json fields still blank (hidden on the site): ${site.join(", ")}`);
    }
    const programs = blanks(require("./src/_data/programs.json"));
    if (programs.length) {
      console.warn(`[herbartkita] programs.json fields still TBD (shown as [TBD] on the site): ${programs.join(", ")}`);
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
