# Project Wavebound: Educational & Regulatory Disclaimer

## 1. Educational Purpose
Project Wavebound, including the interactive playbook, policy-as-code compiler, semantic ontologies, SHACL constraint shapes, OPA Rego rules, and statistical disclosure control (SDC) guidelines, is provided strictly as an **educational and technical reference resource**. It is derived from publicly available literature, statutory guidelines (including the Digital Economy Act 2017, UK GDPR, Data Protection Act 2018, and NHS Caldicott Principles), and cloud-native security patterns.

## 2. Deliberately Organisationally Agnostic Architecture
Project Wavebound is **deliberately organisationally and platform agnostic**. It establishes open standards, semantic ontologies, and Policy-as-Code patterns rather than vendor-specific or institution-specific policies. Consequently, this playbook and its constituent models must be formally reviewed, calibrated, and approved by relevant decision makers (including Caldicott Guardians, Data Protection Officers, Senior Information Risk Owners, and Data Access Committees) at the organisational level prior to operational deployment.

## 3. No Legal or Clinical Advice
The contents of this repository, platform, and associated tools do **not** constitute legal, regulatory, clinical, or formal data protection advice. Organizations, researchers, and public authorities must seek their own independent legal counsel, Data Protection Officer (DPO) validation, and statutory ethics committee authorizations before deploying any policy, infrastructure, or access controls.

## 4. Allocation of Responsibility at the Point of Implementation
All architectural, operational, and regulatory risks and decisions remain **the sole responsibility of the deploying organization and governance authority at the point of implementation**. Specifically:
- **Statutory Authority**: The implementing organization is responsible for verifying legal bases (e.g. UK GDPR Article 6/9 exemptions, Section 251 CAG approvals, or Digital Economy Act accreditation).
- **Rule Customization**: Generated SHACL shapes and OPA Rego policies are illustrative templates and must be configured, stress-tested, and audited against the organization's specific network topology, data classifications, and risk thresholds.
- **Human Oversight**: Automated policy-as-code enforcement points (PDPs and PEPs) must never supersede statutory human judgment, Caldicott Guardian oversight, or Data Access Committee determinations.

## 5. Limitation of Liability
To the maximum extent permitted by applicable law, the authors, contributors, and copyright holders provide this software and documentation "as is", without warranty of any kind, express or implied. In no event shall the authors or contributors be liable for any claim, damages, data breach, regulatory penalty, or other liability arising from the use or implementation of this codebase.
