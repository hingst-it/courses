---
layout: course
title: Databricks 101
description: Databricks-Infrastruktur und Networking — 8 Stunden, Azure-Vorkenntnisse empfohlen
permalink: /courses/databricks-101.html
---

# 🟨 Databricks 101 — <span class="lang-en" style="display:none">Databricks infrastructure and networking</span><span class="lang-de">Databricks-Infrastruktur und Networking</span>

> **Dauer:** 8 Stunden (1 voller Tag)  
> **Niveau:** Beginners — Azure 101 wird vorausgesetzt oder parallel gemacht  
> **Sprache:** Deutsch, mit englischen Fachbegriffen

---

## Inhaltsverzeichnis

1. [Modul A: Was ist Databricks?](#modul-a-was-ist-databricks) (1 h)
2. [Modul B: Databricks Workspace-Grundlagen](#modul-b-databricks-workspace-basics) (1,5 h)
3. [Modul C: VNet Injection](#modul-c-vnet-injection) (2 h)
4. [Modul D: Secure Cluster Connectivity (SCC)](#modul-d-secure-cluster-connectivity-scc) (1,5 h)
5. [Modul E: Private Link und Networking-Entscheidungen](#modul-e-private-link-und-networking) (1 h)
6. [Modul F: Terraform für Databricks und Capstone](#modul-f-terraform-für-databricks) (1 h)

---

## <span class="lang-en" style="display:none">Glossary — Important Databricks terms</span><span class="lang-de">Glossar — Wichtige Databricks-Begriffe</span>

| Deutsch | English | Bedeutung |
|---------|---------|-----------|
| Workspace | Workspace | Databricks-Umgebung (deine Arbeitsoberfläche) |
| Cluster | Cluster | Rechenressourcen für Data-Processing |
| Virtual Network Injection | VNet Injection | Databricks läuft in deinem Azure VNet |
| Compute Plane | Control Plane | Verwaltungsebene von Databricks |
| Control Plane | Data Plane | Rechen-Ebene (Cluster, Jobs, Queries) |
| Private Link | Private Link | Privater Zugriff ohne öffentliches Internet |
| Secure Cluster Connectivity | Secure Cluster Connectivity (SCC) | Keine Public IP für Cluster |
| Container Subnet | Container Subnet | Subnet für Cluster-VMs |
| Host Subnet | Host Subnet | Subnet für Databricks-Infrastruktur |
| NSG | Network Security Group | Firewall-Regeln |
| User-Defined Route | UDR | Manuelle Routing-Regeln |

---

## <span class="lang-en" style="display:none">Module A: What is Databricks?</span><span class="lang-de">Modul A: Was ist Databricks?</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst erklären, was Databricks ist, den Unterschied zwischen Databricks und Azure verstehen, und die Kernkonzepte Workspace, Cluster und Notebook benennen.

### 1.1 Was ist Databricks?

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
- **Delta Lake** — Open-Source Storage-Layer (wie eine Datenbank für große Daten)
- **MLflow** — Machine Learning Lifecycle Management

### 1.2 Databricks vs. andere Azure-Dienste

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
- 📊 **Große Datenmengen** (TB bis PB)
- 🔄 **Data Engineering** (Pipelines, Transformationen)
- 🤖 **Machine Learning**
- 📈 **Analytics & Business Intelligence**

### 1.3 Kernkonzepte

```
Workspace:
├── Dein "Büro" in Databricks
│   ├── Notebook (Code + Dokumentation)
│   ├── Cluster (Rechenleistung)
│   ├── Job (automatisierte Ausführung)
│   ├── Dashboard (Visualisierungen)
│   └── Warehouse (SQL Analytics)
```

### 1.4 Databricks-Tiers (Sku)

```
Developer Free    → Kostenlos, 14 Tage, für Testing
Single            → Einzelnarbeitsplätze, kleine Teams
Standard          → Mehrere Teams, Produktionsfähig
Premium           → Erweiterte Sicherheit, Governance
Enterprise        → Größte Unternehmen, SLAs
```

**Für den Kurs:** `Standard` ist die Mindestversion für VNet Injection. `Premium` wird für bestimmte Private-Link-Szenarien benötigt.

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul A</span><span class="lang-de">Kurzes Quiz — Modul A</span>

1. Auf welcher Technologie basiert Databricks?
   - a) Kubernetes
   - b) Apache Spark ← **Richtig**
   - c) Docker

2. Was ist ein Workspace?
   - a) Eine VM in Azure
   - b) Deine Databricks-Arbeitsumgebung ← **Richtig**
   - c) Ein Azure-Abonnement

3. Wofür braucht man Databricks am ehesten?
   - a) E-Mails senden
   - b) Große Datenmengen verarbeiten und analysieren ← **Richtig**
   - c) Web-Seiten hosten

---

## <span class="lang-en" style="display:none">Module B: Databricks workspace basics</span><span class="lang-de">Modul B: Databricks Workspace-Basics</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst einen Databricks Workspace erstellen, den Unterschied zwischen Control Plane und Compute Plane erklären, und die Terraform-Konfiguration dafür lesen.

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

### 2.2 Control Plane vs. Compute Plane

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

**Warum ist das wichtig?**
- Netzwerkkonfiguration betrifft nur den **Compute Plane**
- Der **Control Plane** kommuniziert mit deinem VNet, aber läuft nicht darin

### 2.3 Databricks Network Topology (vereinfacht)

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

### 2.4 Subnet-Größen für Databricks

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

### 2.5 Terraform-Konfiguration — VNet und Subnetze

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

1. Was bedeutet VNet Injection bei Databricks?
   - a) Databricks wird in dein Azure VNet eingebettet ← **Richtig**
   - b) Databricks erstellt automatisch VNets
   - c) Daten werden in ein VNet injiziert

2. Was ist die Control Plane?
   - a) Deine Cluster-VMs
   - b) Databricks' Verwaltungsebene (Web UI, etc.) ← **Richtig**
   - c) Das Azure Portal

3. Wie groß muss mindestens ein Subnet für Databricks sein?
   - a) /28
   - b) /26 ← **Richtig**
   - c) /16

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul B</span><span class="lang-de">Praktische Übung — Modul B</span>

**Aufgabe:** Erstelle:
1. Eine Resource Group
2. Ein VNet mit `/16`
3. Zwei Subnetze `/24`: `dbws-subnet-host` und `dbws-subnet-container`
4. Einen Databricks Workspace (`standard`) mit VNet Injection Konfiguration
5. Outputs für die Workspace-URL

---

## <span class="lang-en" style="display:none">Module C: VNet Injection</span><span class="lang-de">Modul C: VNet Injection</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst VNet Injection erklären, die notwendigen Terraform-Parameter benennen und eine vollständige, sichere Databricks-Netzwerkkonfiguration erstellen.

### 3.1 Warum VNet Injection?

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

**Gründe für VNet Injection:**
- 🔒 **Sicherheit** — Keine öffentliche IP für Cluster
- 🏢 **On-Premise Zugriff** — Zugriff aus dem Firmennetzwerk
- 📊 **Traffic Inspection** — Firewall/UDR kontrollieren den Traffic
- 🌐 **Custom DNS** — Eigene DNS-Regeln
- ✅ **Compliance** — Viele Unternehmen ERZWEIDEN VNet Injection

### 3.2 Terraform-Konfiguration — Komplettes Beispiel

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

### 3.3 custom_parameters — Die wichtigsten Felder

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

**Wichtig:** `public_subnet_network_security_group_association_id` und `private_subnet_network_security_group_association_id` sind **Pflicht**, sobald `virtual_network_id` gesetzt ist!

### 3.4 network_security_group_rules_required

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

1. Was bedeutet `no_public_ip = true` in custom_parameters?
   - a) Databricks ohne Internet
   - b) Secure Cluster Connectivity — Keine Public IP ← **Richtig**
   - c) Databricks wird deaktiviert

2. Warum müssen NSG-Association-IDs in custom_parameters angegeben werden?
   - a) Weil Databricks NSG-Regeln braucht ← **Richtig**
   - b) Weil es optional ist
   - c) Weil Azure es nicht anders erlaubt

3. Was macht `AzureDatabricksRules`?
   - a) Blockiert alle Regeln
   - b) Databricks erstellt automatisch nötige NSG-Regeln ← **Richtig**
   - c) Löscht alle NSG-Regeln

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul C</span><span class="lang-de">Praktische Übung — Modul C</span>

**Aufgabe:** Erstelle:
1. Eine Resource Group
2. Ein VNet mit zwei Subnetzen (`dbws-subnet-host`, `dbws-subnet-container`)
3. Eine NSG und verbinde sie mit beiden Subnetzen
4. Einen Databricks Workspace mit VNet Injection
5. Prüfe die Terraform-Ausgabe — die Workspace-URL sollte erscheinen!

---

## <span class="lang-en" style="display:none">Module D: Secure Cluster Connectivity (SCC)</span><span class="lang-de">Modul D: Secure Cluster Connectivity (SCC)</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst SCC erklären, den Unterschied zwischen Portal-Default und Terraform-Default verstehen, und SCC mit Terraform aktivieren.

### 4.1 Was ist SCC?

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
- 🔒 Cluster sind **niemals** direkt über das Internet erreichbar
- 🏢 Nur Zugriff aus dem VNet (oder On-Premise über ExpressRoute)
- ✅ Erfüllt viele Compliance-Anforderungen

### 4.2 ⚠️ Die große Stolperfalle!

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

**Merke:** `no_public_ip = true` muss **immer explizit** gesetzt werden!

### 4.3 SCC mit Terraform aktivieren

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

### 4.4 SCC und NSG-Regeln

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

### 4.5 Outbound-Zugang für Databricks

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

### 4.6 Default Outbound Access Retirement — WAS IST DAS?

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

**Was du tun musst:**

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

1. Was ist die Stolperfalle bei SCC?
   - a) SCC funktioniert nur mit Premium Tier
   - b) Portal und Terraform haben verschiedene Defaults ← **Richtig**
   - c) SCC funktioniert nicht mit VNet Injection

2. Was muss in Terraform explizit gesetzt werden für SCC?
   - a) `no_public_ip = true` ← **Richtig**
   - b) `enable_scc = true`
   - c) `security = "cluster"`

3. Warum ist die Default Outbound Access Retirement wichtig?
   - a) Databricks funktioniert danach nicht mehr
   - b) Neue VNets brauchen expliziten Outbound-Zugang (NAT Gateway) ← **Richtig**
   - c) Alte VNets werden automatisch gelöscht

4. Welches spezielle Azure-Tag wird für Databricks-NSG-Quellen verwendet?
   - a) `Databricks`
   - b) `AzureDatabricks` ← **Richtig**
   - c) `Azure-DBX`

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- Erstelle einen Databricks Workspace mit SCC (`no_public_ip = true`)
- Konfiguriere NSG-Regeln für Databricks
- Dokumentiere, welche NSG-Regeln Databricks benötigt

---

## <span class="lang-en" style="display:none">Module E: Private Link and network decisions</span><span class="lang-de">Modul E: Private Link und Networking-Entscheidungen</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst die verschiedenen Databricks-Netzwerkoptionen erklären, verstehen, wann welche Option sinnvoll ist, und eine Entscheidungsmatrix anwenden.

### 5.1 Databricks-Netzwerk-Optionen

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

### 5.2 Entscheidungsmatrix

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

### 5.4 Browser Authentication Workspace

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

**Merke:** Browser Authentication ist **Pflicht**, wenn das Transit-VNet (Hub) keinen Internet-Zugang hat!

### 5.5 Zusammenfassung: Was gehört in einen 101-Kurs?

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

1. Welche Option ist der Standard für Anfänger?
   - a) Front-End Private Link
   - b) VNet Injection + SCC ← **Richtig**
   - c) Back-End Private Link

2. Welches Tier wird für Front-End Private Link benötigt?
   - a) Single
   - b) Standard
   - c) Premium ← **Richtig**

3. Warum ist Browser Authentication bei Transit-VNet ohne Internet nötig?
   - a) Weil Databricks es automatisch macht
   - b) Weil Benutzer sonst nicht zur Workspace-URL kommen ← **Richtig**
   - c) Weil Azure es verlangt

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- Erstelle eine Entscheidungsmatrix für drei Szenarien:
  1. Lernumgebung
  2. Produktionsumgebung mit Compliance
  3. On-Premise-Anbindung
- Welchen Netzwerkpfad würdest du wählen und warum?

---

## <span class="lang-en" style="display:none">Module F: Terraform for Databricks and Capstone</span><span class="lang-de">Modul F: Terraform für Databricks und Capstone</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst einen vollständigen Databricks Workspace mit Networking und Security mit Terraform erstellen, und weißt, wie die verschiedenen Konzepte zusammenhängen.

### 6.1 Komplettes Terraform-Beispiel

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

### 6.2 Vollständiger Ablauf

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

**Aufgabe:** Erstelle eine vollständige Databricks-Infrastruktur:

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

**Checkliste:**
- [ ] `terraform init` läuft
- [ ] `terraform validate` sagt "valid"
- [ ] `terraform fmt -check` keine Änderungen
- [ ] `terraform plan` zeigt alle erwarteten Ressourcen
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

### 6.5 Überblick: Alle drei Kurse kombiniert

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

1. Nenne die zwei Subnet-Typen, die Databricks braucht.
   **Muster:** Host Subnet und Container Subnet

2. Warum ist `no_public_ip = true` in Terraform wichtig?
   **Muster:** Aktiviert SCC — Cluster haben keine öffentliche IP

3. Was bedeutet `AzureDatabricksRules`?
   **Muster:** Databricks erstellt automatisch nötige NSG-Regeln

4. Was ist die Default-Outbound-Retirement?
   **Muster:** Ab März 2026 brauchen neue VNets expliziten Outbound-Pfad (NAT Gateway)

---

## <span class="lang-en" style="display:none">Appendix: Databricks port reference</span><span class="lang-de">Anhang: Databricks-Portreferenz</span>

| Port | Richtung | Zweck | NSG-Regel |
|------|----------|-------|-----------|
| 443 | Inbound | HTTPS (Web UI, API) | Von AzureDatabricks |
| 11211 | Inbound | MongoDB (Cluster-Zugriff) | Von AzureDatabricks |
| 3301-3303 | Inbound | Spark-Kommunikation | Von AzureDatabricks |
| 443 | Outbound | HTTPS (Pakete, Updates) | Zu */443 |
| 53 | Outbound | DNS | Zu */53 |
| 80 | Outbound | HTTP (nicht empfohlen) | Zu */80 |

## <span class="lang-en" style="display:none">Appendix: Common errors</span><span class="lang-de">Anhang: Häufige Fehler</span>

| Fehler | Lösung |
|--------|--------|
| `no_public_ip nicht gesetzt` | Immer `no_public_ip = true` setzen! |
| `NSG Association fehlt` | Beide Associations in custom_parameters nötig |
| `Subnet zu klein` | Mindestens /26, empfohlen /24 |
| `Portal vs. Terraform Default` | Terraform: `no_public_ip = false`! Explizit setzen! |
| `Outbound nach März 2026` | NAT Gateway oder Azure Firewall konfigurieren |
| `Premium für Private Link` | Front-End Private Link braucht Premium Tier |
