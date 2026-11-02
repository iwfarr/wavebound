# GitHub Pages Deployment Instructions: Project Seawater

This guide provides step-by-step instructions for deploying the **Project Seawater Policy-as-Code Playbook** to **GitHub Pages** as a fast, reliable, zero-cost static web application.

---

## 1. Deployment Overview

Project Seawater is built with React, TypeScript, Vite, and Tailwind CSS. The entire application runs client-side with zero backend dependencies required for public browsing:

- **100% Static Compatibility**: The interactive Playbook, Dual Atlas (Public Journey Map and Cytoscape Technical Knowledge Graph), Policy Sandbox (deterministic SHACL shape and OPA Rego generator), Curated Quiz Engine (30+ questions), and Statutory Reference Library operate entirely within modern web browsers.
- **Universal Base Path**: The build configuration in `vite.config.ts` uses relative paths (`base: './'`), allowing the application to be deployed seamlessly under any repository name (e.g., `https://<username>.github.io/<repository-name>/`) or custom apex/sub-domain without hardcoded path rewrites.
- **Zero Hosting Cost**: Hosted via GitHub's global content delivery network (CDN) with free automated SSL/TLS certificates.

---

## 2. Automated Deployment via GitHub Actions (Recommended)

The repository includes a production-ready GitHub Actions workflow file located at `.github/workflows/deploy-pages.yml`.

### Step 1: Push Code to GitHub

Ensure all recent changes are committed and pushed to your GitHub repository:

```bash
git add .
git commit -m "docs: add GitHub Pages deployment instructions and update landing page"
git push origin main
```

*(If your default branch is `master`, the workflow automatically triggers on pushes to either `main` or `master`.)*

### Step 2: Enable GitHub Pages in Repository Settings

1. Open your repository in your web browser:
   `https://github.com/<your-username>/<your-repository>`
2. Click on the **Settings** tab at the top of the repository.
3. In the left navigation menu under **Code and automation**, click **Pages**.
4. In the **Build and deployment** section:
   - Under **Source**, select **GitHub Actions** from the dropdown menu (do not select *Deploy from a branch*).
5. GitHub will display a message confirming that GitHub Actions is now configured as the deployment source.

### Step 3: Monitor Workflow Execution

1. Click on the **Actions** tab at the top of your repository.
2. You will see a running workflow named **Deploy Seawater to GitHub Pages**.
3. Click on the workflow run to observe the build and deployment steps:
   - **build**: Checks out the code, sets up Node.js 22, runs `npm ci`, builds production assets via `npm run build`, and uploads the `./dist` artifact.
   - **deploy**: Posts the artifact to the GitHub Pages edge network.
4. When both jobs show a green checkmark, the deployment is complete.

### Step 4: Access Your Live Site

GitHub Pages will publish the live site URL directly in the workflow summary and on the **Settings > Pages** screen:

`https://<your-username>.github.io/<your-repository>/`

---

## 3. Alternative: Manual Deployment via `gh-pages` Branch

If your organization prefers deploying pre-built artifacts to a dedicated `gh-pages` branch instead of using GitHub Actions:

### Method A: Using the `gh-pages` npm Package

1. Install `gh-pages` as a development dependency:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Run the deploy command:
   ```bash
   npm run deploy
   ```

4. In **Settings > Pages**, set **Source** to **Deploy from a branch**, and select `gh-pages` / `/ (root)`.

### Method B: Git Subtree Push

```bash
npm run build
git add dist -f
git commit -m "build: publish dist to gh-pages"
git subtree push --prefix dist origin gh-pages
```

---

## 4. Custom Domain Configuration (Optional)

To serve the application from your own domain (e.g., `playbook.yourdomain.org`):

1. **Add DNS Records with Your DNS Provider**:
   - For an apex domain (`yourdomain.org`), create `A` records pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For a subdomain (`playbook.yourdomain.org`), create a `CNAME` record pointing to `<your-username>.github.io`.
2. **Configure Custom Domain in GitHub**:
   - In repository **Settings > Pages**, enter your domain name in the **Custom domain** field and click **Save**.
   - Check the **Enforce HTTPS** box once DNS propagation completes and the TLS certificate issues.

---

## 5. Local Build Verification

Before pushing changes to GitHub, you can test the production build locally:

```bash
# 1. Clean install dependencies
npm ci

# 2. Compile and package the production bundle
npm run build

# 3. Preview the production build locally
npm run preview
```

Open the printed URL (typically `http://localhost:4173/`) in your browser to verify that all assets, logos, Cytoscape graph views, and interactive tabs render properly.

---

## 6. Troubleshooting & FAQs

### Q1: The site displays a blank page or 404 on assets
- **Cause**: Assets were built with an absolute `/` base path rather than relative `./`.
- **Solution**: Check `vite.config.ts`. The default repository configuration is already set to `base: process.env.VITE_BASE_PATH || './'`. Ensure that no custom environment variable overrides this during the GitHub Actions build.

### Q2: 404 error when refreshing deep links
- **Cause**: Single Page Applications (SPAs) use client-side routing. When refreshing a path directly on GitHub Pages, the server looks for a physical directory file.
- **Solution**: The application uses a unified state-driven route manager with bookmarkable hash fragments. If you add HTML5 browser history paths, place a copy of `index.html` as `404.html` in the `./dist` folder during build:
  ```bash
  cp dist/index.html dist/404.html
  ```

### Q3: GitHub Actions fails with "Permission to github-pages denied"
- **Cause**: Workflow permissions have not been granted in repository settings.
- **Solution**: Go to **Settings > Actions > General**. Under **Workflow permissions**, select **Read and write permissions**, then re-run the workflow.

---

## 7. Rollback & Unpublishing Instructions

If you need to unpublish or roll back your GitHub Pages deployment:

1. **Unpublish via GitHub Web UI**:
   - Navigate to **Settings > Pages**.
   - Under the top **GitHub Pages** active deployment status banner, click the **...** (three dots) button and select **Unpublish site**.
2. **Roll Back Code via Git**:
   ```bash
   # View recent commit history
   git log --oneline -n 5

   # Revert the latest deployment commit
   git revert HEAD
   git push origin main
   ```
3. **Disable Automatic Workflow**:
   - In `.github/workflows/deploy-pages.yml`, comment out or delete the `push:` event trigger, or temporarily rename the file to `deploy-pages.yml.disabled`.
