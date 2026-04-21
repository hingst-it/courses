---
layout: course
title: Integration 101
description: Terraform + Azure + Databricks kombiniert
permalink: /courses/integration-101.html
---

# 🚀 Integration 101 — <span class="lang-en" style="display:none">Terraform × Azure × Databricks combined</span><span class="lang-de">Terraform × Azure × Databricks kombiniert</span>


> **Niveau:** Intermediate — Terraform 101 und Azure 101 werden vorausgesetzt  
> **Sprache:** Deutsch, mit englischen Fachbegriffen

---

## Inhaltsverzeichnis

1. [Modul A: Gesamtsystem-Architektur](#modul-a-gesamtsystem-architektur)
2. [Modul B: Projektstruktur und Organisation](#modul-b-projektstruktur-und-organisation)
3. [Modul C: Infrastruktur-Code — Schritt für Schritt](#modul-c-infrastruktur-code--schritt-für-schritt)
4. [Modul D: Security, Compliance und Best Practices](#modul-d-security-compliance-und-best-practices)
5. [Modul E: CI/CD und Automatisierung](#modul-e-cicd-und-automatisierung)
6. [Modul F: Capstone und Deployment](#modul-f-capstone-und-deployment)

---

## Überblick: Was verbinden wir?

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
1. Eine vollständige Databricks-Infrastruktur mit Terraform erstellen
2. Hub-and-Spoke + VNet Injection + SCC kombinieren
3. Eine professionelle Projektstruktur aufbauen
4. Security Scanning und CI/CD einrichten
5. Einen produktionsreifen Deployment-Pipeline entwerfen

---

## <span class="lang-en" style="display:none">Module A: Full system architecture</span><span class="lang-de">Modul A: Gesamtsystem-Architektur</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst die komplette Architektur von Terraform + Azure + Databricks erklären und die Beziehung zwischen allen Komponenten verstehen.

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

**Terraform merkt sich diese Reihenfolge automatisch** über die Referenzen im Code!

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul A</span><span class="lang-de">Kurzes Quiz — Modul A</span>

1. Welche drei Technologien verbinden wir?
   **Muster:** Terraform (IaC), Azure (Cloud), Databricks (Datenplattform)

2. Warum muss die Resource Group vor dem VNet erstellt werden?
   **Muster:** Das VNet gehört zur Resource Group (Abhängigkeit)

3. Was merkt sich Terraform?
   **Muster:** Den State — welche Ressourcen existieren und wie sie konfiguriert sind

---

## <span class="lang-en" style="display:none">Module B: Project structure and organization</span><span class="lang-de">Modul B: Projektstruktur und Organisation</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst eine professionelle Terraform-Projektstruktur aufbauen, Module organisieren und Remote State konfigurieren.

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

### 2.4 Environment-Level: dev/main.tf

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

1. Warum trennen wir Module von Environment-Config?
   **Muster:** Module sind wiederverwendbar, Environment-Config ist umwelt-spezifisch

2. Was ist der Unterschied zwischen `modules/` und `environments/`?
   **Muster:** `modules/` = generische Bausteine, `environments/` = konkrete Kombinationen

3. Warum sollte `terraform.tfvars` nicht in Commits landen?
   **Muster:** Kann sensible Werte enthalten

---

## <span class="lang-en" style="display:none">Module C: Infrastructure code — Schritt für Schritt</span><span class="lang-de">Modul C: Infrastruktur-Code — Schritt für Schritt</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst eine komplette Databricks-Infrastruktur mit einem monolithischen Terraform-Projekt erstellen.

### 3.1 Schritt 1: Provider und Resource Group

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

### 3.2 Schritt 2: Virtual Network und Subnetze

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

### 3.3 Schritt 3: NSGs und Regeln

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

### 3.4 Schritt 4: NAT Gateway

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

### 3.5 Schritt 5: Databricks Workspace

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

### 3.6 Schritt 6: Outputs

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

### 3.7 Vollständiger Ablauf

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

1. Warum verwenden wir `for_each` für NSG-Regeln?
   **Muster:** Weil es stable resource addresses liefert und Regeln leichter zu erweitern sind

2. Was bedeutet `no_public_ip = true` in `custom_parameters`?
   **Muster:** Aktiviert Secure Cluster Connectivity — Cluster ohne öffentliche IP

3. Wie viele NSG-Regeln werden im Beispiel mindestens erstellt?
   **Muster:** 5 (MongoDB, Spark, Spark2, HTTPS-Out, DNS-Out)

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul C</span><span class="lang-de">Praktische Übung — Modul C</span>

**Aufgabe:** Erstelle einen vollständigen monolithischen Terraform-Code (alle Schritte 1-6 in einer `main.tf`), der eine Resource Group, ein VNet, zwei Subnetze, eine NSG mit Regeln, ein NAT Gateway und einen Databricks Workspace mit SCC erstellt.

---

## <span class="lang-en" style="display:none">Module D: Security, compliance and best practices</span><span class="lang-de">Modul D: Security, Compliance und Best Practices</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst Security Scanning einrichten, Best Practices anwenden und häufige Fehler vermeiden.

### 4.1 Security Scanning in Terraform

```bash
# Checkov — Static Analysis
npx checkov -d . --framework terraform

# Trivy — Config Scanning
trivy config .

# TFLint — Terraform Linter
npx tflint --init && npx tflint
```

### 4.2 Häufige Fehler und ihre Lösungen

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

### 4.3 Remote State konfigurieren

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
- ✅ Storage Account private (kein öffentlicher Zugriff)
- ✅ Versioning aktiviert
- ✅ Verschlüsselt
- ✅ Pro Environment separater State Key
- ✅ OIDC Authentication (keine Access Keys)

### 4.4 Tagging-Strategie

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

**Warum Tags?**
- 💰 Kostenverfolgung
- 🔍 Ressourcen-Suche
- 📋 Compliance-Audits
- 🏷️ Berechtigungen (RBAC)

### 4.5 Version-Pinning

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

**Merke:** `~> 4.0` erlaubt Patch-Updates (4.0.1, 4.1.0), blockiert aber Breaking Changes (5.0.0).

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul D</span><span class="lang-de">Kurzes Quiz — Modul D</span>

1. Warum ist `~> 4.0` besser als `>= 4.0`?
   **Muster:** Blockiert Breaking Changes von Major-Version 5

2. Was macht Checkov?
   **Muster:** Static Analysis für Terraform-Konfigurationen

3. Warum sollte jeder Environment seinen eigenen State-Key haben?
   **Muster:** Isolation — ein Fehler in dev löscht nicht prod

---

## <span class="lang-en" style="display:none">Module E: CI/CD and automation</span><span class="lang-de">Modul E: CI/CD und Automatisierung</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst eine GitHub Actions Pipeline für Terraform erstellen und OIDC-Authentifizierung einrichten.

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

### 5.2 OIDC-Setup (One-Time)

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

**Keine Secrets mehr im Code!** OIDC erzeugt kurzlebige Tokens.

### 5.3 Workflow-Pipeline

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

1. Warum ist OIDC besser als Access Keys?
   **Muster:** OIDC erzeugt kurzlebige Tokens — keine langlebigen Secrets im Code

2. Welche drei Schritte hat die Pipeline bei einem PR?
   **Muster:** Format prüfen, Syntax prüfen, Security scan

3. Wann wird `terraform apply` ausgeführt?
   **Muster:** Nur bei Merge in main (nicht bei PRs)

---

## <span class="lang-en" style="display:none">Module F: Capstone and deployment</span><span class="lang-de">Modul F: Capstone und Deployment</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst ein vollständiges, produktionsähnliches Projekt erstellen und deployen.

### 6.1 🏆 <span class="lang-en" style="display:none">Capstone project</span><span class="lang-de">Capstone-Projekt</span>

**Aufgabe:** Erstelle eine vollständige, produktionsähnliche Databricks-Infrastruktur:

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

**Checkliste:**
- [ ] Projektstruktur korrekt
- [ ] `terraform fmt -check` bestanden
- [ ] `terraform validate` sagt "valid"
- [ ] `terraform plan` zeigt alle Ressourcen
- [ ] Databricks Workspace URL als Output
- [ ] SCC aktiviert (`no_public_ip = true`)
- [ ] NSG-Regeln mit `for_each`
- [ ] Remote State konfiguriert
- [ ] Tags konsistent
- [ ] README.md vorhanden

### 6.2 Deployment-Checkliste

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

### 6.3 Troubleshooting

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

### 6.4 Transfer — Was jetzt?

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

1. Nenne die drei Säulen dieses Kurses.
   **Muster:** Terraform (IaC), Azure (Cloud), Databricks (Datenplattform)

2. Warum ist `for_each` bei NSG-Regeln besser als `count`?
   **Muster:** Stable resource addresses — Regeln können hinzugefügt/entfernt werden ohne Recreates

3. Was ist der wichtigste Unterschied zwischen Portal- und Terraform-Default bei Databricks?
   **Muster:** Portal: SCC standardmäßig an, Terraform: SCC standardmäßig aus — muss explizit aktiviert werden!

4. Warum ist OIDC in CI/CD besser als Access Keys?
   **Muster:** Kurzlebige Tokens, keine langlebigen Secrets, sicherer

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

### Terraform Befehle

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

### Azure CLI Befehle

```bash
az login                    # Anmelden
az account list             # Abonnements
az group list               # Resource Groups
az resource list --group <name>  # Ressourcen
```

### Security Tools

```bash
checkov -d . --framework terraform  # Static Analysis
trivy config .                      # Config Scan
npx tflint --init && npx tflint     # Linting
```
