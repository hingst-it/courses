---
layout: course
title: Azure 101
description: Azure Cloud-Grundlagen für Terraform-Nutzer — 8 Stunden, absolute Beginners
permalink: /courses/azure-101.html
---

# 🟦 Azure 101 — <span class="lang-en" style="display:none">Cloud fundamentals for Terraform users</span><span class="lang-de">Cloud-Grundlagen für Terraform-Nutzer</span>

> **Dauer:** 8 Stunden (1 voller Tag)  
> **Niveau:** Absolute Beginners — keine Azure-Vorkenntnisse nötig  
> **Sprache:** Deutsch, mit englischen Fachbegriffen

---

## Inhaltsverzeichnis

1. [Modul A: Azure-Grundlagen](#modul-a-azure-basics) (1,5 h)
2. [Modul B: Ressourcengruppen und Ressourcen](#modul-b-ressourcengruppen-und-ressourcen) (1 h)
3. [Modul C: Virtual Networks (VNet)](#modul-c-virtual-networks-vnet) (2 h)
4. [Modul D: Hub-and-Spoke Architektur](#modul-d-hub-and-spoke-architektur) (1,5 h)
5. [Modul E: Sicherheit mit NSGs](#modul-e-sicherheit-mit-nsgs) (1 h)
6. [Modul F: Terraform-Integration und Capstone](#modul-f-terraform-integration-und-capstone) (1 h)

---

## <span class="lang-en" style="display:none">Glossary — Important Azure terms</span><span class="lang-de">Glossar — Wichtige Azure-Begriffe</span>

| Deutsch | English | Bedeutung |
|---------|---------|-----------|
| Abonnement | Subscription | Dein Azure-Konto / Zahlungseinheit |
| Ressourcengruppe | Resource Group | Container für Ressourcen |
| Region | Region | Geografischer Standort (z. B. Germany West Central) |
| Virtuelles Netzwerk | Virtual Network (VNet) | Isoliertes Netzwerk in Azure |
| Subnetz | Subnet | Unterbereich eines VNets |
| Netzwerk-Sicherheitsgruppe | Network Security Group (NSG) | Firewall-Regeln für Subnetze/Ressourcen |
| Peering | Virtual Network Peering | Verbindung zwischen VNets |
| Public IP | Public IP Address | Öffentliche IP-Adresse |
| NAT Gateway | NAT Gateway | Kontrollierter Ausgangszugang ins Internet |

---

## <span class="lang-en" style="display:none">Module A: Azure basics</span><span class="lang-de">Modul A: Azure-Basics</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst Azure-Konzepte wie Subscription, Resource Group, Region und Azure Portal erklären.

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
1. **Ressourcen gehören immer zu genau einer Resource Group**
2. **Resource Groups gehören genau einer Subscription**
3. **Resource Groups können Regionen gemischt haben** (aber: gleiche Region ist einfacher)

### 1.2 <span class="lang-en" style="display:none">Regions in Azure</span><span class="lang-de">Regionen in Azure</span>

```
Azure hat Rechenzentren weltweit:

Germany West Central (Frankfurt)      ← Deutschsprachiger Raum
Germany Central (Nürnberg)            ← Deutschsprachiger Raum
East US (Virginia)                    ← USA
North Europe (Irland)                 ← Europa
West Europe (Niederlande)             ← Europa
```

**Regeln für Anfänger:**
- Wähle die Region, die am nächsten zu deinen Nutzern liegt
- Für deutschsprachige Kurse: `Germany West Central` (Frankfurt)
- Alle Ressourcen in einer Resource Group sollten idealerweise in derselben Region sein

### 1.3 <span class="lang-en" style="display:none">The Azure Portal</span><span class="lang-de">Das Azure Portal</span>

Das Portal ist die Webseite, mit der du Azure manuell bedienen kannst:

```
portal.azure.com

Dort kannst du:
- Resource Groups erstellen
- Ressourcen manuell anlegen
- Kosten sehen
- Fehler diagnostizieren
```

**Aber:** Manuelles Arbeiten im Portal ist **nicht reproduzierbar** und **nicht versionierbar**. Genau dafür brauchen wir Terraform!

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

1. Was ist eine Resource Group?
   - a) Eine Datei auf deinem Computer
   - b) Ein Container für zusammengehörige Azure-Ressourcen ← **Richtig**
   - c) Ein Azure-Dienst für Backups

2. Warum sollte man Ressourcen in Resource Groups organisieren?
   - a) Weil es Pflicht ist
   - b) Zum einfachen Verwalten, Löschen und Kosten-Tracking ← **Richtig**
   - c) Weil Azure es verlangt

3. Wo befindet sich `Germany West Central`?
   - a) Berlin
   - b) Frankfurt am Main ← **Richtig**
   - c) München

---

## <span class="lang-en" style="display:none">Module B: Resource groups and resources</span><span class="lang-de">Modul B: Ressourcengruppen und Ressourcen</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst Resource Groups und verschiedene Azure-Ressourcen manuell und mit Terraform erstellen.

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
- `LRS` = 3 Kopien im selben Rechenzentrum (günstig)
- `GRS` = 3 Kopien im selben + 3 im benachbarten (teurer, aber sicherer)
- `Standard` = HDD (günstig), `Premium` = SSD (schneller)

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

**VM-Größen (vereinfacht):**

| Größe | vCPU | RAM | Verwendung |
|-------|------|-----|-----------|
| `Standard_B1s` | 1 | 0,5 GB | Testing / Learning |
| `Standard_B2s` | 2 | 4 GB | Kleine Workloads |
| `Standard_D2s_v3` | 2 | 8 GB | Allgemein |
| `Standard_D4s_v3` | 4 | 16 GB | Größere Workloads |

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

1. Was bedeutet `LRS` beim Storage Account?
   - a) Low Replication Storage
   - b) Locally-Redundant Storage (3 Kopien im selben Rechenzentrum) ← **Richtig**
   - c) Large Regional Storage

2. Wie viele vCPUs hat eine `Standard_B2s` VM?
   - a) 1
   - b) 2 ← **Richtig**
   - c) 4

3. Wo siehst du deine erstellten Ressourcen, wenn du Terraform verwendet hast?
   - a) Nur in der Konsole
   - b) Im Azure Portal und mit `az` CLI ← **Richtig**
   - c) Auf einem Papierbericht

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul B</span><span class="lang-de">Praktische Übung — Modul B</span>

**Aufgabe:** Erstelle eine Resource Group mit:
1. Einem Storage Account (`Standard`, `LRS`)
2. Zwei Tags: `Environment = "Learning"` und `Course = "Azure101"`
3. Prüfe im Azure Portal, ob alles angelegt wurde
4. Lösche alles mit `terraform destroy`

---

## <span class="lang-en" style="display:none">Module C: Virtual Networks (VNet)</span><span class="lang-de">Modul C: Virtual Networks (VNet)</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst VNets, Subnetze, Public IPs und NSGs erstellen und verstehen, wie sie zusammenarbeiten.

### 3.1 <span class="lang-en" style="display:none">What is a VNet?</span><span class="lang-de">Was ist ein VNet?</span>

```
Ein VNet ist dein eigenes, isoliertes Netzwerk in Azure:

VNet: 10.0.0.0/16  (65.536 IP-Adressen!)
├── Subnet 1: 10.0.1.0/24   (256 IPs)  → Web-Server
├── Subnet 2: 10.0.2.0/24   (256 IPs)  → Datenbanken
└── Subnet 3: 10.0.3.0/24   (256 IPs)  → Management

Dein VNet ist isoliert von anderen Azure-Kunden!
```

**CIDR-Notation erklärt:**

```
/16 = 2^(32-16) = 2^16 = 65.536 IPs
/24 = 2^(32-24) = 2^8  = 256 IPs
/26 = 2^(32-26) = 2^6  = 64 IPs
/28 = 2^(32-28) = 2^4  = 16 IPs
```

**Wichtig:** Azure reserviert immer 5 IPs pro Subnet!
- 1× Network Address
- 1× Default Gateway
- 2× DNS
- 1× Broadcast

**Empfehlung für Anfänger:** Verwende keine kleineren als `/26` Subnetze.

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

**NAT Gateway erklärt:**

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

| Begriff | Bedeutung |
|---------|-----------|
| `Inbound` | Eingehender Traffic (von außen → deine Ressourcen) |
| `Outbound` | Ausgehender Traffic (von deinen Ressourcen → außen) |
| `priority` | Zahl 100-4096 — niedrigere Zahlen zuerst |
| `access` | `Allow` = erlauben, `Deny` = verbieten |
| `source_address_prefix` | Woher kommt der Traffic? |
| `destination_port_range` | Welcher Port? (80, 443, 22, ...) |

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul C</span><span class="lang-de">Kurzes Quiz — Modul C</span>

1. Wie viele IP-Adressen hat ein `/24` Subnet?
   - a) 24
   - b) 256 ← **Richtig**
   - c) 251 (256 minus 5 reservierte)

2. Wie viele IPs reserviert Azure immer im Subnet?
   - a) 2
   - b) 5 ← **Richtig**
   - c) 10

3. Was passiert, wenn keine NSG-Regel einen Port erlaubt?
   - a) Der Port bleibt offen
   - b) Alle Ports werden automatisch geöffnet
   - c) Der Traffic wird standardmäßig blockiert (implizite DROP-Regel) ← **Richtig**

4. Wozu brauchst du einen NAT Gateway?
   - a) Damit Server im Internet erreichbar sind
   - b) Damit Server im privaten Subnet das Internet erreichen können ← **Richtig**
   - c) Zum Schutz vor Hackern

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul C</span><span class="lang-de">Praktische Übung — Modul C</span>

**Aufgabe:** Erstelle:
1. Eine Resource Group
2. Ein VNet mit `/16` Address Space
3. Drei Subnetze (`web`, `database`, `management`)
4. Eine NSG mit HTTPS-Regel (Port 443 von überall) und SSH-Regel (nur aus dem VNet)
5. Ein NAT Gateway mit Public IP
6. Outputs für alle IDs

---

## <span class="lang-en" style="display:none">Module D: Hub-and-Spoke architecture</span><span class="lang-de">Modul D: Hub-and-Spoke Architektur</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst Hub-and-Spoke erklären, begründen, wann es sinnvoll ist, und eine einfache Hub-and-Spoke-Architektur mit Terraform erstellen.

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
2. **Isolation** — Spokes können nicht direkt miteinander kommunizieren
3. **Kosten** — Nur eine Firewall im Hub, nicht in jedem Spoke
4. **Sicherheit** — Alle Traffic-Flüsse gehen durch den Hub
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

**Merke:** Jedes Peering braucht **zwei** `azurerm_virtual_network_peering`-Ressourcen!

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

1. Warum ist Hub-and-Spoke besser als eine flache Architektur?
   - a) Es ist immer günstiger
   - b) Zentrale Kontrolle, Isolation und skalierbarer ← **Richtig**
   - c) Es ist komplizierter

2. Braucht ein VNet Peering eine oder zwei Ressourcen in Terraform?
   - a) Eine
   - b) Zwei (jeweils eine Richtung) ← **Richtig**
   - c) Drei

3. Was ist der Name des speziellen Subnetzes für Gateways?
   - a) `GatewaySubnet` ← **Richtig**
   - b) `Subnet-Gateway`
   - c) `vnet-gateway`

4. Was muss im Spoke-Peering auf `true` gesetzt werden, damit der Spoke über das Hub-Gateway gehen darf?
   - a) `allow_virtual_network_access`
   - b) `allow_forwarded_traffic`
   - c) `allow_gateway_transit` ← **Richtig**

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul D</span><span class="lang-de">Praktische Übung — Modul D</span>

**Aufgabe:** Erstelle eine Hub-and-Spoke-Architektur mit:
1. Einer Resource Group
2. Einem Hub-VNet (`10.0.0.0/16`) mit `GatewaySubnet` und `AzureFirewallSubnet`
3. Zwei Spoke-VNet (`10.1.0.0/16` und `10.2.0.0/16`) mit je einem Subnet
4. Bidirektionalem Peering zwischen Hub und beiden Spokes
5. Outputs für alle VNet-IDs

---

## <span class="lang-en" style="display:none">Module E: Security with NSGs</span><span class="lang-de">Modul E: Sicherheit mit NSGs</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst NSG-Regeln erstellen, verstehen, wie Prioritäten funktionieren, und eine sichere Netzwerk-Konfiguration aufbauen.

### 5.1 <span class="lang-en" style="display:none">NSG priorities</span><span class="lang-de">NSG-Prioritäten</span>

```
NSG-Regeln werden nach Priorität verarbeitet:

Priority 100: Allow HTTPS (Inbound)       ← Zuerst geprüft
Priority 110: Allow SSH (Inbound)         ← Zweitens
Priority 120: Allow DNS (Outbound)        ← Drittens
Priority 4090: Deny All (Inbound, implicit) ← Immer am Ende
```

**Regeln:**
- Niedrigere Zahlen = höhere Priorität
- Bereich: 100–4100
- Keine doppelten Prioritäten!

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

**Wichtig:** `source_address_prefix = "AzureDatabricks"` ist ein spezieller Azure-Tag — du kannst keinen IP-Range dafür eingeben!

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul E</span><span class="lang-de">Kurzes Quiz — Modul E</span>

1. Was bedeutet eine niedrigere Prioritätszahl in einer NSG-Regel?
   - a) Sie wird später geprüft
   - b) Sie wird zuerst geprüft ← **Richtig**
   - c) Sie hat keine Bedeutung

2. Wie lautet die implizite Standardregel am Ende einer NSG?
   - a) Allow All
   - b) Deny All ← **Richtig**
   - c) Allow DNS

3. Wozu brauchst du Outbound-NSG-Regeln?
   - a) Damit Ressourcen das Internet erreichen können ← **Richtig**
   - b) Damit von außen auf Ressourcen zugegriffen werden kann
   - c) Zum Schutz vor Hackern

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- Erstelle eine NSG mit folgenden Regeln:
  1. HTTPS (443) Inbound von überall
  2. SSH (22) Inbound nur aus einem spezifischen CIDR
  3. DNS (53) Outbound von überall
  4. MySQL (3306) Inbound nur aus einem spezifischen Subnet
- Verbinde die NSG mit einem Subnet
- Erstelle Outputs

---

## <span class="lang-en" style="display:none">Module F: Terraform integration and Capstone</span><span class="lang-de">Modul F: Terraform-Integration und Capstone</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

Du kannst ein komplettes Azure-Netzwerk mit Terraform erstellen, formatieren, validieren und einen ersten Überblick über Databricks-Netzwerke geben.

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

**Aufgabe:** Erstelle eine komplette Hub-and-Spoke-Architektur:

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

**Checkliste:**
- [ ] `terraform init` läuft
- [ ] `terraform validate` sagt "valid"
- [ ] `terraform fmt -check` sagt keine Änderungen nötig
- [ ] `terraform plan` zeigt die erwarteten 20+ Ressourcen
- [ ] Alle Variablen haben `description`
- [ ] Alle Outputs haben `description`
- [ ] NSG-Regeln sind sicher (SSH nicht offen)
- [ ] Peering ist bidirektional

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

→ Mehr dazu im [Databricks 101 Kurs](databricks-101.md)

### 📝 <span class="lang-en" style="display:none">Final Quiz — Kurs-Ende</span><span class="lang-de">Letztes Quiz — Kurs-Ende</span>

1. Nenne drei Vorteile von Hub-and-Spoke.
   **Muster:** Zentrale Services, Isolation, Kostenersparnis

2. Warum braucht VNet Peering zwei Ressourcen?
   **Muster:** Peering funktioniert nicht automatisch in beide Richtungen

3. Was macht `terraform fmt`?
   **Muster:** Formatiert HCL-Dateien für Konsistenz

4. Wie viele IPs reserviert Azure im Subnet?
   **Muster:** 5 IPs (Network, Gateway, 2× DNS, Broadcast)

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

| Fehler | Lösung |
|--------|--------|
| `AuthorizationDenied` | `az login` und richtige Subscription wählen |
| `StorageAccountNameInvalid` | Name: nur Kleinbuchstaben + Zahlen, 3-24 Zeichen |
| `InvalidSubnetId` | GatewaySubnet muss genau so heißen |
| `NSG Rule Duplicate Priority` | Jede Priorität darf nur einmal vorkommen |
| `Peering not working both ways` | Zwei Peering-Ressourcen erstellen! |
| `Subscription not found` | `az account set --subscription "Name"` |
