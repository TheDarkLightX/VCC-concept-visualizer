#!/bin/bash

# Exit on error
set -e

# Repository information
GITHUB_USERNAME="TheDarkLightX"
REPO_NAME="VCC-concept-visualizer"
BASE_URL="/${REPO_NAME}/"

# Build project with GitHub Pages config
echo "Building project for GitHub Pages..."
NODE_ENV=production npx vite build --config vite.gh-pages.config.js

# Navigate to the build directory
cd dist

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Create CNAME file if you have a custom domain
# echo "your-custom-domain.com" > CNAME

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
  git init
  git checkout -b gh-pages
else
  git checkout gh-pages || git checkout -b gh-pages
fi

# Configure Git identity (needed for the commit)
git config user.email "deployment@example.com"
git config user.name "GitHub Pages Deployment Script"

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch of your repository
git push -f "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git" gh-pages

echo "Deployment completed successfully!"
echo "Your site will be available at: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"