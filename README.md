# Herbart Kita

Website for Herbart Kita Publishing. Eleventy 3, static, hosted on GitHub Pages.

```bash
npm install
npm run dev        # http://localhost:8080/herbartkita/
bash scripts/deploy.sh   # build + push _site to gh-pages
```

## Filling in details

Everything factual lives in the data files below. Blank fields are hidden on the site, and the build prints which ones are still blank.

**`src/_data/site.json`**
- `email`: turns on the submission and internship application buttons
- `url`: canonical URL, once there is a domain
- `business`: 상호 · 대표자 · 사업자등록번호 · 주소 (shown in the footer and on About)

**`src/_data/books.json`**: every book on the site (home wall, Books page, Publish strip). A book with no `cover` gets a typeset cover in `coverColor`. Only add `links` for listings that are live on Amazon.

**`src/_data/authors.json`**: order of author sections on /books/, plus an optional note (HTML allowed).

**`src/_data/founders.json`**: founder bios; `summary` is the short version on the home page.

```json
[
  {
    "title": "Book title",
    "author": "Author name",
    "subtitle": "Subtitle",
    "series": "Series name (optional)",
    "cover": "/assets/img/covers/book-title.jpg",
    "blurb": "One or two sentences (optional).",
    "links": [{ "label": "Kindle", "url": "https://www.amazon.com/dp/..." }]
  }
]
```

## Custom domain

When a domain points at GitHub Pages: add `src/CNAME` (passthrough it), then deploy with `PATH_PREFIX=/`. In Git Bash, prefix it with `MSYS_NO_PATHCONV=1` or the `/` is rewritten to a Windows path.
