# GitHub Pages Deployment Instructions: Project Seawater

*Note: This file is maintained alongside [`deploy_instructions.md`](deploy_instructions.md).*

Please refer to the complete, detailed deployment documentation in **[`deploy_instructions.md`](deploy_instructions.md)** for in-depth troubleshooting and configuration details.

---

## Quick Reference Summary

1. **Commit and Push Code** (including the newly generated `package-lock.json`):
   ```bash
   git add .
   git commit -m "fix(deploy): sync package-lock, configure base path, and update GitHub Pages workflow"
   git push origin main
   ```

2. **Enable GitHub Actions for Pages**:
   - In your GitHub repository, open **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.

3. **Automated Pipeline**:
   - The workflow in `.github/workflows/deploy-pages.yml` automatically builds the static assets with `VITE_BASE_PATH: /seawater-playbook/`, creates the `dist/404.html` fallback, and publishes the site to:
     `https://<your-username>.github.io/seawater-playbook/`

4. **All 4 Build Issues Resolved**:
   - **Lockfile mismatch**: Fresh `package-lock.json` generated, with resilient fallback (`npm ci || npm install --no-audit`).
   - **Base path 404s**: Configured base path to `/seawater-playbook/` for GitHub Pages.
   - **Linux case sensitivity**: 100% verified across all component imports.
   - **TypeScript checks**: Strict type checks pass with zero errors.

For full technical details, see **[`deploy_instructions.md`](deploy_instructions.md)**.
