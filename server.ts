import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Ensure HMR is disabled in AI Studio environment to prevent WebSocket reconnection errors across proxy
process.env.DISABLE_HMR = 'true';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Endpoint to read the original playbook
app.get('/api/playbook', (req: Request, res: Response) => {
  try {
    const playbookPath = path.resolve(__dirname, 'public/assets/aistudio/Graph-Based_Policy_as_Code_Project_Playbook_4cc57c18');
    if (fs.existsSync(playbookPath)) {
      const content = fs.readFileSync(playbookPath, 'utf-8');
      res.json({ success: true, content });
    } else {
      res.status(404).json({ success: false, error: 'Playbook file not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to generate dynamic AI quizzes using Gemini
app.post('/api/generate-quiz', async (req: Request, res: Response) => {
  try {
    const { category, difficulty = 'intermediate', count = 5, customPrompt = '' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'No GEMINI_API_KEY configured in environment. Using embedded curated technical quiz bank.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are an expert Systems Architect & Clinical Data Governance Engineer specializing in Trusted Research Environments (TRE) / Secure Data Environments (SDE) and Policy-as-Code (PaC).
You will generate high quality, rigorous, technical multiple-choice quiz questions based strictly on the following TRE Playbook:
- Key concepts:
  * OWL 2 / RDF ontologies (semantic transparency, clinical data tiers, Caldicott principles, NHS Section 251, SATRE pillars: Information Governance, Computing Infrastructure, Data Management, Software Operations).
  * Five Safes: Safe Person, Safe Project, Safe Setting, Safe Data, Safe Output.
  * Closed-World Assumption (CWA) vs Open-World Assumption (OWA): Resolving OWA into CWA security checks via SHACL (Shapes Constraint Language: access-shapes.ttl, sdc_shapes.ttl).
  * OPA Rego compilation: Translating OWL/SHACL rules and quantitative thresholds into low-latency Open Policy Agent (OPA) Rego rules (policy.rego, authz.rego) for Policy Enforcement Points (PEP: Kubernetes admission controller, API gateway, airlock egress).
  * Quantitative Statistical Disclosure Control (SDC): primary cell suppression (k >= 10), dominance rules (k% <= 80%), ONS / SAIL guidelines.
  * AI & Model Context Protocol (MCP) Governance: EU AI Act risk tiers (Minimal, Limited, High, Unacceptable), autonomous analytics agent boundaries (mcp:ExecuteSQL, mcp:ExportSummary, read-only limits, airlock sandboxing).
  * W3C PROV-O RDF triples for append-only audit lineage.
  * 4-phase implementation roadmap and dev commands (PySHACL, Makefile, etc.).

Return ONLY a valid JSON array of questions matching this schema:
[
  {
    "id": "gen-<timestamp>-<index>",
    "question": "Clear, detailed technical scenario or concept question",
    "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "correctIndex": 0, // integer 0-3
    "explanation": "Detailed pedagogical explanation of why this answer is correct and why other options fail, citing the playbook logic.",
    "citation": "Playbook Section 1/2/3/4 & concept reference",
    "difficulty": "${difficulty}",
    "category": "${category || 'General Architecture'}"
  }
]`;

    const userMessage = `Generate exactly ${count} multiple-choice questions for category: "${category || 'Full Playbook'}" at difficulty level "${difficulty}".
${customPrompt ? `Additional user focus: ${customPrompt}` : ''}
Ensure all questions have exactly 4 choices, one correct index (0-3), precise technical accuracy according to the playbook, and deep explanations. Return ONLY raw JSON without markdown code fences or backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userMessage}` }] }
      ],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text?.trim() || '[]';
    // Clean potential code block wrapping if any
    const cleanedText = responseText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const questions = JSON.parse(cleanedText);

    res.json({
      success: true,
      questions,
      source: 'gemini-3.8-flash'
    });
  } catch (error: any) {
    console.error('Quiz generation error:', error);
    res.status(200).json({
      success: false,
      fallback: true,
      error: error.message || 'Generation failed',
      message: 'Failed to generate with AI. Fallback to curated question bank.'
    });
  }
});

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`TRE Policy-as-Code platform running on port ${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
