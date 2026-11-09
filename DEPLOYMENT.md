# Wavebound Policy-as-Code — Deployment & Architecture Guide

This guide details the **Dual-Mode Architecture** of Wavebound, enabling you to host the application either as a **pure static site on GitHub Pages** (zero backend cost) or as a **full-stack application on Google Cloud Run / Node.js** (with live Gemini 3.8 Flash generation).

---

## 1. Architecture Overview: Dual-Mode Operation

Wavebound is designed with an adaptive architecture that functions in two distinct modes:

| Feature | Mode A: Static Hosting (GitHub Pages) | Mode B: Full-Stack (Cloud Run / Node.js) |
| :--- | :--- | :--- |
| **Hosting Cost** | $0 / Free (GitHub CDN) | Minimal (Cloud Run scale-to-zero) |
| **Backend Requirement** | None (Runs 100% in browser) | Node.js / Express (`server.ts`) |
| **Policy Sandbox & Rego Generator** | Client-side deterministic rule engine | Live Gemini 3.8 Flash (`@google/genai`) |
| **Quiz Engine** | 30+ curated technical questions | Live dynamic question generator + bank |
| **Interactive Graph Visualizer** | Full SVG & Cytoscape rendering | Full SVG & Cytoscape rendering |
| **16-Week Implementation Track** | All phases, gates & YAML manifests | All phases, gates & YAML manifests |
| **Digital Economy Act (DEA) Resources** | Full statutory references & glossary | Full statutory references & glossary |

---

## 2. Deploying to GitHub Pages (Static Mode)

The repository includes a ready-to-use GitHub Actions workflow at `.github/workflows/deploy-pages.yml` and a portable relative base path (`base: './'`) in `vite.config.ts`.

### Step-by-Step Setup:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: enable GitHub Pages compatibility and DEA documentation"
   git push origin main
   ```
2. **Enable GitHub Pages in your repository settings**:
   - Go to your repository on GitHub: `https://github.com/<your-username>/<your-repo>`.
   - Click **Settings** (tab at top).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment** > **Source**, change the dropdown from *Deploy from a branch* to **GitHub Actions**.
3. **Verify Deployment**:
   - Go to the **Actions** tab in GitHub.
   - The workflow `Deploy Wavebound to GitHub Pages` will run automatically.
   - Once complete, your site will be live at `https://<your-username>.github.io/<your-repo>/`.

*Note: The app uses relative asset resolution (`base: './'`), so it works seamlessly under any repository name or custom domain.*

---

## 3. Spinning Up Live AI Features (Gemini 3.8 Flash)

When you run Wavebound with a Node.js runtime, it leverages the official `@google/genai` TypeScript SDK and `gemini-3.8-flash` to dynamically synthesize SHACL shapes, compile OPA Rego rules, and generate custom quiz scenarios.

### Prerequisites:
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/).

### Local Development with Live AI:
1. **Create an environment file**:
   ```bash
   cp .env.example .env
   ```
2. **Add your Gemini API key**:
   ```bash
   # In .env:
   GEMINI_API_KEY="AIzaSy..."
   PORT=3000
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The dev server will boot `server.ts` with tsx on `http://localhost:3000`.

4. **Verify Live AI Generation**:
   - Open `http://localhost:3000`.
   - Go to the **Policy Sandbox** tab.
   - Enter any natural language data governance requirement and click **Synthesize Policy & Shapes**.
   - The badge will display `Gemini 3.8 Flash Active (Live AI Generation via Express server)`.

### Deploying to Google Cloud Run / Docker:
```bash
# Build the production bundle
npm run build

# Start the full-stack server
npm start
```
The server serves static assets from `./dist` and exposes `/api/generate-policy` and `/api/generate-quiz`.

---

## 4. Digital Economy Act 2017 (DEA) Integration

Wavebound reflects the statutory framework of the **Digital Economy Act 2017 (Part 5, Chapter 5: Research)**:

- **Statutory Gateway**: Mapped in `src/data/resourcesData.ts` alongside UK GDPR / DPA 2018 Section 19 and NHS Act 2006 Section 251.
- **Accreditation Authority**: UK Statistics Authority (UKSA) **Research Accreditation Panel (RAP)**.
- **Key Concepts in Glossary**:
  - `dea-2017`: Statutory public interest research gateway.
  - `rap-uksa`: Independent accreditation committee.
  - `dea-accredited-researcher`: Safe researcher training & accreditation criteria.
- **Official UKSA DEA Accreditation Trilogy**:
  1. [UKSA Research Accreditation Policy (V1.4)](https://s42615.pcdn.co/wp-content/uploads/Accreditation-Policy-V1.4-1.pdf): Statutory governance policy defining the legal scope, principles, and review cycles.
  2. [Accreditation of a Trusted Research Environment SOP (V1.4)](https://s42615.pcdn.co/wp-content/uploads/Accreditation-of-a-Trusted-Research-Environment-standard-operating-procedure-V1.4-1.pdf): Standard operating procedure for assessing and certifying TREs/SDEs as Accredited Processors under Section 71.
  3. [TRE Accreditation Self-Assessment Questionnaire (SAQ V3.1)](https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fs42615.pcdn.co%2Fwp-content%2Fuploads%2FTRE-Accreditation-Self-Assessment-Questionnaire-V3.1.xlsx&wdOrigin=BROWSELINK): The mandatory technical audit matrix evaluating the Five Safes, egress airgaps, and cryptographic audit trails.
- **Preset in Policy Generator**: Interactive test case for **DEA 2017 Data Linkage** validating RAP accreditation, accredited processor safe setting, and Section 67 criminal penalty acknowledgements.

---

## 5. Rollback Instructions (Revert Option)

If you wish to roll back or return to a server-only configuration:

### Option 1: Revert via Git (Recommended)
To revert the GitHub Pages changes and restore the previous commit:
```bash
# View recent commits
git log --oneline -n 5

# Revert the latest commit cleanly
git revert HEAD

# Or checkout a previous commit directly
git checkout <commit-hash>
```

### Option 2: Disable GitHub Pages Deployment
If you only want to stop GitHub Pages deployment without altering source code:
- Go to repository **Settings** > **Pages** on GitHub.
- Under **GitHub Pages**, select the three dots `...` and click **Unpublish site**.
- Delete or rename `.github/workflows/deploy-pages.yml` (e.g. `.github/workflows/deploy-pages.yml.disabled`).

### Option 3: Force Server-Only Base Path
In `vite.config.ts`, if you want to enforce an absolute root path instead of relative:
```typescript
// vite.config.ts
base: '/',
```
