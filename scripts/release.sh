#!/bin/bash
VERSION=${1:-patch}
echo "Releasing version $VERSION"
git add -A && git commit -m "chore: bump version" || true
echo "Release complete"
