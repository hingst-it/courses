---
layout: course
title: Terraform 101
description: IaC und Terraform von Grund auf — 8 Stunden, absolute Beginners
permalink: /courses/terraform-101.html
---

# 🟩 Terraform 101 — Infrastruktur als Code für Anfänger

> **Dauer:** 8 Stunden (1 voller Tag)  
> **Niveau:** Absolute Beginners — keine Vorkenntnisse nötig  
> **Sprache:** Deutsch, mit englischen Fachbegriffen

---

## Inhaltsverzeichnis

1. [Modul A: Was ist IaC?](#modul-a-was-ist-iac) (1 h)
2. [Modul B: Erste Schritte mit Terraform](#modul-b-erste-schritte-mit-terraform) (2 h)
3. [Modul C: Die Terraform-Sprache HCL](#modul-c-die-terraform-sprache-hcl) (2 h)
4. [Modul D: State — Terraforms Gedächtnis](#modul-d-state--terraformsd-gedächtnis) (1 h)
5. [Modul E: Module und Wiederverwendbarkeit](#modul-e-module-und-wiederverwendbarkeit) (1,5 h)
6. [Modul F: Best Practices und Capstone](#modul-f-best-practices-und-capstone) (0,5 h)

---

## Modul A: Was ist IaC?

### Lernziel

Du kannst erklären, **was** Infrastructure as Code ist, **warum** es nötig ist, und den Unterschied zwischen manueller und automatisierter Infrastruktur-erstellung benennen.

### 1.1 Das Problem: Manuelles Klicken

Stell dir vor, du müsstest ein neues Büro einrichten:

```
Manuell (ohne IaC):
1. Server kaufen und bestellen
2. Ins Rechenzentrum fahren
3. Server an den Strom hängen
4. Kabel stecken
5. Betriebssystem installieren
6. Software installieren
7. Konfigurieren
8. Testen — funktioniert es?
9. Wenn nicht: von vorn
```

**Probleme:**
- 🐌 **Langsam** — jeder Schritt dauert
- ❌ **Fehleranfällig** — jemand vergisst einen Schritt
- 📝 **Nicht dokumentiert** — wer weiß genau, was gemacht wurde?
- 🔄 **Nicht wiederholbar** — das zweite Büro sieht anders aus als das erste

### 1.2 Die Lösung: Infrastructure as Code

```
Mit IaC:
1. Code schreiben (Blaupause)
2. Code ausführen
3. Infrastruktur entsteht automatisch
4. Code versionieren → immer reproduzierbar
```

**Vorteile:**
- ✅ **Schnell** — Minuten statt Stunden
- ✅ **Konsistent** — jedes Mal genau dasselbe Ergebnis
- ✅ **Dokumentiert** — der Code IST die Dokumentation
- ✅ **Versioniert** — jeder Stand nachvollziehbar (Git)
- ✅ **Kollaborativ** — mehrere Personen können am Code arbeiten

### 1.3 Terraform — Das Tool

Terraform (von HashiCorp) ist das beliebteste IaC-Tool der Welt.

```
Was Terraform macht:
┌──────────────────────────────────────────┐
│  Du schreibst:                            │
│  "Ich will eine Azure Resource Group"     │
│                                           │
│  Terraform fragt Azure:                   │
│  "Bitte erstelle diese Resource Group"    │
│                                           │
│  Terraform merkt sich:                    │
│  "Die Resource Group wurde erstellt"      │
│                                           │
│  Du änderst den Code:                     │
│  "Füge noch ein Tag hinzu"                │
│                                           │
│  Terraform fragt Azure:                   │
│  "Bitte ändere nur das Tag"               │
│                                           │
│  Terraform merkt sich:                    │
│  "Aktueller Stand: Resource Group mit Tag"│
└──────────────────────────────────────────┘
```

### 1.4 Die drei wichtigsten Terraform-Befehle

```bash
terraform init       # Vorbereitung — Plugins herunterladen
terraform plan       # Vorschau — was würde Terraform tun?
terraform apply      # Umsetzung — ändert die Infrastruktur
```

**Analogie:**
- `init` = Werkzeugkoffer ausräumen (Provider laden)
- `plan` = Bauplan prüfen, bevor du schraubst
- `apply` = Bauen

### 🧪 Kurzes Quiz — Modul A

1. Was bedeutet IaC?
   - a) Internet of Cloud
   - b) Infrastructure as Code ← **Richtig**
   - c) Internal Access Control

2. Welcher Befehl zeigt Vorschau ohne zu ändern?
   - a) `terraform apply`
   - b) `terraform plan` ← **Richtig**
   - c) `terraform init`

3. Warum ist IaC besser als manuelles Klicken?
   - Nenne zwei Gründe.
   - **Musterantwort:** Wiederholbar + dokumentiert (oder: schnell + konsistent)

### 📝 Hausaufgabe

- Lies das Glossar in der Kurs-README
- Installiere Terraform (falls noch nicht geschehen):
  ```bash
  # macOS
  brew tap hashicorp/tap && brew install hashicorp/tap/terraform
  
  # Linux
  curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
  sudo apt-add-repository apt.releases.hashicorp.com
  sudo apt-get update && sudo apt-get install terraform
  
  # Windows
  # winget install HashiCorp.Terraform
  ```
- Prüfe die Installation:
  ```bash
  terraform --version
  ```

---

## Modul B: Erste Schritte mit Terraform

### Lernziel

Du kannst ein erstes Terraform-Projekt erstellen, eine Resource Group in Azure definieren und den ersten `plan` ausführen.

### 2.1 Projektstruktur

```
mein-terraform-projekt/
├── main.tf         # Hier kommt der Code rein
├── variables.tf    # Eingabewerte
├── outputs.tf      # Ausgabewerte
└── versions.tf     # Versionsbeschränkungen
```

### 2.2 Provider konfigurieren

Ein **Provider** ist das Plugin, das mit einer Cloud spricht.

```hcl
# versions.tf
terraform {
  required_version = ">= 1.6"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}
```

**Erklärung:**
- `required_version` → Welches Terraform ist nötig? (ab 1.6)
- `azurerm` → Der Azure Provider (hashicorp/azurerm)
- `~> 4.0` → Major 4.x, aber nicht 5.x (sicher vor Breaking Changes)

### 2.3 Authentifizierung

Es gibt mehrere Wege, sich bei Azure anzumelden. Für den Anfang reicht:

```bash
# Lokal: Interactive Login
az login

# Oder im Browser:
az login --use-device-code
```

### 2.4 Erstes Ressource-Beispiel

```hcl
# main.tf
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "rg-terraform-101"
  location = "Germany West Central"

  tags = {
    Environment = "Learning"
    Project     = "Terraform101"
  }
}
```

**Struktur einer Resource:**

```hcl
resource "AZURE-TYP" "INTERNER_NAME" {
  attribute = "wert"
}
```

| Teil | Beispiel | Bedeutung |
|------|----------|-----------|
| `resource` | Schlüsselwort | "Ich definiere eine Cloud-Ressource" |
| `"azurerm_resource_group"` | Resource-Typ | Was soll erstellt werden? |
| `"example"` | Interner Name | Wie nenne ich es in Terraform? |
| `name = "..."` | Azure-Name | Wie heißt es in Azure? |
| `location = "..."` | Region | Wo in der Welt? |
| `tags = {}` | Metadaten | Organisation / Zuordnung |

### 2.5 Variablen — Code parametrisieren

Statt harte Werte im Code zu verwenden, nutzen wir Variablen:

```hcl
# variables.tf
variable "resource_group_name" {
  description = "Name der Resource Group"
  type        = string
  default     = "rg-terraform-101"
}

variable "location" {
  description = "Azure Region"
  type        = string
  default     = "Germany West Central"

  validation {
    condition     = contains(["Germany West Central", "East US", "North Europe"], var.location)
    error_message = "Wähle eine gültige Region."
  }
}
```

```hcl
# main.tf — angepasst
resource "azurerm_resource_group" "example" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    Environment = "Learning"
    Project     = "Terraform101"
  }
}
```

**Warum Variablen?**
- 🔁 **Wiederverwendbar** — Andere Regionen ohne Code-Änderung
- 📝 **Dokumentiert** — `description` sagt, was die Variable macht
- ✅ **Gep validiert** — `validation` blockiert falsche Werte

### 2.6 Outputs — Ergebnisse anzeigen

```hcl
# outputs.tf
output "resource_group_id" {
  description = "Die Azure-ID der Resource Group"
  value       = azurerm_resource_group.example.id
}

output "resource_group_name" {
  description = "Der Name der Resource Group"
  value       = azurerm_resource_group.example.name
}
```

### 2.7 Erster Durchlauf — Schritt für Schritt

```bash
# Schritt 1: Projektverzeichnis erstellen
mkdir mein-terraform-projekt
cd mein-terraform-projekt

# Schritt 2: Dateien anlegen (s.o.)

# Schritt 3: Initialisieren
terraform init
# Download von azurerm Provider...
# Terraform hat sich vorbereitet!

# Schritt 4: Plan ansehen
terraform plan
# ...
# Plan: 1 to add, 0 to change, 0 to destroy.

# Schritt 5: Umsetzung
terraform apply
# ...
# Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

# Schritt 6: Ausgabe lesen
# resource_group_id = "/subscriptions/.../resourceGroups/..."
# resource_group_name = "rg-terraform-101"
```

### 2.8 Aufräumen

```bash
terraform destroy
# Löscht alle Ressourcen, die Terraform erstellt hat
```

### 🧪 Kurzes Quiz — Modul B

1. Was macht `terraform init`?
   - a) Löscht alle Ressourcen
   - b) Lädt Provider und initiiert das Projekt ← **Richtig**
   - c) Erstellt eine Azure Resource Group

2. Was bedeutet `~> 4.0`?
   - a) Genau Version 4.0
   - b) Alle Versionen ab 4.0
   - c) 4.x.x, aber nicht 5.x ← **Richtig**

3. Was ist der Unterschied zwischen `name` und `example` in `resource "azurerm_resource_group" "example"`?
   - `name` ist der Name in Azure, `example` ist der interne Terraform-Name

### 🧪 Praktische Übung — Modul B

**Aufgabe:** Erstelle eine Terraform-Konfiguration, die:
1. Eine Resource Group in einer beliebigen Region erstellt
2. Diese Region als Variable definieren kann
3. Einen Output für den Resource Group-Namen ausgibt
4. Eine Validation hat, die nur bestimmte Regionen erlaubt

**Lösungsvorlage:**
```hcl
# variables.tf
variable "location" {
  description = "Azure Region für die Resource Group"
  type        = string
  default     = "Germany West Central"

  validation {
    condition     = contains(["Germany West Central", "East US", "North Europe", "West Europe"], var.location)
    error_message = "Region muss eine der erlaubten sein."
  }
}

# main.tf
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "rg-${var.location}"
  location = var.location

  tags = {
    CreatedBy = "Terraform101"
  }
}

# outputs.tf
output "rg_name" {
  description = "Name der Resource Group"
  value       = azurerm_resource_group.main.name
}
```

---

## Modul C: Die Terraform-Sprache HCL

### Lernziel

Du kannst HCL-Dateien lesen und schreiben, Variablen, Locals und Outputs korrekt einsetzen, und den Unterschied zwischen `count` und `for_each` verstehen.

### 3.1 HCL — HashiCorp Configuration Language

HCL sieht aus wie JSON, ist aber menschenlesbarer:

```hcl
# HCL — lesbar
resource "azurerm_resource_group" "example" {
  name     = "my-rg"
  location = "Germany West Central"
  tags = {
    Environment = "dev"
  }
}

# equivalent in JSON — schwerer zu lesen
{
  "resource": {
    "azurerm_resource_group": {
      "example": {
        "name": "my-rg",
        "location": "Germany West Central",
        "tags": {
          "Environment": "dev"
        }
      }
    }
  }
}
```

**HCL-Grundregeln:**
- `{` und `}` für Objekte und Blöcke
- `=` für Zuweisungen
- `""` für Strings
- `{}` für maps
- `[]` für lists

### 3.2 Lokale Werte — Locals

Locals sind Hilfsvariablen **innerhalb** von Terraform. Sie sind nicht von außen einstellbar.

```hcl
locals {
  # Gemeinsame Tags für alle Ressourcen
  common_tags = {
    Environment = "Learning"
    ManagedBy   = "Terraform"
    CostCenter  = "Engineering"
  }

  # Zusammengesetzter Name
  rg_name = "rg-${var.environment}"
}

resource "azurerm_resource_group" "main" {
  name     = local.rg_name
  location = var.location
  tags     = local.common_tags
}
```

**Warum Locals?**
- 🔧 **Zusammengesetzte Werte** — Namen zusammenbauen
- 🏷️ **Zentrale Tags** — Alle Ressourcen bekommen dieselben Tags
- 📋 **Lesbarkeit** — Komplexe Logik aus den Resources entfernen

### 3.3 Count vs For_Each — Ressourcen wiederholen

Zwei Wege, mehrere ähnliche Ressourcen zu erstellen:

#### count — Einfach und numerisch

```hcl
resource "azurerm_public_ip" "example" {
  count = 3

  name                = "pip-${count.index}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  allocation_method   = "Static"
}
```

**Ergebnis:** 3 Public IPs → `pip-0`, `pip-1`, `pip-2`

**Achtung:** Wenn du das mittlere Element entfernst, werden alle folgenden neu erstellt!

#### for_each — Stabil und benannt

```hcl
resource "azurerm_public_ip" "example" {
  for_each = toset(["web", "api", "worker"])

  name                = "pip-${each.key}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  allocation_method   = "Static"
}
```

**Ergebnis:** 3 Public IPs → `pip-web`, `pip-api`, `pip-worker`

**Vorteil:** Wenn du `api` entfernst, bleiben `web` und `worker` unverändert!

#### Quick Decision Guide

| Situation | Verwende | Warum |
|-----------|----------|-------|
| Ein/Aus Schalter | `count = var.enabled ? 1 : 0` | Einfache Bedingung |
| Feste Anzahl | `count = 3` | Einfach |
| Items werden hinzugefügt/entfernt | `for_each` | Stabile Adressen |
| Nach Namen zugreifen | `for_each` | `aws_public_ip["web"]` |

### 3.4 Datenquellen — Bestehende Ressourcen lesen

Manchmal willst du nicht erstellen, sondern **lesen**:

```hcl
data "azurerm_resource_group" "existing" {
  name = "rg-existing-project"
}

output "existing_rg_location" {
  value = data.azurerm_resource_group.existing.location
}
```

### 3.5 Komplettes Beispiel — Zwei Subnetze

```hcl
# main.tf
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "rg-network-101"
  location = var.location

  tags = {
    Project = "Terraform101"
  }
}

resource "azurerm_virtual_network" "main" {
  name                = "vnet-learning"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "example" {
  for_each = toset(["frontend", "backend"])

  name                 = "snet-${each.key}"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.${each.key == "frontend" ? 1 : 2}.0/24"]
}

# outputs.tf
output "vnet_id" {
  description = "ID des Virtual Networks"
  value       = azurerm_virtual_network.main.id
}

output "subnet_names" {
  description = "Namen der Subnetze"
  value       = [for s in azurerm_subnet.example : s.name]
}
```

### 🧪 Kurzes Quiz — Modul C

1. Was sind Locals?
   - a) Variablen von außen
   - b) Hilfsvariablen innerhalb von Terraform ← **Richtig**
   - c) Azure-Ressourcen

2. Wann solltest du `for_each` statt `count` verwenden?
   - a) Immer
   - b) Wenn Items hinzugefügt/entfernt werden könnten ← **Richtig**
   - c) Nie

3. Was macht eine `data`-Quelle?
   - a) Erstellt neue Ressourcen
   - b) Liest bestehende Ressourcen ← **Richtig**
   - c) Löscht Ressourcen

### 🧪 Praktische Übung — Modul C

**Aufgabe:** Erstelle eine Konfiguration mit:
1. Einer Resource Group
2. Einem Virtual Network mit Address Space `10.0.0.0/16`
3. Zwei Subnetzen (`dev` und `prod`) via `for_each`
4. Locals für gemeinsame Tags
5. Zwei Outputs: VNet-ID und Liste der Subnetz-Namen

---

## Modul D: State — Terraforms Gedächtnis

### Lernziel

Du kannst das State-Konzept erklären, den Unterschied zwischen lokalem und Remote State benennen, und verstehen, warum Remote State in Teams unverzichtbar ist.

### 4.1 Was ist State?

```
Terraform muss sich merken:
┌──────────────────────────────────────────┐
│                                          │
│  Code sagt:                              │
│  "Erstelle eine Resource Group"          │
│                                          │
│  State sagt:                             │
│  "Resource Group 'rg-main' existiert     │
│   mit ID /subscriptions/.../resourceGroups/rg-main" │
│                                          │
│  nächster Plan:                          │
│  "Hat sich geändert? Nein → nichts tun"  │
│                                          │
│  nächster Plan (ändere Tag):             │
│  "Hat sich geändert? Ja → füge Tag hinzu"│
│                                          │
└──────────────────────────────────────────┘
```

**Ohne State** würde Terraform bei jedem `apply` alle Ressourcen neu erstellen!

### 4.2 Lokaler State — Das Problem

Standardmäßig speichert Terraform State lokal:

```
terraform.tfstate
```

**Probleme:**
- 📱 **Nur auf einem Rechner** — Teamkollegen sehen nichts
- 💥 **Beim Festplatten-Defekt weg** — Keine Wiederherstellung
- 🔒 **Keine Sperrung** — Zwei Personen können gleichzeitig ändern
- 📜 **Kein Versionsverlauf** — Wer hat was geändert?

### 4.3 Remote State — Die Lösung (Azure)

```hcl
# backend.tf (oder in main.tf)
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "stterraformstate001"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
    use_oidc             = true
  }
}
```

**Vorteile von Remote State:**
- 👥 **Team-Zugriff** — Jeder kann arbeiten
- 🔒 **State Locking** — Azure Blob Lease verhindert Kollisionen
- 📜 **Versioning** — Jeder Stand nachvollziehbar
- 🔐 **Verschlüsselt** — State wird verschlüsselt gespeichert
- ☁️ **Überlebt Hardware-Crash**

### 4.4 Sensible Daten im State

```hcl
# Variablen als sensitive markieren
variable "database_password" {
  description = "Passwort der Datenbank"
  type        = string
  sensitive   = true  # ← Wichtig!
}

# Outputs als sensitive markieren
output "connection_string" {
  value       = azurerm_sql_server.main.connection_string
  sensitive   = true
}
```

**Achtung:** `sensitive = true` schützt nur die Ausgabe von `terraform plan`. Der Wert ist trotzdem im State-File gespeichert!

### 4.5 State-Manipulation (Falls nötig)

```bash
# Resource umbenennen (ohne Neu-Erstellung)
terraform state mv azurerm_resource_group.old azurerm_resource_group.new

# Resource aus State entfernen (wenn manuell erstellt)
terraform state rm azurerm_resource_group.orphan

# Bestehende Ressource importieren
terraform import azurerm_resource_group.main /subscriptions/.../resourceGroups/rg-existing
```

### 🧪 Kurzes Quiz — Modul D

1. Warum braucht Terraform State?
   - a) Für schöne Grafiken
   - b) Um zu wissen, welche Ressourcen existieren ← **Richtig**
   - c) Um Variablen zu speichern

2. Was ist das Hauptproblem von lokalem State?
   - a) Er ist zu groß
   - b) Er ist nur auf einem Rechner und geht bei Festplattenschaden verloren ← **Richtig**
   - c) Er ist zu schnell

3. Was macht `sensitive = true`?
   - a) Verschlüsselt den State komplett
   - b) Verbirgt den Wert in der Plan-Ausgabe ← **Richtig**
   - c) Löscht den Wert aus dem State

### 📝 Hausaufgabe

- Erstelle ein Azure Storage Account und Container für Remote State (manuell im Portal)
- Ändere deine Konfiguration von Modul B, um Remote State zu verwenden
- Experimentiere mit `terraform state list` und `terraform state show`

---

## Modul E: Module und Wiederverwendbarkeit

### Lernziel

Du kannst erklären, was Module sind, den Unterschied zwischen Resource Module und Composition verstehen, und ein simples eigenes Modul erstellen.

### 5.1 Was sind Module?

```
Module = Wiederverwendbare Terraform-Bausteine

Ein Modul ist wie eine Funktion in der Programmierung:

  Funktion:  createUser(name, role) → erstellt User
  Modul:     create-vpc(cidr, subnets) → erstellt VPC + Subnetze
```

### 5.2 Module-Struktur

```
modules/
└── vnet/
    ├── main.tf         # Ressourcen
    ├── variables.tf    # Eingaben
    ├── outputs.tf      # Ausgaben
    └── README.md       # Dokumentation
```

### 5.3 Eigenes Modul erstellen

```hcl
# modules/vnet/variables.tf
variable "address_space" {
  description = "IP-Adressraum des VNet"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "subnet_names" {
  description = "Namen der Subnetze"
  type        = list(string)
  default     = ["default"]
}

# modules/vnet/main.tf
resource "azurerm_virtual_network" "this" {
  name                = "vnet-module"
  address_space       = var.address_space
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_subnet" "this" {
  for_each = toset(var.subnet_names)

  name                 = each.key
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = ["10.0.${each.key}.0/24"]
}

# modules/vnet/outputs.tf
output "vnet_id" {
  description = "VNet-ID"
  value       = azurerm_virtual_network.this.id
}
```

### 5.4 Modul verwenden

```hcl
# main.tf (Root-Modul)
module "networking" {
  source = "./modules/vnet"

  location            = "Germany West Central"
  resource_group_name = "rg-module-test"
  address_space       = ["10.0.0.0/16"]
  subnet_names        = ["frontend", "backend", "database"]
}

output "networking_vnet_id" {
  description = "VNet-ID aus dem Modul"
  value       = module.networking.vnet_id
}
```

### 5.5 Drei Modulebenen (vereinfacht)

```
Resource Module:    vnet/, security-group/, subnet/
                    → Kleine, allgemeine Bausteine

Infrastructure:     web-application/, database/
                    → Kombinieren Resource Modules

Composition:        environments/prod/, environments/dev/
                    → Konkrete Umgebung mit konkreten Werten
```

### 5.6 Azure Verified Modules (AVM) — Ausblick

Azure bietet offizielle Module an, die du直接使用 verwenden kannst:

```hcl
module "vnet" {
  source  = "Azure/avm-res-network-virtualnetwork/azurerm"
  version = "0.17.1"

  location            = "Germany West Central"
  resource_group_name = "rg-test"
  address_space       = ["10.0.0.0/16"]
}
```

**AVM vs. selbst geschrieben:**
- **AVM:** Offiziell, gepflegt, aber noch pre-1.0 (kann breaking changes haben)
- **Selbst geschrieben:** Voll Kontrolle, lernt mehr, aber Wartung selbst

### 🧪 Kurzes Quiz — Modul E

1. Was ist ein Terraform-Modul?
   - a) Ein Azure-Dienst
   - b) Ein wiederverwendbarer Terraform-Baustein ← **Richtig**
   - c) Ein Terraform-Provider

2. Wie gibst du das Source-Verweis in einem Modul-Block an?
   - a) `url = "./modules/vnet"`
   - b) `source = "./modules/vnet"` ← **Richtig**
   - c) `path = "./modules/vnet"`

3. Was ist der Unterschied zwischen einem Resource Module und einer Composition?
   - Resource Module ist allgemein und wiederverwendbar, Composition ist konkret und umwelt-spezifisch

### 🧪 Praktische Übung — Modul E

**Aufgabe:** Erstelle ein simples Modul, das:
1. Eine Resource Group erstellt
2. Einen Storage Account in dieser Resource Group erstellt
3. Variable für Name, Location und SKU akzeptiert
4. Storage Account-ID als Output zurückgibt

---

## Modul F: Best Practices und Capstone

### Lernziel

Du kennst die häufigsten Anfängerfehler, kannst `terraform fmt` und `terraform validate` verwenden, und hast ein eigenes Projekt erstellt.

### 6.1 Die 5 wichtigsten Best Practices

```
1. Immer fmt und validate vor dem Commit:
   terraform fmt -recursive
   terraform validate

2. Immer Remote State verwenden (niemals lokal im Team)

3. Variablen mit description versehen
   → Dokumentation durch Code

4. sensitive = true für Passwörter und Secrets

5. version-Pinning verwenden (~> Major)
   → Verhindert unerwartete Breaking Changes
```

### 6.2 Häufige Anfängerfehler

| Fehler | Korrektur |
|--------|-----------|
| State manuell bearbeiten | `terraform state mv/rm` verwenden |
| Credentials im Code | Environment Variables oder Azure Login |
| `-lock=false` aus Gewohnheit | Immer Locking nutzen |
| `count` statt `for_each` | `for_each` für Collections, `count` nur für 0/1 |
| Keine Description bei Variablen | Immer `description` schreiben |

### 6.3 Formatting und Validierung

```bash
# Dateien formatieren
terraform fmt -recursive

# Syntax prüfen
terraform validate
# Success! The configuration is valid.

# Format prüfen (ohne zu ändern)
terraform fmt -check -recursive
```

### 6.4 🏆 Capstone-Projekt

**Aufgabe:** Erstelle eine vollständige Infrastruktur mit Terraform:

```
Anforderungen:
├── Resource Group
├── Virtual Network (10.0.0.0/16)
├── Drei Subnetze (frontend, backend, database)
├── Storage Account
├── Variablen für Name und Region
├── Locals für gemeinsame Tags
├── Outputs für VNet-ID und Storage-Account-ID
└── Formatierung und Validierung
```

**Struktur:**
```
capstone/
├── main.tf
├── variables.tf
├── outputs.tf
└── versions.tf
```

**Checkliste:**
- [ ] `terraform init` läuft ohne Fehler
- [ ] `terraform validate` sagt "valid"
- [ ] `terraform fmt -check` sagt keine Änderungen nötig
- [ ] `terraform plan` zeigt die erwarteten Ressourcen
- [ ] Variablen haben alle `description`
- [ ] Locals werden für Tags verwendet
- [ ] Outputs haben alle `description`

### 6.5 Was kommt als Nächstes?

```
Fertig mit Terraform 101? Weiter zu:

1. Azure 101          → Azure-Netzwerke und Databricks verstehen
2. Terraform CI/CD    → Automatisierung mit GitHub Actions
3. Terraform Module   → Professionelle Modul-Entwicklung
4. Terraform Security → Scanning und Compliance
```

### 📝 Letztes Quiz — Kurs-Ende

1. Nenne die drei wichtigsten Terraform-Befehle.
   **Muster:** `init`, `plan`, `apply`

2. Warum ist Remote State besser als lokaler State?
   **Muster:** Team-Zugriff, Locking, Versioning, Verschlüsselung

3. Wann verwendet man `for_each` statt `count`?
   **Muster:** Wenn Elemente hinzugefügt/entfernt werden können

4. Was bedeutet `sensitive = true`?
   **Muster:** Verbirgt den Wert in der Plan-Ausgabe

---

## Anhang: Command Cheat Sheet

```bash
# Grundbefehle
terraform init          # Initialisieren
terraform validate      # Syntax prüfen
terraform plan          # Vorschau
terraform apply         # Umsetzen
terraform destroy       # Alles löschen
terraform fmt           # Formatieren
terraform state list    # Alle Ressourcen auflisten
terraform state show    # Ressource anzeigen

# Hilfsbefehle
terraform output        # Outputs anzeigen
terraform console       # Interaktiver Konsole
terraform providers     # Installierte Provider
```

## Anhang: Fehlerbehebung

| Fehler | Mögliche Lösung |
|--------|-----------------|
| `Error: required provider "azurerm"` | `terraform init` ausführen |
| `Error: Failed to query provider` | Internetverbindung prüfen |
| `Error: No valid credential` | `az login` ausführen |
| `Error: state lock timeout` | Warten oder `terraform force-unlock` |
| Validation failed | `variables.tf` prüfen — description fehlt? |
| `terraform fmt` ändert viel | `terraform fmt -diff` zeigt Unterschiede |
