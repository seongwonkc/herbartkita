# Herbart Kita

Website for Herbart Kita Publishing. Eleventy 3, static, hosted on GitHub Pages.

```bash
npm install
npm run dev        # http://localhost:8080/herbartkita/
bash scripts/deploy.sh   # build + push _site to gh-pages
```

## Filling in details

Everything factual lives in two data files. Blank fields are hidden on the site, and the build prints which ones are still blank.

**`src/_data/site.json`**
- `email`: turns on the submission and internship application buttons
- `url`: canonical URL, once there is a domain
- `business`: 상호 · 대표자 · 사업자등록번호 · 주소 (shown in the footer and on About)

**`src/_data/books.json`**: the "Our books" section on the home page appears once this has entries.

```json
[
  {
    "title": "Book title",
    "author": "Author name",
    "authorNote": "Grade 11, Seoul",
    "cover": "/assets/img/covers/book-title.jpg",
    "blurb": "One or two sentences.",
    "amazonUrl": "https://www.amazon.com/dp/..."
  }
]
```

## Custom domain

When a domain points at GitHub Pages: add `src/CNAME` (passthrough it), then deploy with `PATH_PREFIX=/`.
