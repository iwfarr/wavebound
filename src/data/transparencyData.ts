/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProvNode {
  id: string;
  label: string;
  type: 'Entity' | 'Activity' | 'Agent';
  description: string;
  timestamp?: string;
  sha256Hash?: string;
  attributes?: Record<string, string>;
}

export interface ProvEdge {
  source: string;
  target: string;
  relationship: 'wasGeneratedBy' | 'used' | 'wasDerivedFrom' | 'wasAssociatedWith' | 'actedOnBehalfOf';
  label: string;
}

export interface TransparencyProject {
  id: string;
  code: string;
  title: string;
  category: 'Cardiovascular' | 'Rare Diseases' | 'Oncology' | 'Mental Health';
  leadInvestigator: string;
  institution: string;
  nhsTrustSponsor: string;
  laySummary: string;
  publicBenefitStatement: string;
  legalBasis: {
    ukGdprArt6: string;
    ukGdprArt9: string;
    s251Ref: string;
    recApprovalRef: string;
  };
  ppieInvolvement: {
    score: 'Exemplary' | 'Substantial' | 'Standard';
    groupName: string;
    description: string;
    patientCoAuthor: boolean;
  };
  nationalOptOut: {
    applied: boolean;
    purgedRecordCount: number;
    auditStatus: 'VERIFIED 100% COMPLIANT' | 'PENDING';
  };
  dataAssetsLinked: string[];
  commercialInvolvement: string;
  fundingBody: string;
  airlockStatus: 'Active Egress Approved' | 'In Analysis Enclave' | 'Closed & Archived';
  provGraph: {
    nodes: ProvNode[];
    edges: ProvEdge[];
    turtleRdf: string;
    sparqlAuditQuery: string;
  };
}

export const TRANSPARENCY_PROJECTS: TransparencyProject[] = [
  {
    id: 'proj_cardio_pediatric',
    code: 'HDRUK-SDE-2026-089',
    title: 'Early Detection of Congenital Heart Anomalies Using Multi-Modal Clinical Linkage',
    category: 'Cardiovascular',
    leadInvestigator: 'Cardiovascular Research Lead [Example Role]',
    institution: 'University Partner & Research Centre of Excellence [Example]',
    nhsTrustSponsor: 'NHS Lothian & Great Ormond Street Hospital for Children NHS Foundation Trust',
    laySummary: 'Every year in the UK, over 1,000 babies are born with critical heart defects that are not detected before birth. This study links routine newborn check records with hospital scan records to build early-warning computer tools for midwives and doctors, helping babies receive urgent heart surgery faster.',
    publicBenefitStatement: 'Reduces diagnostic delays for neonatal critical congenital heart disease (CCHD) by an estimated 28%, significantly decreasing preventable brain injury and neonatal mortality across NHS specialist cardiology units.',
    legalBasis: {
      ukGdprArt6: 'Article 6(1)(e) - Public interest task in health data research',
      ukGdprArt9: 'Article 9(2)(j) - Scientific research with Section 89(1) safeguards',
      s251Ref: 'CAG 26/CAG/0104 (Section 251 NHS Act 2006 statutory clearance)',
      recApprovalRef: '26/LO/0412 (London - Riverside Research Ethics Committee)'
    },
    ppieInvolvement: {
      score: 'Exemplary',
      groupName: 'Tiny Tickers & BHF Scottish Youth Advisory Board',
      description: 'Co-designed directly with 18 parents of children treated for congenital heart defects. The panel reviewed data flow diagrams, eliminated non-essential demographic fields, and co-wrote the lay project report.',
      patientCoAuthor: true
    },
    nationalOptOut: {
      applied: true,
      purgedRecordCount: 14208,
      auditStatus: 'VERIFIED 100% COMPLIANT'
    },
    dataAssetsLinked: [
      'HES Admitted Patient Care (APC) 2018–2025',
      'National Congenital Anomaly and Rare Disease Registration Service (NCARDRS)',
      'Pediatric Intensive Care Audit Network (PICANet)',
      'Scottish Morbidity Record (SMR01 / SMR02)'
    ],
    commercialInvolvement: 'Zero commercial exclusivity. Algorithm open-sourced under Apache 2.0 for royalty-free deployment across NHS England and NHS Scotland.',
    fundingBody: 'British Heart Foundation Special Project Grant SP/26/1/38902',
    airlockStatus: 'Active Egress Approved',
    provGraph: {
      nodes: [
        {
          id: 'ent_hes_raw',
          label: 'HES APC Raw Extract',
          type: 'Entity',
          description: 'Initial raw hospital episodes extract (3.2m rows).',
          timestamp: '2026-03-01T08:00:00Z',
          sha256Hash: '4f29a0c71e98d89a4561234bcde1234567890abcdef1234567890abcdef12345',
          attributes: { classification: 'Tier 3 Direct Identifiers', rows: '3,240,119' }
        },
        {
          id: 'act_ndoo_purge',
          label: 'NDOO Ingestion Purge',
          type: 'Activity',
          description: 'Automated filtering applying NHS Digital National Data Opt-Out lists.',
          timestamp: '2026-03-01T08:15:00Z',
          sha256Hash: '98d8a7c2b3e410567890abcdef1234567890abcdef1234567890abcdef123456',
          attributes: { purged: '14,208 records', engine: 'eBPF Ingestion Diode' }
        },
        {
          id: 'ent_clean_cohort',
          label: 'Clean Pediatric Cohort',
          type: 'Entity',
          description: 'Opt-out compliant dataset stripped of direct NHS numbers and postcodes.',
          timestamp: '2026-03-01T08:22:00Z',
          sha256Hash: '8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c',
          attributes: { classification: 'Tier 2 Pseudonymised', rows: '142,500' }
        },
        {
          id: 'act_linkage_analysis',
          label: 'Multi-Modal Linkage Query',
          type: 'Activity',
          description: 'Deterministic DuckDB SQL join of HES, NCARDRS, and PICANet.',
          timestamp: '2026-03-02T14:30:00Z',
          sha256Hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
          attributes: { researcher: 'Accredited Researcher [Example Role]', compute: 'DuckDB 4.3 Node' }
        },
        {
          id: 'ent_derived_table',
          label: 'Cross-Tabulation Matrix',
          type: 'Entity',
          description: 'Candidate research summary table with cell counts by cardiac defect.',
          timestamp: '2026-03-02T15:10:00Z',
          sha256Hash: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
          attributes: { smallCellsDetected: '3 cells < 10' }
        },
        {
          id: 'act_sdc_suppression',
          label: 'SDC Shape Suppression PEP',
          type: 'Activity',
          description: 'Primary (<10) and secondary complementary cell suppression enforcement.',
          timestamp: '2026-03-02T15:18:00Z',
          sha256Hash: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
          attributes: { rule: 'sdc_shapes.ttl', primaryMasked: '3', secondaryMasked: '2' }
        },
        {
          id: 'ent_airlock_ticket',
          label: 'Airlock Release Candidate',
          type: 'Entity',
          description: 'Cleaned, masked research table approved by 2-person airlock protocol.',
          timestamp: '2026-03-02T16:05:00Z',
          sha256Hash: 'a7f49e0c1b8d2345e6789abcde0123456789abcdef0123456789abcdef012345',
          attributes: { status: 'Cryptographically Sealed', seal: 'Web Crypto SHA-256' }
        },
        {
          id: 'agt_macintyre',
          label: 'Designated Researcher [Example]',
          type: 'Agent',
          description: 'Accredited Researcher (DEA 2017 #ONS-RES-49201).',
          attributes: { role: 'Lead Investigator' }
        },
        {
          id: 'agt_caldicott',
          label: 'Designated Caldicott Lead [Example]',
          type: 'Agent',
          description: 'Trust Caldicott Guardian & SDC Review Lead.',
          attributes: { role: 'Airlock Signatory' }
        }
      ],
      edges: [
        { source: 'act_ndoo_purge', target: 'ent_hes_raw', relationship: 'used', label: 'filtered raw input' },
        { source: 'ent_clean_cohort', target: 'act_ndoo_purge', relationship: 'wasGeneratedBy', label: 'purged output' },
        { source: 'act_linkage_analysis', target: 'ent_clean_cohort', relationship: 'used', label: 'queried clean cohort' },
        { source: 'act_linkage_analysis', target: 'agt_macintyre', relationship: 'wasAssociatedWith', label: 'executed by' },
        { source: 'ent_derived_table', target: 'act_linkage_analysis', relationship: 'wasGeneratedBy', label: 'statistical output' },
        { source: 'act_sdc_suppression', target: 'ent_derived_table', relationship: 'used', label: 'masked small cells' },
        { source: 'ent_airlock_ticket', target: 'act_sdc_suppression', relationship: 'wasGeneratedBy', label: 'sealed release ticket' },
        { source: 'ent_airlock_ticket', target: 'agt_caldicott', relationship: 'wasAssociatedWith', label: 'signed off by' },
        { source: 'ent_airlock_ticket', target: 'ent_hes_raw', relationship: 'wasDerivedFrom', label: 'immutable provenance' }
      ],
      turtleRdf: `@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix tre: <https://w3id.org/wavebound/tre#> .
@prefix sdc: <https://w3id.org/wavebound/sdc#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# W3C PROV-O Lineage Triple Ledger for Project HDRUK-SDE-2026-089

tre:AirlockReleaseCandidate_089 a prov:Entity ;
    prov:wasDerivedFrom tre:HES_APC_RawExtract ;
    prov:wasGeneratedBy tre:Act_SDC_Suppression ;
    tre:sha256 "a7f49e0c1b8d2345e6789abcde0123456789abcdef0123456789abcdef012345" ;
    tre:caldicottPrinciple8Compliant true .

tre:Act_SDC_Suppression a prov:Activity ;
    prov:used tre:CongenitalHeartMatrix_Raw ;
    prov:wasAssociatedWith tre:Agent_CaldicottLead ;
    prov:startedAtTime "2026-03-02T15:18:00Z"^^xsd:dateTime .

tre:Agent_CaldicottLead a prov:Agent ;
    tre:role "Caldicott Guardian & SDC Officer [Example Role]" ;
    tre:institutionalAffiliation "NHS Trust & SDE Board [Example]" .`,
      sparqlAuditQuery: `PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX tre: <https://w3id.org/wavebound/tre#>

# Audit Query: Verify that all airlock exports trace back to approved ethics & NDOO purge
SELECT ?releaseTicket ?rawSource ?purgedRecords ?caldicottStatus
WHERE {
    ?releaseTicket a prov:Entity ;
                   prov:wasDerivedFrom ?rawSource ;
                   tre:caldicottPrinciple8Compliant ?caldicottStatus .
    ?rawSource prov:wasGeneratedBy ?ingestionAct .
    ?ingestionAct tre:ndooPurgedCount ?purgedRecords .
    FILTER (?caldicottStatus = true)
}`
    }
  },
  {
    id: 'proj_rare_neuro',
    code: 'HDRUK-SDE-2026-112',
    title: 'Genomic Multi-Omics Stratification in Treatment-Resistant Pediatric Epilepsy',
    category: 'Rare Diseases',
    leadInvestigator: 'Pediatric Genomic Lead [Example Role]',
    institution: 'University Partner & Genomics Centre [Example]',
    nhsTrustSponsor: 'South London and Maudsley NHS Foundation Trust & Guy\'s and St Thomas\' NHS FT',
    laySummary: 'One in three children with epilepsy continues having severe seizures despite taking standard anti-seizure medicines. This research analyses whole-genome genetic sequences and clinical prescription histories to identify rare biochemical pathways that respond to targeted, repurposed therapies.',
    publicBenefitStatement: 'Identifies precision medication candidates for an estimated 350 UK children with rare ion-channel epilepsy mutations, preventing avoidable emergency ICU admissions for status epilepticus.',
    legalBasis: {
      ukGdprArt6: 'Article 6(1)(e) - Public interest scientific research',
      ukGdprArt9: 'Article 9(2)(j) - Scientific and statistical research',
      s251Ref: 'CAG 26/CAG/0088 (Explicit patient assent + S251 support)',
      recApprovalRef: '25/SW/0219 (South West - Central Bristol REC)'
    },
    ppieInvolvement: {
      score: 'Exemplary',
      groupName: 'Epilepsy Action & Dravet Syndrome UK Family Network',
      description: 'Continuous involvement through monthly patient advisory calls. Parents helped establish the definition of clinical meaningfulness (e.g. 50% seizure reduction vs cognitive side-effects).',
      patientCoAuthor: true
    },
    nationalOptOut: {
      applied: true,
      purgedRecordCount: 8940,
      auditStatus: 'VERIFIED 100% COMPLIANT'
    },
    dataAssetsLinked: [
      'Genomics England 100k Genomes Project (Rare Diseases)',
      'Hospital Episode Statistics (Critical Care & A&E)',
      'Electronic Prescribing and Medicines Administration (EPMA) Data'
    ],
    commercialInvolvement: 'Academic non-commercial consortium. All molecular biomarker discoveries published openly without patent monopolies.',
    fundingBody: 'Medical Research Council (MRC) Clinical Academic Fellowship MR/X029141/1',
    airlockStatus: 'In Analysis Enclave',
    provGraph: {
      nodes: [
        {
          id: 'ent_genomics_raw',
          label: 'Genomics England BAM Extracts',
          type: 'Entity',
          description: 'Whole genome variant call format (VCF) files.',
          timestamp: '2026-02-14T09:00:00Z',
          sha256Hash: '7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d',
          attributes: { classification: 'Tier 3 Genomic Variant Data' }
        },
        {
          id: 'act_variant_annotation',
          label: 'VEP Annotation & Tiering',
          type: 'Activity',
          description: 'Ensembl Variant Effect Predictor workflow within enclave.',
          timestamp: '2026-02-16T11:20:00Z',
          sha256Hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
          attributes: { container: 'Harbor OCI Internal Mirror' }
        },
        {
          id: 'ent_annotated_variants',
          label: 'Tier 1 Pathogenic Mutations',
          type: 'Entity',
          description: 'De-identified mutation frequencies across 14 ion channels.',
          timestamp: '2026-02-18T16:00:00Z',
          sha256Hash: '2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a',
          attributes: { classification: 'Tier 2 Aggregated Genetic Markers' }
        },
        {
          id: 'agt_thornton',
          label: 'Genomics Lead [Example]',
          type: 'Agent',
          description: 'Accredited Genomic Researcher (#GEL-RES-8812).',
          attributes: { role: 'Principal Investigator' }
        }
      ],
      edges: [
        { source: 'act_variant_annotation', target: 'ent_genomics_raw', relationship: 'used', label: 'analyzed raw genomes' },
        { source: 'act_variant_annotation', target: 'agt_thornton', relationship: 'wasAssociatedWith', label: 'conducted by' },
        { source: 'ent_annotated_variants', target: 'act_variant_annotation', relationship: 'wasGeneratedBy', label: 'variant findings' },
        { source: 'ent_annotated_variants', target: 'ent_genomics_raw', relationship: 'wasDerivedFrom', label: 'lineage trail' }
      ],
      turtleRdf: `@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix tre: <https://w3id.org/wavebound/tre#> .

tre:AnnotatedVariants_112 a prov:Entity ;
    prov:wasDerivedFrom tre:GenomicsEngland_RawExtract ;
    prov:wasGeneratedBy tre:Act_VariantAnnotation ;
    tre:sha256 "2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a" ;
    tre:caldicottPrinciple8Compliant true .`,
      sparqlAuditQuery: `PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX tre: <https://w3id.org/wavebound/tre#>

SELECT ?genomicEntity ?researcher ?tool
WHERE {
    ?genomicEntity prov:wasGeneratedBy ?act .
    ?act prov:wasAssociatedWith ?researcher ;
         tre:pipelineTool ?tool .
}`
    }
  },
  {
    id: 'proj_onco_chemo',
    code: 'HDRUK-SDE-2026-145',
    title: 'Reducing Sepsis Readmissions in Rural Cancer Chemotherapy Outpatients',
    category: 'Oncology',
    leadInvestigator: 'Oncology Clinical Lead [Example Role]',
    institution: 'University Hospital Partner & Cancer Institute [Example]',
    nhsTrustSponsor: 'The Leeds Teaching Hospitals NHS Trust & Mid Yorkshire Teaching NHS Trust',
    laySummary: 'Cancer patients undergoing chemotherapy are at high risk of sudden infections. Patients in rural Yorkshire often live more than an hour away from an emergency hospital. This project uses blood test trends and remote temperature monitoring to identify infection signs 24 hours earlier.',
    publicBenefitStatement: 'Reduces neutropenic sepsis ICU admissions by an estimated 22% in rural cancer cohorts and optimizes community antibiotic administration pathways.',
    legalBasis: {
      ukGdprArt6: 'Article 6(1)(e) - Public task for health service delivery',
      ukGdprArt9: 'Article 9(2)(j) - Scientific research',
      s251Ref: 'CAG 25/CAG/0201 (Statutory research clearance)',
      recApprovalRef: '25/YH/0189 (Yorkshire & The Humber - Leeds West REC)'
    },
    ppieInvolvement: {
      score: 'Substantial',
      groupName: 'Yorkshire Cancer Community Voice',
      description: 'Ten chemotherapy patients reviewed the project notification posters placed in rural chemotherapy mobile clinics, ensuring that patient choices and the national opt-out were clearly explained in non-technical terms.',
      patientCoAuthor: false
    },
    nationalOptOut: {
      applied: true,
      purgedRecordCount: 6812,
      auditStatus: 'VERIFIED 100% COMPLIANT'
    },
    dataAssetsLinked: [
      'Systemic Anti-Cancer Therapy (SACT) Chemotherapy Database',
      'Pathology Blood Test Feeds (Full Blood Counts & Neutrophil Ratios)',
      'A&E Attendances & Secondary Uses Service (SUS)'
    ],
    commercialInvolvement: 'Independent clinical trial sponsored entirely by charity funding. Zero pharmaceutical sponsorship.',
    fundingBody: 'Yorkshire Cancer Research Pioneer Award YCR-2026-04',
    airlockStatus: 'Active Egress Approved',
    provGraph: {
      nodes: [
        {
          id: 'ent_sact_raw',
          label: 'SACT Registry Extract',
          type: 'Entity',
          description: 'Raw systemic chemotherapy administration records.',
          timestamp: '2026-01-10T10:00:00Z',
          sha256Hash: '3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b',
          attributes: { classification: 'Tier 3 Chemotherapy Records' }
        },
        {
          id: 'act_sepsis_risk_model',
          label: 'Cox Proportional Hazards Model',
          type: 'Activity',
          description: 'Regression analysis computing 30-day neutropenic sepsis risk.',
          timestamp: '2026-01-28T14:00:00Z',
          sha256Hash: '1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d',
          attributes: { df: 'N = 1,420, p = 6, df = 1414' }
        },
        {
          id: 'ent_risk_coefficients',
          label: 'Hazard Ratios & Confidence Intervals',
          type: 'Entity',
          description: 'Airlocked regression parameters with verified residual degrees of freedom.',
          timestamp: '2026-02-01T09:30:00Z',
          sha256Hash: '5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
          attributes: { airlockReviewed: 'Designated SDC Output Checker & Caldicott Lead [Example]' }
        }
      ],
      edges: [
        { source: 'act_sepsis_risk_model', target: 'ent_sact_raw', relationship: 'used', label: 'trained on' },
        { source: 'ent_risk_coefficients', target: 'act_sepsis_risk_model', relationship: 'wasGeneratedBy', label: 'model outputs' },
        { source: 'ent_risk_coefficients', target: 'ent_sact_raw', relationship: 'wasDerivedFrom', label: 'provenance root' }
      ],
      turtleRdf: `@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix tre: <https://w3id.org/wavebound/tre#> .

tre:RiskCoefficients_145 a prov:Entity ;
    prov:wasDerivedFrom tre:SACT_ChemotherapyExtract ;
    prov:wasGeneratedBy tre:Act_SepsisRiskModel ;
    tre:sha256 "5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d" ;
    tre:caldicottPrinciple8Compliant true .`,
      sparqlAuditQuery: `PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX tre: <https://w3id.org/wavebound/tre#>

SELECT ?modelOutput ?sourceData
WHERE {
    ?modelOutput prov:wasDerivedFrom ?sourceData .
}`
    }
  }
];
