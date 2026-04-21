---
layout: course
title: Databricks 101
description: Databricks-Infrastruktur und Networking
permalink: /courses/databricks-101.html
---

# 🟨 Databricks 101 — <span class="lang-en" style="display:none">Databricks infrastructure and networking</span><span class="lang-de">Databricks-Infrastruktur und Networking</span>


> <span class="lang-en" style="display:none">**Level:** Beginners — Azure 101 is required or should be taken in parallel</span><span class="lang-de">**Niveau:** Beginners — Azure 101 wird vorausgesetzt oder parallel gemacht</span>  
> <span class="lang-en" style="display:none">**Language:** English, with common technical terms</span><span class="lang-de">**Sprache:** Deutsch, mit englischen Fachbegriffen</span>

---

## <span class="lang-en" style="display:none">Table of contents</span><span class="lang-de">Inhaltsverzeichnis</span>

1. <a href="#module-a-what-is-databricksmodul-a-was-ist-databricks"><span class="lang-en" style="display:none">Module A: What is Databricks?</span><span class="lang-de">Modul A: Was ist Databricks?</span></a>
2. <a href="#module-b-databricks-workspace-basicsmodul-b-databricks-workspace-basics"><span class="lang-en" style="display:none">Module B: Databricks workspace basics</span><span class="lang-de">Modul B: Databricks Workspace-Grundlagen</span></a>
3. <a href="#module-c-vnet-injectionmodul-c-vnet-injection"><span class="lang-en" style="display:none">Module C: VNet Injection</span><span class="lang-de">Modul C: VNet Injection</span></a>
4. <a href="#module-d-secure-cluster-connectivity-sccmodul-d-secure-cluster-connectivity-scc"><span class="lang-en" style="display:none">Module D: Secure Cluster Connectivity (SCC)</span><span class="lang-de">Modul D: Secure Cluster Connectivity (SCC)</span></a>
5. <a href="#module-e-private-link-and-network-decisionsmodul-e-private-link-und-networking-entscheidungen"><span class="lang-en" style="display:none">Module E: Private Link and networking decisions</span><span class="lang-de">Modul E: Private Link und Networking-Entscheidungen</span></a>
6. <a href="#module-f-terraform-for-databricks-and-capstonemodul-f-terraform-für-databricks-und-capstone"><span class="lang-en" style="display:none">Module F: Terraform for Databricks and Capstone</span><span class="lang-de">Modul F: Terraform für Databricks und Capstone</span></a>

---

## <span class="lang-en" style="display:none">Glossary — Important Databricks terms</span><span class="lang-de">Glossar — Wichtige Databricks-Begriffe</span>

| <span class="lang-en" style="display:none">German</span><span class="lang-de">Deutsch</span> | English | <span class="lang-en" style="display:none">Meaning</span><span class="lang-de">Bedeutung</span> |
|---------|---------|-----------|
| Workspace | Workspace | <span class="lang-en" style="display:none">Databricks environment (your workspace UI)</span><span class="lang-de">Databricks-Umgebung (deine Arbeitsoberfläche)</span> |
| Cluster | Cluster | <span class="lang-en" style="display:none">Compute resources for data processing</span><span class="lang-de">Rechenressourcen für Data-Processing</span> |
| Virtual Network Injection | VNet Injection | <span class="lang-en" style="display:none">Databricks runs in your Azure VNet</span><span class="lang-de">Databricks läuft in deinem Azure VNet</span> |
| Compute Plane | Control Plane | Verwaltungsebene von Databricks |
| Control Plane | Data Plane | Rechen-Ebene (Cluster, Jobs, Queries) |
| Private Link | Private Link | <span class="lang-en" style="display:none">Private access without public internet</span><span class="lang-de">Privater Zugriff ohne öffentliches Internet</span> |
| Secure Cluster Connectivity | Secure Cluster Connectivity (SCC) | <span class="lang-en" style="display:none">No public IP for clusters</span><span class="lang-de">Keine Public IP für Cluster</span> |
| Container Subnet | Container Subnet | <span class="lang-en" style="display:none">Subnet for cluster VMs</span><span class="lang-de">Subnet für Cluster-VMs</span> |
| Host Subnet | Host Subnet | <span class="lang-en" style="display:none">Subnet for Databricks infrastructure</span><span class="lang-de">Subnet für Databricks-Infrastruktur</span> |
| NSG | Network Security Group | Firewall-Regeln |
| User-Defined Route | UDR | Manuelle Routing-Regeln |

---

## <span class="lang-en" style="display:none">Module A: What is Databricks?</span><span class="lang-de">Modul A: Was ist Databricks?</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain what Databricks is, understand the difference between Databricks and Azure, and name the core concepts workspace, cluster, and notebook.</span><span class="lang-de">Du kannst erklären, was Databricks ist, den Unterschied zwischen Databricks und Azure verstehen, und die Kernkonzepte Workspace, Cluster und Notebook benennen.</span>

### 1.1 <span class="lang-en" style="display:none">What is Databricks?</span><span class="lang-de">Was ist Databricks?</span>

```
Databricks = Datenplattform auf Basis von Apache Spark

Was macht Databricks?
├── Daten verarbeiten (large-scale Data Processing)
├── Daten analysieren (SQL, Analytics)
├── Machine Learning (MLflow, Model Training)
├── Data Pipelines bauen (Delta Lake)
└── Collaboration (Notebooks, Dashboards)
```

**Databricks basiert auf:**
- **Apache Spark** — Open-Source Daten-Processing-Engine
- **Delta Lake** — <span class="lang-en" style="display:none">open-source storage layer (like a database for big data)</span><span class="lang-de">Open-Source Storage-Layer (wie eine Datenbank für große Daten)</span>
- **MLflow** — Machine Learning Lifecycle Management

### 1.2 <span class="lang-en" style="display:none">Databricks vs. other Azure services</span><span class="lang-de">Databricks vs. andere Azure-Dienste</span>

```
Azure SQL Database:
→ Relationale Datenbank, SQL, kleine bis mittlere Daten

Azure Data Factory:
→ ETL/ELT Pipeline-Orchestrierung (Bewegung von Daten)

Azure Databricks:
→ Data Processing, Analytics, ML, große Datenmengen
→ Spark-basiert (verteilt über viele Server)
```

**Wann Databricks?**
- 📊 <span class="lang-en" style="display:none">**Large data volumes** (TB to PB)</span><span class="lang-de">**Große Datenmengen** (TB bis PB)</span>
- 🔄 **Data Engineering** (Pipelines, Transformationen)
- 🤖 **Machine Learning**
- 📈 **Analytics & Business Intelligence**

### 1.3 <span class="lang-en" style="display:none">Core concepts</span><span class="lang-de">Kernkonzepte</span>

```
Workspace:
├── Dein "Büro" in Databricks
│   ├── Notebook (Code + Dokumentation)
│   ├── Cluster (Rechenleistung)
│   ├── Job (automatisierte Ausführung)
│   ├── Dashboard (Visualisierungen)
│   └── Warehouse (SQL Analytics)
```

### 1.4 <span class="lang-en" style="display:none">Databricks tiers (SKU)</span><span class="lang-de">Databricks-Tiers (SKU)</span>

```
Developer Free    → Kostenlos, 14 Tage, für Testing
Single            → Einzelnarbeitsplätze, kleine Teams
Standard          → Mehrere Teams, Produktionsfähig
Premium           → Erweiterte Sicherheit, Governance
Enterprise        → Größte Unternehmen, SLAs
```

<span class="lang-en" style="display:none">**For the course:** `Standard` is the minimum tier for VNet Injection. `Premium` is required for certain Private Link scenarios.</span><span class="lang-de">**Für den Kurs:** `Standard` ist die Mindestversion für VNet Injection. `Premium` wird für bestimmte Private-Link-Szenarien benötigt.</span>

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul A</span><span class="lang-de">Kurzes Quiz — Modul A</span>

1. Auf welcher Technologie basiert Databricks?
   - a) Kubernetes
   - b) Apache Spark ← **Richtig**
   - c) Docker

2. <span class="lang-en" style="display:none">What is a workspace?</span><span class="lang-de">Was ist ein Workspace?</span>
   - <span class="lang-en" style="display:none">a) A VM in Azure</span><span class="lang-de">a) Eine VM in Azure</span>
   - b) Deine Databricks-Arbeitsumgebung ← **Richtig**
   - <span class="lang-en" style="display:none">c) An Azure subscription</span><span class="lang-de">c) Ein Azure-Abonnement</span>

3. <span class="lang-en" style="display:none">What is Databricks most commonly used for?</span><span class="lang-de">Wofür braucht man Databricks am ehesten?</span>
   - a) E-Mails senden
   - <span class="lang-en" style="display:none">b) Process and analyze large data volumes ← **Correct**</span><span class="lang-de">b) Große Datenmengen verarbeiten und analysieren ← **Richtig**</span>
   - c) Web-Seiten hosten

---

## <span class="lang-en" style="display:none">Module B: Databricks workspace basics</span><span class="lang-de">Modul B: Databricks Workspace-Basics</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create a Databricks workspace, explain the difference between control plane and compute plane, and read the Terraform configuration for it.</span><span class="lang-de">Du kannst einen Databricks Workspace erstellen, den Unterschied zwischen Control Plane und Compute Plane erklären, und die Terraform-Konfiguration dafür lesen.</span>

### 2.1 Databricks <span class="lang-en" style="display:none">Creating a workspace</span><span class="lang-de">Workspace erstellen</span>

```hcl
resource "azurerm_resource_group" "databricks" {
  name     = "rg-databricks-101"
  location = "Germany West Central"
}

resource "azurerm_databricks_workspace" "main" {
  name                          = "dbw-learning-101"
  resource_group_name           = azurerm_resource_group.databricks.name
  location                      = azurerm_resource_group.databricks.location
  sku                           = "standard"

  # Custom Parameters für VNet Injection
  custom_parameters {
    virtual_network_id        = azurerm_virtual_network.databricks.id
    public_subnet_name        = azurerm_subnet.databricks_public.name
    private_subnet_name       = azurerm_subnet.databricks_private.name
    public_subnet_network_security_group_association_id = azurerm_subnet_network_security_group_association.databricks_public.id
    private_subnet_network_security_group_association_id = azurerm_subnet_network_security_group_association.databricks_private.id
    no_public_ip              = false
  }

  tags = {
    Environment = "Learning"
    Course      = "Databricks101"
  }
}
```

### 2.2 <span class="lang-en" style="display:none">Control Plane vs. Compute Plane</span><span class="lang-de">Control Plane vs. Compute Plane</span>

```
Das ist eines der WICHTIGSTEN Konzepte für Databricks!

Control Plane (Management):
├── Databricks verwaltet das für dich
├── Web UI, Workspaces, Users, Permissions
├── Laufen bei Databricks (nicht bei dir)
└── Brauchen keinen Zugriff auf dein VNet

Compute Plane (deine Daten):
├── Deine Cluster, Jobs, Queries
├── Laufen in deinem VNet (bei VNet Injection)
├── Du kontrollierst die Infrastruktur
└── Brauchen Zugriff auf dein VNet

Analogy:
Control Plane    = Google verwaltet Gmail-Server
Compute Plane    = Du speicherst deine E-Mails auf deinem Computer
```

<span class="lang-en" style="display:none">**Why is this important?**</span><span class="lang-de">**Warum ist das wichtig?**</span>
- Netzwerkkonfiguration betrifft nur den **Compute Plane**
- <span class="lang-en" style="display:none">The **control plane** communicates with your VNet, but does not run inside it</span><span class="lang-de">Der **Control Plane** kommuniziert mit deinem VNet, aber läuft nicht darin</span>

### 2.3 <span class="lang-en" style="display:none">Databricks network topology (simplified)</span><span class="lang-de">Databricks Network Topology (vereinfacht)</span>

```
Databricks in Azure (mit VNet Injection):

Azure Portal / Browser
        │
        ▼
─────────────────────────
│  Databricks Control   │ ← Databricks verwaltet
│  Plane (Cloud)        │
─────────────────────────
        │
        │ HTTPS (443) — Databricks Cloud
        ▼
─────────────────────────
│  Azure Virtual Network│ ← Dein VNet
│  (Dein Netzwerk)      │
│                     ┌─────────────┐
│                     │ Host Subnet │ ← Databricks Infra
│                     │ (10.0.1.0/24)│
│                     └─────────────┘
│                     ┌─────────────┐
│                     │Container    │ ← Cluster-VMs
│                     │Subnet       │
│                     │(10.0.2.0/24)│
│                     └─────────────┘
│                     ┌─────────────┐
│                     │ NSG         │ ← Firewall-Regeln
│                     └─────────────┘
─────────────────────────
```

### 2.4 <span class="lang-en" style="display:none">Subnet sizes for Databricks</span><span class="lang-de">Subnet-Größen für Databricks</span>

```
WICHTIG: Databricks hat spezifische Subnet-Anforderungen!

Minimale Größe:
├── VNet Address Space: mindestens /16 bis /24
├── Host Subnet: mindestens /26 (64 IPs, 59 nutzbare)
├── Container Subnet: mindestens /26 (64 IPs, 59 nutzbare)

Empfohlene Größe:
├── VNet Address Space: /16 (65.536 IPs)
├── Host Subnet: /24 (256 IPs)
└── Container Subnet: /24 (256 IPs)

Grund: Databricks benötigt IPs für:
  - 5 reservierte IPs pro Subnet (Azure)
  - 2 IPs pro Cluster-Node (reserviert)
  - Mehrere Nodes pro Cluster
  - Future Expansion
```

### 2.5 <span class="lang-en" style="display:none">Terraform configuration — VNet and subnets</span><span class="lang-de">Terraform-Konfiguration — VNet und Subnetze</span>

```hcl
# Virtual Network
resource "azurerm_virtual_network" "databricks" {
  name                = "vnet-databricks"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.databricks.location
  resource_group_name = azurerm_resource_group.databricks.name
}

# Host Subnet (für Databricks Infra)
resource "azurerm_subnet" "databricks_host" {
  name                 = "dbws-subnet-host"
  resource_group_name  = azurerm_resource_group.databricks.name
  virtual_network_name = azurerm_virtual_network.databricks.name
  address_prefixes     = ["10.0.1.0/24"]
  
  # Wichtig: Service Endpoint für Microsoft.Sql
  service_endpoints = ["Microsoft.Sql"]
}

# Container Subnet (für Cluster-VMs)
resource "azurerm_subnet" "databricks_container" {
  name                 = "dbws-subnet-container"
  resource_group_name  = azurerm_resource_group.databricks.name
  virtual_network_name = azurerm_virtual_network.databricks.name
  address_prefixes     = ["10.0.2.0/24"]
  
  service_endpoints = ["Microsoft.Sql"]
}
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul B</span><span class="lang-de">Kurzes Quiz — Modul B</span>

1. <span class="lang-en" style="display:none">What does VNet Injection mean in Databricks?</span><span class="lang-de">Was bedeutet VNet Injection bei Databricks?</span>
   - a) Databricks wird in dein Azure VNet eingebettet ← **Richtig**
   - <span class="lang-en" style="display:none">b) Databricks creates VNets automatically</span><span class="lang-de">b) Databricks erstellt automatisch VNets</span>
   - <span class="lang-en" style="display:none">c) Data is injected into a VNet</span><span class="lang-de">c) Daten werden in ein VNet injiziert</span>

2. <span class="lang-en" style="display:none">What is the control plane?</span><span class="lang-de">Was ist die Control Plane?</span>
   - a) Deine Cluster-VMs
   - b) Databricks' Verwaltungsebene (Web UI, etc.) ← **Richtig**
   - <span class="lang-en" style="display:none">c) The Azure portal</span><span class="lang-de">c) Das Azure Portal</span>

3. <span class="lang-en" style="display:none">What is the minimum required subnet size for Databricks?</span><span class="lang-de">Wie groß muss mindestens ein Subnet für Databricks sein?</span>
   - a) /28
   - b) /26 ← **Richtig**
   - c) /16

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul B</span><span class="lang-de">Praktische Übung — Modul B</span>

<span class="lang-en" style="display:none">**Task:** Create:</span><span class="lang-de">**Aufgabe:** Erstelle:</span>
1. <span class="lang-en" style="display:none">A resource group</span><span class="lang-de">Eine Resource Group</span>
2. <span class="lang-en" style="display:none">A VNet with `/16`</span><span class="lang-de">Ein VNet mit `/16`</span>
3. Zwei Subnetze `/24`: `dbws-subnet-host` und `dbws-subnet-container`
4. Einen Databricks Workspace (`standard`) mit VNet Injection Konfiguration
5. <span class="lang-en" style="display:none">Outputs for the workspace URL</span><span class="lang-de">Outputs für die Workspace-URL</span>

---

## <span class="lang-en" style="display:none">Module C: VNet Injection</span><span class="lang-de">Modul C: VNet Injection</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain VNet Injection, name the required Terraform parameters, and create a complete, secure Databricks network configuration.</span><span class="lang-de">Du kannst VNet Injection erklären, die notwendigen Terraform-Parameter benennen und eine vollständige, sichere Databricks-Netzwerkkonfiguration erstellen.</span>

### 3.1 <span class="lang-en" style="display:none">Why VNet Injection?</span><span class="lang-de">Warum VNet Injection?</span>

```
Ohne VNet Injection:
┌──────────────────────────────────┐
│  Databricks Cluster             │
│  ← Public IP → Internet → ❌    │
│  Unsicher! Daten fließen offen! │
└──────────────────────────────────┘

Mit VNet Injection:
┌──────────────────────────────────┐
│  Azure VNet (Dein Netzwerk)     │
│  ┌────────────────────────────┐ │
│  │ Databricks Cluster        │ │
│  │ ← Private IP (nicht öffentlich) │
│  │ NSG schützt alles         │ │
│  └────────────────────────────┘ │
│  Kontrolliert! Daten fließen   │
│  nur durch dein Netzwerk!       │
└──────────────────────────────────┘
```

<span class="lang-en" style="display:none">**Reasons for VNet Injection:**</span><span class="lang-de">**Gründe für VNet Injection:**</span>
- 🔒 <span class="lang-en" style="display:none">**Security** — no public IP for clusters</span><span class="lang-de">**Sicherheit** — Keine öffentliche IP für Cluster</span>
- 🏢 **On-Premise Zugriff** — Zugriff aus dem Firmennetzwerk
- 📊 **Traffic Inspection** — Firewall/UDR kontrollieren den Traffic
- 🌐 **Custom DNS** — Eigene DNS-Regeln
- ✅ **Compliance** — Viele Unternehmen ERZWEIDEN VNet Injection

### 3.2 <span class="lang-en" style="display:none">Terraform configuration — complete example</span><span class="lang-de">Terraform-Konfiguration — Komplettes Beispiel</span>

```hcl
# === Provider ===
terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# === Resource Group ===
resource "azurerm_resource_group" "databricks" {
  name     = "rg-databricks-security"
  location = "Germany West Central"

  tags = {
    Environment = "Learning"
  }
}

# === Virtual Network ===
resource "azurerm_virtual_network" "databricks" {
  name                = "vnet-databricks"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.databricks.location
  resource_group_name = azurerm_resource_group.databricks.name
}

# === Subnetze ===
resource "azurerm_subnet" "databricks_host" {
  name                          = "dbws-subnet-host"
  resource_group_name           = azurerm_resource_group.databricks.name
  virtual_network_name          = azurerm_virtual_network.databricks.name
  address_prefixes              = ["10.0.1.0/24"]
  service_endpoints             = ["Microsoft.Sql"]
}

resource "azurerm_subnet" "databricks_container" {
  name                          = "dbws-subnet-container"
  resource_group_name           = azurerm_resource_group.databricks.name
  virtual_network_name          = azurerm_virtual_network.databricks.name
  address_prefixes              = ["10.0.2.0/24"]
  service_endpoints             = ["Microsoft.Sql"]
}

# === NSGs ===
resource "azurerm_network_security_group" "databricks" {
  name                = "nsg-databricks"
  resource_group_name = azurerm_resource_group.databricks.name
  location            = azurerm_resource_group.databricks.location
}

# NSG mit Subnet verbinden
resource "azurerm_subnet_network_security_group_association" "databricks_host" {
  subnet_id                     = azurerm_subnet.databricks_host.id
  network_security_group_id     = azurerm_network_security_group.databricks.id
}

resource "azurerm_subnet_network_security_group_association" "databricks_container" {
  subnet_id                     = azurerm_subnet.databricks_container.id
  network_security_group_id     = azurerm_network_security_group.databricks.id
}

# === Databricks Workspace ===
resource "azurerm_databricks_workspace" "main" {
  name                          = "dbw-security-demo"
  resource_group_name           = azurerm_resource_group.databricks.name
  location                      = azurerm_resource_group.databricks.location
  sku                           = "standard"
  network_security_group_rules_required = "AzureDatabricksRules"

  custom_parameters {
    virtual_network_id                                         = azurerm_virtual_network.databricks.id
    public_subnet_name                                         = azurerm_subnet.databricks_host.name
    private_subnet_name                                        = azurerm_subnet.databricks_container.name
    public_subnet_network_security_group_association_id        = azurerm_subnet_network_security_group_association.databricks_host.id
    private_subnet_network_security_group_association_id       = azurerm_subnet_network_security_group_association.databricks_container.id
    no_public_ip                                               = false
  }

  tags = {
    Environment = "Learning"
  }
}

# === Outputs ===
output "databricks_workspace_url" {
  description = "Databricks Workspace URL"
  value       = azurerm_databricks_workspace.main.workspace_url
}

output "databricks_workspace_id" {
  description = "Databricks Workspace ID"
  value       = azurerm_databricks_workspace.main.id
}
```

### 3.3 <span class="lang-en" style="display:none">custom_parameters — the most important fields</span><span class="lang-de">custom_parameters — Die wichtigsten Felder</span>

```hcl
custom_parameters {
  # VNet ID — Wo soll Databricks laufen?
  virtual_network_id = azurerm_virtual_network.databricks.id

  # Host Subnet Name — Für Databricks Infrastruktur
  public_subnet_name = "dbws-subnet-host"

  # Container Subnet Name — Für Cluster-VMs
  private_subnet_name = "dbws-subnet-container"

  # NSG-Verbindungen — PFlicht sobald virtual_network_id gesetzt!
  public_subnet_network_security_group_association_id = nsg-host-association.id
  private_subnet_network_security_group_association_id = nsg-container-association.id

  # SCC (Secure Cluster Connectivity)
  no_public_ip = false  # true = SCC aktiviert!

  # Optional: NAT Gateway Name
  # nat_gateway_name = "natg-databricks"

  # Optional: Public IP Name
  # public_ip_name = "pip-databricks"
}
```

<span class="lang-en" style="display:none">**Important:** `public_subnet_network_security_group_association_id` and `private_subnet_network_security_group_association_id` are **required** as soon as `virtual_network_id` is set!</span><span class="lang-de">**Wichtig:** `public_subnet_network_security_group_association_id` und `private_subnet_network_security_group_association_id` sind **Pflicht**, sobald `virtual_network_id` gesetzt ist!</span>

### 3.4 <span class="lang-en" style="display:none">network_security_group_rules_required</span><span class="lang-de">network_security_group_rules_required</span>

```hcl
# Option 1: AzureDatabricksRules (Standard)
network_security_group_rules_required = "AzureDatabricksRules"

# Databricks erstellt seine eigenen NSG-Regeln automatisch:
# - Databricks muss mit deinen Clustern kommunizieren
# - Cluster müssen Databricks Services erreichen
# - Empfohlen für die meisten Fälle

# Option 2: NoAzureDatabricksRules
network_security_group_rules_required = "NoAzureDatabricksRules"

# Keine automatischen Regeln — du musst alles selbst machen!
# Nur bei Back-End <span class="lang-en" style="display:none">Private Link (classic compute plane) empfohlen</span><span class="lang-de">Private Link (classic compute plane) empfohlen</span>
# Oder bei striktem Egress-Lockdown mit Azure Firewall
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul C</span><span class="lang-de">Kurzes Quiz — Modul C</span>

1. <span class="lang-en" style="display:none">What does `no_public_ip = true` mean in custom_parameters?</span><span class="lang-de">Was bedeutet `no_public_ip = true` in custom_parameters?</span>
   - a) Databricks ohne Internet
   - <span class="lang-en" style="display:none">b) Secure Cluster Connectivity — no public IP ← **Correct**</span><span class="lang-de">b) Secure Cluster Connectivity — Keine Public IP ← **Richtig**</span>
   - c) Databricks wird deaktiviert

2. <span class="lang-en" style="display:none">Why must NSG association IDs be specified in custom_parameters?</span><span class="lang-de">Warum müssen NSG-Association-IDs in custom_parameters angegeben werden?</span>
   - a) Weil Databricks NSG-Regeln braucht ← **Richtig**
   - b) Weil es optional ist
   - c) Weil Azure es nicht anders erlaubt

3. <span class="lang-en" style="display:none">What does `AzureDatabricksRules` do?</span><span class="lang-de">Was macht `AzureDatabricksRules`?</span>
   - a) Blockiert alle Regeln
   - <span class="lang-en" style="display:none">b) Databricks automatically creates required NSG rules ← **Correct**</span><span class="lang-de">b) Databricks erstellt automatisch nötige NSG-Regeln ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) Deletes all NSG rules</span><span class="lang-de">c) Löscht alle NSG-Regeln</span>

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul C</span><span class="lang-de">Praktische Übung — Modul C</span>

<span class="lang-en" style="display:none">**Task:** Create:</span><span class="lang-de">**Aufgabe:** Erstelle:</span>
1. <span class="lang-en" style="display:none">A resource group</span><span class="lang-de">Eine Resource Group</span>
2. <span class="lang-en" style="display:none">A VNet with two subnets (`dbws-subnet-host`, `dbws-subnet-container`)</span><span class="lang-de">Ein VNet mit zwei Subnetzen (`dbws-subnet-host`, `dbws-subnet-container`)</span>
3. <span class="lang-en" style="display:none">An NSG and associate it with both subnets</span><span class="lang-de">Eine NSG und verbinde sie mit beiden Subnetzen</span>
4. Einen Databricks Workspace mit VNet Injection
5. <span class="lang-en" style="display:none">Check the Terraform output — the workspace URL should appear!</span><span class="lang-de">Prüfe die Terraform-Ausgabe — die Workspace-URL sollte erscheinen!</span>

---

## <span class="lang-en" style="display:none">Module D: Secure Cluster Connectivity (SCC)</span><span class="lang-de">Modul D: Secure Cluster Connectivity (SCC)</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain SCC, understand the difference between portal defaults and Terraform defaults, and enable SCC with Terraform.</span><span class="lang-de">Du kannst SCC erklären, den Unterschied zwischen Portal-Default und Terraform-Default verstehen, und SCC mit Terraform aktivieren.</span>

### 4.1 <span class="lang-en" style="display:none">What is SCC?</span><span class="lang-de">Was ist SCC?</span>

```
Secure Cluster Connectivity (SCC):

Vor SCC:
┌──────────────────────────────────┐
│  Databricks Workspace           │
│  Cluster ── Public IP ── Internet│
│  ❌ Öffentlich erreichbar!       │
└──────────────────────────────────┘

Mit SCC (no_public_ip = true):
┌──────────────────────────────────┐
│  Databricks Workspace           │
│  Cluster ── Private IP nur ── VNet │
│  ✅ Kein öffentliches Interface!  │
└──────────────────────────────────┘
```

**SCC-Vorteile:**
- 🔒 <span class="lang-en" style="display:none">Clusters are **never** directly reachable from the internet</span><span class="lang-de">Cluster sind **niemals** direkt über das Internet erreichbar</span>
- 🏢 <span class="lang-en" style="display:none">Access only from the VNet (or on-premises via ExpressRoute)</span><span class="lang-de">Nur Zugriff aus dem VNet (oder On-Premise über ExpressRoute)</span>
- ✅ <span class="lang-en" style="display:none">Meets many compliance requirements</span><span class="lang-de">Erfüllt viele Compliance-Anforderungen</span>

### 4.2 ⚠️ <span class="lang-en" style="display:none">The big pitfall</span><span class="lang-de">Die große Stolperfalle</span>

```
Portal (Azure Web) vs. Terraform — UNTERSCHIEDLICHE DEFAULTS!

Azure Portal:
  [x] Deploy with SCC (No Public IP)
  → Standard: JA ✅

Terraform:
  no_public_ip = false
  → Standard: NEIN ❌

FOLGE:
Wenn du Databricks mit Terraform erstellst und no_public_ip
nicht setzt, bekommst du einen Workspace MIT Public IP —
auch wenn du dachtest, SCC sei standardmäßig an!
```

<span class="lang-en" style="display:none">**Remember:** `no_public_ip = true` must **always** be set explicitly!</span><span class="lang-de">**Merke:** `no_public_ip = true` muss **immer explizit** gesetzt werden!</span>

### 4.3 <span class="lang-en" style="display:none">Enable SCC with Terraform</span><span class="lang-de">SCC mit Terraform aktivieren</span>

```hcl
resource "azurerm_databricks_workspace" "main" {
  name                          = "dbw-scc-demo"
  resource_group_name           = azurerm_resource_group.databricks.name
  location                      = azurerm_resource_group.databricks.location
  sku                           = "standard"

  custom_parameters {
    virtual_network_id                                         = azurerm_virtual_network.databricks.id
    public_subnet_name                                         = azurerm_subnet.databricks_host.name
    private_subnet_name                                        = azurerm_subnet.databricks_container.name
    public_subnet_network_security_group_association_id        = azurerm_subnet_network_security_group_association.databricks_host.id
    private_subnet_network_security_group_association_id       = azurerm_subnet_network_security_group_association.databricks_container.id
    
    # ⭐ SCC AKTIVIEREN:
    no_public_ip = true  # ← WICHTIG!
  }
}
```

### 4.4 <span class="lang-en" style="display:none">SCC and NSG rules</span><span class="lang-de">SCC und NSG-Regeln</span>

```hcl
# Wenn SCC aktiviert ist, braucht Databricks bestimmte NSG-Regeln:

# Regel 1: Databricks Control Plane → Cluster (Inbound)
resource "azurerm_network_security_rule" "databricks_control_to_compute" {
  name                        = "AllowDatabricksControlPlane"
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "11211"  # MongoDB
  source_address_prefix       = "AzureDatabricks"  # Spezial-Tag!
  destination_address_prefix  = "*"
}

# Regel 2: HTTPS von Databricks Control Plane
resource "azurerm_network_security_rule" "databricks_https" {
  name                        = "AllowDatabricksHTTPS"
  priority                    = 120
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "AzureDatabricks"
  destination_address_prefix  = "*"
}

# Regel 3: Spark-Ports (3301, 3302)
resource "azurerm_network_security_rule" "databricks_spark" {
  name                        = "AllowSpark"
  priority                    = 130
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "3301-3303"
  source_address_prefix       = "AzureDatabricks"
  destination_address_prefix  = "*"
}
```

### 4.5 <span class="lang-en" style="display:none">Outbound access for Databricks</span><span class="lang-de">Outbound-Zugang für Databricks</span>

```hcl
# Databricks-Cluster brauchen Outbound-Zugang:

# HTTPS (443) — Für Paket-Installation, Updates, etc.
resource "azurerm_network_security_rule" "databricks_outbound_https" {
  name                        = "AllowOutboundHTTPS"
  priority                    = 200
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
}

# DNS (53) — Namensauflösung
resource "azurerm_network_security_rule" "databricks_outbound_dns" {
  name                        = "AllowOutboundDNS"
  priority                    = 210
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "53"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
}

# ⚠️ WICHTIG — Default Outbound Access Retirement!
# Ab 31. März 2026: Neue Azure VNets haben KEINEN
# Standard-Outbound-Zugang mehr!
# DU MUSS einen NAT Gateway oder Azure Firewall konfigurieren!
```

### 4.6 <span class="lang-en" style="display:none">Default Outbound Access Retirement — what is it?</span><span class="lang-de">Default Outbound Access Retirement — was ist das?</span>

```
⚠️ AKTUELLE ÄNDERUNG (ab 31. März 2026) ⚠️

FRÜHER:
Azure VMs in Subnetten hatten standardmäßig Internet-Zugang
(über eine implicit Route)

AB 31. MÄRZ 2026:
Neue VNets haben KEINEN Standard-Outbound-Zugang mehr!

FOLGE FÜR DATABRICKS:
Neue Databricks Workspaces brauchen einen EXPLIZITEN
Outbound-Pfad:

Empfohlen: NAT Gateway
├── Subnet → NAT Gateway → Public IP → Internet
│
Alternativ: Azure Firewall
├── Subnet → UDR zu Firewall → Public IP → Internet
```

<span class="lang-en" style="display:none">**What you need to do:**</span><span class="lang-de">**Was du tun musst:**</span>

```hcl
# NAT Gateway konfigurieren
resource "azurerm_public_ip" "databricks" {
  name                = "pip-databricks-nat"
  resource_group_name = azurerm_resource_group.databricks.name
  location            = azurerm_resource_group.databricks.location
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_nat_gateway" "databricks" {
  name                = "natg-databricks"
  resource_group_name = azurerm_resource_group.databricks.name
  location            = azurerm_resource_group.databricks.location
  sku_name            = "Standard"

  public_ip_address_ids = [azurerm_public_ip.databricks.id]
}

# Subnets mit NAT Gateway verbinden (über UserDefinedRoute)
# Oder: Im custom_parameters nat_gateway_name angeben
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul D</span><span class="lang-de">Kurzes Quiz — Modul D</span>

1. <span class="lang-en" style="display:none">What is the SCC pitfall?</span><span class="lang-de">Was ist die Stolperfalle bei SCC?</span>
   - a) SCC funktioniert nur mit Premium Tier
   - b) Portal und Terraform haben verschiedene Defaults ← **Richtig**
   - c) SCC funktioniert nicht mit VNet Injection

2. <span class="lang-en" style="display:none">What must be set explicitly in Terraform for SCC?</span><span class="lang-de">Was muss in Terraform explizit gesetzt werden für SCC?</span>
   - a) `no_public_ip = true` ← **Richtig**
   - b) `enable_scc = true`
   - c) `security = "cluster"`

3. <span class="lang-en" style="display:none">Why is Default Outbound Access Retirement important?</span><span class="lang-de">Warum ist die Default Outbound Access Retirement wichtig?</span>
   - a) Databricks funktioniert danach nicht mehr
   - b) Neue VNets brauchen expliziten Outbound-Zugang (NAT Gateway) ← **Richtig**
   - <span class="lang-en" style="display:none">c) Old VNets are deleted automatically</span><span class="lang-de">c) Alte VNets werden automatisch gelöscht</span>

4. <span class="lang-en" style="display:none">Which special Azure tag is used for Databricks NSG sources?</span><span class="lang-de">Welches spezielle Azure-Tag wird für Databricks-NSG-Quellen verwendet?</span>
   - a) `Databricks`
   - b) `AzureDatabricks` ← **Richtig**
   - c) `Azure-DBX`

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- <span class="lang-en" style="display:none">Create a Databricks workspace with SCC (`no_public_ip = true`)</span><span class="lang-de">Erstelle einen Databricks Workspace mit SCC (`no_public_ip = true`)</span>
- <span class="lang-en" style="display:none">Configure NSG rules for Databricks</span><span class="lang-de">Konfiguriere NSG-Regeln für Databricks</span>
- <span class="lang-en" style="display:none">Document which NSG rules Databricks requires</span><span class="lang-de">Dokumentiere, welche NSG-Regeln Databricks benötigt</span>

---

## <span class="lang-en" style="display:none">Module E: Private Link and network decisions</span><span class="lang-de">Modul E: Private Link und Networking-Entscheidungen</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain the different Databricks networking options, understand when each option makes sense, and apply a decision matrix.</span><span class="lang-de">Du kannst die verschiedenen Databricks-Netzwerkoptionen erklären, verstehen, wann welche Option sinnvoll ist, und eine Entscheidungsmatrix anwenden.</span>

### 5.1 <span class="lang-en" style="display:none">Databricks network options</span><span class="lang-de">Databricks-Netzwerk-Optionen</span>

```
Databricks kann auf verschiedene Weisen ins Netzwerk eingebettet werden:

Option 1: VNet Injection (Standard) ✅
├── Databricks läuft in deinem VNet
├── Cluster haben Private IPs
└── Empfohlen für die meisten Fälle

Option 2: VNet Injection + SCC ✅
├── Wie Option 1
└── Cluster haben KEINE Public IP
    → Empfohlen für maximale Sicherheit

Option 3: Front-End Private Link ✅
├── Zugriff auf Workspace OHNE Public IP
├── Browser → Private Endpoint → Workspace
└── Erfordert Premium Tier

Option 4: Back-End Private Link ✅
├── Compute → Control-Plane über Private Link
└── Erfordert `NoAzureDatabricksRules`

Option 5: User-Defined Routes (UDR)
├── Manuell Routing kontrollieren
├── Durch Azure Firewall
└── Für Compliance / Traffic Inspection
```

### 5.2 <span class="lang-en" style="display:none">Decision matrix</span><span class="lang-de">Entscheidungsmatrix</span>

```
Welche Option brauchst du?

┌─────────────────────────────────────────────────────────────┐
│ Frage 1: Bist du ein Anfänger?                              │
│ └─ JA → VNet Injection + SCC                                │
│                                                            │
│ Frage 2: Muss der Browser-Zugriff ohne Public IP erfolgen?  │
│ └─ JA → Front-End Private Link (Premium nötig)              │
│                                                            │
│ Frage 3: Brauchst du Traffic Inspection durch Firewall?     │
│ └─ JA → UDR zu Azure Firewall                               │
│                                                            │
│ Frage 4: Bist du in einer regulierten Umgebung?             │
│ └─ JA → Private Link + SCC + Firewall + UDR                 │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Front-End <span class="lang-en" style="display:none">Private Link (vereinfacht)</span><span class="lang-de">Private Link (vereinfacht)</span>

```hcl
# ⚠️ Benötigt Premium Tier!

resource "azurerm_private_endpoint" "databricks" {
  name                = "pe-databricks"
  resource_group_name = azurerm_resource_group.databricks.name
  location            = azurerm_resource_group.databricks.location

  subnet_id = azurerm_subnet.private_endpoint.id

  private_service_connection {
    name                           = "psc-databricks"
    private_connection_resource_id = azurerm_databricks_workspace.main.id
    is_manual_connection           = false
    subresource_names              = ["databricks_ui_api"]
  }

  private_dns_zone_group {
    private_dns_zone_id = azurerm_private_dns_zone.databricks.id
  }
}

resource "azurerm_private_dns_zone" "databricks" {
  name                = "privatelink.azureml.net"
  resource_group_name = azurerm_resource_group.databricks.name
}

resource "azurerm_private_dns_zone_virtual_network_link" "databricks" {
  name                  = "dl-databricks"
  private_dns_zone_name = azurerm_private_dns_zone.databricks.name
  resource_group_name   = azurerm_resource_group.databricks.name
  virtual_network_id    = azurerm_virtual_network.databricks.id
}
```

### 5.4 <span class="lang-en" style="display:none">Browser authentication workspace</span><span class="lang-de">Browser Authentication Workspace</span>

```hcl
# Für Front-End <span class="lang-en" style="display:none">Private Link: extra Workspace mit browser_endpoint</span><span class="lang-de">Private Link: extra Workspace mit browser_endpoint</span>
# Braucht Premium Tier!

resource "azurerm_databricks_workspace" "browser_auth" {
  name                          = "dbw-browser-auth"
  resource_group_name           = azurerm_resource_group.databricks.name
  location                      = azurerm_resource_group.databricks.location
  sku                           = "premium"

  custom_parameters {
    # ... VNet params ...
    no_public_ip = true
  }

  workspace {
    # Browser-authentication Workspace
    # → Benutzer müssen über Workspace-URL authentifizieren
  }
}
```

<span class="lang-en" style="display:none">**Remember:** Browser authentication is **required** if the transit VNet (hub) has no internet access!</span><span class="lang-de">**Merke:** Browser Authentication ist **Pflicht**, wenn das Transit-VNet (Hub) keinen Internet-Zugang hat!</span>

### 5.5 <span class="lang-en" style="display:none">Summary: what belongs in a 101 course?</span><span class="lang-de">Zusammenfassung: Was gehört in einen 101-Kurs?</span>

```
Pflicht-Kern (alle Anfänger):
✅ VNet Injection
✅ Secure Cluster Connectivity (SCC)
✅ NSG-Grundlagen

Optional / Vertiefung:
🔹 Front-End Private Link
🔹 Browser Authentication Workspace
🔹 Azure Firewall + UDR
🔹 Back-End Private Link
🔹 DNS-Konfiguration
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul E</span><span class="lang-de">Kurzes Quiz — Modul E</span>

1. <span class="lang-en" style="display:none">Which option is the default for beginners?</span><span class="lang-de">Welche Option ist der Standard für Anfänger?</span>
   - a) Front-End Private Link
   - b) VNet Injection + SCC ← **Richtig**
   - c) Back-End Private Link

2. <span class="lang-en" style="display:none">Which tier is required for front-end Private Link?</span><span class="lang-de">Welches Tier wird für Front-End Private Link benötigt?</span>
   - a) Single
   - b) Standard
   - c) Premium ← **Richtig**

3. <span class="lang-en" style="display:none">Why is browser authentication needed for a transit VNet without internet?</span><span class="lang-de">Warum ist Browser Authentication bei Transit-VNet ohne Internet nötig?</span>
   - a) Weil Databricks es automatisch macht
   - b) Weil Benutzer sonst nicht zur Workspace-URL kommen ← **Richtig**
   - c) Weil Azure es verlangt

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- <span class="lang-en" style="display:none">Create a decision matrix for three scenarios:</span><span class="lang-de">Erstelle eine Entscheidungsmatrix für drei Szenarien:</span>
  1. Lernumgebung
  2. Produktionsumgebung mit Compliance
  3. On-Premise-Anbindung
- <span class="lang-en" style="display:none">Which network path would you choose and why?</span><span class="lang-de">Welchen Netzwerkpfad würdest du wählen und warum?</span>

---

## <span class="lang-en" style="display:none">Module F: Terraform for Databricks and Capstone</span><span class="lang-de">Modul F: Terraform für Databricks und Capstone</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create a complete Databricks workspace with networking and security using Terraform, and know how the different concepts fit together.</span><span class="lang-de">Du kannst einen vollständigen Databricks Workspace mit Networking und Security mit Terraform erstellen, und weißt, wie die verschiedenen Konzepte zusammenhängen.</span>

### 6.1 <span class="lang-en" style="display:none">Complete Terraform example</span><span class="lang-de">Komplettes Terraform-Beispiel</span>

```hcl
# main.tf — Komplettes Databricks-Beispiel

terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  common_tags = {
    Environment = "Learning"
    Course      = "Databricks101"
    ManagedBy   = "Terraform"
  }
}

# Resource Group
resource "azurerm_resource_group" "databricks" {
  name     = "rg-databricks-capstone"
  location = "Germany West Central"
  tags     = local.common_tags
}

# Virtual Network
resource "azurerm_virtual_network" "databricks" {
  name                = "vnet-databricks"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.databricks.location
  resource_group_name = azurerm_resource_group.databricks.name
  tags                = local.common_tags
}

# Subnetze
resource "azurerm_subnet" "databricks_host" {
  name                          = "dbws-subnet-host"
  resource_group_name           = azurerm_resource_group.databricks.name
  virtual_network_name          = azurerm_virtual_network.databricks.name
  address_prefixes              = ["10.0.1.0/24"]
  service_endpoints             = ["Microsoft.Sql"]
}

resource "azurerm_subnet" "databricks_container" {
  name                          = "dbws-subnet-container"
  resource_group_name           = azurerm_resource_group.databricks.name
  virtual_network_name          = azurerm_virtual_network.databricks.name
  address_prefixes              = ["10.0.2.0/24"]
  service_endpoints             = ["Microsoft.Sql"]
}

# NSG
resource "azurerm_network_security_group" "databricks" {
  name                = "nsg-databricks"
  resource_group_name = azurerm_resource_group.databricks.name
  location            = azurerm_resource_group.databricks.location
  tags                = local.common_tags
}

resource "azurerm_subnet_network_security_group_association" "host" {
  subnet_id                     = azurerm_subnet.databricks_host.id
  network_security_group_id     = azurerm_network_security_group.databricks.id
}

resource "azurerm_subnet_network_security_group_association" "container" {
  subnet_id                     = azurerm_subnet.databricks_container.id
  network_security_group_id     = azurerm_network_security_group.databricks.id
}

# NSG-Regeln
resource "azurerm_network_security_rule" "databricks_mongodb" {
  name                        = "AllowDatabricksMongoDB"
  resource_group_name         = azurerm_resource_group.databricks.name
  network_security_group_name = azurerm_network_security_group.databricks.name
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "11211"
  source_address_prefix       = "AzureDatabricks"
  destination_address_prefix  = "*"
}

resource "azurerm_network_security_rule" "databricks_spark" {
  name                        = "AllowSpark"
  resource_group_name         = azurerm_resource_group.databricks.name
  network_security_group_name = azurerm_network_security_group.databricks.name
  priority                    = 120
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "3301-3303"
  source_address_prefix       = "AzureDatabricks"
  destination_address_prefix  = "*"
}

resource "azurerm_network_security_rule" "outbound_https" {
  name                        = "AllowOutboundHTTPS"
  resource_group_name         = azurerm_resource_group.databricks.name
  network_security_group_name = azurerm_network_security_group.databricks.name
  priority                    = 200
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
}

# Databricks Workspace mit SCC
resource "azurerm_databricks_workspace" "main" {
  name                          = "dbw-capstone-101"
  resource_group_name           = azurerm_resource_group.databricks.name
  location                      = azurerm_resource_group.databricks.location
  sku                           = "standard"
  network_security_group_rules_required = "AzureDatabricksRules"

  custom_parameters {
    virtual_network_id                                         = azurerm_virtual_network.databricks.id
    public_subnet_name                                         = azurerm_subnet.databricks_host.name
    private_subnet_name                                        = azurerm_subnet.databricks_container.name
    public_subnet_network_security_group_association_id        = azurerm_subnet_network_security_group_association.host.id
    private_subnet_network_security_group_association_id       = azurerm_subnet_network_security_group_association.container.id
    no_public_ip                                               = true  # SCC!
  }

  tags = local.common_tags
}

# Outputs
output "workspace_url" {
  description = "Databricks Workspace URL"
  value       = azurerm_databricks_workspace.main.workspace_url
}

output "workspace_id" {
  description = "Workspace Resource ID"
  value       = azurerm_databricks_workspace.main.id
}

output "vnet_id" {
  description = "VNet ID"
  value       = azurerm_virtual_network.databricks.id
}

output "host_subnet_id" {
  description = "Host Subnet ID"
  value       = azurerm_subnet.databricks_host.id
}

output "container_subnet_id" {
  description = "Container Subnet ID"
  value       = azurerm_subnet.databricks_container.id
}
```

### 6.2 <span class="lang-en" style="display:none">Complete flow</span><span class="lang-de">Vollständiger Ablauf</span>

```bash
# 1. In das Verzeichnis wechseln
cd databricks-capstone

# 2. Initialisieren
terraform init

# 3. Plan ansehen
terraform plan
# Erwartet: 1 Workspace + 1 VNet + 2 Subnetze + 1 NSG + Regeln

# 4. Prüfen:
#    → workspace_url sollte erscheinen
#    → no_public_ip = true (SCC aktiviert)

# 5. Erstellen
terraform apply

# 6. Im Azure Portal prüfen:
#    → Databricks Workspace sichtbar
#    → VNet mit Subnetzen sichtbar
#    → NSG mit Regeln sichtbar

# 7. Databricks Workspace öffnen:
#    → URL aus dem Output kopieren
#    → Anmelden (Azure Account)
#    → Cluster erstellen (Test!)

# 8. Aufräumen
terraform destroy
```

### 6.3 🏆 <span class="lang-en" style="display:none">Capstone project</span><span class="lang-de">Capstone-Projekt</span>

<span class="lang-en" style="display:none">**Task:** Create a complete Databricks infrastructure:</span><span class="lang-de">**Aufgabe:** Erstelle eine vollständige Databricks-Infrastruktur:</span>

```
Pflicht:
├── Resource Group
├── VNet (10.0.0.0/16)
├── Host Subnet (/24)
├── Container Subnet (/24)
├── NSG mit Databricks-Regeln (MongoDB, Spark)
├── Databricks Workspace mit VNet Injection
├── SCC aktiviert (no_public_ip = true)
├── NAT Gateway für Outbound-Zugang
├── Variablen und Locals
├── Outputs für URL und IDs
├── Format und Validierung

Optional (Bonus):
├── Hub-and-Spoke Architektur (aus Azure 101)
├── Azure Firewall im Hub
├── Front-End Private Link (Premium)
├── NSG-Regeln über for_each erstellt
└── Remote State konfiguriert
```

<span class="lang-en" style="display:none">**Checklist:**</span><span class="lang-de">**Checkliste:**</span>
- [ ] <span class="lang-en" style="display:none">`terraform init` runs</span><span class="lang-de">`terraform init` läuft</span>
- [ ] <span class="lang-en" style="display:none">`terraform validate` says "valid"</span><span class="lang-de">`terraform validate` sagt "valid"</span>
- [ ] <span class="lang-en" style="display:none">`terraform fmt -check` has no changes</span><span class="lang-de">`terraform fmt -check` keine Änderungen</span>
- [ ] <span class="lang-en" style="display:none">`terraform plan` shows all expected resources</span><span class="lang-de">`terraform plan` zeigt alle erwarteten Ressourcen</span>
- [ ] Workspace URL erscheint als Output
- [ ] SCC ist aktiviert (`no_public_ip = true`)
- [ ] NSG-Regeln sind korrekt
- [ ] NAT Gateway ist konfiguriert

### 6.4 <span class="lang-en" style="display:none">What's next?</span><span class="lang-de">Was kommt als Nächstes?</span>

```
Fertig mit Databricks 101? Weiter zu:

1. Integration 101  → Terraform + Azure + Databricks kombiniert
2. Terraform CI/CD  → GitHub Actions für Databricks-Deployment
3. Terraform Module → Databricks als wiederverwendbares Modul
4. Databricks ML    → Machine Learning auf Databricks
```

### 6.5 <span class="lang-en" style="display:none">Overview: all three courses combined</span><span class="lang-de">Überblick: Alle drei Kurse kombiniert</span>

```
Terraform 101          → IaC, HCL, State, Module
         ↓
Azure 101              → Resource Groups, VNets, NSGs, Hub-and-Spoke
         ↓
Databricks 101         → Workspace, VNet Injection, SCC, Private Link
         ↓
Integration 101        → Alles zusammen: Terraform + Azure + Databricks
```

### 📝 <span class="lang-en" style="display:none">Final Quiz — Kurs-Ende</span><span class="lang-de">Letztes Quiz — Kurs-Ende</span>

1. <span class="lang-en" style="display:none">Name the two subnet types Databricks needs.</span><span class="lang-de">Nenne die zwei Subnet-Typen, die Databricks braucht.</span>
   <span class="lang-en" style="display:none">**Sample:** host subnet and container subnet</span><span class="lang-de">**Muster:** Host Subnet und Container Subnet</span>

2. <span class="lang-en" style="display:none">Why is `no_public_ip = true` important in Terraform?</span><span class="lang-de">Warum ist `no_public_ip = true` in Terraform wichtig?</span>
   <span class="lang-en" style="display:none">**Sample:** enables SCC — clusters have no public IP</span><span class="lang-de">**Muster:** Aktiviert SCC — Cluster haben keine öffentliche IP</span>

3. <span class="lang-en" style="display:none">What does `AzureDatabricksRules` mean?</span><span class="lang-de">Was bedeutet `AzureDatabricksRules`?</span>
   <span class="lang-en" style="display:none">**Sample:** Databricks automatically creates required NSG rules</span><span class="lang-de">**Muster:** Databricks erstellt automatisch nötige NSG-Regeln</span>

4. <span class="lang-en" style="display:none">What is Default Outbound Retirement?</span><span class="lang-de">Was ist die Default-Outbound-Retirement?</span>
   <span class="lang-en" style="display:none">**Sample:** from March 2026, new VNets need an explicit outbound path (NAT Gateway)</span><span class="lang-de">**Muster:** Ab März 2026 brauchen neue VNets expliziten Outbound-Pfad (NAT Gateway)</span>

---

## <span class="lang-en" style="display:none">Appendix: Databricks port reference</span><span class="lang-de">Anhang: Databricks-Portreferenz</span>

| Port | <span class="lang-en" style="display:none">Direction</span><span class="lang-de">Richtung</span> | <span class="lang-en" style="display:none">Purpose</span><span class="lang-de">Zweck</span> | NSG-Regel |
|------|----------|-------|-----------|
| 443 | Inbound | HTTPS (Web UI, API) | Von AzureDatabricks |
| 11211 | Inbound | MongoDB (Cluster-Zugriff) | Von AzureDatabricks |
| 3301-3303 | Inbound | Spark-Kommunikation | Von AzureDatabricks |
| 443 | Outbound | HTTPS (Pakete, Updates) | Zu */443 |
| 53 | Outbound | DNS | Zu */53 |
| 80 | Outbound | HTTP (nicht empfohlen) | Zu */80 |

## <span class="lang-en" style="display:none">Appendix: Common errors</span><span class="lang-de">Anhang: Häufige Fehler</span>

| <span class="lang-en" style="display:none">Error</span><span class="lang-de">Fehler</span> | <span class="lang-en" style="display:none">Solution</span><span class="lang-de">Lösung</span> |
|--------|--------|
| <span class="lang-en" style="display:none">`no_public_ip` not set</span><span class="lang-de">`no_public_ip nicht gesetzt`</span> | <span class="lang-en" style="display:none">Always set `no_public_ip = true`!</span><span class="lang-de">Immer `no_public_ip = true` setzen!</span> |
| <span class="lang-en" style="display:none">NSG association missing</span><span class="lang-de">`NSG Association fehlt`</span> | <span class="lang-en" style="display:none">Both associations are required in custom_parameters</span><span class="lang-de">Beide Associations in custom_parameters nötig</span> |
| `Subnet zu klein` | Mindestens /26, empfohlen /24 |
| `Portal vs. Terraform Default` | Terraform: `no_public_ip = false`! Explizit setzen! |
| <span class="lang-en" style="display:none">Outbound after March 2026</span><span class="lang-de">`Outbound nach März 2026`</span> | <span class="lang-en" style="display:none">Configure NAT Gateway or Azure Firewall</span><span class="lang-de">NAT Gateway oder Azure Firewall konfigurieren</span> |
| <span class="lang-en" style="display:none">Premium for Private Link</span><span class="lang-de">`Premium für Private Link`</span> | <span class="lang-en" style="display:none">Front-end Private Link needs Premium tier</span><span class="lang-de">Front-End Private Link braucht Premium Tier</span> |
