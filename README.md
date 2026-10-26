# TRE Policy-as-Code Playbook

An interactive learning platform for Trusted Research Environment (TRE) and Secure Data Environment (SDE) policy-as-code governance. Explore the playbook, technical concepts, governance graph, glossary, resources, and quizzes in one place. 

For the separate implementation track from this educational playbook to tested, operational policy enforcement, see the [Policy-as-Code implementation guide](policy-as-code/README.md).

## Links

- [GitHub repository](https://github.com/iwfarr/seawater-playbook)
- [GitHub Pages site](https://iwfarr.github.io/seawater-playbook/) (intended URL; Pages deployment is not configured yet)

GitHub's former `git.io` URL shortener has been retired. GitHub Pages is the current option for hosting a project page. The static site uses the built-in curated quiz bank; Gemini-generated quizzes are optional and require a separate server deployment.

## GitHub Pages

The GitHub Actions workflow builds and publishes the static frontend to Pages whenever changes are pushed to `main`. To enable deployment, open the repository's **Settings > Pages** and set the build and deployment source to **GitHub Actions**. After the first successful deployment, the site will be available at [https://iwfarr.github.io/seawater-playbook/](https://iwfarr.github.io/seawater-playbook/).

The static site does not require AI quiz generation or a Gemini API key. Gemini-generated quizzes are an optional feature for deployments that also run the Express server.

## Run locally

### Requirements

- Node.js 22.12+
- npm

### Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For optional AI-generated quizzes in a server-hosted deployment, set `GEMINI_API_KEY` in a local `.env` file before starting the server:

```env
GEMINI_API_KEY=your_api_key
```

Without the key, quizzes use the built-in curated question bank.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Express server with the Vite development middleware |
| `npm run build` | Build the frontend into `dist/` |
| `npm start` | Start the production Express server (build first) |
| `npm run preview` | Preview the Vite production build |
| `npm run lint` | Run the TypeScript compiler without emitting files |

## Technology

- React and TypeScript
- Vite and Tailwind CSS
- Express server with optional Google Gemini quiz generation
- Cytoscape.js governance graph