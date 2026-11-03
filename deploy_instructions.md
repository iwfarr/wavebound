# GitHub Pages Deployment Instructions: Project Seawater

This guide provides step-by-step instructions for deploying the **Project Seawater Policy-as-Code Playbook** to **GitHub Pages** as a fast, reliable, zero-cost static web application.

---

## 1. Summary of Build & Deployment Fixes Applied

The repository has been updated with solutions for the common GitHub Actions build failure modes:

| Issue | Root Cause | Automated Solution Applied |
| :--- | :--- | :--- |
| **Lockfile Out of Sync / Missing** | `npm ci` fails with `EUSAGE` when `package-lock.json` is missing or out of sync with platform packages | Generated a fresh, complete `package-lock.json`. Updated `.github/workflows/deploy-pages.yml` with resilient installation: attempts `npm ci` first, and gracefully falls back to `npm install --no-audit` if lockfile mismatch occurs on remote runners. |
| **setup-node Cache Error** | `actions/setup-node@v4` with `cache: 'npm'` errors when `package-lock.json` is absent | Removed hard cache requirement in `setup-node`, preventing early runner aborts. |
| **Vite Base Path 404s** | Without `base: '/seawater-playbook/'`, assets (JS/CSS) resolve to the root domain and return 404 on GitHub Pages | Updated `vite.config.ts` to automatically detect CI / GitHub Actions and set `base: '/seawater-playbook/'` (or `VITE_BASE_PATH`), while retaining relative `./` for local development. Explicitly passed `VITE_BASE_PATH: /seawater-playbook/` in the workflow. |
| **Direct Reload 404s** | Single-page apps return 404 when refreshing non-root paths on GitHub Pages | Added automated creation of `dist/404.html` (copying `index.html`) in the workflow build step. |
| **Linux Case Sensitivity** | `ubuntu-latest` runners enforce strict case sensitivity on file imports | Formally audited all imports across `src/` to confirm 100% exact case matching with filenames on disk. |
| **TypeScript Strict Checking** | Build halts on type errors or unused variables | Confirmed strict TypeScript passing (`tsc --noEmit` and `tsc -b`). Ensured `skipLibCheck: true` in `tsconfig.json` to prevent third-party declaration collisions. |

---

## 2. Automated Deployment via GitHub Actions (Recommended)

The repository includes a production-ready GitHub Actions workflow file located at `.github/workflows/deploy-pages.yml`.

### Step 1: Push Code to GitHub

Ensure all updated files (including `package-lock.json`, `.github/workflows/deploy-pages.yml`, and `vite.config.ts`) are committed and pushed:

```bash
# Check status of modified and new files
git status

# Stage all changes including package-lock.json and workflow
git add .

# Commit with a clear message
git commit -m "fix(deploy): sync package-lock, configure base path, and update GitHub Pages workflow"

# Push to your main branch
git push origin main
```

*(If your default branch is `master`, the workflow automatically triggers on pushes to either `main` or `master`.)*

### Step 2: Enable GitHub Pages in Repository Settings

1. Open your repository in your web browser:
   `https://github.com/<your-username>/seawater-playbook`
2. Click on the **Settings** tab at the top of the repository.
3. In the left navigation menu under **Code and automation**, click **Pages**.
4. In the **Build and deployment** section:
   - Under **Source**, select **GitHub Actions** from the dropdown menu (do not select *Deploy from a branch*).
5. GitHub will display a message confirming that GitHub Actions is now configured as the deployment source.

### Step 3: Monitor Workflow Execution

1. Click on the **Actions** tab at the top of your repository.
2. Select the latest workflow run named **Deploy Seawater to GitHub Pages**.
3. The workflow executes two clean steps:
   - **build**: Sets up Node.js 22, installs dependencies via resilient fallback, runs type checks, builds the static bundle with `VITE_BASE_PATH: /seawater-playbook/`, creates `dist/404.html`, and uploads the artifact.
   - **deploy**: Publishes the bundle to GitHub Pages.
4. When both jobs show a green checkmark, your site is live.

### Step 4: Access Your Live Site

Your application is accessible at:

`https://<your-username>.github.io/seawater-playbook/`

---

## 3. Local Build Verification

To verify that the build compiles and packages cleanly before pushing:

```bash
# 1. Clean build
npm run build

# 2. Run TypeScript checks
npm run lint

# 3. Preview production build locally
npm run preview
```

Open the printed URL (typically `http://localhost:4173/seawater-playbook/` or `http://localhost:4173/`) in your browser to verify that all assets, logos, Cytoscape graph views, and interactive tabs render properly.

---

## 4. Custom Domain Configuration (Optional)

To serve the application from your own domain (e.g., `playbook.yourdomain.org`):

1. **DNS Setup**:
   - For a subdomain (e.g., `playbook.yourdomain.org`), create a `CNAME` record pointing to `<your-username>.github.io`.
   - For an apex domain (`yourdomain.org`), create `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
2. **Base Path for Custom Domain**:
   - If using a custom root domain, change `VITE_BASE_PATH` in `.github/workflows/deploy-pages.yml` from `/seawater-playbook/` to `/`.
3. **Configure Custom Domain in GitHub**:
   - In repository **Settings > Pages**, enter your domain name in the **Custom domain** field and click **Save**.
   - Check the **Enforce HTTPS** box once DNS propagation completes and the TLS certificate issues.

---

## 5. Troubleshooting & FAQs

### Q1: The site displays a blank page or 404 on assets
- **Cause**: Assets were requested from `/assets/...` instead of `/seawater-playbook/assets/...`.
- **Solution**: The workflow now automatically injects `VITE_BASE_PATH: /seawater-playbook/` during `npm run build`, and `vite.config.ts` automatically defaults to `/seawater-playbook/` in GitHub Actions.

### Q2: 404 error when refreshing or directly navigating to a subpage
- **Cause**: GitHub Pages looks for physical HTML files on disk for arbitrary URL paths.
- **Solution**: The workflow now creates `dist/404.html` by duplicating `dist/index.html`. GitHub Pages automatically serves `404.html` on deep links, allowing the React router to mount smoothly.

### Q3: Workflow fails with "Permission to github-pages denied"
- **Cause**: GitHub Actions lacks write permissions for Pages deployment.
- **Solution**: Go to **Settings > Actions > General**. Under **Workflow permissions**, select **Read and write permissions**, then re-run the workflow.
