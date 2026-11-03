export interface DataCatalogueAsset {
  id: string;
  title: string;
  acronym: string;
  domain: string;
  dataCustodian: string;
  sensitivityTier: 'Tier 1: Open / Aggregated' | 'Tier 2: Pseudonymized Research' | 'Tier 3: Controlled High-Sensitivity';
  summary: string;
  suppressionThreshold: string;
  dominanceRule: string;
  secondaryMaskingRequired: boolean;
  minCellSize: number;
  permittedRoles: string[];
  accreditationRequired: string;
  approvalBodies: string[];
  pseudonymizationMethod: string;
  geographicGranularity: string;
  temporalGranularity: string;
  shaclShapeTarget: string;
  opaPolicyRule: string;
  refreshCadence: string;
  sampleAttributes: string[];
  operationalConstraints: string[];
}

export const DATA_CATALOGUE_ASSETS: DataCatalogueAsset[] = [
  {
    id: 'asset-primary-care-ehr',
    title: 'Longitudinal Primary Care Electronic Health Records',
    acronym: 'GP-EHR',
    domain: 'Primary Care & Longitudinal Epidemiology',
    dataCustodian: 'National Health Service / Regional Data Trusts',
    sensitivityTier: 'Tier 2: Pseudonymized Research',
    summary: 'De-identified longitudinal primary care consultation encounters, clinical observations, biometrics, laboratory findings, and prescriptions across diverse population cohorts.',
    suppressionThreshold: 'Primary cell suppression k >= 10 for all frequency tables and cross-tabulations.',
    dominanceRule: 'Single patient / practice dominance threshold <= 80% of aggregate cell total.',
    secondaryMaskingRequired: true,
    minCellSize: 10,
    permittedRoles: ['Accredited Lead Epidemiologist', 'Biostatistician', 'Health Data Scientist'],
    accreditationRequired: 'Digital Economy Act (DEA) Accredited Researcher or NHS Information Governance Certified',
    approvalBodies: ['Research Ethics Committee (REC)', 'Data Access Committee (DAC)', 'Caldicott Guardian'],
    pseudonymizationMethod: 'Deterministic Salted HMAC-SHA256 tokenization at ingress; NHS numbers permanently segregated',
    geographicGranularity: 'Lower Super Output Area (LSOA) level only; exact postcodes stripped',
    temporalGranularity: 'Year and month of consultation; exact day removed for non-acute events',
    shaclShapeTarget: 'tre:PrimaryCareAssetShape',
    opaPolicyRule: 'policy.data_access.allow_primary_care_cohort',
    refreshCadence: 'Monthly batch synchronization with immutable ledger checkpoints',
    sampleAttributes: ['Study_Subject_ID', 'Consultation_Month_Year', 'SNOMED_Concept_Code', 'Systolic_BP_Quartile', 'BMI_Range', 'LSOA_Decile'],
    operationalConstraints: [
      'Zero raw table download: analytical scripts execute strictly within zero-egress compute nodes.',
      'Airlock export blocked if frequency count < 10 or secondary complementary cell can be calculated from margin totals.',
      'Linking with external demographic registers requires active Section 251 statutory exemption validation.'
    ]
  },
  {
    id: 'asset-census-microdata',
    title: 'Decennial Census Individual Microdata Cohort',
    acronym: 'CENSUS-IND',
    domain: 'Demographics, Sociodemographics & Social Epidemiology',
    dataCustodian: 'Office for National Statistics (ONS)',
    sensitivityTier: 'Tier 3: Controlled High-Sensitivity',
    summary: 'Representative individual-level records containing comprehensive household structure, socioeconomic classification, ethnicity, qualifications, and housing density.',
    suppressionThreshold: 'Strict primary suppression k >= 10; table perturbation with controlled random rounding to base 3 or base 5.',
    dominanceRule: 'Rule of Two: top 2 contributing records must not account for more than 85% of any cell value.',
    secondaryMaskingRequired: true,
    minCellSize: 10,
    permittedRoles: ['ONS Accredited Researcher', 'Principal Social Epidemiologist'],
    accreditationRequired: 'Approved Researcher Scheme under Digital Economy Act 2017 Section 39',
    approvalBodies: ['Research Accreditation Panel (RAP)', 'National Statistician Data Ethics Advisory Committee'],
    pseudonymizationMethod: 'Dual-hashing split-file tokenization with synthetic household identifier generation',
    geographicGranularity: 'Local Authority District (LAD); geographical drill-down to MSOA/LSOA requires enhanced security review',
    temporalGranularity: 'Census decade snapshot (immutable historical baseline)',
    shaclShapeTarget: 'tre:CensusMicrodataShape',
    opaPolicyRule: 'policy.data_access.allow_census_microdata',
    refreshCadence: 'Immutable 10-year release cycle',
    sampleAttributes: ['Household_Token', 'Age_Band_5Yr', 'NS_SEC_Class', 'Ethnic_Group_18', 'Highest_Qualification', 'LAD_Code'],
    operationalConstraints: [
      'No combination with unapproved external socio-spatial datasets to prevent small-area deductive disclosure.',
      'Exported analytical tables must pass automated SDC checks verifying zero single-contributor or residual differences.',
      'Virtual desktop clipboard and peripheral redirection disabled at the hypervisor level.'
    ]
  },
  {
    id: 'asset-civil-mortality',
    title: 'Civil Registration Deaths & Cause-of-Death Registry',
    acronym: 'CIVIL-MORT',
    domain: 'Vital Statistics & Cause-Specific Mortality',
    dataCustodian: 'General Register Office / National Statistics Authority',
    sensitivityTier: 'Tier 2: Pseudonymized Research',
    summary: 'Statutory death registrations linking primary cause of death, contributory morbidities (ICD-10 codes), age, sex, and place of death across national populations.',
    suppressionThreshold: 'Primary cell suppression k >= 5 for standard tables, k >= 10 for rare causes of death or young age brackets.',
    dominanceRule: 'Single cause dominance threshold <= 75% in small geographic subdivisions.',
    secondaryMaskingRequired: true,
    minCellSize: 5,
    permittedRoles: ['Population Health Researcher', 'Epidemiologist', 'Public Health Analyst'],
    accreditationRequired: 'Statutory Data Access Agreement & Research Passport',
    approvalBodies: ['Independent Information Governance Panel', 'Data Access Committee'],
    pseudonymizationMethod: 'Irreversible cryptographic hash token linked through trusted third-party linkage service',
    geographicGranularity: 'Local Authority / Health Board boundary',
    temporalGranularity: 'Year and quarter of registration',
    shaclShapeTarget: 'tre:MortalityRegistryShape',
    opaPolicyRule: 'policy.data_access.allow_mortality_registry',
    refreshCadence: 'Quarterly provisional and annual validated releases',
    sampleAttributes: ['Linked_Subject_ID', 'Underlying_Cause_ICD10', 'Secondary_Causes_Array', 'Age_At_Death_Years', 'Registration_Quarter'],
    operationalConstraints: [
      'Rare disease mortality codes (fewer than 5 occurrences nationally per quarter) automatically masked or grouped to 3-character ICD-10 chapters.',
      'Survival curve outputs must have individual step drops verified to ensure no single patient event is exposed.',
      'Mandatory citation of National Statistics licensing terms in all derived publications.'
    ]
  },
  {
    id: 'asset-hospital-episodes',
    title: 'Hospital Episode Statistics: Admitted Patient Care & Critical Care',
    acronym: 'HES-APC',
    domain: 'Secondary Care, Clinical Interventions & Inpatient Stays',
    dataCustodian: 'NHS England / National Health Data Space',
    sensitivityTier: 'Tier 2: Pseudonymized Research',
    summary: 'Detailed inpatient hospitalization records capturing diagnostic episodes, clinical operations (OPCS-4 codes), admission pathways, length of stay, and discharge destinations.',
    suppressionThreshold: 'Primary cell suppression k >= 10 across all published frequencies and statistical aggregates.',
    dominanceRule: 'Hospital provider / trust dominance threshold <= 80%.',
    secondaryMaskingRequired: true,
    minCellSize: 10,
    permittedRoles: ['Accredited Clinical Researcher', 'Health Economist', 'Epidemiologist'],
    accreditationRequired: 'NHS Data Security and Protection Toolkit (DSPT) Compliance & Verified Training',
    approvalBodies: ['Data Access Request Service (DARS)', 'Advisory Group for Data (AGD)', 'Caldicott Guardian'],
    pseudonymizationMethod: 'Central Master Patient Index (MPI) pseudonym with project-specific salt rotated per study protocol',
    geographicGranularity: 'Treating Trust level; patient residence mapped to Integrated Care Board (ICB) region',
    temporalGranularity: 'Episode admission month and duration in days',
    shaclShapeTarget: 'tre:HospitalEpisodesShape',
    opaPolicyRule: 'policy.data_access.allow_hospital_episodes',
    refreshCadence: 'Annual finalized audit and monthly rolling provisional data',
    sampleAttributes: ['Project_Patient_Token', 'Primary_Diagnosis_ICD10', 'Primary_Procedure_OPCS4', 'Admission_Method_Code', 'Length_Of_Stay_Days', 'ICB_Code'],
    operationalConstraints: [
      'Re-identification through rare procedure combinations prevented by minimum denominator checking.',
      'Outpatient and inpatient multi-year linkage permitted only within the approved project duration and scope.',
      'Automated SDC airlock rejects regression outputs where residuals or extreme outliers isolate specific patient episodes.'
    ]
  },
  {
    id: 'asset-genomic-cohort',
    title: 'Whole-Genome Sequencing & Phenotypic Linkage Cohort',
    acronym: 'GEN-COHORT',
    domain: 'Genomics, Rare Diseases & Precision Public Health',
    dataCustodian: 'Genomics Consortium / National Biobank Platform',
    sensitivityTier: 'Tier 3: Controlled High-Sensitivity',
    summary: 'High-depth whole-genome and exome sequencing variants paired with linked multi-decade electronic health records and deep phenotypic assessments.',
    suppressionThreshold: 'Differential Privacy with mathematically bounded privacy loss (epsilon <= 1.0, delta <= 10^-6); cell suppression k >= 20 for rare variant frequencies.',
    dominanceRule: 'Strict zero individual genomic profiling: variant frequency reporting restricted to cohorts >= 50 participants.',
    secondaryMaskingRequired: true,
    minCellSize: 20,
    permittedRoles: ['Principal Genomic Investigator', 'Accredited Computational Biologist'],
    accreditationRequired: 'Institutional Material Transfer Agreement (MTA) & Certified Genomic Data Security Clearance',
    approvalBodies: ['Consortium Access Committee', 'Institutional Review Board / REC', 'National Bioethics Panel'],
    pseudonymizationMethod: 'Multi-party homomorphic hashing; genomic coordinates detached from subject IDs in separate isolated containers',
    geographicGranularity: 'Broad national region only; no postal or small-area identifiers linked',
    temporalGranularity: 'Sequence collection epoch',
    shaclShapeTarget: 'tre:GenomicsCohortShape',
    opaPolicyRule: 'policy.data_access.allow_genomic_cohort',
    refreshCadence: 'Milestone data freezes accompanied by formal variant annotation updates',
    sampleAttributes: ['Genomic_Sample_ID', 'Chromosome_Pos', 'Allele_Variant', 'Allele_Frequency_Cohort', 'Phenotype_Trait_ID'],
    operationalConstraints: [
      'Raw VCF and BAM alignment files cannot be exported under any circumstance; compute must be executed in situ.',
      'GWAS summary statistics require automated differential privacy noise injection prior to airlock release approval.',
      'Strict prohibition of any kinship verification or surname inference algorithms on genomic markers.'
    ]
  },
  {
    id: 'asset-community-prescribing',
    title: 'High-Volume Community Prescribing & Dispensing Statistics',
    acronym: 'RX-DISP',
    domain: 'Pharmacology, Pharmacoepidemiology & Health Economics',
    dataCustodian: 'NHS Business Services Authority / Health Authorities',
    sensitivityTier: 'Tier 1: Open / Aggregated',
    summary: 'Aggregated prescription dispensing quantities, net ingredient costs (NIC), and item frequencies categorized by British National Formulary (BNF) chemical chapters.',
    suppressionThreshold: 'Primary cell suppression k >= 5 for rare therapeutic formulations; standard drugs reported openly.',
    dominanceRule: 'Prescribing practice level dominance rule <= 85%.',
    secondaryMaskingRequired: false,
    minCellSize: 5,
    permittedRoles: ['Open Research Community', 'Health Services Researcher', 'Policy Analyst'],
    accreditationRequired: 'Open Government Licence (OGL) or Standard Academic Terms of Use',
    approvalBodies: ['Standard Data Access Registration'],
    pseudonymizationMethod: 'Aggregation at source; zero personal patient data captured or processed',
    geographicGranularity: 'General Practice and Primary Care Network (PCN) level',
    temporalGranularity: 'Monthly dispensing totals',
    shaclShapeTarget: 'tre:PrescribingStatsShape',
    opaPolicyRule: 'policy.data_access.allow_prescribing_stats',
    refreshCadence: 'Monthly public release schedule',
    sampleAttributes: ['BNF_Code', 'BNF_Description', 'Total_Items_Dispensed', 'Net_Ingredient_Cost', 'Practice_Identifier', 'Dispensing_Month'],
    operationalConstraints: [
      'Accessible for open exploratory queries without container airlock export barriers.',
      'Derived commercial pharmaceutical marketing use requires explicit attribution under Open Government Licence.',
      'Combination with small-practice patient lists must maintain suppression of cells where patient count is below threshold.'
    ]
  }
];
