---
layout: course
title: Integration 101
description: Terraform + Azure + Databricks kombiniert
permalink: /courses/integration-101.html
---

# 🚀 Integration 101 — <span class="lang-en" style="display:none">Terraform × Azure × Databricks combined</span><span class="lang-de">Terraform × Azure × Databricks kombiniert</span>


> <span class="lang-en" style="display:none">**Level:** Intermediate — Terraform 101 and Azure 101 are required</span><span class="lang-de">**Niveau:** Intermediate — Terraform 101 und Azure 101 werden vorausgesetzt</span>  
> <span class="lang-en" style="display:none">**Language:** English, with common technical terms</span><span class="lang-de">**Sprache:** Deutsch, mit englischen Fachbegriffen</span>

---

## <span class="lang-en" style="display:none">Table of contents</span><span class="lang-de">Inhaltsverzeichnis</span>

1. <a href="#module-a-full-system-architecturemodul-a-gesamtsystem-architektur"><span class="lang-en" style="display:none">Module A: Overall system architecture</span><span class="lang-de">Modul A: Gesamtsystem-Architektur</span></a>
2. <a href="#module-b-project-structure-and-organizationmodul-b-projektstruktur-und-organisation"><span class="lang-en" style="display:none">Module B: Project structure and organization</span><span class="lang-de">Modul B: Projektstruktur und Organisation</span></a>
3. <a href="#module-c-infrastructure-code--schritt-für-schrittmodul-c-infrastruktur-code--schritt-für-schritt"><span class="lang-en" style="display:none">Module C: Infrastructure code — step by step</span><span class="lang-de">Modul C: Infrastruktur-Code — Schritt für Schritt</span></a>
4. <a href="#module-d-security-compliance-and-best-practicesmodul-d-security-compliance-und-best-practices"><span class="lang-en" style="display:none">Module D: Security, compliance and best practices</span><span class="lang-de">Modul D: Security, Compliance und Best Practices</span></a>
5. <a href="#module-e-cicd-and-automationmodul-e-cicd-und-automatisierung"><span class="lang-en" style="display:none">Module E: CI/CD and automation</span><span class="lang-de">Modul E: CI/CD und Automatisierung</span></a>
6. <a href="#module-f-capstone-and-deploymentmodul-f-capstone-und-deployment"><span class="lang-en" style="display:none">Module F: Capstone and deployment</span><span class="lang-de">Modul F: Capstone und Deployment</span></a>

---

## <span class="lang-en" style="display:none">Overview: what are we connecting?</span><span class="lang-de">Überblick: Was verbinden wir?</span>

```
─────────────────────────────────────────────────────────────────
  Terraform          →  Infrastruktur als Code
        ↓
  Azure              →  Cloud-Plattform (VNet, Subnet, NSG, RG)
        ↓
  Databricks         →  Datenplattform (Workspace, Cluster, VNet Injection)
─────────────────────────────────────────────────────────────────

Terraform erstellt Azure-Ressourcen.
Azure hostet Databricks.
Databricks läuft in Azure-Netzwerken.
─────────────────────────────────────────────────────────────────
```

### <span class="lang-en" style="display:none">Learning Objectivee dieses Kurses</span><span class="lang-de">Lernziele dieses Kurses</span>

Am Ende kannst du:
1. <span class="lang-en" style="display:none">Create a complete Databricks infrastructure with Terraform</span><span class="lang-de">Eine vollständige Databricks-Infrastruktur mit Terraform erstellen</span>
2. Hub-and-Spoke + VNet Injection + SCC kombinieren
3. <span class="lang-en" style="display:none">Build a professional project structure</span><span class="lang-de">Eine professionelle Projektstruktur aufbauen</span>
4. Security Scanning und CI/CD einrichten
5. Einen produktionsreifen Deployment-Pipeline entwerfen

---

## <span class="lang-en" style="display:none">Module A: Full system architecture</span><span class="lang-de">Modul A: Gesamtsystem-Architektur</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain the complete Terraform + Azure + Databricks architecture and understand the relationship between all components.</span><span class="lang-de">Du kannst die komplette Architektur von Terraform + Azure + Databricks erklären und die Beziehung zwischen allen Komponenten verstehen.</span>

### 1.1 Die <span class="lang-en" style="display:none">Overall architecture</span><span class="lang-de">Gesamtarchitektur</span>

```
─────────────────────────────────────────────────────────────
  GIT-REPOSITORY (Code)                                    │
  ├── environments/                                          │
  │   └── dev/                                               │
  │       ├── main.tf                                        │
  │       ├── variables.tf                                   │
  │       └── terraform.tfvars                               │
  ├── modules/                                               │
  │   ├── networking/                                        │
  │   │   ├── main.tf                                        │
  │   │   ├── variables.tf                                   │
  │   │   └── outputs.tf                                     │
  │   ├── databricks/                                        │
  │   │   ├── main.tf                                        │
  │   │   ├── variables.tf                                   │
  │   │   └── outputs.tf                                     │
  │   └── security/                                          │
  │       ├── main.tf                                        │
  │       ├── variables.tf                                   │
  │       └── outputs.tf                                     │
  ├── .terraform.lock.hcl                                    │
  └── README.md                                              │
─────────────────────────────────────────────────────────────
        │
        │ terraform apply
        ▼
─────────────────────────────────────────────────────────────
  AZURE (Cloud)                                             │
  ┌─────────────────────────────────────────────────────┐   │
  │  Resource Group: rg-learning-integration             │   │
  │                                                     │   │
  │  ┌──────────────────┐  ┌──────────────────┐        │   │
  │  │ Hub VNet         │  │ Spoke VNet       │        │   │
  │  │ 10.0.0.0/16      │  │ 10.1.0.0/16      │        │   │
  │  │                  │  │                  │        │   │
  │  │ ┌──────────────┐ │  │ ┌──────────────┐ │        │   │
  │  │ │GatewaySubnet │ │  │ │DBX Host     │ │        │   │
  │  │ │/24           │ │  │ │Subnet /24   │ │        │   │
  │  │ └──────────────┘ │  │ └──────────────┘ │        │   │
  │  │ ┌──────────────┐ │  │ ┌──────────────┐ │        │   │
  │  │ │Firewall Subn.│ │  │ │DBX Container│ │        │   │
  │  │ │/24           │ │  │ │Subnet /24   │ │        │   │
  │  │ └──────────────┘ │  │ └──────────────┘ │        │   │
  │  └──────────────────┘  └──────────────────┘        │   │
  │        │                    │                       │   │
  │        │ Peering            │ VNet Injection         │   │
  │        ▼                    ▼                       │   │
  │  ┌──────────────────────────────────────┐           │   │
  │  │        Databricks Workspace          │           │   │
  │  │        dbw-learning-101              │           │   │
  │  │        - Control Plane (Cloud)       │           │   │
  │  │        - Compute Plane (VNet)        │           │   │
  │  │        - SCC (no_public_ip)          │           │   │
  │  │        - NSG (Databricks Rules)      │           │   │
  │  └──────────────────────────────────────┘           │   │
  └─────────────────────────────────────────────────────┘   │
─────────────────────────────────────────────────────────────
```

### 1.2 <span class="lang-en" style="display:none">Terraform as the control plane</span><span class="lang-de">Terraform als Steuerungszentrale</span>

```
Du schreibst Code in Terraform:

resource "azurerm_resource_group" "main" { ... }
resource "azurerm_virtual_network" "hub" { ... }
resource "azurerm_databricks_workspace" "main" { ... }
         │
         │ terraform plan → terraform apply
         ▼
Azure erstellt ALLES automatisch:
├── Resource Group
├── VNet + Subnetze
├── NSGs + Regeln
├── Peering
├── NAT Gateway
└── Databricks Workspace mit VNet Injection + SCC
```

### 1.3 <span class="lang-en" style="display:none">Key dependencies</span><span class="lang-de">Wichtige Abhängigkeiten</span>

```
Reihenfolge der Erstellung:

1. Resource Group           (keine Abhängigkeiten)
2. Virtual Network          (benötigt RG)
3. Subnetze                 (benötigen VNet)
4. NSGs                     (benötigen RG)
5. NSG-Associationen        (benötigen Subnets + NSGs)
6. Databricks Workspace     (benötigt VNet + Subnets + NSG-Assoziationen)
7. Outputs                  (benötigen Workspace)
```

<span class="lang-en" style="display:none">**Terraform remembers this order automatically** through references in the code!</span><span class="lang-de">**Terraform merkt sich diese Reihenfolge automatisch** über die Referenzen im Code!</span>

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul A</span><span class="lang-de">Kurzes Quiz — Modul A</span>

1. <span class="lang-en" style="display:none">Which three technologies are we connecting?</span><span class="lang-de">Welche drei Technologien verbinden wir?</span>
   <span class="lang-en" style="display:none">**Sample:** Terraform (IaC), Azure (cloud), Databricks (data platform)</span><span class="lang-de">**Muster:** Terraform (IaC), Azure (Cloud), Databricks (Datenplattform)</span>

2. <span class="lang-en" style="display:none">Why must the resource group be created before the VNet?</span><span class="lang-de">Warum muss die Resource Group vor dem VNet erstellt werden?</span>
   <span class="lang-en" style="display:none">**Sample:** the VNet belongs to the resource group (dependency)</span><span class="lang-de">**Muster:** Das VNet gehört zur Resource Group (Abhängigkeit)</span>

3. <span class="lang-en" style="display:none">What does Terraform remember?</span><span class="lang-de">Was merkt sich Terraform?</span>
   <span class="lang-en" style="display:none">**Sample:** the state — which resources exist and how they are configured</span><span class="lang-de">**Muster:** Den State — welche Ressourcen existieren und wie sie konfiguriert sind</span>

---

## <span class="lang-en" style="display:none">Module B: Project structure and organization</span><span class="lang-de">Modul B: Projektstruktur und Organisation</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can build a professional Terraform project structure, organize modules, and configure remote state.</span><span class="lang-de">Du kannst eine professionelle Terraform-Projektstruktur aufbauen, Module organisieren und Remote State konfigurieren.</span>

### 2.1 <span class="lang-en" style="display:none">Project structure</span><span class="lang-de">Projektstruktur</span>

```
──────────────────────────────────────────────────────
  terraform-azure-databricks/                        │
  ├── README.md                                       │
  ├── .gitignore                                      │
  ├── .terraform.lock.hcl                             │
  │                                                   │
  ├── environments/                                   │
  │   └── dev/                                        │
  │       ├── main.tf           (Orchestrator)        │
  │       ├── variables.tf        (Umgebungsvariablen) │
  │       ├── outputs.tf          (Umgebungs-Outputs)  │
  │       └── terraform.tfvars  (Werte)               │
  │                                                   │
  ├── modules/                                        │
  │   ├── networking/                                 │
  │   │   ├── main.tf                                 │
  │   │   ├── variables.tf                            │
  │   │   ├── outputs.tf                              │
  │   │   └── README.md                               │
  │   │                                               │
  │   ├── databricks/                                 │
  │   │   ├── main.tf                                 │
  │   │   ├── variables.tf                            │
  │   │   ├── outputs.tf                              │
  │   │   └── README.md                               │
  │   │                                               │
  │   └── security/                                   │
  │       ├── main.tf                                 │
  │       ├── variables.tf                            │
  │       ├── outputs.tf                              │
  │       └── README.md                               │
  │                                                   │
  └── .github/                                        │
      └── workflows/                                  │
          └── terraform.yml                           │
──────────────────────────────────────────────────────
```

### 2.2 <span class="lang-en" style="display:none">Module: networking</span><span class="lang-de">Module: networking</span>

```hcl
# modules/networking/main.tf

variable "resource_group_name" {
  description = "Name der Resource Group"
  type        = string
}

variable "location" {
  description = "Azure Region"
  type        = string
}

variable "hub_address_space" {
  description = "Address Space des Hub VNet"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "spoke_address_space" {
  description = "Address Spaces der Spoke VNets"
  type        = list(string)
  default     = ["10.1.0.0/16"]
}

resource "azurerm_resource_group" "this" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    ManagedBy = "Terraform"
  }
}

resource "azurerm_virtual_network" "hub" {
  name                = "vnet-hub"
  address_space       = var.hub_address_space
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
}

resource "azurerm_subnet" "hub_gateway" {
  name                          = "GatewaySubnet"
  resource_group_name           = azurerm_resource_group.this.name
  virtual_network_name          = azurerm_virtual_network.hub.name
  address_prefixes              = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "hub_firewall" {
  name                          = "AzureFirewallSubnet"
  resource_group_name           = azurerm_resource_group.this.name
  virtual_network_name          = azurerm_virtual_network.hub.name
  address_prefixes              = ["10.0.2.0/24"]
}

# ... Spoke VNet und Peering ...

output "hub_vnet_id" {
  description = "Hub VNet ID"
  value       = azurerm_virtual_network.hub.id
}

output "hub_vnet_name" {
  description = "Hub VNet Name"
  value       = azurerm_virtual_network.hub.name
}

output "resource_group_id" {
  description = "Resource Group ID"
  value       = azurerm_resource_group.this.id
}

output "resource_group_name" {
  description = "Resource Group Name"
  value       = azurerm_resource_group.this.name
}
```

### 2.3 <span class="lang-en" style="display:none">Module: databricks</span><span class="lang-de">Module: databricks</span>

```hcl
# modules/databricks/main.tf

variable "resource_group_name" {
  description = "Name der Resource Group"
  type        = string
}

variable "location" {
  description = "Azure Region"
  type        = string
}

variable "vnet_id" {
  description = "VNet ID für VNet Injection"
  type        = string
}

variable "host_subnet_id" {
  description = "Host Subnet ID"
  type        = string
}

variable "container_subnet_id" {
  description = "Container Subnet ID"
  type        = string
}

variable "nsg_id" {
  description = "NSG ID"
  type        = string
}

variable "enable_scc" {
  description = "Secure Cluster Connectivity aktivieren"
  type        = bool
  default     = true
}

variable "workspace_sku" {
  description = "Databricks SKU"
  type        = string
  default     = "standard"
}

resource "azurerm_network_security_group" "databricks" {
  name                = "nsg-databricks"
  resource_group_name = var.resource_group_name
  location            = var.location
}

resource "azurerm_subnet_network_security_group_association" "host" {
  subnet_id                     = var.host_subnet_id
  network_security_group_id     = azurerm_network_security_group.databricks.id
}

resource "azurerm_subnet_network_security_group_association" "container" {
  subnet_id                     = var.container_subnet_id
  network_security_group_id     = azurerm_network_security_group.databricks.id
}

resource "azurerm_network_security_rule" "databricks_mongodb" {
  name                        = "AllowDatabricksMongoDB"
  resource_group_name         = var.resource_group_name
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
  resource_group_name         = var.resource_group_name
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

resource "azurerm_databricks_workspace" "main" {
  name                          = "dbw-${var.resource_group_name}"
  resource_group_name           = var.resource_group_name
  location                      = var.location
  sku                           = var.workspace_sku
  network_security_group_rules_required = "AzureDatabricksRules"

  custom_parameters {
    virtual_network_id                                         = var.vnet_id
    public_subnet_name                                         = split("/", var.host_subnet_id)[length(split("/", var.host_subnet_id)) - 1]
    private_subnet_name                                        = split("/", var.container_subnet_id)[length(split("/", var.container_subnet_id)) - 1]
    public_subnet_network_security_group_association_id        = azurerm_subnet_network_security_group_association.host.id
    private_subnet_network_security_group_association_id       = azurerm_subnet_network_security_group_association.container.id
    no_public_ip                                               = var.enable_scc
  }

  tags = {
    ManagedBy = "Terraform"
  }
}

output "workspace_url" {
  description = "Databricks Workspace URL"
  value       = azurerm_databricks_workspace.main.workspace_url
}

output "workspace_id" {
  description = "Workspace ID"
  value       = azurerm_databricks_workspace.main.id
}

output "nsg_id" {
  description = "NSG ID"
  value       = azurerm_network_security_group.databricks.id
}
```

### 2.4 <span class="lang-en" style="display:none">Environment level: dev/main.tf</span><span class="lang-de">Environment-Level: dev/main.tf</span>

```hcl
# environments/dev/main.tf

terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  backend "azurerm" {
    # Konfiguration hier (wird beim init übergeben)
  }
}

provider "azurerm" {
  features {}
}

locals {
  common_tags = {
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

# Networking
module "networking" {
  source = "../../modules/networking"

  resource_group_name = "rg-dev-databricks"
  location            = "Germany West Central"
}

# Databricks
module "databricks" {
  source = "../../modules/databricks"

  resource_group_name = module.networking.resource_group_name
  location            = module.networking.resource_group_name != null ? "Germany West Central" : "Germany West Central"
  vnet_id             = module.networking.hub_vnet_id
  host_subnet_id      = ""  # Muss vom Networking-Modul geliefert werden
  container_subnet_id = ""  # Muss vom Networking-Modul geliefert werden
  nsg_id              = ""  # Muss vom Networking-Modul geliefert werden
  enable_scc          = true
  workspace_sku       = "standard"
}

output "databricks_url" {
  description = "Databricks Workspace URL"
  value       = module.databricks.workspace_url
}

output "databricks_id" {
  description = "Workspace Resource ID"
  value       = module.databricks.workspace_id
}
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul B</span><span class="lang-de">Kurzes Quiz — Modul B</span>

1. <span class="lang-en" style="display:none">Why do we separate modules from environment config?</span><span class="lang-de">Warum trennen wir Module von Environment-Config?</span>
   <span class="lang-en" style="display:none">**Sample:** modules are reusable; environment config is environment-specific</span><span class="lang-de">**Muster:** Module sind wiederverwendbar, Environment-Config ist umwelt-spezifisch</span>

2. <span class="lang-en" style="display:none">What is the difference between `modules/` and `environments/`?</span><span class="lang-de">Was ist der Unterschied zwischen `modules/` und `environments/`?</span>
   <span class="lang-en" style="display:none">**Sample:** `modules/` = generic building blocks, `environments/` = concrete combinations</span><span class="lang-de">**Muster:** `modules/` = generische Bausteine, `environments/` = konkrete Kombinationen</span>

3. <span class="lang-en" style="display:none">Why should `terraform.tfvars` not be committed?</span><span class="lang-de">Warum sollte `terraform.tfvars` nicht in Commits landen?</span>
   <span class="lang-en" style="display:none">**Sample:** it can contain sensitive values</span><span class="lang-de">**Muster:** Kann sensible Werte enthalten</span>

---

## <span class="lang-en" style="display:none">Module C: Infrastructure code — Schritt für Schritt</span><span class="lang-de">Modul C: Infrastruktur-Code — Schritt für Schritt</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create a complete Databricks infrastructure with a monolithic Terraform project.</span><span class="lang-de">Du kannst eine komplette Databricks-Infrastruktur mit einem monolithischen Terraform-Projekt erstellen.</span>

### 3.1 <span class="lang-en" style="display:none">Step 1: provider and resource group</span><span class="lang-de">Schritt 1: Provider und Resource Group</span>

```hcl
# main.tf

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
    Environment = "dev"
    ManagedBy   = "Terraform"
    Course      = "Integration101"
  }
}

variable "location" {
  description = "Azure Region"
  type        = string
  default     = "Germany West Central"

  validation {
    condition     = contains(["Germany West Central", "East US", "North Europe"], var.location)
    error_message = "Wähle eine der erlaubten Regionen."
  }
}

resource "azurerm_resource_group" "integration" {
  name     = "rg-integration-101"
  location = var.location

  tags = local.common_tags
}
```

### 3.2 <span class="lang-en" style="display:none">Step 2: virtual network and subnets</span><span class="lang-de">Schritt 2: Virtual Network und Subnetze</span>

```hcl
resource "azurerm_virtual_network" "integration" {
  name                = "vnet-integration"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.integration.location
  resource_group_name = azurerm_resource_group.integration.name

  tags = local.common_tags
}

resource "azurerm_subnet" "databricks_host" {
  name                          = "dbws-subnet-host"
  resource_group_name           = azurerm_resource_group.integration.name
  virtual_network_name          = azurerm_virtual_network.integration.name
  address_prefixes              = ["10.0.1.0/24"]
  service_endpoints             = ["Microsoft.Sql"]
}

resource "azurerm_subnet" "databricks_container" {
  name                          = "dbws-subnet-container"
  resource_group_name           = azurerm_resource_group.integration.name
  virtual_network_name          = azurerm_virtual_network.integration.name
  address_prefixes              = ["10.0.2.0/24"]
  service_endpoints             = ["Microsoft.Sql"]
}
```

### 3.3 <span class="lang-en" style="display:none">Step 3: NSGs and rules</span><span class="lang-de">Schritt 3: NSGs und Regeln</span>

```hcl
resource "azurerm_network_security_group" "integration" {
  name                = "nsg-integration"
  resource_group_name = azurerm_resource_group.integration.name
  location            = azurerm_resource_group.integration.location

  tags = local.common_tags
}

resource "azurerm_subnet_network_security_group_association" "host" {
  subnet_id                     = azurerm_subnet.databricks_host.id
  network_security_group_id     = azurerm_network_security_group.integration.id
}

resource "azurerm_subnet_network_security_group_association" "container" {
  subnet_id                     = azurerm_subnet.databricks_container.id
  network_security_group_id     = azurerm_network_security_group.integration.id
}

# Databricks braucht diese NSG-Regeln:
locals {
  # Databricks-Ports, die benötigt werden
  databricks_ports = [
    { name = "MongoDB", port = 11211, direction = "Inbound", protocol = "Tcp" },
    { name = "Spark", port = 3301, direction = "Inbound", protocol = "Tcp" },
    { name = "Spark2", port = 3302, direction = "Inbound", protocol = "Tcp" },
    { name = "HTTPS-Out", port = 443, direction = "Outbound", protocol = "Tcp" },
    { name = "DNS-Out", port = 53, direction = "Outbound", protocol = "Tcp" },
  ]
}

resource "azurerm_network_security_rule" "databricks" {
  for_each = { for p in local.databricks_ports : p.name => p }

  name                        = "AllowDatabricks-${each.value.name}"
  resource_group_name         = azurerm_resource_group.integration.name
  network_security_group_name = azurerm_network_security_group.integration.name

  priority                    = 100 + index(local.databricks_ports, each.value) * 10
  direction                   = each.value.direction
  access                      = "Allow"
  protocol                    = each.value.protocol
  source_port_range           = "*"

  destination_port_range      = each.value.direction == "Outbound" ? each.value.port : (
    each.value.name == "Spark" ? "3301-3303" : tostring(each.value.port)
  )

  source_address_prefix       = each.value.direction == "Inbound" ? "AzureDatabricks" : "*"
  destination_address_prefix  = "*"
}
```

### 3.4 <span class="lang-en" style="display:none">Step 4: NAT Gateway</span><span class="lang-de">Schritt 4: NAT Gateway</span>

```hcl
resource "azurerm_public_ip" "databricks" {
  name                = "pip-databricks-nat"
  resource_group_name = azurerm_resource_group.integration.name
  location            = azurerm_resource_group.integration.location
  allocation_method   = "Static"
  sku                 = "Standard"

  tags = local.common_tags
}

resource "azurerm_nat_gateway" "databricks" {
  name                = "natg-databricks"
  resource_group_name = azurerm_resource_group.integration.name
  location            = azurerm_resource_group.integration.location
  sku_name            = "Standard"

  idle_timeout_in_minutes = 4

  public_ip_address_ids = [azurerm_public_ip.databricks.id]

  tags = local.common_tags
}
```

### 3.5 <span class="lang-en" style="display:none">Step 5: Databricks workspace</span><span class="lang-de">Schritt 5: Databricks Workspace</span>

```hcl
resource "azurerm_databricks_workspace" "main" {
  name                          = "dbw-integration-101"
  resource_group_name           = azurerm_resource_group.integration.name
  location                      = azurerm_resource_group.integration.location
  sku                           = "standard"
  network_security_group_rules_required = "AzureDatabricksRules"

  custom_parameters {
    virtual_network_id                                         = azurerm_virtual_network.integration.id
    public_subnet_name                                         = azurerm_subnet.databricks_host.name
    private_subnet_name                                        = azurerm_subnet.databricks_container.name
    public_subnet_network_security_group_association_id        = azurerm_subnet_network_security_group_association.host.id
    private_subnet_network_security_group_association_id       = azurerm_subnet_network_security_group_association.container.id
    no_public_ip                                               = true  # SCC!
  }

  tags = local.common_tags
}
```

### 3.6 <span class="lang-en" style="display:none">Step 6: outputs</span><span class="lang-de">Schritt 6: Outputs</span>

```hcl
output "resource_group_id" {
  description = "Resource Group ID"
  value       = azurerm_resource_group.integration.id
}

output "databricks_workspace_url" {
  description = "Databricks Workspace URL — Öffne diese URL im Browser!"
  value       = azurerm_databricks_workspace.main.workspace_url
}

output "databricks_workspace_id" {
  description = "Databricks Workspace Resource ID"
  value       = azurerm_databricks_workspace.main.id
}

output "vnet_id" {
  description = "VNet Resource ID"
  value       = azurerm_virtual_network.integration.id
}

output "nsg_id" {
  description = "Network Security Group ID"
  value       = azurerm_network_security_group.integration.id
}
```

### 3.7 <span class="lang-en" style="display:none">Complete flow</span><span class="lang-de">Vollständiger Ablauf</span>

```bash
# 1. Verzeichnis erstellen
mkdir integration-capstone && cd integration-capstone

# 2. main.tf erstellen (Schritte 1-6)

# 3. Initialisieren
terraform init
# → azurerm Provider wird heruntergeladen

# 4. Formatieren
terraform fmt -recursive
# → Alle Dateien werden konsformat formatiert

# 5. Validieren
terraform validate
# → "Success! The configuration is valid."

# 6. Plan
terraform plan
# → Sieht dir den Plan an
# Erwartet: ~20 Ressourcen

# 7. Apply
terraform apply
# → Bestätigen mit "yes"
# → Alle Ressourcen werden erstellt

# 8. Output lesen
# → databricks_workspace_url kopieren
# → portal.azure.com öffnen
# → Databricks Workspace sehen

# 9. Aufräumen
terraform destroy
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul C</span><span class="lang-de">Kurzes Quiz — Modul C</span>

1. <span class="lang-en" style="display:none">Why do we use `for_each` for NSG rules?</span><span class="lang-de">Warum verwenden wir `for_each` für NSG-Regeln?</span>
   <span class="lang-en" style="display:none">**Sample:** because it provides stable resource addresses and rules are easier to extend</span><span class="lang-de">**Muster:** Weil es stable resource addresses liefert und Regeln leichter zu erweitern sind</span>

2. <span class="lang-en" style="display:none">What does `no_public_ip = true` mean in `custom_parameters`?</span><span class="lang-de">Was bedeutet `no_public_ip = true` in `custom_parameters`?</span>
   <span class="lang-en" style="display:none">**Sample:** enables Secure Cluster Connectivity — clusters without public IP</span><span class="lang-de">**Muster:** Aktiviert Secure Cluster Connectivity — Cluster ohne öffentliche IP</span>

3. <span class="lang-en" style="display:none">How many NSG rules are created at minimum in the example?</span><span class="lang-de">Wie viele NSG-Regeln werden im Beispiel mindestens erstellt?</span>
   <span class="lang-en" style="display:none">**Sample:** 5 (MongoDB, Spark, Spark2, HTTPS-Out, DNS-Out)</span><span class="lang-de">**Muster:** 5 (MongoDB, Spark, Spark2, HTTPS-Out, DNS-Out)</span>

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul C</span><span class="lang-de">Praktische Übung — Modul C</span>

<span class="lang-en" style="display:none">**Task:** Create complete monolithic Terraform code (all steps 1-6 in one `main.tf`) that creates a resource group, a VNet, two subnets, an NSG with rules, a NAT Gateway, and a Databricks workspace with SCC.</span><span class="lang-de">**Aufgabe:** Erstelle einen vollständigen monolithischen Terraform-Code (alle Schritte 1-6 in einer `main.tf`), der eine Resource Group, ein VNet, zwei Subnetze, eine NSG mit Regeln, ein NAT Gateway und einen Databricks Workspace mit SCC erstellt.</span>

---

## <span class="lang-en" style="display:none">Module D: Security, compliance and best practices</span><span class="lang-de">Modul D: Security, Compliance und Best Practices</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can set up security scanning, apply best practices, and avoid common mistakes.</span><span class="lang-de">Du kannst Security Scanning einrichten, Best Practices anwenden und häufige Fehler vermeiden.</span>

### 4.1 <span class="lang-en" style="display:none">Security scanning in Terraform</span><span class="lang-de">Security Scanning in Terraform</span>

```bash
# Checkov — Static Analysis
npx checkov -d . --framework terraform

# Trivy — Config Scanning
trivy config .

# TFLint — Terraform Linter
npx tflint --init && npx tflint
```

### 4.2 <span class="lang-en" style="display:none">Common mistakes and their fixes</span><span class="lang-de">Häufige Fehler und ihre Lösungen</span>

```hcl
# ❌ Fehlers 1: Hardcoded Werte
resource "azurerm_databricks_workspace" "main" {
  name     = "dbw-production"  # Hartkodiert!
  location = "East US"          # Hartkodiert!
  sku    = "premium"            # Hartkodiert!
}

# ✅ Lösung: Variablen
variable "workspace_name" {
  description = "Databricks Workspace Name"
  type        = string
}

resource "azurerm_databricks_workspace" "main" {
  name     = var.workspace_name
  location = var.location
  sku      = var.workspace_sku
}
```

```hcl
# ❌ Fehler 2: SCC nicht aktiviert
custom_parameters {
  no_public_ip = false  # ← UNSICHER!
}

# ✅ Lösung: SCC immer aktivieren
custom_parameters {
  no_public_ip = true  # ← Sicheres Default
}
```

```hcl
# ❌ Fehler 3: Namespace-Kollision
resource "azurerm_databricks_workspace" "databricks" { ... }
# "databricks" ist auch der Resource-Typ-Teil!

# ✅ Lösung: Beschreibender Name
resource "azurerm_databricks_workspace" "main" { ... }
resource "azurerm_databricks_workspace" "analytics" { ... }
```

### 4.3 <span class="lang-en" style="display:none">Configure remote state</span><span class="lang-de">Remote State konfigurieren</span>

```hcl
# backend.tf
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sttfstate001"
    container_name       = "tfstate"
    key                  = "dev/integration/terraform.tfstate"
    use_oidc             = true  # OIDC Authentication
  }
}
```

**State-Security:**
- ✅ <span class="lang-en" style="display:none">Storage account private (no public access)</span><span class="lang-de">Storage Account private (kein öffentlicher Zugriff)</span>
- ✅ Versioning aktiviert
- ✅ <span class="lang-en" style="display:none">Encrypted</span><span class="lang-de">Verschlüsselt</span>
- ✅ Pro Environment separater State Key
- ✅ OIDC Authentication (keine Access Keys)

### 4.4 <span class="lang-en" style="display:none">Tagging strategy</span><span class="lang-de">Tagging-Strategie</span>

```hcl
locals {
  common_tags = merge(
    {
      Environment   = var.environment
      ManagedBy     = "Terraform"
      CostCenter    = "DataEngineering"
      Compliance    = "Internal"
      Project       = "Integration101"
    },
    var.additional_tags
  )
}
```

<span class="lang-en" style="display:none">**Why tags?**</span><span class="lang-de">**Warum Tags?**</span>
- 💰 Kostenverfolgung
- 🔍 <span class="lang-en" style="display:none">Resource search</span><span class="lang-de">Ressourcen-Suche</span>
- 📋 Compliance-Audits
- 🏷️ Berechtigungen (RBAC)

### 4.5 <span class="lang-en" style="display:none">Version pinning</span><span class="lang-de">Version-Pinning</span>

```hcl
terraform {
  required_version = ">= 1.6"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"  # 4.x, aber nicht 5.x
    }
  }
}
```

<span class="lang-en" style="display:none">**Remember:** `~> 4.0` allows patch/minor updates (4.0.1, 4.1.0), but blocks breaking changes (5.0.0).</span><span class="lang-de">**Merke:** `~> 4.0` erlaubt Patch-Updates (4.0.1, 4.1.0), blockiert aber Breaking Changes (5.0.0).</span>

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul D</span><span class="lang-de">Kurzes Quiz — Modul D</span>

1. <span class="lang-en" style="display:none">Why is `~> 4.0` better than `>= 4.0`?</span><span class="lang-de">Warum ist `~> 4.0` besser als `>= 4.0`?</span>
   <span class="lang-en" style="display:none">**Sample:** blocks breaking changes from major version 5</span><span class="lang-de">**Muster:** Blockiert Breaking Changes von Major-Version 5</span>

2. <span class="lang-en" style="display:none">What does Checkov do?</span><span class="lang-de">Was macht Checkov?</span>
   <span class="lang-en" style="display:none">**Sample:** static analysis for Terraform configurations</span><span class="lang-de">**Muster:** Static Analysis für Terraform-Konfigurationen</span>

3. <span class="lang-en" style="display:none">Why should each environment have its own state key?</span><span class="lang-de">Warum sollte jeder Environment seinen eigenen State-Key haben?</span>
   <span class="lang-en" style="display:none">**Sample:** isolation — an error in dev does not delete prod</span><span class="lang-de">**Muster:** Isolation — ein Fehler in dev löscht nicht prod</span>

---

## <span class="lang-en" style="display:none">Module E: CI/CD and automation</span><span class="lang-de">Modul E: CI/CD und Automatisierung</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create a GitHub Actions pipeline for Terraform and set up OIDC authentication.</span><span class="lang-de">Du kannst eine GitHub Actions Pipeline für Terraform erstellen und OIDC-Authentifizierung einrichten.</span>

### 5.1 <span class="lang-en" style="display:none">GitHub Actions workflow</span><span class="lang-de">GitHub Actions Workflow</span>

```yaml
# .github/workflows/terraform.yml
name: Terraform

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  id-token: write    # OIDC
  contents: read

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Terraform Format
        run: terraform fmt -check -recursive

      - name: Terraform Init
        run: terraform init

      - name: Terraform Validate
        run: terraform validate

      - name: Security Scan (Checkov)
        run: npx checkov -d . --framework terraform

  plan:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Azure Login (OIDC)
        uses: azure/login@v2
        with:
          client-id:     ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id:     ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Terraform Init
        run: terraform init

      - name: Terraform Plan
        run: terraform plan -out=tfplan

      - name: Upload Plan
        uses: actions/upload-artifact@v4
        with:
          name: tfplan
          path: tfplan
          retention-days: 7

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Azure Login (OIDC)
        uses: azure/login@v2
        with:
          client-id:     ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id:     ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Terraform Init
        run: terraform init

      - name: Download Plan
        uses: actions/download-artifact@v4
        with:
          name: tfplan

      - name: Terraform Apply
        run: terraform apply -auto-approve tfplan
```

### 5.2 <span class="lang-en" style="display:none">OIDC setup (one-time)</span><span class="lang-de">OIDC-Setup (einmalig)</span>

```
GitHub OIDC zu Azure — Setup:

1. Azure: App Registration erstellen
2. Azure: Federated Credential hinzufügen
   → Subject: repo:<org>/<repo>:ref:refs/heads/main
3. Azure: Rolle (Contributor) auf Subscription geben
4. GitHub: Secrets setzen:
   - AZURE_CLIENT_ID
   - AZURE_TENANT_ID
   - AZURE_SUBSCRIPTION_ID
```

<span class="lang-en" style="display:none">**No more secrets in code!** OIDC creates short-lived tokens.</span><span class="lang-de">**Keine Secrets mehr im Code!** OIDC erzeugt kurzlebige Tokens.</span>

### 5.3 <span class="lang-en" style="display:none">Workflow pipeline</span><span class="lang-de">Workflow-Pipeline</span>

```
PR geöffnet:
├─ terraform fmt -check  ← Format prüfen
├─ terraform validate    ← Syntax prüfen
├─ checkov               ← Security scan
└─ terraform plan        ← Plan als PR-Kommentar

Main-Branch Merge:
├─ azure/login (OIDC)    ← Authentifizieren
├─ terraform init        ← Initialisieren
├─ terraform apply       ← Anwenden
└─ Ressourcen aktualisiert ✓
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul E</span><span class="lang-de">Kurzes Quiz — Modul E</span>

1. <span class="lang-en" style="display:none">Why is OIDC better than access keys?</span><span class="lang-de">Warum ist OIDC besser als Access Keys?</span>
   <span class="lang-en" style="display:none">**Sample:** OIDC creates short-lived tokens — no long-lived secrets in code</span><span class="lang-de">**Muster:** OIDC erzeugt kurzlebige Tokens — keine langlebigen Secrets im Code</span>

2. <span class="lang-en" style="display:none">Which three steps does the pipeline run for a PR?</span><span class="lang-de">Welche drei Schritte hat die Pipeline bei einem PR?</span>
   <span class="lang-en" style="display:none">**Sample:** check formatting, check syntax, security scan</span><span class="lang-de">**Muster:** Format prüfen, Syntax prüfen, Security scan</span>

3. <span class="lang-en" style="display:none">When is `terraform apply` executed?</span><span class="lang-de">Wann wird `terraform apply` ausgeführt?</span>
   <span class="lang-en" style="display:none">**Sample:** only on merge to main (not for PRs)</span><span class="lang-de">**Muster:** Nur bei Merge in main (nicht bei PRs)</span>

---

## <span class="lang-en" style="display:none">Module F: Capstone and deployment</span><span class="lang-de">Modul F: Capstone und Deployment</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create and deploy a complete production-like project.</span><span class="lang-de">Du kannst ein vollständiges, produktionsähnliches Projekt erstellen und deployen.</span>

### 6.1 🏆 <span class="lang-en" style="display:none">Capstone project</span><span class="lang-de">Capstone-Projekt</span>

<span class="lang-en" style="display:none">**Task:** Create a complete, production-like Databricks infrastructure:</span><span class="lang-de">**Aufgabe:** Erstelle eine vollständige, produktionsähnliche Databricks-Infrastruktur:</span>

```
Anforderungen:
├── MONOLITHISCHE VERSION (einfacher):
│   ├── Resource Group
│   ├── VNet (10.0.0.0/16)
│   ├── Host Subnet (/24)
│   ├── Container Subnet (/24)
│   ├── NSG + Databricks-Regeln (via for_each)
│   ├── NAT Gateway
│   ├── Databricks Workspace mit SCC
│   ├── Variablen + Locals + Outputs
│   └── Remote State konfiguriert
│
└── MODULARE VERSION (fortgeschritten):
    ├── modules/networking/
    ├── modules/databricks/
    ├── environments/dev/
    └── .github/workflows/terraform.yml
```

<span class="lang-en" style="display:none">**Checklist:**</span><span class="lang-de">**Checkliste:**</span>
- [ ] Projektstruktur korrekt
- [ ] `terraform fmt -check` bestanden
- [ ] `terraform validate` sagt "valid"
- [ ] <span class="lang-en" style="display:none">`terraform plan` shows all resources</span><span class="lang-de">`terraform plan` zeigt alle Ressourcen</span>
- [ ] Databricks Workspace URL als Output
- [ ] SCC aktiviert (`no_public_ip = true`)
- [ ] NSG-Regeln mit `for_each`
- [ ] Remote State konfiguriert
- [ ] Tags konsistent
- [ ] README.md vorhanden

### 6.2 <span class="lang-en" style="display:none">Deployment checklist</span><span class="lang-de">Deployment-Checkliste</span>

```bash
# Vor dem Deployment:
terraform fmt -recursive          # Formatieren
terraform validate                # Validieren
npx checkov -d . --framework terraform  # Security Scan

# Deployment:
terraform init -backend-config="..."  # Mit Backend-Config
terraform plan -out=tfplan            # Plan prüfen
terraform apply tfplan                # Anwenden

# Nach dem Deployment:
terraform output databricks_workspace_url  # URL kopieren
portal.azure.com                    # Portal prüfen
```

### 6.3 <span class="lang-en" style="display:none">Troubleshooting</span><span class="lang-de">Fehlerbehebung</span>

```bash
# Problem: State lock timeout
terraform force-unlock <LOCK_ID>

# Problem: Provider-Version
terraform init -upgrade

# Problem: Ressource existiert manuell
terraform import azurerm_resource_group.main /subscriptions/.../resourceGroups/rg-existing

# Problem: Resource wurde außerhalb gelöscht
terraform refresh
# → Terraform merkt, dass Ressourcen fehlen
```

### 6.4 <span class="lang-en" style="display:none">Transfer — what's next?</span><span class="lang-de">Transfer — Was jetzt?</span>

```
🎓 KURS ABSCHLIESSUNG — Was kannst du jetzt?

Basis (Terraform 101):
✅ IaC-Grundlagen verstehen
✅ Terraform-Befehle verwenden
✅ HCL schreiben

Azure (Azure 101):
✅ Resource Groups, VNets, NSGs erstellen
✅ Hub-and-Spoke Architektur verstehen
✅ Terraform + Azure kombinieren

Databricks (Databricks 101):
✅ Workspace mit VNet Injection erstellen
✅ SCC verstehen und aktivieren
✅ NSG-Regeln für Databricks konfigurieren

Integration (Integration 101):
✅ Komplette Architektur mit Terraform erstellen
✅ Module organisieren
✅ Security Scanning + CI/CD einrichten

NÄCHSTE SCHRITTE:
├── Terraform Module entwickeln
├── Azure Landing Zones (AVM)
├── Databricks Jobs und Pipelines
├── Multi-Cloud (AWS, GCP)
└── Enterprise IaC Patterns
```

### 📝 <span class="lang-en" style="display:none">Final Quiz — Kurs-Ende</span><span class="lang-de">Letztes Quiz — Kurs-Ende</span>

1. <span class="lang-en" style="display:none">Name the three pillars of this course.</span><span class="lang-de">Nenne die drei Säulen dieses Kurses.</span>
   <span class="lang-en" style="display:none">**Sample:** Terraform (IaC), Azure (cloud), Databricks (data platform)</span><span class="lang-de">**Muster:** Terraform (IaC), Azure (Cloud), Databricks (Datenplattform)</span>

2. <span class="lang-en" style="display:none">Why is `for_each` better than `count` for NSG rules?</span><span class="lang-de">Warum ist `for_each` bei NSG-Regeln besser als `count`?</span>
   <span class="lang-en" style="display:none">**Sample:** stable resource addresses — rules can be added/removed without recreates</span><span class="lang-de">**Muster:** Stable resource addresses — Regeln können hinzugefügt/entfernt werden ohne Recreates</span>

3. <span class="lang-en" style="display:none">What is the most important difference between portal and Terraform defaults for Databricks?</span><span class="lang-de">Was ist der wichtigste Unterschied zwischen Portal- und Terraform-Default bei Databricks?</span>
   <span class="lang-en" style="display:none">**Sample:** portal: SCC on by default; Terraform: SCC off by default — it must be enabled explicitly!</span><span class="lang-de">**Muster:** Portal: SCC standardmäßig an, Terraform: SCC standardmäßig aus — muss explizit aktiviert werden!</span>

4. <span class="lang-en" style="display:none">Why is OIDC better than access keys in CI/CD?</span><span class="lang-de">Warum ist OIDC in CI/CD besser als Access Keys?</span>
   <span class="lang-en" style="display:none">**Sample:** short-lived tokens, no long-lived secrets, more secure</span><span class="lang-de">**Muster:** Kurzlebige Tokens, keine langlebigen Secrets, sicherer</span>

---

## <span class="lang-en" style="display:none">Appendix: Complete file structure (Referenz)</span><span class="lang-de">Anhang: Komplette Datei-Struktur (Referenz)</span>

```
terraform-azure-databricks/
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
├── versions.tf
├── backend.tf
├── .terraform.lock.hcl
├── .gitignore
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── databricks/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   └── security/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── README.md
├── environments/
│   └── dev/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── terraform.tfvars
└── .github/
    └── workflows/
        └── terraform.yml
```

## <span class="lang-en" style="display:none">Appendix: Quick reference</span><span class="lang-de">Anhang: Quick Reference</span>

### <span class="lang-en" style="display:none">Terraform commands</span><span class="lang-de">Terraform Befehle</span>

```bash
terraform init              # Initialisieren
terraform validate          # Validieren
terraform fmt -recursive    # Formatieren
terraform plan              # Plan
terraform apply             # Apply
terraform destroy           # Destroy
terraform state list        # State auflisten
terraform state show <res>  # Resource anzeigen
terraform output            # Outputs sehen
```

### <span class="lang-en" style="display:none">Azure CLI commands</span><span class="lang-de">Azure CLI Befehle</span>

```bash
az login                    # Anmelden
az account list             # Abonnements
az group list               # Resource Groups
az resource list --group <name>  # Ressourcen
```

### <span class="lang-en" style="display:none">Security tools</span><span class="lang-de">Security Tools</span>

```bash
checkov -d . --framework terraform  # Static Analysis
trivy config .                      # Config Scan
npx tflint --init && npx tflint     # Linting
```
