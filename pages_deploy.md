# GitHub Pages Deployment Instructions: Project Seawater

*Note: This file is maintained alongside [`deploy_instructions.md`](deploy_instructions.md).*

Please refer to the full deployment documentation in **[`deploy_instructions.md`](deploy_instructions.md)** for detailed, step-by-step guidance on deploying Project Seawater to GitHub Pages.

---

## Quick Reference Summary

1. **Commit and Push Code**:
   ```bash
   git add .
   git commit -m "feat: deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Actions for Pages**:
   - In GitHub, go to **Settings > Pages**.
   - Under **Build and deployment > Source**, choose **GitHub Actions**.

3. **Automatic Deployment**:
   - The workflow in `.github/workflows/deploy-pages.yml` will automatically build the static assets and deploy the site to:
     `https://<your-username>.github.io/<your-repository>/`

4. **Build Settings**:
   - Built with Vite relative base path (`base: './'`).
   - Runs 100% client-side with zero backend server dependencies required for public browsing.

For complete troubleshooting, custom domain configuration, and manual deployment alternatives, see **[`deploy_instructions.md`](deploy_instructions.md)**.
