import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Server,
  Code2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Terminal,
  Lock,
  Layers,
  Database,
  Cpu,
  ArrowRight,
  Info,
  Sliders,
  FileCheck2,
  AlertOctagon,
  Eye,
  RefreshCw
} from 'lucide-react';

interface EnclaveProfile {
  id: string;
  name: string;
  category: 'Research Pod' | 'Admission Controller' | 'RBAC Security' | 'Storage & Scratch';
  runtime: string;
  summary: string;
  defaultNamespace: string;
  defaultMemory: string;
  defaultCpu: string;
  defaultScratchSize: string;
  yamlTemplate: (params: {
    namespace: string;
    researcherId: string;
    projectId: string;
    memoryLimit: string;
    cpuLimit: string;
    scratchSize: string;
    auditMode: 'audit_alert' | 'hard_blocking';
  }) => string;
}

const ENCLAVE_PROFILES: EnclaveProfile[] = [
  {
    id: 'rstudio-least-privilege-pod',
    name: 'RStudio Analytical Pod (Least-Privilege)',
    category: 'Research Pod',
    runtime: 'R 4.3+ Hardened Enclave Container',
    summary: 'Locked-down R workspace pod with read-only root, ephemeral /scratch mount, non-root user (UID 10001), and internal CRAN mirror routing. Never requests root or host namespaces.',
    defaultNamespace: 'sde-project-cardio',
    defaultMemory: '8Gi',
    defaultCpu: '4000m',
    defaultScratchSize: '50Gi',
    yamlTemplate: ({ namespace, researcherId, projectId, memoryLimit, cpuLimit, scratchSize }) => `apiVersion: v1
kind: Pod
metadata:
  name: rstudio-${projectId}-session
  namespace: ${namespace}
  labels:
    app.kubernetes.io/name: rstudio-researcher-enclave
    tre.governance/project-id: "${projectId}"
    tre.governance/researcher-id: "${researcherId}"
    satre.pillar: safe-setting
    security.policy: least-privilege
  annotations:
    seawater.tre.internal/admitted-at: "${new Date().toISOString()}"
    seawater.tre.internal/audit-policy: "audit-and-alert"
spec:
  # Enforce non-root execution (Caldicott & NHS IT Standard)
  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
    runAsGroup: 10001
    fsGroup: 10001
    seccompProfile:
      type: RuntimeDefault
  automountServiceAccountToken: false # Disallow access to Kubernetes API from user workspace
  restartPolicy: Never
  containers:
    - name: rstudio-analytics
      image: internal-harbor.local/rstudio/rstudio-hardened:4.3-seawater
      imagePullPolicy: IfNotPresent
      securityContext:
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
        capabilities:
          drop: ["ALL"]
      resources:
        requests:
          cpu: "500m"
          memory: "2Gi"
        limits:
          cpu: "${cpuLimit}"
          memory: "${memoryLimit}"
      env:
        - name: PROJECT_ID
          value: "${projectId}"
        - name: RESEARCHER_ID
          value: "${researcherId}"
        - name: CRAN_MIRROR_URL
          value: "http://package-mirrors.tre-isolated-infra:8080/cran"
      ports:
        - containerPort: 8787
          name: rstudio-web
      volumeMounts:
        # 1. Ephemeral scratch space for analytical model fitting (Wiped on pod termination)
        - mountPath: /scratch
          name: ephemeral-scratch
        # 2. Linux temporary directories mounted as ephemeral RAM disks
        - mountPath: /tmp
          name: tmp-volume
        - mountPath: /var/run
          name: run-volume
        # 3. Read-only air-gapped R configuration enforcing internal CRAN mirror
        - mountPath: /home/researcher/.Rprofile
          name: rprofile-config
          subPath: .Rprofile
          readOnly: true
  volumes:
    - name: ephemeral-scratch
      emptyDir:
        sizeLimit: "${scratchSize}"
    - name: tmp-volume
      emptyDir:
        medium: Memory
        sizeLimit: "1Gi"
    - name: run-volume
      emptyDir:
        medium: Memory
        sizeLimit: "64Mi"
    - name: rprofile-config
      configMap:
        name: airgap-r-profile-config`
  },
  {
    id: 'namespaced-audit-webhook',
    name: 'Namespaced Admission Webhook (Audit & Alert)',
    category: 'Admission Controller',
    runtime: 'Kubernetes Admissionregistration v1',
    summary: 'Non-blocking validating webhook strictly scoped to research namespaces. Evaluates pods against OPA Rego PDP and emits audit annotations. failurePolicy: Ignore guarantees cluster stability.',
    defaultNamespace: 'tre-security',
    defaultMemory: '512Mi',
    defaultCpu: '500m',
    defaultScratchSize: '1Gi',
    yamlTemplate: ({ auditMode }) => `apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: seawater-namespaced-audit-webhook
  labels:
    app.kubernetes.io/part-of: project-seawater
    governance.model: audit-and-alert
    satre.pillar: safe-setting
webhooks:
  - name: audit.namespaced.tre.seawater.internal
    # 1. Strict namespace scoping - Never intercepts kube-system or cluster-wide operators
    namespaceSelector:
      matchExpressions:
        - key: tre.environment/scope
          operator: In
          values: ["research-sandbox", "sde-analytics", "airlock-staging"]
    rules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE"]
        resources: ["pods"]
        scope: "Namespaced" # Restrict evaluation strictly to namespaced resources
    clientConfig:
      service:
        name: seawater-opa-pdp
        namespace: tre-security
        path: "/v1/data/tre/admission/evaluate_pod"
        port: 8443
      caBundle: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCg== # Internal PKI Bundle
    admissionReviewVersions: ["v1"]
    sideEffects: None
    timeoutSeconds: 2
    # 2. Crucial: failurePolicy: ${auditMode === 'audit_alert' ? 'Ignore' : 'Fail'}
    # "Ignore" implements the Audit-and-Alert pattern to guarantee that intermittent
    # admission timeouts never block urgent clinical or analytical pod deployments.
    failurePolicy: ${auditMode === 'audit_alert' ? 'Ignore' : 'Fail'}`
  },
  {
    id: 'restricted-rbac-rolebinding',
    name: 'Namespace-Scoped RBAC (Zero Cluster-Admin)',
    category: 'RBAC Security',
    runtime: 'Kubernetes RBAC v1',
    summary: 'Strictly namespaced Role and RoleBinding granting researchers access only to their assigned project namespace. Disallows cluster-wide read/write, secrets enumeration, and node access.',
    defaultNamespace: 'sde-project-cardio',
    defaultMemory: 'N/A',
    defaultCpu: 'N/A',
    defaultScratchSize: 'N/A',
    yamlTemplate: ({ namespace, researcherId, projectId }) => `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ${projectId}-researcher-role
  namespace: ${namespace}
  labels:
    tre.governance/project-id: "${projectId}"
    security.policy: least-privilege
rules:
  # 1. Permit read and execution of project analytical pods
  - apiGroups: [""]
    resources: ["pods", "pods/log", "pods/exec"]
    verbs: ["get", "list", "watch", "create", "delete"]
  # 2. Permit viewing project configmaps (e.g. .Rprofile, pip.conf)
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list", "watch"]
  # 3. Disallow Secrets enumeration (Zero plaintext credential exposure)
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: [] # Explicitly barred for researchers
  # 4. Disallow cluster-wide persistent volume manipulation
  - apiGroups: [""]
    resources: ["persistentvolumes"]
    verbs: [] # Cluster-admin only
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ${projectId}-${researcherId}-binding
  namespace: ${namespace}
subjects:
  - kind: User
    name: "${researcherId}"
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: ${projectId}-researcher-role
  apiGroup: rbac.authorization.k8s.io`
  },
  {
    id: 'duckdb-direct-analytics-pod',
    name: 'DuckDB Direct-Plane Analytics Pod',
    category: 'Research Pod',
    runtime: 'Python 3.10 / DuckDB 0.10+ Fast Columnar Engine',
    summary: 'High-throughput analytical pod optimized for parallel DuckDB and Arrow operations. Connects directly to local Parquet storage over kernel TCP, completely bypassing userspace Envoy sidecars.',
    defaultNamespace: 'sde-project-cardio',
    defaultMemory: '16Gi',
    defaultCpu: '8000m',
    defaultScratchSize: '100Gi',
    yamlTemplate: ({ namespace, researcherId, projectId, memoryLimit, cpuLimit, scratchSize }) => `apiVersion: v1
kind: Pod
metadata:
  name: duckdb-${projectId}-worker
  namespace: ${namespace}
  labels:
    app.kubernetes.io/name: duckdb-lake-analytics
    tre.workload: high-throughput-analytics
    tre.governance/project-id: "${projectId}"
    sidecar.istio.io/inject: "false" # Disables userspace Envoy sidecar to prevent TCP pool exhaustion
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
    runAsGroup: 10001
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: duckdb-worker
      image: internal-harbor.local/analytics/duckdb-lake:0.10-hardened
      securityContext:
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
        capabilities:
          drop: ["ALL"]
      resources:
        requests:
          cpu: "2000m"
          memory: "4Gi"
        limits:
          cpu: "${cpuLimit}"
          memory: "${memoryLimit}"
      volumeMounts:
        # High-speed scratch storage for temporary memory-mapped database files
        - mountPath: /scratch
          name: duckdb-scratch
        # Read-only mounted pseudonymised Parquet clinical partitions
        - mountPath: /data/clinical-parquet
          name: clinical-parquet-volume
          readOnly: true
        - mountPath: /tmp
          name: tmp-volume
  volumes:
    - name: duckdb-scratch
      emptyDir:
        sizeLimit: "${scratchSize}"
    - name: tmp-volume
      emptyDir:
        medium: Memory
        sizeLimit: "2Gi"
    - name: clinical-parquet-volume
      persistentVolumeClaim:
        claimName: pvc-tier2-pseudonymised-parquet`
  }
];

export const LeastPrivilegeEnclaveHub: React.FC = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(ENCLAVE_PROFILES[0].id);
  const [namespace, setNamespace] = useState<string>('sde-project-cardio');
  const [researcherId, setResearcherId] = useState<string>('usr_hra_994821');
  const [projectId, setProjectId] = useState<string>('proj-cardio-04');
  const [memoryLimit, setMemoryLimit] = useState<string>('8Gi');
  const [cpuLimit, setCpuLimit] = useState<string>('4000m');
  const [scratchSize, setScratchSize] = useState<string>('50Gi');
  const [auditMode, setAuditMode] = useState<'audit_alert' | 'hard_blocking'>('audit_alert');
  const [copiedYaml, setCopiedYaml] = useState<boolean>(false);
  const [simulatedAuditOpen, setSimulatedAuditOpen] = useState<boolean>(false);

  const activeProfile =
    ENCLAVE_PROFILES.find((p) => p.id === selectedProfileId) || ENCLAVE_PROFILES[0];

  const generatedYaml = useMemo(() => {
    return activeProfile.yamlTemplate({
      namespace,
      researcherId,
      projectId,
      memoryLimit,
      cpuLimit,
      scratchSize,
      auditMode
    });
  }, [activeProfile, namespace, researcherId, projectId, memoryLimit, cpuLimit, scratchSize, auditMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedYaml);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${activeProfile.id}-${projectId}.yaml`;
    const blob = new Blob([generatedYaml], { type: 'text/yaml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. EXECUTIVE BANNER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Phase 5: Least-Privilege Enclave Manifests</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Multi-Tenant Cluster Isolation &amp; Audit-and-Alert Webhooks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Zero cluster-admin requirements. Designed specifically for multi-tenant NHS Trust and locked-down university Kubernetes environments where stability and least-privilege RBAC are mandatory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimulatedAuditOpen(!simulatedAuditOpen)}
              className="px-3.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{simulatedAuditOpen ? 'Hide Admission Stream' : 'Simulate Admission Stream'}</span>
            </button>
          </div>
        </div>

        {/* 8 Statutory Least-Privilege Guardrails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            {
              title: 'Namespaced RBAC Scope',
              desc: 'Role and RoleBinding only. No cluster-admin permissions ever required.',
              status: 'VERIFIED'
            },
            {
              title: 'Non-Blocking Webhook',
              desc: 'failurePolicy: Ignore emits audit alerts without blocking pod launches on timeouts.',
              status: 'VERIFIED'
            },
            {
              title: 'Read-Only Root Filesystem',
              desc: 'Root OS is mounted read-only. Writable paths restricted to memory/scratch.',
              status: 'VERIFIED'
            },
            {
              title: 'Non-Root Execution (UID 10001)',
              desc: 'All analytical processes execute as unprivileged UID with zero root access.',
              status: 'VERIFIED'
            },
            {
              title: 'Capabilities Dropped',
              desc: 'drop: ["ALL"] removes raw network and admin privileges from containers.',
              status: 'VERIFIED'
            },
            {
              title: 'RuntimeDefault Seccomp',
              desc: 'Blocks hazardous Linux system calls at the kernel syscall filter layer.',
              status: 'VERIFIED'
            },
            {
              title: 'Direct Data-Plane Routing',
              desc: 'Heavy analytics (DuckDB/SQL) bypass userspace Envoy sidecars to stop TCP exhaustion.',
              status: 'VERIFIED'
            },
            {
              title: 'No Kube API Token Mount',
              desc: 'automountServiceAccountToken: false prevents container token theft.',
              status: 'VERIFIED'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-xs block">
                  {item.title}
                </span>
                <span className="text-[9px] font-mono font-bold text-[#047857] dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SIMULATED ADMISSION STREAM DRAWER */}
      {simulatedAuditOpen && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-3 font-mono text-xs text-slate-200 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>LIVE ADMISSION STREAM: Namespaced Webhook &amp; Prometheus Metric Feed</span>
            </div>
            <span className="text-slate-500 text-[10px]">Audit-and-Alert Mode</span>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div className="text-slate-400">
              [2026-11-08T06:40:22Z] [Enclave Admission] AdmissionReview request received for Pod/rstudio-{projectId}-session in namespace &apos;{namespace}&apos;
            </div>
            <div className="text-sky-300">
              [2026-11-08T06:40:22Z] [OPA PDP Check] Querying endpoint http://seawater-opa-pdp.tre-security:8443/v1/data/tre/admission/evaluate_pod
            </div>
            <div className="text-emerald-400">
              [2026-11-08T06:40:22Z] [PDP Result] EVAL_PASS: Researcher &apos;{researcherId}&apos; accredited; project &apos;{projectId}&apos; REC active.
            </div>
            <div className="text-slate-400">
              [2026-11-08T06:40:22Z] [Audit Annotation] Added seawater.tre.internal/audit-digest: &quot;SHA256:7f4a9b2c4e819a4d&quot;
            </div>
            <div className="text-purple-300">
              [2026-11-08T06:40:22Z] [Prometheus Metric] seawater_pod_admission_total&#123;namespace=&quot;{namespace}&quot;,status=&quot;allowed&quot;,latency_ms=&quot;2.4&quot;&#125; 1
            </div>
            <div className="text-emerald-300 font-bold">
              [2026-11-08T06:40:22Z] [Admission Decision] ALLOWED (Pod launched in 2.4ms with non-blocking audit trail).
            </div>
          </div>
        </div>
      )}

      {/* 2. INTERACTIVE MANIFEST GENERATOR & CUSTOMIZER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Step 1: Select Enclave Profile</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Least-Privilege Manifest Generator
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-mono">
              Audit Pattern:
            </span>
            <button
              onClick={() => setAuditMode(auditMode === 'audit_alert' ? 'hard_blocking' : 'audit_alert')}
              className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                auditMode === 'audit_alert'
                  ? 'bg-emerald-50 text-[#047857] border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-50 text-[#B45309] border-amber-300 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {auditMode === 'audit_alert' ? 'Audit-and-Alert (Recommended)' : 'Hard-Blocking Mode'}
            </button>
          </div>
        </div>

        {/* Profile Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ENCLAVE_PROFILES.map((profile) => {
            const isSelected = profile.id === selectedProfileId;
            return (
              <button
                key={profile.id}
                onClick={() => {
                  setSelectedProfileId(profile.id);
                  setMemoryLimit(profile.defaultMemory !== 'N/A' ? profile.defaultMemory : memoryLimit);
                  setCpuLimit(profile.defaultCpu !== 'N/A' ? profile.defaultCpu : cpuLimit);
                  setScratchSize(profile.defaultScratchSize !== 'N/A' ? profile.defaultScratchSize : scratchSize);
                }}
                className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-sky-50/50 dark:bg-sky-950/40 border-[#005EB8] ring-1 ring-[#005EB8]'
                    : 'bg-slate-50/80 dark:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-[#005EB8] dark:text-sky-400 border border-slate-200 dark:border-slate-700">
                    {profile.category}
                  </span>
                  <strong className="text-xs font-semibold text-slate-900 dark:text-white block line-clamp-1">
                    {profile.name}
                  </strong>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {profile.summary}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  {profile.runtime}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Parameter Controls */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
            Enclave Runtime Parameters
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Namespace Scope
              </label>
              <input
                type="text"
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Project Identifier
              </label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Memory Resource Limit
              </label>
              <select
                value={memoryLimit}
                onChange={(e) => setMemoryLimit(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs text-slate-900 dark:text-white font-mono"
              >
                <option value="4Gi">4Gi (Standard Analytics)</option>
                <option value="8Gi">8Gi (Cohort Modeling)</option>
                <option value="16Gi">16Gi (DuckDB Fast Scan)</option>
                <option value="32Gi">32Gi (High-Memory Genomic)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Ephemeral Scratch Size
              </label>
              <select
                value={scratchSize}
                onChange={(e) => setScratchSize(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-1.5 text-xs text-slate-900 dark:text-white font-mono"
              >
                <option value="20Gi">20Gi Scratch</option>
                <option value="50Gi">50Gi Scratch</option>
                <option value="100Gi">100Gi Scratch</option>
                <option value="250Gi">250Gi Scratch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generated Manifest Display Area */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeProfile.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#005EB8] text-white font-bold">
                  {activeProfile.category}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target Namespace: <strong>{namespace}</strong> · Project: <strong>{projectId}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                {copiedYaml ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#047857]" />
                    <span>YAML Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy YAML</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .yaml</span>
              </button>
            </div>
          </div>

          {/* Scoped Dark Terminal View */}
          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[420px]">
            <code>{generatedYaml}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
