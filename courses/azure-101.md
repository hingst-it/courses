---
layout: course
title: Azure 101
description: Azure Cloud-Grundlagen für Terraform-Nutzer — 8 Stunden, absolute Beginners
permalink: /courses/azure-101.html
---

# 🟦 Azure 101 — <span class="lang-en" style="display:none">Cloud fundamentals for Terraform users</span><span class="lang-de">Cloud-Grundlagen für Terraform-Nutzer</span>


> <span class="lang-en" style="display:none">**Level:** Absolute beginners — no Azure prior knowledge needed</span><span class="lang-de">**Niveau:** Absolute Beginners — keine Azure-Vorkenntnisse nötig</span>  
> <span class="lang-en" style="display:none">**Language:** English, with common technical terms</span><span class="lang-de">**Sprache:** Deutsch, mit englischen Fachbegriffen</span>

---

## <span class="lang-en" style="display:none">Table of contents</span><span class="lang-de">Inhaltsverzeichnis</span>

1. <a href="#module-a-azure-basicsmodul-a-azure-basics"><span class="lang-en" style="display:none">Module A: Azure basics</span><span class="lang-de">Modul A: Azure-Grundlagen</span></a>
2. <a href="#module-b-resource-groups-and-resourcesmodul-b-ressourcengruppen-und-ressourcen"><span class="lang-en" style="display:none">Module B: Resource groups and resources</span><span class="lang-de">Modul B: Ressourcengruppen und Ressourcen</span></a>
3. <a href="#module-c-virtual-networks-vnetmodul-c-virtual-networks-vnet"><span class="lang-en" style="display:none">Module C: Virtual Networks (VNet)</span><span class="lang-de">Modul C: Virtual Networks (VNet)</span></a>
4. <a href="#module-d-hub-and-spoke-architecturemodul-d-hub-and-spoke-architektur"><span class="lang-en" style="display:none">Module D: Hub-and-Spoke architecture</span><span class="lang-de">Modul D: Hub-and-Spoke Architektur</span></a>
5. <a href="#module-e-security-with-nsgsmodul-e-sicherheit-mit-nsgs"><span class="lang-en" style="display:none">Module E: Security with NSGs</span><span class="lang-de">Modul E: Sicherheit mit NSGs</span></a>
6. <a href="#module-f-terraform-integration-and-capstonemodul-f-terraform-integration-und-capstone"><span class="lang-en" style="display:none">Module F: Terraform integration and Capstone</span><span class="lang-de">Modul F: Terraform-Integration und Capstone</span></a>

---

## <span class="lang-en" style="display:none">Glossary — Important Azure terms</span><span class="lang-de">Glossar — Wichtige Azure-Begriffe</span>

| <span class="lang-en" style="display:none">German</span><span class="lang-de">Deutsch</span> | English | <span class="lang-en" style="display:none">Meaning</span><span class="lang-de">Bedeutung</span> |
|---------|---------|-----------|
| Abonnement | Subscription | <span class="lang-en" style="display:none">Your Azure account / billing unit</span><span class="lang-de">Dein Azure-Konto / Zahlungseinheit</span> |
| Ressourcengruppe | Resource Group | <span class="lang-en" style="display:none">Container for resources</span><span class="lang-de">Container für Ressourcen</span> |
| Region | Region | Geografischer Standort (z. B. Germany West Central) |
| Virtuelles Netzwerk | Virtual Network (VNet) | Isoliertes Netzwerk in Azure |
| Subnetz | Subnet | Unterbereich eines VNets |
| Netzwerk-Sicherheitsgruppe | Network Security Group (NSG) | <span class="lang-en" style="display:none">Firewall rules for subnets/resources</span><span class="lang-de">Firewall-Regeln für Subnetze/Ressourcen</span> |
| Peering | Virtual Network Peering | Verbindung zwischen VNets |
| Public IP | Public IP Address | <span class="lang-en" style="display:none">Public IP address</span><span class="lang-de">Öffentliche IP-Adresse</span> |
| NAT Gateway | NAT Gateway | Kontrollierter Ausgangszugang ins Internet |

---

## <span class="lang-en" style="display:none">Module A: Azure basics</span><span class="lang-de">Modul A: Azure-Basics</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain Azure concepts such as subscription, resource group, region, and the Azure portal.</span><span class="lang-de">Du kannst Azure-Konzepte wie Subscription, Resource Group, Region und Azure Portal erklären.</span>

### 1.1 <span class="lang-en" style="display:none">How Azure is organized</span><span class="lang-de">Wie Azure organisiert ist</span>

```
Azure ist in Schichten organisiert:

Subscription (Abonnement)
├── Resource Group 1          → Zusammengehörige Ressourcen
│   ├── Virtual Network
│   ├── Virtual Machines
│   └── Storage Account
├── Resource Group 2
│   ├── Kubernetes Cluster
│   └── Application Gateway
└── Resource Group 3
    └── Database Server
```

**Wichtige Regeln:**
1. <span class="lang-en" style="display:none">**Resources always belong to exactly one resource group**</span><span class="lang-de">**Ressourcen gehören immer zu genau einer Resource Group**</span>
2. <span class="lang-en" style="display:none">**Resource groups belong to exactly one subscription**</span><span class="lang-de">**Resource Groups gehören genau einer Subscription**</span>
3. <span class="lang-en" style="display:none">**Resource groups can contain mixed regions** (but using one region is simpler)</span><span class="lang-de">**Resource Groups können Regionen gemischt haben** (aber: gleiche Region ist einfacher)</span>

### 1.2 <span class="lang-en" style="display:none">Regions in Azure</span><span class="lang-de">Regionen in Azure</span>

```
Azure hat Rechenzentren weltweit:

Germany West Central (Frankfurt)      ← Deutschsprachiger Raum
Germany Central (Nürnberg)            ← Deutschsprachiger Raum
East US (Virginia)                    ← USA
North Europe (Irland)                 ← Europa
West Europe (Niederlande)             ← Europa
```

<span class="lang-en" style="display:none">**Beginner rules:**</span><span class="lang-de">**Regeln für Anfänger:**</span>
- <span class="lang-en" style="display:none">Choose the region closest to your users</span><span class="lang-de">Wähle die Region, die am nächsten zu deinen Nutzern liegt</span>
- <span class="lang-en" style="display:none">For German-language courses: `Germany West Central` (Frankfurt)</span><span class="lang-de">Für deutschsprachige Kurse: `Germany West Central` (Frankfurt)</span>
- <span class="lang-en" style="display:none">All resources in a resource group should ideally be in the same region</span><span class="lang-de">Alle Ressourcen in einer Resource Group sollten idealerweise in derselben Region sein</span>

### 1.3 <span class="lang-en" style="display:none">The Azure Portal</span><span class="lang-de">Das Azure Portal</span>

<span class="lang-en" style="display:none">The portal is the website you can use to operate Azure manually:</span><span class="lang-de">Das Portal ist die Webseite, mit der du Azure manuell bedienen kannst:</span>

```
portal.azure.com

Dort kannst du:
- Resource Groups erstellen
- Ressourcen manuell anlegen
- Kosten sehen
- Fehler diagnostizieren
```

<span class="lang-en" style="display:none">**But:** Manual work in the portal is **not reproducible** and **not versionable**. That is exactly why we need Terraform!</span><span class="lang-de">**Aber:** Manuelles Arbeiten im Portal ist **nicht reproduzierbar** und **nicht versionierbar**. Genau dafür brauchen wir Terraform!</span>

### 1.4 <span class="lang-en" style="display:none">Azure CLI — the command line</span><span class="lang-de">Azure CLI — Die Befehlszeile</span>

```bash
# Login
az login

# Deine Subscription sehen
az account list --output table

# Active Subscription setzen
az account set --subscription "Your Subscription Name"

# <span class="lang-en" style="display:none">Creating a resource group (manuell)</span><span class="lang-de">Resource Group erstellen (manuell)</span>
az group create --name rg-test --location "Germany West Central"

# Alle Resource Groups sehen
az group list --output table
```

**CLI-Grundregel:** `az <resource> <action> --name <name> --location <location>`

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul A</span><span class="lang-de">Kurzes Quiz — Modul A</span>

1. <span class="lang-en" style="display:none">What is a resource group?</span><span class="lang-de">Was ist eine Resource Group?</span>
   - <span class="lang-en" style="display:none">a) A file on your computer</span><span class="lang-de">a) Eine Datei auf deinem Computer</span>
   - <span class="lang-en" style="display:none">b) A container for related Azure resources ← **Correct**</span><span class="lang-de">b) Ein Container für zusammengehörige Azure-Ressourcen ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) An Azure service for backups</span><span class="lang-de">c) Ein Azure-Dienst für Backups</span>

2. <span class="lang-en" style="display:none">Why should resources be organized in resource groups?</span><span class="lang-de">Warum sollte man Ressourcen in Resource Groups organisieren?</span>
   - a) Weil es Pflicht ist
   - <span class="lang-en" style="display:none">b) For easier management, deletion, and cost tracking ← **Correct**</span><span class="lang-de">b) Zum einfachen Verwalten, Löschen und Kosten-Tracking ← **Richtig**</span>
   - c) Weil Azure es verlangt

3. Wo befindet sich `Germany West Central`?
   - a) Berlin
   - b) Frankfurt am Main ← **Richtig**
   - <span class="lang-en" style="display:none">c) Munich</span><span class="lang-de">c) München</span>

---

## <span class="lang-en" style="display:none">Module B: Resource groups and resources</span><span class="lang-de">Modul B: Ressourcengruppen und Ressourcen</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create resource groups and different Azure resources manually and with Terraform.</span><span class="lang-de">Du kannst Resource Groups und verschiedene Azure-Ressourcen manuell und mit Terraform erstellen.</span>

### 2.1 <span class="lang-en" style="display:none">Creating a resource group</span><span class="lang-de">Resource Group erstellen</span>

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

resource "azurerm_resource_group" "learning" {
  name     = "rg-learning-azure-101"
  location = "Germany West Central"

  tags = {
    Environment = "Learning"
    Course      = "Azure101"
  }
}
```

### 2.2 <span class="lang-en" style="display:none">Storage account</span><span class="lang-de">Storage Account</span>

```hcl
resource "azurerm_storage_account" "learning" {
  name                     = "stlearnazure101"  # Max 24 chars, lowercase, numbers only
  resource_group_name      = azurerm_resource_group.learning.name
  location                 = azurerm_resource_group.learning.location
  account_tier             = "Standard"
  account_replication_type = "LRS"  # Locally-Redundant (günstigstes)

  tags = {
    Environment = "Learning"
  }
}
```

**Storage Account-Regeln:**
- Name: 3-24 Zeichen, nur kleinbuchstaben und Zahlen
- `LRS` = <span class="lang-en" style="display:none">3 copies in the same data center (cheap)</span><span class="lang-de">3 Kopien im selben Rechenzentrum (günstig)</span>
- `GRS` = 3 Kopien im selben + 3 im benachbarten (teurer, aber sicherer)
- `Standard` = <span class="lang-en" style="display:none">HDD (cheap), `Premium` = SSD (faster)</span><span class="lang-de">HDD (günstig), `Premium` = SSD (schneller)</span>

### 2.3 <span class="lang-en" style="display:none">Virtual machine (VM)</span><span class="lang-de">Virtuelle Maschine (VM)</span>

```hcl
resource "azurerm_resource_group" "compute" {
  name     = "rg-compute-101"
  location = "Germany West Central"
}

# NIC (Netzwerk-Karte)
resource "azurerm_network_interface" "main" {
  name                = "nic-learning-vm"
  resource_group_name = azurerm_resource_group.compute.name
  location            = azurerm_resource_group.compute.location

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.default.id  # Wird später erstellt
    private_ip_address_allocation = "Dynamic"
  }
}

# VM
resource "azurerm_linux_virtual_machine" "main" {
  name                  = "vm-learning-101"
  resource_group_name   = azurerm_resource_group.compute.name
  location              = azurerm_resource_group.compute.location
  size                  = "Standard_B1s"  # Günstigster: 1 vCPU, 1 GB RAM
  admin_username        = "azureuser"
  admin_password        = "DeinPasswort123!"  # ❌ Niemals im Code!
  disable_password_authentication = false

  network_interface_ids = [
    azurerm_network_interface.main.id
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "UbuntuVM"
    offer     = "Ubuntu"
    sku       = "22.04-LTS"
    version   = "latest"
  }
}
```

<span class="lang-en" style="display:none">**VM sizes (simplified):**</span><span class="lang-de">**VM-Größen (vereinfacht):**</span>

| <span class="lang-en" style="display:none">Size</span><span class="lang-de">Größe</span> | vCPU | RAM | <span class="lang-en" style="display:none">Use</span><span class="lang-de">Verwendung</span> |
|-------|------|-----|-----------|
| `Standard_B1s` | 1 | 0,5 GB | Testing / Learning |
| `Standard_B2s` | 2 | 4 GB | Kleine Workloads |
| `Standard_D2s_v3` | 2 | 8 GB | Allgemein |
| `Standard_D4s_v3` | 4 | 16 GB | <span class="lang-en" style="display:none">Larger workloads</span><span class="lang-de">Größere Workloads</span> |

### 2.4 <span class="lang-en" style="display:none">Terraform + Azure CLI — complete flow</span><span class="lang-de">Terraform + Azure CLI — Vollständiger Ablauf</span>

```bash
# 1. Anmelden
az login

# 2. Projekt erstellen
mkdir azure-basics && cd azure-basics

# 3. Dateien erstellen (s.o.)

# 4. Initialisieren
terraform init

# 5. Vorschau
terraform plan

# 6. Erstellen
terraform apply

# 7. Mit Portal prüfen
#    portal.azure.com → Resource Groups → rg-learning-azure-101

# 8. Löschen
terraform destroy
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul B</span><span class="lang-de">Kurzes Quiz — Modul B</span>

1. <span class="lang-en" style="display:none">What does `LRS` mean for a storage account?</span><span class="lang-de">Was bedeutet `LRS` beim Storage Account?</span>
   - a) Low Replication Storage
   - b) Locally-Redundant Storage (3 Kopien im selben Rechenzentrum) ← **Richtig**
   - c) Large Regional Storage

2. Wie viele vCPUs hat eine `Standard_B2s` VM?
   - a) 1
   - b) 2 ← **Richtig**
   - c) 4

3. <span class="lang-en" style="display:none">Where do you see the resources you created when you used Terraform?</span><span class="lang-de">Wo siehst du deine erstellten Ressourcen, wenn du Terraform verwendet hast?</span>
   - a) Nur in der Konsole
   - b) Im Azure Portal und mit `az` CLI ← **Richtig**
   - c) Auf einem Papierbericht

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul B</span><span class="lang-de">Praktische Übung — Modul B</span>

<span class="lang-en" style="display:none">**Task:** Create a resource group with:</span><span class="lang-de">**Aufgabe:** Erstelle eine Resource Group mit:</span>
1. Einem Storage Account (`Standard`, `LRS`)
2. Zwei Tags: `Environment = "Learning"` und `Course = "Azure101"`
3. <span class="lang-en" style="display:none">Check in the Azure portal whether everything was created</span><span class="lang-de">Prüfe im Azure Portal, ob alles angelegt wurde</span>
4. <span class="lang-en" style="display:none">Delete everything with `terraform destroy`</span><span class="lang-de">Lösche alles mit `terraform destroy`</span>

---

## <span class="lang-en" style="display:none">Module C: Virtual Networks (VNet)</span><span class="lang-de">Modul C: Virtual Networks (VNet)</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create VNets, subnets, public IPs, and NSGs, and understand how they work together.</span><span class="lang-de">Du kannst VNets, Subnetze, Public IPs und NSGs erstellen und verstehen, wie sie zusammenarbeiten.</span>

### 3.1 <span class="lang-en" style="display:none">What is a VNet?</span><span class="lang-de">Was ist ein VNet?</span>

```
Ein VNet ist dein eigenes, isoliertes Netzwerk in Azure:

VNet: 10.0.0.0/16  (65.536 IP-Adressen!)
├── Subnet 1: 10.0.1.0/24   (256 IPs)  → Web-Server
├── Subnet 2: 10.0.2.0/24   (256 IPs)  → Datenbanken
└── Subnet 3: 10.0.3.0/24   (256 IPs)  → Management

Dein VNet ist isoliert von anderen Azure-Kunden!
```

<span class="lang-en" style="display:none">**CIDR notation explained:**</span><span class="lang-de">**CIDR-Notation erklärt:**</span>

```
/16 = 2^(32-16) = 2^16 = 65.536 IPs
/24 = 2^(32-24) = 2^8  = 256 IPs
/26 = 2^(32-26) = 2^6  = 64 IPs
/28 = 2^(32-28) = 2^4  = 16 IPs
```

<span class="lang-en" style="display:none">**Important:** Azure always reserves 5 IPs per subnet!</span><span class="lang-de">**Wichtig:** Azure reserviert immer 5 IPs pro Subnet!</span>
- 1× Network Address
- 1× Default Gateway
- 2× DNS
- 1× Broadcast

<span class="lang-en" style="display:none">**Recommendation for beginners:** Do not use subnets smaller than `/26`.</span><span class="lang-de">**Empfehlung für Anfänger:** Verwende keine kleineren als `/26` Subnetze.</span>

### 3.2 <span class="lang-en" style="display:none">Creating VNet and subnets</span><span class="lang-de">VNet und Subnetze erstellen</span>

```hcl
resource "azurerm_resource_group" "networking" {
  name     = "rg-networking-101"
  location = "Germany West Central"
}

resource "azurerm_virtual_network" "main" {
  name                = "vnet-learning"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.networking.location
  resource_group_name = azurerm_resource_group.networking.name

  tags = {
    Environment = "Learning"
  }
}

resource "azurerm_subnet" "web" {
  name                 = "snet-web"
  resource_group_name  = azurerm_resource_group.networking.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "database" {
  name                 = "snet-database"
  resource_group_name  = azurerm_resource_group.networking.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Output: VNet-ID und Subnet-IDs
output "vnet_id" {
  description = "VNet-ID"
  value       = azurerm_virtual_network.main.id
}

output "subnet_ids" {
  description = "Subnet-IDs"
  value = {
    web     = azurerm_subnet.web.id
    database = azurerm_subnet.database.id
  }
}
```

### 3.3 <span class="lang-en" style="display:none">Public IP and NAT Gateway</span><span class="lang-de">Public IP und NAT Gateway</span>

```hcl
# Öffentliche IP-Adresse
resource "azurerm_public_ip" "main" {
  name                = "pip-nat"
  resource_group_name = azurerm_resource_group.networking.name
  location            = azurerm_resource_group.networking.location
  allocation_method   = "Static"
  sku                 = "Standard"
}

# NAT Gateway — kontrollierter Ausgangszugang ins Internet
resource "azurerm_nat_gateway" "main" {
  name                = "natg-learning"
  resource_group_name = azurerm_resource_group.networking.name
  location            = azurerm_resource_group.networking.location
  sku_name            = "Standard"

  idle_timeout_in_minutes = 4

  public_ip_address_ids = [azurerm_public_ip.main.id]

  tags = {
    Environment = "Learning"
  }
}

resource "azurerm_nat_gateway_public_ip_association" "main" {
  nat_gateway_id       = azurerm_nat_gateway.main.id
  public_ip_address_id = azurerm_public_ip.main.id
}
```

<span class="lang-en" style="display:none">**NAT Gateway explained:**</span><span class="lang-de">**NAT Gateway erklärt:**</span>

```
Ohne NAT Gateway:
Private Subnet → ❌ Kein Internet-Zugang

Mit NAT Gateway:
Private Subnet → NAT Gateway → Public IP → ✅ Internet

Mit Azure Firewall (optional):
Private Subnet → NAT Gateway → Azure Firewall → Public IP → ✅ Internet (gefiltert)
```

### 3.4 <span class="lang-en" style="display:none">Network Security Groups (NSG)</span><span class="lang-de">Netzwerk-Sicherheitsgruppen (NSG)</span>

```hcl
# NSG erstellen
resource "azurerm_network_security_group" "web" {
  name                = "nsg-web"
  resource_group_name = azurerm_resource_group.networking.name
  location            = azurerm_resource_group.networking.location

  tags = {
    Environment = "Learning"
  }
}

# Regel: HTTPS von überall erlauben
resource "azurerm_network_security_rule" "https" {
  name                        = "AllowHTTPS"
  resource_group_name         = azurerm_resource_group.networking.name
  network_security_group_name = azurerm_network_security_group.web.name

  priority          = 100
  direction         = "Inbound"
  access            = "Allow"
  protocol          = "Tcp"
  source_port_range = "*"
  destination_port_range = "443"
  source_address_prefix      = "*"
  destination_address_prefix = "*"
}

# Regel: SSH von bestimmten IPs erlauben
resource "azurerm_network_security_rule" "ssh" {
  name                        = "AllowSSH"
  resource_group_name         = azurerm_resource_group.networking.name
  network_security_group_name = azurerm_network_security_group.web.name

  priority          = 110
  direction         = "Inbound"
  access            = "Allow"
  protocol          = "Tcp"
  source_port_range = "*"
  destination_port_range = "22"
  source_address_prefix      = "10.0.0.0/16"  # Nur aus dem eigenen VNet
  destination_address_prefix = "*"
}

# Regel: Alles andere ablehnen (implizit, automatisch)
# Azure NSGs haben eine implizite DROP-Regel am Ende!

# NSG mit Subnet verbinden
resource "azurerm_subnet_network_security_group_association" "web" {
  subnet_id                     = azurerm_subnet.web.id
  network_security_group_id     = azurerm_network_security_group.web.id
}
```

**NSG-Regeln — Wichtige Begriffe:**

| <span class="lang-en" style="display:none">Term</span><span class="lang-de">Begriff</span> | <span class="lang-en" style="display:none">Meaning</span><span class="lang-de">Bedeutung</span> |
|---------|-----------|
| `Inbound` | <span class="lang-en" style="display:none">Incoming traffic (from outside → your resources)</span><span class="lang-de">Eingehender Traffic (von außen → deine Ressourcen)</span> |
| `Outbound` | <span class="lang-en" style="display:none">Outgoing traffic (from your resources → outside)</span><span class="lang-de">Ausgehender Traffic (von deinen Ressourcen → außen)</span> |
| `priority` | Zahl 100-4096 — niedrigere Zahlen zuerst |
| `access` | `Allow` = erlauben, `Deny` = verbieten |
| `source_address_prefix` | Woher kommt der Traffic? |
| `destination_port_range` | <span class="lang-en" style="display:none">Which port? (80, 443, 22, ...)</span><span class="lang-de">Welcher Port? (80, 443, 22, ...)</span> |

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul C</span><span class="lang-de">Kurzes Quiz — Modul C</span>

1. Wie viele IP-Adressen hat ein `/24` Subnet?
   - a) 24
   - b) 256 ← **Richtig**
   - c) 251 (256 minus 5 reservierte)

2. Wie viele IPs reserviert Azure immer im Subnet?
   - a) 2
   - b) 5 ← **Richtig**
   - c) 10

3. <span class="lang-en" style="display:none">What happens if no NSG rule allows a port?</span><span class="lang-de">Was passiert, wenn keine NSG-Regel einen Port erlaubt?</span>
   - <span class="lang-en" style="display:none">a) The port stays open</span><span class="lang-de">a) Der Port bleibt offen</span>
   - <span class="lang-en" style="display:none">b) All ports are opened automatically</span><span class="lang-de">b) Alle Ports werden automatisch geöffnet</span>
   - <span class="lang-en" style="display:none">c) Traffic is blocked by default (implicit DROP rule) ← **Correct**</span><span class="lang-de">c) Der Traffic wird standardmäßig blockiert (implizite DROP-Regel) ← **Richtig**</span>

4. Wozu brauchst du einen NAT Gateway?
   - a) Damit Server im Internet erreichbar sind
   - <span class="lang-en" style="display:none">b) So servers in the private subnet can reach the internet ← **Correct**</span><span class="lang-de">b) Damit Server im privaten Subnet das Internet erreichen können ← **Richtig**</span>
   - c) Zum Schutz vor Hackern

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul C</span><span class="lang-de">Praktische Übung — Modul C</span>

<span class="lang-en" style="display:none">**Task:** Create:</span><span class="lang-de">**Aufgabe:** Erstelle:</span>
1. <span class="lang-en" style="display:none">A resource group</span><span class="lang-de">Eine Resource Group</span>
2. <span class="lang-en" style="display:none">A VNet with `/16` address space</span><span class="lang-de">Ein VNet mit `/16` Address Space</span>
3. Drei Subnetze (`web`, `database`, `management`)
4. <span class="lang-en" style="display:none">An NSG with an HTTPS rule (port 443 from everywhere) and an SSH rule (only from the VNet)</span><span class="lang-de">Eine NSG mit HTTPS-Regel (Port 443 von überall) und SSH-Regel (nur aus dem VNet)</span>
5. <span class="lang-en" style="display:none">A NAT Gateway with public IP</span><span class="lang-de">Ein NAT Gateway mit Public IP</span>
6. <span class="lang-en" style="display:none">Outputs for all IDs</span><span class="lang-de">Outputs für alle IDs</span>

---

## <span class="lang-en" style="display:none">Module D: Hub-and-Spoke architecture</span><span class="lang-de">Modul D: Hub-and-Spoke Architektur</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain hub-and-spoke, justify when it makes sense, and create a simple hub-and-spoke architecture with Terraform.</span><span class="lang-de">Du kannst Hub-and-Spoke erklären, begründen, wann es sinnvoll ist, und eine einfache Hub-and-Spoke-Architektur mit Terraform erstellen.</span>

### 4.1 <span class="lang-en" style="display:none">What is Hub-and-Spoke?</span><span class="lang-de">Was ist Hub-and-Spoke?</span>

```
Flache Architektur (ohne Hub):
  Spoke1 ─── Spoke2 ─── Spoke3
  (Alle miteinander verbunden → Chaos!)

Hub-and-Spoke:
          Hub
        /  |  \
       /   |   \
    Spoke1 Spoke2 Spoke3
  (Alle gehen durch den Hub → kontrolliert!)
```

**Vorteile von Hub-and-Spoke:**

1. **Zentrale Services** — Firewall, DNS, Monitoring im Hub
2. <span class="lang-en" style="display:none">**Isolation** — spokes cannot communicate directly with each other</span><span class="lang-de">**Isolation** — Spokes können nicht direkt miteinander kommunizieren</span>
3. **Kosten** — Nur eine Firewall im Hub, nicht in jedem Spoke
4. <span class="lang-en" style="display:none">**Security** — all traffic flows go through the hub</span><span class="lang-de">**Sicherheit** — Alle Traffic-Flüsse gehen durch den Hub</span>
5. **Governance** — Zentrale Policies im Hub anwendbar

### 4.2 <span class="lang-en" style="display:none">VNet Peering</span><span class="lang-de">VNet Peering</span>

```
VNet Peering = Verbindung zwischen zwei VNets:

Hub VNet           Spoke VNet
┌───────────┐      ┌───────────┐
│  Gateway  │◄────►│  Subnet 1 │
│           │      │  Subnet 2 │
│  DNS      │      │  Subnet 3 │
│  Firewall │      └───────────┘
└───────────┘

→ Ressourcen im Hub können auf Spoke-Subnetze zugreifen
→ Ressourcen in Spokes können auf den Hub zugreifen
→ Traffic bleibt im Azure-Netzwerk (kein Internet!)
```

### 4.3 <span class="lang-en" style="display:none">Hub-and-Spoke with Terraform</span><span class="lang-de">Hub-and-Spoke mit Terraform</span>

```hcl
# Hub VNet
resource "azurerm_virtual_network" "hub" {
  name                = "vnet-hub"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.hub-spoke.location
  resource_group_name = azurerm_resource_group.hub-spoke.name
}

# Spoke 1 VNet
resource "azurerm_virtual_network" "spoke1" {
  name                = "vnet-spoke1"
  address_space       = ["10.1.0.0/16"]
  location            = azurerm_resource_group.hub-spoke.location
  resource_group_name = azurerm_resource_group.hub-spoke.name
}

# Spoke 2 VNet
resource "azurerm_virtual_network" "spoke2" {
  name                = "vnet-spoke2"
  address_space       = ["10.2.0.0/16"]
  location            = azurerm_resource_group.hub-spoke.location
  resource_group_name = azurerm_resource_group.hub-spoke.name
}

# Peering: Hub → Spoke1
resource "azurerm_virtual_network_peering" "hub_to_spoke1" {
  name                         = "hub-to-spoke1"
  resource_group_name          = azurerm_resource_group.hub-spoke.name
  virtual_network_name         = azurerm_virtual_network.hub.name
  remote_virtual_network_id    = azurerm_virtual_network.spoke1.id
  allow_virtual_network_access = true
  allow_forwarded_traffic      = true
  allow_gateway_transit        = false
}

# Peering: Spoke1 → Hub
resource "azurerm_virtual_network_peering" "spoke1_to_hub" {
  name                         = "spoke1-to-hub"
  resource_group_name          = azurerm_resource_group.hub-spoke.name
  virtual_network_name         = azurerm_virtual_network.spoke1.name
  remote_virtual_network_id    = azurerm_virtual_network.hub.id
  allow_virtual_network_access = true
  allow_forwarded_traffic      = false
  allow_gateway_transit        = true
}

# Peering: Hub → Spoke2 (analog zu spoke1)
resource "azurerm_virtual_network_peering" "hub_to_spoke2" {
  name                         = "hub-to-spoke2"
  resource_group_name          = azurerm_resource_group.hub-spoke.name
  virtual_network_name         = azurerm_virtual_network.hub.name
  remote_virtual_network_id    = azurerm_virtual_network.spoke2.id
  allow_virtual_network_access = true
  allow_forwarded_traffic      = true
  allow_gateway_transit        = false
}

resource "azurerm_virtual_network_peering" "spoke2_to_hub" {
  name                         = "spoke2-to-hub"
  resource_group_name          = azurerm_resource_group.hub-spoke.name
  virtual_network_name         = azurerm_virtual_network.spoke2.name
  remote_virtual_network_id    = azurerm_virtual_network.hub.id
  allow_virtual_network_access = true
  allow_forwarded_traffic      = false
  allow_gateway_transit        = true
}
```

### 4.4 <span class="lang-en" style="display:none">Why bidirectional peering?</span><span class="lang-de">Warum bidirektionales Peering?</span>

```
Peering funktioniert NICHT automatisch in beide Richtungen!

Richtung Hub → Spoke:
├─ allow_virtual_network_access = true   ← Spoke darf auf Hub zugreifen
├─ allow_forwarded_traffic      = true   ← Hub darf weitergeleiteten Traffic durchlassen
└─ allow_gateway_transit        = false  ← Hub hat kein Gateway

Richtung Spoke → Hub:
├─ allow_virtual_network_access = true   ← Hub darf auf Spoke zugreifen
├─ allow_forwarded_traffic      = false  ← Spoke leitet nichts weiter
└─ allow_gateway_transit        = true   ← Spoke darf über Hub-Gateway gehen
```

<span class="lang-en" style="display:none">**Remember:** Every peering needs **two** `azurerm_virtual_network_peering` resources!</span><span class="lang-de">**Merke:** Jedes Peering braucht **zwei** `azurerm_virtual_network_peering`-Ressourcen!</span>

### 4.5 <span class="lang-en" style="display:none">Subnets in Hub and Spokes</span><span class="lang-de">Subnetze im Hub und in den Spokes</span>

```hcl
# Hub Subnetze
resource "azurerm_subnet" "hub_gateway" {
  name                 = "GatewaySubnet"
  resource_group_name  = azurerm_resource_group.hub-spoke.name
  virtual_network_name = azurerm_virtual_network.hub.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "hub_firewall" {
  name                 = "AzureFirewallSubnet"
  resource_group_name  = azurerm_resource_group.hub-spoke.name
  virtual_network_name = azurerm_virtual_network.hub.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Spoke1 Subnet
resource "azurerm_subnet" "spoke1_app" {
  name                 = "snet-app"
  resource_group_name  = azurerm_resource_group.hub-spoke.name
  virtual_network_name = azurerm_virtual_network.spoke1.name
  address_prefixes     = ["10.1.1.0/24"]
}

# Spoke2 Subnet
resource "azurerm_subnet" "spoke2_data" {
  name                 = "snet-data"
  resource_group_name  = azurerm_resource_group.hub-spoke.name
  virtual_network_name = azurerm_virtual_network.spoke2.name
  address_prefixes     = ["10.2.1.0/24"]
}
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul D</span><span class="lang-de">Kurzes Quiz — Modul D</span>

1. <span class="lang-en" style="display:none">Why is hub-and-spoke better than a flat architecture?</span><span class="lang-de">Warum ist Hub-and-Spoke besser als eine flache Architektur?</span>
   - <span class="lang-en" style="display:none">a) It is always cheaper</span><span class="lang-de">a) Es ist immer günstiger</span>
   - b) Zentrale Kontrolle, Isolation und skalierbarer ← **Richtig**
   - c) Es ist komplizierter

2. <span class="lang-en" style="display:none">Does VNet peering need one or two resources in Terraform?</span><span class="lang-de">Braucht ein VNet Peering eine oder zwei Ressourcen in Terraform?</span>
   - <span class="lang-en" style="display:none">a) One</span><span class="lang-de">a) Eine</span>
   - b) Zwei (jeweils eine Richtung) ← **Richtig**
   - c) Drei

3. <span class="lang-en" style="display:none">What is the name of the special subnet for gateways?</span><span class="lang-de">Was ist der Name des speziellen Subnetzes für Gateways?</span>
   - a) `GatewaySubnet` ← **Richtig**
   - b) `Subnet-Gateway`
   - c) `vnet-gateway`

4. <span class="lang-en" style="display:none">What must be set to `true` in spoke peering so the spoke can use the hub gateway?</span><span class="lang-de">Was muss im Spoke-Peering auf `true` gesetzt werden, damit der Spoke über das Hub-Gateway gehen darf?</span>
   - a) `allow_virtual_network_access`
   - b) `allow_forwarded_traffic`
   - c) `allow_gateway_transit` ← **Richtig**

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul D</span><span class="lang-de">Praktische Übung — Modul D</span>

<span class="lang-en" style="display:none">**Task:** Create a hub-and-spoke architecture with:</span><span class="lang-de">**Aufgabe:** Erstelle eine Hub-and-Spoke-Architektur mit:</span>
1. Einer Resource Group
2. Einem Hub-VNet (`10.0.0.0/16`) mit `GatewaySubnet` und `AzureFirewallSubnet`
3. Zwei Spoke-VNet (`10.1.0.0/16` und `10.2.0.0/16`) mit je einem Subnet
4. Bidirektionalem Peering zwischen Hub und beiden Spokes
5. <span class="lang-en" style="display:none">Outputs for all VNet IDs</span><span class="lang-de">Outputs für alle VNet-IDs</span>

---

## <span class="lang-en" style="display:none">Module E: Security with NSGs</span><span class="lang-de">Modul E: Sicherheit mit NSGs</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create NSG rules, understand how priorities work, and build a secure network configuration.</span><span class="lang-de">Du kannst NSG-Regeln erstellen, verstehen, wie Prioritäten funktionieren, und eine sichere Netzwerk-Konfiguration aufbauen.</span>

### 5.1 <span class="lang-en" style="display:none">NSG priorities</span><span class="lang-de">NSG-Prioritäten</span>

```
NSG-Regeln werden nach Priorität verarbeitet:

Priority 100: Allow HTTPS (Inbound)       ← Zuerst geprüft
Priority 110: Allow SSH (Inbound)         ← Zweitens
Priority 120: Allow DNS (Outbound)        ← Drittens
Priority 4090: Deny All (Inbound, implicit) ← Immer am Ende
```

**Regeln:**
- <span class="lang-en" style="display:none">Lower numbers = higher priority</span><span class="lang-de">Niedrigere Zahlen = höhere Priorität</span>
- Bereich: 100–4100
- <span class="lang-en" style="display:none">No duplicate priorities!</span><span class="lang-de">Keine doppelten Prioritäten!</span>

### 5.2 <span class="lang-en" style="display:none">Security best practices</span><span class="lang-de">Security-Best-Practices</span>

```hcl
# ❌ SCHLECHT: SSH von überall öffnen
resource "azurerm_network_security_rule" "ssh_bad" {
  name                        = "BadSSH"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"  # ← Von überall!
  destination_address_prefix  = "*"
}

# ✅ GUT: SSH nur vom Management-Subnet
resource "azurerm_network_security_rule" "ssh_good" {
  name                        = "GoodSSH"
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "10.0.3.0/24"  # Nur Management-Subnet
  destination_address_prefix  = "*"
}

# ✅ GUT: HTTPS von überall
resource "azurerm_network_security_rule" "https" {
  name                        = "AllowHTTPS"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
}

# ✅ GUT: Datenbank nur vom App-Subnet
resource "azurerm_network_security_rule" "db" {
  name                        = "AllowDatabase"
  priority                    = 120
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "5432"
  source_address_prefix       = "10.0.1.0/24"  # Nur App-Subnet
  destination_address_prefix  = "*"
}
```

### 5.3 <span class="lang-en" style="display:none">Outbound rules</span><span class="lang-de">Outbound-Regeln</span>

```hcl
# Outbound: DNS erlauben (Port 53)
resource "azurerm_network_security_rule" "dns_outbound" {
  name                        = "AllowDNS"
  priority                    = 110
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "53"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
}

# Outbound: HTTPS erlauben
resource "azurerm_network_security_rule" "https_outbound" {
  name                        = "AllowHTTPSOut"
  priority                    = 120
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
}
```

### 5.4 <span class="lang-en" style="display:none">Important ports for Databricks and Azure</span><span class="lang-de">Wichtige Ports für Databricks und Azure</span>

```hcl
# Azure Databricks — Wichtige Ports:
# 443 (HTTPS) — Web UI, API
# 11211 (MongoDB) — Workspace-Zugriff
# 3301, 3302 (Spark) — Cluster-Kommunikation

resource "azurerm_network_security_rule" "databricks" {
  name                        = "AllowDatabricks"
  priority                    = 130
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "11211"  # MongoDB (Databricks)
  source_address_prefix       = "AzureDatabricks"  # Special tag!
  destination_address_prefix  = "*"
}
```

<span class="lang-en" style="display:none">**Important:** `source_address_prefix = "AzureDatabricks"` is a special Azure tag — you cannot enter an IP range for it!</span><span class="lang-de">**Wichtig:** `source_address_prefix = "AzureDatabricks"` ist ein spezieller Azure-Tag — du kannst keinen IP-Range dafür eingeben!</span>

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul E</span><span class="lang-de">Kurzes Quiz — Modul E</span>

1. <span class="lang-en" style="display:none">What does a lower priority number mean in an NSG rule?</span><span class="lang-de">Was bedeutet eine niedrigere Prioritätszahl in einer NSG-Regel?</span>
   - <span class="lang-en" style="display:none">a) It is checked later</span><span class="lang-de">a) Sie wird später geprüft</span>
   - <span class="lang-en" style="display:none">b) It is checked first ← **Correct**</span><span class="lang-de">b) Sie wird zuerst geprüft ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) It has no meaning</span><span class="lang-de">c) Sie hat keine Bedeutung</span>

2. Wie lautet die implizite Standardregel am Ende einer NSG?
   - a) Allow All
   - b) Deny All ← **Richtig**
   - c) Allow DNS

3. Wozu brauchst du Outbound-NSG-Regeln?
   - <span class="lang-en" style="display:none">a) So resources can reach the internet ← **Correct**</span><span class="lang-de">a) Damit Ressourcen das Internet erreichen können ← **Richtig**</span>
   - <span class="lang-en" style="display:none">b) So resources can be accessed from outside</span><span class="lang-de">b) Damit von außen auf Ressourcen zugegriffen werden kann</span>
   - c) Zum Schutz vor Hackern

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- <span class="lang-en" style="display:none">Create an NSG with the following rules:</span><span class="lang-de">Erstelle eine NSG mit folgenden Regeln:</span>
  1. <span class="lang-en" style="display:none">HTTPS (443) inbound from everywhere</span><span class="lang-de">HTTPS (443) Inbound von überall</span>
  2. SSH (22) Inbound nur aus einem spezifischen CIDR
  3. <span class="lang-en" style="display:none">DNS (53) outbound to everywhere</span><span class="lang-de">DNS (53) Outbound von überall</span>
  4. MySQL (3306) Inbound nur aus einem spezifischen Subnet
- <span class="lang-en" style="display:none">Associate the NSG with a subnet</span><span class="lang-de">Verbinde die NSG mit einem Subnet</span>
- <span class="lang-en" style="display:none">Create outputs</span><span class="lang-de">Erstelle Outputs</span>

---

## <span class="lang-en" style="display:none">Module F: Terraform integration and Capstone</span><span class="lang-de">Modul F: Terraform-Integration und Capstone</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create, format, and validate a complete Azure network with Terraform, and give a first overview of Databricks networking.</span><span class="lang-de">Du kannst ein komplettes Azure-Netzwerk mit Terraform erstellen, formatieren, validieren und einen ersten Überblick über Databricks-Netzwerke geben.</span>

### 6.1 <span class="lang-en" style="display:none">Terraform fmt and validate</span><span class="lang-de">Terraform fmt und validate</span>

```bash
# Formatieren
terraform fmt -recursive

# Format prüfen (ohne zu ändern)
terraform fmt -check -recursive
# Exit 0 = alles gut, Exit 1 = Änderungen nötig

# Syntax prüfen
terraform validate
# Success! The configuration is valid.
```

### 6.2 <span class="lang-en" style="display:none">Reading Terraform plan</span><span class="lang-de">Terraform Plan lesen</span>

```bash
terraform plan

# Ausgabe bedeutet:
# ──────────────────────────────────────
# Terraform used the selected providers
# to generate the following execution plan.
# Resource actions are indicated with the
# following symbols:
#   + create
#
# Terraform will perform the following actions:
#
#   # azurerm_resource_group.main will be created
#   + resource "azurerm_resource_group" "main" {
#       + id       = (known after apply)
#       + location = "Germany West Central"
#       + name     = "rg-learning"
#     }
#
# Plan: 10 to add, 0 to change, 0 to destroy.
# ──────────────────────────────────────
#
# Bedeutung: 10 neue Ressourcen werden erstellt
```

### 6.3 🏆 <span class="lang-en" style="display:none">Capstone project</span><span class="lang-de">Capstone-Projekt</span>

<span class="lang-en" style="display:none">**Task:** Create a complete hub-and-spoke architecture:</span><span class="lang-de">**Aufgabe:** Erstelle eine komplette Hub-and-Spoke-Architektur:</span>

```
Anforderungen:
├── Resource Group
├── Hub VNet (10.0.0.0/16)
│   ├── GatewaySubnet (10.0.1.0/24)
│   └── AzureFirewallSubnet (10.0.2.0/24)
├── Spoke1 VNet (10.1.0.0/16)
│   └── App Subnet (10.1.1.0/24)
├── Spoke2 VNet (10.2.0.0/16)
│   └── Data Subnet (10.2.1.0/24)
├── Bidirektionales Peering
├── NSG mit HTTPS + SSH Regeln
├── NAT Gateway mit Public IP
├── Variablen für Name und Region
├── Locals für gemeinsame Tags
├── Outputs für alle IDs
└── Format und Validierung
```

<span class="lang-en" style="display:none">**Checklist:**</span><span class="lang-de">**Checkliste:**</span>
- [ ] <span class="lang-en" style="display:none">`terraform init` runs</span><span class="lang-de">`terraform init` läuft</span>
- [ ] <span class="lang-en" style="display:none">`terraform validate` says "valid"</span><span class="lang-de">`terraform validate` sagt "valid"</span>
- [ ] <span class="lang-en" style="display:none">`terraform fmt -check` says no changes are needed</span><span class="lang-de">`terraform fmt -check` sagt keine Änderungen nötig</span>
- [ ] <span class="lang-en" style="display:none">`terraform plan` shows the expected 20+ resources</span><span class="lang-de">`terraform plan` zeigt die erwarteten 20+ Ressourcen</span>
- [ ] <span class="lang-en" style="display:none">All variables have a `description`</span><span class="lang-de">Alle Variablen haben `description`</span>
- [ ] <span class="lang-en" style="display:none">All outputs have a `description`</span><span class="lang-de">Alle Outputs haben `description`</span>
- [ ] <span class="lang-en" style="display:none">NSG rules are secure (SSH is not open)</span><span class="lang-de">NSG-Regeln sind sicher (SSH nicht offen)</span>
- [ ] <span class="lang-en" style="display:none">Peering is bidirectional</span><span class="lang-de">Peering ist bidirektional</span>

### 6.4 <span class="lang-en" style="display:none">What's next?</span><span class="lang-de">Was kommt als Nächstes?</span>

```
Fertig mit Azure 101? Weiter zu:

1. Databricks 101    → Databricks-Infrastruktur und VNet Injection
2. Integration 101   → Terraform + Azure + Databricks kombiniert
3. Azure Security    → Key Vault, Managed Identities, RBAC
4. Azure CI/CD       → GitHub Actions für Azure-Deployment
```

### 6.5 <span class="lang-en" style="display:none">Databricks networking preview</span><span class="lang-de">Databricks-Networking-Vorschau</span>

```
Databricks in Azure braucht ein VNet:

VNet (Azure Databricks)
├── Host Subnet (/24)         → Databricks Control-Plane
│   └── VMs laufen hier (VNet Injection)
│
└── Container Subnet (/24)    → Databricks Compute
    └── Cluster-Nodes hier

Wichtige Konzepte für Databricks:
• VNet Injection — Databricks läuft in deinem VNet
• Secure Cluster Connectivity — Keine Public IP nötig
• Private Link — Zugriff ohne öffentliches Internet
• NSG Rules — Databricks braucht spezielle Regeln
```

<span class="lang-en" style="display:none">→ More about this in the [Databricks 101 course](databricks-101.md)</span><span class="lang-de">→ Mehr dazu im [Databricks 101 Kurs](databricks-101.md)</span>

### 📝 <span class="lang-en" style="display:none">Final Quiz — Kurs-Ende</span><span class="lang-de">Letztes Quiz — Kurs-Ende</span>

1. <span class="lang-en" style="display:none">Name three benefits of hub-and-spoke.</span><span class="lang-de">Nenne drei Vorteile von Hub-and-Spoke.</span>
   <span class="lang-en" style="display:none">**Sample:** central services, isolation, cost savings</span><span class="lang-de">**Muster:** Zentrale Services, Isolation, Kostenersparnis</span>

2. <span class="lang-en" style="display:none">Why does VNet peering need two resources?</span><span class="lang-de">Warum braucht VNet Peering zwei Ressourcen?</span>
   <span class="lang-en" style="display:none">**Sample:** peering does not automatically work in both directions</span><span class="lang-de">**Muster:** Peering funktioniert nicht automatisch in beide Richtungen</span>

3. <span class="lang-en" style="display:none">What does `terraform fmt` do?</span><span class="lang-de">Was macht `terraform fmt`?</span>
   <span class="lang-en" style="display:none">**Sample:** formats HCL files for consistency</span><span class="lang-de">**Muster:** Formatiert HCL-Dateien für Konsistenz</span>

4. Wie viele IPs reserviert Azure im Subnet?
   <span class="lang-en" style="display:none">**Sample:** 5 IPs (network, gateway, 2× DNS, broadcast)</span><span class="lang-de">**Muster:** 5 IPs (Network, Gateway, 2× DNS, Broadcast)</span>

---

## <span class="lang-en" style="display:none">Appendix: Command Cheat Sheet</span><span class="lang-de">Anhang: Command Cheat Sheet</span>

```bash
# Azure CLI
az login                        # Anmelden
az account list                 # Abonnements sehen
az group list                   # Resource Groups
az group create --name rg-x --location "Germany West Central"
az resource list --group rg-x   # Ressourcen in RG sehen
az vm list                      # VMs sehen
az network vnet list            # VNets sehen
az network vnet subnet list --vnet-name vnet-x

# Terraform + Azure
terraform init                  # Azure Provider laden
terraform plan                  # Plan sehen
terraform apply                 # Erstellen
terraform destroy               # Löschen
terraform state list            # Alle Ressourcen
```

## <span class="lang-en" style="display:none">Appendix: Common errors</span><span class="lang-de">Anhang: Häufige Fehler</span>

| <span class="lang-en" style="display:none">Error</span><span class="lang-de">Fehler</span> | <span class="lang-en" style="display:none">Solution</span><span class="lang-de">Lösung</span> |
|--------|--------|
| `AuthorizationDenied` | <span class="lang-en" style="display:none">Run `az login` and choose the correct subscription</span><span class="lang-de">`az login` und richtige Subscription wählen</span> |
| `StorageAccountNameInvalid` | Name: nur Kleinbuchstaben + Zahlen, 3-24 Zeichen |
| `InvalidSubnetId` | <span class="lang-en" style="display:none">GatewaySubnet must be named exactly like this</span><span class="lang-de">GatewaySubnet muss genau so heißen</span> |
| `NSG Rule Duplicate Priority` | <span class="lang-en" style="display:none">Each priority may be used only once</span><span class="lang-de">Jede Priorität darf nur einmal vorkommen</span> |
| `Peering not working both ways` | <span class="lang-en" style="display:none">Create two peering resources!</span><span class="lang-de">Zwei Peering-Ressourcen erstellen!</span> |
| `Subscription not found` | `az account set --subscription "Name"` |
