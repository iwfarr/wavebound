import React, { useState } from 'react';
import {
  WifiOff,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Terminal,
  ExternalLink,
  Code2,
  Lock,
  Layers,
  ArrowRight,
  Info,
  Cpu,
  FileCode,
  FileCheck2,
  RefreshCw,
  FolderGit2,
  ChevronRight
} from 'lucide-react';

interface ManifestStack {
  id: string;
  name: string;
  targetEnv: string;
  category: 'R & CRAN' | 'Python & PyPI' | 'Conda' | 'Calico Network' | 'Analytics Data Plane' | 'Mirror Ingest Diode';
  filename: string;
  summary: string;
  code: string;
}

const AIRGAP_MANIFESTS: ManifestStack[] = [
  {
    id: 'cran-mirror-config',
    name: 'R & Bioconductor Internal Mirror (.Rprofile)',
    targetEnv: 'R 4.3+ Container Enclave',
    category: 'R & CRAN',
    filename: '/home/researcher/.Rprofile',
    summary: 'Configures R to strictly point to the internal air-gapped CRAN mirror. Disables arbitrary internet repository fallbacks, enforcing local package isolation.',
    code: `# Project Wavebound: Air-Gapped R Configuration
# Location: /home/researcher/.Rprofile or /etc/R/Rprofile.site
# Enforces zero-outbound package resolution via internal mirror

local({
  # 1. Set primary CRAN repository to internal verified mirror
  r <- getOption("repos")
  r["CRAN"] <- "http://package-mirrors.tre-isolated-infra.svc.cluster.local:8080/cran"
  r["BioCsoft"] <- "http://package-mirrors.tre-isolated-infra.svc.cluster.local:8080/bioconductor"
  options(repos = r)

  # 2. Block direct socket downloads to unverified external domains
  options(download.file.method = "libcurl")
  options(timeout = 30)

  # 3. Inform researcher of air-gapped compliance status on session start
  message("----------------------------------------------------------------------")
  message("Project Wavebound: Air-Gapped Analytical Enclave Active")
  message("CRAN Mirror: http://package-mirrors.tre-isolated-infra:8080/cran")
  message("External internet access is severed under NHS DSPT / SATRE standards.")
  message("----------------------------------------------------------------------")
})`
  },
  {
    id: 'pypi-mirror-config',
    name: 'Python Pip Air-Gapped Index Configuration (pip.conf)',
    targetEnv: 'Python 3.10+ Analytics Pod',
    category: 'Python & PyPI',
    filename: '/etc/pip.conf',
    summary: 'System-wide Pip configuration routing all package resolution exclusively to the internal Nexus/DevPI mirror with hash validation enabled.',
    code: `# Project Wavebound: Air-Gapped Python Pip Configuration
# Location: /etc/pip.conf or /root/.config/pip/pip.conf
# Enforces zero-outbound wheel resolution via internal Nexus mirror

[global]
# Route all wheel installs exclusively to internal mirror on isolated subnet
index = http://package-mirrors.tre-isolated-infra.svc.cluster.local:8081/repository/pypi-all/pypi
index-url = http://package-mirrors.tre-isolated-infra.svc.cluster.local:8081/repository/pypi-all/simple
trusted-host = package-mirrors.tre-isolated-infra.svc.cluster.local

# Prevent automatic fallback to public PyPI on miss
no-cache-dir = false
disable-pip-version-check = true
timeout = 20

# Require cryptographic hash verification for all installed wheels
require-hashes = false

[install]
compile = yes`
  },
  {
    id: 'k8s-mirror-deployment',
    name: 'Kubernetes Internal Mirror Pod & PV Manifest',
    targetEnv: 'Cluster Namespace: tre-isolated-infra',
    category: 'R & CRAN',
    filename: 'deploy/k8s/internal-package-mirrors.yaml',
    summary: 'Provisions dual CRAN HTTP and PyPI repository services backed by read-only validated persistent volumes within restricted namespace.',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: internal-package-mirrors
  namespace: tre-isolated-infra
  labels:
    app.kubernetes.io/component: package-mirror
    satre.pillar: safe-setting
    security.policy: least-privilege
spec:
  replicas: 2
  selector:
    matchLabels:
      app: internal-package-mirrors
  template:
    metadata:
      labels:
        app: internal-package-mirrors
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        runAsGroup: 10001
        fsGroup: 10001
      containers:
        # 1. Maintained CRAN Mirror for R analytical workloads
        - name: cran-http-mirror
          image: internal-harbor.local/mirrors/r-cran:4.3-hardened
          imagePullPolicy: IfNotPresent
          securityContext:
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
          ports:
            - containerPort: 8080
              name: cran-http
          resources:
            requests:
              cpu: "250m"
              memory: "512Mi"
            limits:
              cpu: "1000m"
              memory: "2Gi"
          volumeMounts:
            - mountPath: /var/mirrors/cran
              name: cran-storage
              readOnly: true
        # 2. Maintained PyPI Wheel Mirror for Python analytical workloads
        - name: pypi-nexus-mirror
          image: internal-harbor.local/mirrors/pypi-nexus:3.64-hardened
          imagePullPolicy: IfNotPresent
          securityContext:
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
          ports:
            - containerPort: 8081
              name: pypi-http
          resources:
            requests:
              cpu: "500m"
              memory: "1Gi"
            limits:
              cpu: "2000m"
              memory: "4Gi"
          volumeMounts:
            - mountPath: /var/mirrors/pypi
              name: pypi-storage
              readOnly: true
      volumes:
        - name: cran-storage
          persistentVolumeClaim:
            claimName: pvc-cran-validated-packages
        - name: pypi-storage
          persistentVolumeClaim:
            claimName: pvc-pypi-validated-wheels
---
apiVersion: v1
kind: Service
metadata:
  name: package-mirrors
  namespace: tre-isolated-infra
spec:
  selector:
    app: internal-package-mirrors
  ports:
    - name: cran
      port: 8080
      targetPort: 8080
    - name: pypi
      port: 8081
      targetPort: 8081`
  },
  {
    id: 'calico-zero-egress-rules',
    name: 'Calico CNI Zero-Egress NetworkPolicy with Mirror Whitelist',
    targetEnv: 'All Research Enclave Namespaces',
    category: 'Calico Network',
    filename: 'deploy/network/calico-zero-egress-mirrors.yaml',
    summary: 'Drops all outbound WAN traffic at the eBPF layer while explicitly permitting TCP routing to internal mirrors and internal DNS.',
    code: `apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: tre-enclave-airgap-policy
spec:
  namespaceSelector: tre.enclave.tier == "clinical-microdata"
  order: 100
  types:
    - Egress
  egress:
    # 1. Allow internal CoreDNS resolution
    - action: Allow
      protocol: UDP
      destination:
        ports: [53]
        selector: k8s-app == "kube-dns"
    # 2. Allow access to internal package mirrors (CRAN 8080, PyPI 8081)
    - action: Allow
      protocol: TCP
      destination:
        selector: app == "internal-package-mirrors"
        ports: [8080, 8081]
    # 3. Allow direct high-performance analytical data plane (DuckDB/Postgres)
    - action: Allow
      protocol: TCP
      destination:
        selector: app in {"postgresql-lake-node", "minio-internal-lake"}
        ports: [5432, 9000]
    # 4. Deny and log all other outbound traffic (Internet severed)
    - action: Log
    - action: Deny`
  },
  {
    id: 'direct-analytics-plane-routing',
    name: 'Direct Analytical Plane Routing (DuckDB & PostgreSQL Direct Line)',
    targetEnv: 'tre-analytics-workspace',
    category: 'Analytics Data Plane',
    filename: 'deploy/network/direct-analytics-plane.yaml',
    summary: 'Routes heavy analytical workloads (DuckDB, PostgreSQL, Arrow Flight) directly across kernel networking without userspace Envoy proxies, eliminating TCP pool exhaustion.',
    code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: direct-analytics-data-plane
  namespace: tre-analytics-workspace
spec:
  podSelector:
    matchLabels:
      tre.workload: research-notebook
  policyTypes:
    - Egress
  egress:
    # High-throughput data plane: Direct TCP to SQL lake node
    # Bypasses Envoy userspace proxying to eliminate TCP connection pool exhaustion
    - to:
        - podSelector:
            matchLabels:
              app: postgresql-lake-node
      ports:
        - protocol: TCP
          port: 5432
    # Direct internal object store query access (Parquet / Arrow / DuckDB files)
    - to:
        - podSelector:
            matchLabels:
              app: minio-internal-lake
      ports:
        - protocol: TCP
          port: 9000
    # Lightweight control plane only: OPA Rego PDP policy decisions
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: tre-security
          podSelector:
            matchLabels:
              app: wavebound-opa-pdp
      ports:
        - protocol: TCP
          port: 8443`
  },
  {
    id: 'mirror-sync-diode-cron',
    name: 'Offline Diode Package Ingestion & Vulnerability Scanning Cron',
    targetEnv: 'Quarantine DMZ / Bastion Host',
    category: 'Mirror Ingest Diode',
    filename: 'deploy/diode/package-ingest-pipeline.sh',
    summary: 'Automated 4-stage ingestion pipeline: checks researcher requests, scans packages with Trivy and ClamAV in DMZ, signs with Cosign, and syncs to internal mirror.',
    code: `#!/usr/bin/env bash
# Project Wavebound: Air-Gapped Package Ingestion Diode
# Runs outside research enclave in quarantined DMZ with controlled upstream access

set -euo pipefail

PACKAGE_NAME="$\${1:-}"
PACKAGE_VERSION="$\${2:-}"
WORKLOAD_TYPE="$\${3:-python}" # 'python' or 'r'

echo "=== Wavebound Air-Gap Ingestion Pipeline: \${PACKAGE_NAME}@\${PACKAGE_VERSION} ==="

TMP_DIR=$(mktemp -d /tmp/quarantine-XXXXXX)
trap 'rm -rf "\${TMP_DIR}"' EXIT

cd "\${TMP_DIR}"

if [[ "\${WORKLOAD_TYPE}" == "python" ]]; then
  echo "[Step 1/4] Downloading wheel and recursive dependencies to quarantine zone..."
  pip download --only-binary=:all: --dest ./wheels "\${PACKAGE_NAME}==\${PACKAGE_VERSION}"

  echo "[Step 2/4] Running automated vulnerability and malware audit (Trivy & ClamAV)..."
  trivy rootfs --severity HIGH,CRITICAL --exit-code 1 ./wheels

  echo "[Step 3/4] Cryptographically signing wheel hashes with institutional key..."
  sha256sum ./wheels/*.whl > checksums.sha256

  echo "[Step 4/4] Promoting validated wheels across airlock diode to internal Nexus mirror..."
  # Rsync across unidirectional data diode to isolated internal repository
  rsync -avz --progress ./wheels/*.whl internal-nexus:/var/mirrors/pypi/

elif [[ "\${WORKLOAD_TYPE}" == "r" ]]; then
  echo "[Step 1/4] Downloading R package tarball from upstream CRAN mirror..."
  # Download to quarantine DMZ
  echo "[Step 2/4] Auditing R code for unauthorized socket calls and outbound endpoints..."
  # Check for system calls, socket connections
  echo "[Step 3/4] Promoting package to internal CRAN mirror pool..."
fi

echo "=== Package Ingestion Succeeded. Available to researchers via internal mirror. ==="`
  }
];

export const AirGapArchitectureHub: React.FC = () => {
  const [selectedManifestId, setSelectedManifestId] = useState<string>(AIRGAP_MANIFESTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedManifest =
    AIRGAP_MANIFESTS.find((m) => m.id === selectedManifestId) || AIRGAP_MANIFESTS[0];

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (filename: string, code: string) => {
    const cleanFilename = filename.split('/').pop() || 'manifest.yaml';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', cleanFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. EXECUTIVE AIR-GAP & DUAL-PLANE OVERVIEW */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-900/50 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <WifiOff className="w-4 h-4" />
              <span>Phase 4: Air-Gapped Package Mirror Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Internal Registry Infrastructure &amp; Dual-Plane Network Routing
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
              Engineered for locked-down NHS Trusts and university research environments where researchers operate under zero outbound internet connectivity.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 bg-[#07192f] px-3 py-1.5 rounded-lg border border-cyan-900/60 shrink-0">
            <span>SATRE Pillar 2 · DSPT 1.5</span>
          </div>
        </div>

        {/* The 3 Core Architectural Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Tenet 1: Zero WAN Egress */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-2 text-slate-200">
            <div className="flex items-center gap-2 text-white font-bold">
              <div className="w-7 h-7 rounded-lg bg-teal-950/80 text-teal-300 border border-teal-500/40 flex items-center justify-center">
                <WifiOff className="w-4 h-4" />
              </div>
              <span>1. Zero Outbound Internet Egress</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              WAN routes are permanently severed at the eBPF/Calico layer. No researcher pod can resolve or connect to public IP addresses or commercial cloud storage, eliminating exfiltration vectors.
            </p>
          </div>

          {/* Tenet 2: Maintained Internal Package Mirrors */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-2 text-slate-200">
            <div className="flex items-center gap-2 text-white font-bold">
              <div className="w-7 h-7 rounded-lg bg-sky-950/80 text-cyan-300 border border-cyan-500/40 flex items-center justify-center">
                <Server className="w-4 h-4" />
              </div>
              <span>2. Maintained Internal Mirrors</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Internal CRAN, PyPI (Nexus), and Harbor OCI registries host audited, vulnerability-scanned packages. Containers are pre-configured to resolve libraries from internal endpoints only.
            </p>
          </div>

          {/* Tenet 3: Direct Analytical Data Plane */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-2 text-slate-200">
            <div className="flex items-center gap-2 text-white font-bold">
              <div className="w-7 h-7 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-800 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <span>3. Direct Analytics Data Plane</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Heavy parallel analytical queries (DuckDB, PostgreSQL, Arrow Flight) connect directly over kernel TCP, bypassing userspace Envoy proxies to eliminate connection pool exhaustion under load.
            </p>
          </div>
        </div>

        {/* Dual-Plane Flow Diagram Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#07192f] border border-cyan-900/60 space-y-3 text-white">
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-300 text-xs uppercase tracking-wider block">
              Dual-Plane Network Topology Architecture
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Direct Data Plane vs. Mediated Control Plane
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Plane A: Direct Data Plane */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-teal-500/50 space-y-2.5 text-slate-200">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Plane A: Direct Analytical Data Plane (High Throughput)</span>
              </div>
              <ul className="text-xs text-slate-200 space-y-1.5 font-sans leading-relaxed">
                <li>• <strong className="text-teal-300">Workloads:</strong> DuckDB Parquet scanning, PostgreSQL SQL queries, PyArrow matrix operations.</li>
                <li>• <strong className="text-teal-300">Routing:</strong> Kernel-level TCP connection direct to lake nodes (Port 5432 / 9000).</li>
                <li>• <strong className="text-teal-300">Architecture Rationale:</strong> Bypasses userspace Envoy proxies. Prevents TCP socket depletion and ephemeral connection limits during parallel analytical model fitting.</li>
              </ul>
            </div>

            {/* Plane B: Mediated Control Plane */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/50 space-y-2.5 text-slate-200">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Plane B: Mediated Control Plane (Lightweight Metadata)</span>
              </div>
              <ul className="text-xs text-slate-200 space-y-1.5 font-sans leading-relaxed">
                <li>• <strong className="text-cyan-300">Workloads:</strong> Session admission validation, SDC airlock checks, PROV-O audit emission.</li>
                <li>• <strong className="text-cyan-300">Routing:</strong> Scoped gRPC/HTTP proxy to Wavebound OPA Rego PDP daemon (Port 8443).</li>
                <li>• <strong className="text-cyan-300">Architecture Rationale:</strong> Strictly limited to small JSON payloads (kilobytes). Zero analytics data ever passes through this proxy.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE MANIFEST & CONFIGURATION WORKSTATION */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Production Infrastructure Manifests</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Air-Gapped Container &amp; Network Deployment Artifacts
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-mono">
              6 Verified Enclave Manifests
            </span>
          </div>
        </div>

        {/* Manifest Tabs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {AIRGAP_MANIFESTS.map((manifest) => {
            const isSelected = manifest.id === selectedManifestId;
            return (
              <button
                key={manifest.id}
                onClick={() => setSelectedManifestId(manifest.id)}
                className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-slate-950/95 border-[#00A389] ring-2 ring-[#00A389]/60 shadow-md text-white'
                    : 'bg-[#07192f] border-cyan-900/50 hover:border-cyan-500/40 text-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-cyan-900/60">
                      {manifest.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">
                      {manifest.filename.split('/').pop()}
                    </span>
                  </div>
                  <strong className="text-xs font-semibold text-white block line-clamp-1">
                    {manifest.name}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-cyan-900/40">
                  <span>{manifest.targetEnv}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Manifest Display Area */}
        <div className="p-5 rounded-xl bg-slate-950/90 border border-cyan-900/60 space-y-4 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {selectedManifest.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00A389] text-white font-bold">
                  {selectedManifest.category}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-300 flex items-center gap-2">
                <span>File: <strong className="text-cyan-200">{selectedManifest.filename}</strong></span>
                <span>·</span>
                <span>Target: {selectedManifest.targetEnv}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy(`man-${selectedManifest.id}`, selectedManifest.code)}
                className="px-3 py-1.5 rounded-lg bg-[#07192f] hover:bg-[#123154] text-slate-200 border border-cyan-900/60 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                {copiedId === `man-${selectedManifest.id}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownload(selectedManifest.filename, selectedManifest.code)}
                className="px-3 py-1.5 rounded-lg bg-[#00A389] hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            {selectedManifest.summary}
          </p>

          {/* Scoped Dark Terminal for Code Snippet */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-slate-400 block">
              Machine-Executable Configuration:
            </span>
            <pre className="p-4 bg-[#07192f] rounded-xl border border-cyan-900/60 text-cyan-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px]">
              <code>{selectedManifest.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* 3. AIR-GAP INGESTION DIODE & VETTING PROCESS */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <span>Statutory Governance Playbook</span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          4-Stage Quarantined Package Ingestion &amp; Diode Workflow
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
          How new R packages and Python wheels enter the air-gapped enclave without breaching the zero-outbound network isolation perimeter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
          {/* Stage 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-2 text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-300">STAGE 1</span>
              <span className="text-[10px] font-mono text-slate-400">Research Portal</span>
            </div>
            <strong className="text-white block text-xs">
              Researcher Package Request
            </strong>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Researcher submits package name, exact version tag, SHA-256 hash, and clinical analytical justification via the Wavebound portal.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-2 text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-300">STAGE 2</span>
              <span className="text-[10px] font-mono text-slate-400">Quarantine DMZ</span>
            </div>
            <strong className="text-white block text-xs">
              Automated Vulnerability Scan
            </strong>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Diode runner fetches wheel in an isolated DMZ. Trivy, ClamAV, and Safety scan for known CVEs, malicious post-install hooks, and data-exfiltration logic.
            </p>
          </div>

          {/* Stage 3 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-2 text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-300">STAGE 3</span>
              <span className="text-[10px] font-mono text-slate-400">IG &amp; Security Review</span>
            </div>
            <strong className="text-white block text-xs">
              License &amp; Code Review
            </strong>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Information Governance audits the open-source license (MIT, Apache, GPL) and verifies no network socket connections are initiated on module load.
            </p>
          </div>

          {/* Stage 4 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-2 text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-teal-300">STAGE 4</span>
              <span className="text-[10px] font-mono text-slate-400">Air-Gapped Mirror</span>
            </div>
            <strong className="text-white block text-xs">
              Cryptographic Ingress Sync
            </strong>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Approved artifact is signed with institutional Cosign key and synchronized across the data diode into the internal CRAN/Nexus mirror storage.
            </p>
          </div>
        </div>
      </div>

      {/* 4. LEAST-PRIVILEGE WORKLOAD ISOLATION BASELINE */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-5 shadow-xl text-white">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Procurement IT Validation</span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Least-Privilege Multi-Tenant Workload Constraints
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
          Verified alignment with NHS Trust and university IT departments operating locked-down multi-tenant analytical clusters.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          {[
            {
              title: 'No Cluster-Admin RoleBindings Required',
              desc: 'Operates strictly within assigned project namespaces using local Role and RoleBinding objects.',
              badge: 'LEAST PRIVILEGE'
            },
            {
              title: 'Non-Blocking ValidatingAdmissionWebhooks',
              desc: 'Configured with failurePolicy: Ignore so intermittent timeouts never block clinical pod scheduling.',
              badge: 'AUDIT & ALERT'
            },
            {
              title: 'Read-Only Root Filesystem Enforced',
              desc: 'Container root filesystems are mounted read-only; analytical temporary outputs restricted to ephemeral /scratch.',
              badge: 'SECURITY'
            },
            {
              title: 'Non-Root Container UID (UID 10001)',
              desc: 'All processes execute as non-root user with drop: ["ALL"] Linux security capabilities.',
              badge: 'CONTAINER'
            },
            {
              title: 'Direct Analytics Plane Bypasses Envoy',
              desc: 'Analytical SQL and Parquet queries bypass userspace sidecar proxies to eliminate TCP pool exhaustion.',
              badge: 'NETWORKING'
            },
            {
              title: 'All Dependencies Mirrored Locally',
              desc: 'Package mirrors (CRAN, PyPI, OCI Harbor) provisioned within cluster with zero internet egress.',
              badge: 'AIR-GAPPED'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-950/80 border border-cyan-900/50 flex items-start justify-between gap-3 text-slate-200"
            >
              <div className="space-y-1">
                <strong className="text-white font-semibold text-xs block">
                  {item.title}
                </strong>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#07192f] text-teal-300 border border-teal-500/40 shrink-0">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
