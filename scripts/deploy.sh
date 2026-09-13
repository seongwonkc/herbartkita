#!/usr/bin/env bash
# Build the site and publish _site/ to the gh-pages branch (GitHub Pages).
set -euo pipefail
cd "$(dirname "$0")/.."

SRC_SHA=$(git rev-parse --short HEAD)
rm -rf _site
npx @11ty/eleventy
touch _site/.nojekyll

cd _site
git init -q -b gh-pages
git add .
git commit -qm "Deploy ${SRC_SHA}"
git push -f https://github.com/seongwonkc/herbartkita.git gh-pages
rm -rf .git
echo "Published ${SRC_SHA} to gh-pages"
