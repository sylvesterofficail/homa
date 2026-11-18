#!/usr/bin/env bash
# Build the site and copy it to the repo root, which GitHub Pages serves (main branch, / root).
set -euo pipefail
cd "$(dirname "$0")/.."
NEXT_PUBLIC_BASE_PATH=/homa NEXT_TELEMETRY_DISABLED=1 npx next build
ROOT=..
# remove the previous build, keep the source folder, git data and README
find "$ROOT" -mindepth 1 -maxdepth 1 ! -name source ! -name .git ! -name README.md ! -name .gitignore -exec rm -rf {} +
cp -r out/. "$ROOT"/
touch "$ROOT/.nojekyll"
echo "Built site copied to repo root. Commit and push to publish."
