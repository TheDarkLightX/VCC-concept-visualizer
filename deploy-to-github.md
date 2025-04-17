# Deploying to GitHub Pages

This document provides instructions for deploying the VCC Concept Visualizer to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your local machine
3. Repository access and permissions

## Deployment Steps

### One-Time Setup

1. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Repository name: `VCC-concept-visualizer` (or your preferred name)
   - Make it public (required for GitHub Pages free hosting)

2. **Connect your local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/VCC-concept-visualizer.git
   ```

3. **Prepare your project**:
   - Make sure the `homepage` field in `package.json` is set to your GitHub Pages URL:
   ```json
   "homepage": "https://YOUR-USERNAME.github.io/VCC-concept-visualizer"
   ```

### Deploy Using the Script

1. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

3. The script will:
   - Build your project
   - Create necessary GitHub Pages files (.nojekyll)
   - Push the built project to the `gh-pages` branch

### Setting Up GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Under "Source", select the `gh-pages` branch
4. Click "Save"
5. After a few minutes, your site will be available at:
   `https://YOUR-USERNAME.github.io/VCC-concept-visualizer`

## Using a Custom Domain (Optional)

1. Purchase a domain from a domain registrar
2. In your repository Settings > Pages:
   - Enter your custom domain in the "Custom domain" field
   - Click "Save"
3. Configure your domain registrar:
   - Add a CNAME record pointing to `YOUR-USERNAME.github.io`
   - If using an apex domain, set up A records pointing to GitHub Pages IP addresses

4. In the `deploy.sh` script, uncomment and update the CNAME line:
   ```bash
   echo "your-custom-domain.com" > CNAME
   ```

## Troubleshooting

- If deployment fails, check your git authentication
- Ensure your repository is public for free GitHub Pages hosting
- Verify your package.json contains the correct homepage URL
- Check GitHub Pages settings to confirm the correct branch is selected

---

Remember that GitHub Pages uses HTTPS by default, which provides secure connections for your website visitors.