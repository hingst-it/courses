---
layout: course
title: Terraform 101
description: IaC und Terraform von Grund auf
permalink: /courses/terraform-101.html
---

# 🟩 Terraform 101 — <span class="lang-en" style="display:none">Infrastructure as Code for Beginners</span><span class="lang-de">Infrastruktur als Code für Anfänger</span>


> <span class="lang-en" style="display:none">**Level:** Absolute beginners — no prior knowledge needed</span><span class="lang-de">**Niveau:** Absolute Beginners — keine Vorkenntnisse nötig</span>  
> <span class="lang-en" style="display:none">**Language:** English, with common technical terms</span><span class="lang-de">**Sprache:** Deutsch, mit englischen Fachbegriffen</span>

---

## <span class="lang-en" style="display:none">Table of contents</span><span class="lang-de">Inhaltsverzeichnis</span>

1. <a href="#module-a-what-is-iacmodul-a-was-ist-iac"><span class="lang-en" style="display:none">Module A: What is IaC?</span><span class="lang-de">Modul A: Was ist IaC?</span></a>
2. <a href="#module-b-getting-started-with-terraformmodul-b-erste-schritte-mit-terraform"><span class="lang-en" style="display:none">Module B: Getting started with Terraform</span><span class="lang-de">Modul B: Erste Schritte mit Terraform</span></a>
3. <a href="#module-c-the-terraform-language-hclmodul-c-die-terraform-sprache-hcl"><span class="lang-en" style="display:none">Module C: The Terraform language HCL</span><span class="lang-de">Modul C: Die Terraform-Sprache HCL</span></a>
4. <a href="#module-d-state--terraforms-memorymodul-d-state--terraforms-gedächtnis"><span class="lang-en" style="display:none">Module D: State — Terraform's memory</span><span class="lang-de">Modul D: State — Terraforms Gedächtnis</span></a>
5. <a href="#module-e-modules-and-reusabilitymodul-e-module-und-wiederverwendbarkeit"><span class="lang-en" style="display:none">Module E: Modules and reusability</span><span class="lang-de">Modul E: Module und Wiederverwendbarkeit</span></a>
6. <a href="#module-f-best-practices-and-capstonemodul-f-best-practices-und-capstone"><span class="lang-en" style="display:none">Module F: Best practices and Capstone</span><span class="lang-de">Modul F: Best Practices und Capstone</span></a>

---

## <span class="lang-en" style="display:none">Module A: What is IaC?</span><span class="lang-de">Modul A: Was ist IaC?</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain **what** Infrastructure as Code is, **why** it is needed, and name the difference between manual and automated infrastructure creation.</span><span class="lang-de">Du kannst erklären, **was** Infrastructure as Code ist, **warum** es nötig ist, und den Unterschied zwischen manueller und automatisierter Infrastruktur-erstellung benennen.</span>

### 1.1 <span class="lang-en" style="display:none">The problem: manual clicking</span><span class="lang-de">Das Problem: Manuelles Klicken</span>

<span class="lang-en" style="display:none">Imagine you had to set up a new office:</span><span class="lang-de">Stell dir vor, du müsstest ein neues Büro einrichten:</span>

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

<span class="lang-en" style="display:none">**Problems:**</span><span class="lang-de">**Probleme:**</span>
- 🐌 <span class="lang-en" style="display:none">**Slow** — every step takes time</span><span class="lang-de">**Langsam** — jeder Schritt dauert</span>
- ❌ <span class="lang-en" style="display:none">**Error-prone** — someone forgets a step</span><span class="lang-de">**Fehleranfällig** — jemand vergisst einen Schritt</span>
- 📝 <span class="lang-en" style="display:none">**Not documented** — who knows exactly what was done?</span><span class="lang-de">**Nicht dokumentiert** — wer weiß genau, was gemacht wurde?</span>
- 🔄 <span class="lang-en" style="display:none">**Not repeatable** — the second office looks different from the first</span><span class="lang-de">**Nicht wiederholbar** — das zweite Büro sieht anders aus als das erste</span>

### 1.2 <span class="lang-en" style="display:none">The solution: Infrastructure as Code</span><span class="lang-de">Die Lösung: Infrastructure as Code</span>

```
Mit IaC:
1. Code schreiben (Blaupause)
2. Code ausführen
3. Infrastruktur entsteht automatisch
4. Code versionieren → immer reproduzierbar
```

<span class="lang-en" style="display:none">**Benefits:**</span><span class="lang-de">**Vorteile:**</span>
- ✅ <span class="lang-en" style="display:none">**Fast** — minutes instead of hours</span><span class="lang-de">**Schnell** — Minuten statt Stunden</span>
- ✅ <span class="lang-en" style="display:none">**Consistent** — exactly the same result every time</span><span class="lang-de">**Konsistent** — jedes Mal genau dasselbe Ergebnis</span>
- ✅ <span class="lang-en" style="display:none">**Documented** — the code IS the documentation</span><span class="lang-de">**Dokumentiert** — der Code IST die Dokumentation</span>
- ✅ <span class="lang-en" style="display:none">**Versioned** — every state is traceable (Git)</span><span class="lang-de">**Versioniert** — jeder Stand nachvollziehbar (Git)</span>
- ✅ <span class="lang-en" style="display:none">**Collaborative** — multiple people can work on the code</span><span class="lang-de">**Kollaborativ** — mehrere Personen können am Code arbeiten</span>

### 1.3 <span class="lang-en" style="display:none">Terraform — the tool</span><span class="lang-de">Terraform — Das Tool</span>

<span class="lang-en" style="display:none">Terraform (by HashiCorp) is the most popular IaC tool in the world.</span><span class="lang-de">Terraform (von HashiCorp) ist das beliebteste IaC-Tool der Welt.</span>

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

### 1.4 <span class="lang-en" style="display:none">The three most important Terraform commands</span><span class="lang-de">Die drei wichtigsten Terraform-Befehle</span>

```bash
terraform init       # Vorbereitung — Plugins herunterladen
terraform plan       # Vorschau — was würde Terraform tun?
terraform apply      # Umsetzung — ändert die Infrastruktur
```

<span class="lang-en" style="display:none">**Analogy:**</span><span class="lang-de">**Analogie:**</span>
- `init` = <span class="lang-en" style="display:none">unpack the toolbox (load providers)</span><span class="lang-de">Werkzeugkoffer ausräumen (Provider laden)</span>
- `plan` = <span class="lang-en" style="display:none">check the blueprint before you build</span><span class="lang-de">Bauplan prüfen, bevor du schraubst</span>
- `apply` = <span class="lang-en" style="display:none">build</span><span class="lang-de">Bauen</span>

### 🧪 <span class="lang-en" style="display:none">Interactive Terraform Lab</span><span class="lang-de">Interaktives Terraform-Lab</span>

{% include terraform-terminal.html %}

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul A</span><span class="lang-de">Kurzes Quiz — Modul A</span>

1. <span class="lang-en" style="display:none">What does IaC mean?</span><span class="lang-de">Was bedeutet IaC?</span>
   - a) Internet of Cloud
   - b) Infrastructure as Code ← **Richtig**
   - c) Internal Access Control

2. <span class="lang-en" style="display:none">Which command shows a preview without changing anything?</span><span class="lang-de">Welcher Befehl zeigt Vorschau ohne zu ändern?</span>
   - a) `terraform apply`
   - b) `terraform plan` ← **Richtig**
   - c) `terraform init`

3. <span class="lang-en" style="display:none">Why is IaC better than manual clicking?</span><span class="lang-de">Warum ist IaC besser als manuelles Klicken?</span>
   - <span class="lang-en" style="display:none">Name two reasons.</span><span class="lang-de">Nenne zwei Gründe.</span>
   - <span class="lang-en" style="display:none">**Sample answer:** repeatable + documented (or: fast + consistent)</span><span class="lang-de">**Musterantwort:** Wiederholbar + dokumentiert (oder: schnell + konsistent)</span>

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- <span class="lang-en" style="display:none">Read the glossary in the course README</span><span class="lang-de">Lies das Glossar in der Kurs-README</span>
- <span class="lang-en" style="display:none">Install Terraform (if you have not already):</span><span class="lang-de">Installiere Terraform (falls noch nicht geschehen):</span>
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
- <span class="lang-en" style="display:none">Check the installation:</span><span class="lang-de">Prüfe die Installation:</span>
  ```bash
  terraform --version
  ```

---

## <span class="lang-en" style="display:none">Module B: Getting started with Terraform</span><span class="lang-de">Modul B: Erste Schritte mit Terraform</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can create a first Terraform project, define a resource group in Azure, and run your first `plan`.</span><span class="lang-de">Du kannst ein erstes Terraform-Projekt erstellen, eine Resource Group in Azure definieren und den ersten `plan` ausführen.</span>

### 2.1 <span class="lang-en" style="display:none">Project structure</span><span class="lang-de">Projektstruktur</span>

```
mein-terraform-projekt/
├── main.tf         # Hier kommt der Code rein
├── variables.tf    # Eingabewerte
├── outputs.tf      # Ausgabewerte
└── versions.tf     # Versionsbeschränkungen
```

### 2.2 <span class="lang-en" style="display:none">Provider configuration</span><span class="lang-de">Provider konfigurieren</span>

<span class="lang-en" style="display:none">A **provider** is the plugin that talks to a cloud.</span><span class="lang-de">Ein **Provider** ist das Plugin, das mit einer Cloud spricht.</span>

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

<span class="lang-en" style="display:none">**Explanation:**</span><span class="lang-de">**Erklärung:**</span>
- `required_version` → <span class="lang-en" style="display:none">Which Terraform version is required? (1.6 and newer)</span><span class="lang-de">Welches Terraform ist nötig? (ab 1.6)</span>
- `azurerm` → <span class="lang-en" style="display:none">The Azure provider (hashicorp/azurerm)</span><span class="lang-de">Der Azure Provider (hashicorp/azurerm)</span>
- `~> 4.0` → <span class="lang-en" style="display:none">Major version 4.x, but not 5.x (safe from breaking changes)</span><span class="lang-de">Major 4.x, aber nicht 5.x (sicher vor Breaking Changes)</span>

### 2.3 <span class="lang-en" style="display:none">Authentication</span><span class="lang-de">Authentifizierung</span>

<span class="lang-en" style="display:none">There are several ways to sign in to Azure. For the beginning, this is enough:</span><span class="lang-de">Es gibt mehrere Wege, sich bei Azure anzumelden. Für den Anfang reicht:</span>

```bash
# Lokal: Interactive Login
az login

# Oder im Browser:
az login --use-device-code
```

### 2.4 <span class="lang-en" style="display:none">First resource example</span><span class="lang-de">Erstes Ressource-Beispiel</span>

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

<span class="lang-en" style="display:none">**Structure of a resource:**</span><span class="lang-de">**Struktur einer Resource:**</span>

```hcl
resource "AZURE-TYP" "INTERNER_NAME" {
  attribute = "wert"
}
```

| <span class="lang-en" style="display:none">Part</span><span class="lang-de">Teil</span> | <span class="lang-en" style="display:none">Example</span><span class="lang-de">Beispiel</span> | <span class="lang-en" style="display:none">Meaning</span><span class="lang-de">Bedeutung</span> |
|------|----------|-----------|
| `resource` | <span class="lang-en" style="display:none">keyword</span><span class="lang-de">Schlüsselwort</span> | <span class="lang-en" style="display:none">"I define a cloud resource"</span><span class="lang-de">"Ich definiere eine Cloud-Ressource"</span> |
| `"azurerm_resource_group"` | Resource-Typ | <span class="lang-en" style="display:none">What should be created?</span><span class="lang-de">Was soll erstellt werden?</span> |
| `"example"` | Interner Name | Wie nenne ich es in Terraform? |
| `name = "..."` | Azure-Name | <span class="lang-en" style="display:none">What is it called in Azure?</span><span class="lang-de">Wie heißt es in Azure?</span> |
| `location = "..."` | Region | Wo in der Welt? |
| `tags = {}` | Metadaten | Organisation / Zuordnung |

### 2.5 <span class="lang-en" style="display:none">Variables — parameterize code</span><span class="lang-de">Variablen — Code parametrisieren</span>

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

<span class="lang-en" style="display:none">**Why variables?**</span><span class="lang-de">**Warum Variablen?**</span>
- 🔁 <span class="lang-en" style="display:none">**Reusable** — other regions without changing code</span><span class="lang-de">**Wiederverwendbar** — Andere Regionen ohne Code-Änderung</span>
- 📝 <span class="lang-en" style="display:none">**Documented** — `description` says what the variable does</span><span class="lang-de">**Dokumentiert** — `description` sagt, was die Variable macht</span>
- ✅ <span class="lang-en" style="display:none">**Validated** — `validation` blocks invalid values</span><span class="lang-de">**Validiert** — `validation` blockiert falsche Werte</span>

### 2.6 <span class="lang-en" style="display:none">Outputs — display results</span><span class="lang-de">Outputs — Ergebnisse anzeigen</span>

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

### 2.7 <span class="lang-en" style="display:none">First run — step by step</span><span class="lang-de">Erster Durchlauf — Schritt für Schritt</span>

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

### 2.8 <span class="lang-en" style="display:none">Cleanup</span><span class="lang-de">Aufräumen</span>

```bash
terraform destroy
# Löscht alle Ressourcen, die Terraform erstellt hat
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul B</span><span class="lang-de">Kurzes Quiz — Modul B</span>

1. <span class="lang-en" style="display:none">What does `terraform init` do?</span><span class="lang-de">Was macht `terraform init`?</span>
   - <span class="lang-en" style="display:none">a) Deletes all resources</span><span class="lang-de">a) Löscht alle Ressourcen</span>
   - <span class="lang-en" style="display:none">b) Downloads providers and initializes the project ← **Correct**</span><span class="lang-de">b) Lädt Provider und initiiert das Projekt ← **Richtig**</span>
   - c) Erstellt eine Azure Resource Group

2. <span class="lang-en" style="display:none">What does `~> 4.0` mean?</span><span class="lang-de">Was bedeutet `~> 4.0`?</span>
   - a) Genau Version 4.0
   - <span class="lang-en" style="display:none">b) All versions from 4.0 onward</span><span class="lang-de">b) Alle Versionen ab 4.0</span>
   - c) 4.x.x, aber nicht 5.x ← **Richtig**

3. <span class="lang-en" style="display:none">What is the difference between `name` and `example` in `resource "azurerm_resource_group" "example"`?</span><span class="lang-de">Was ist der Unterschied zwischen `name` und `example` in `resource "azurerm_resource_group" "example"`?</span>
   - `name` ist der Name in Azure, `example` ist der interne Terraform-Name

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul B</span><span class="lang-de">Praktische Übung — Modul B</span>

<span class="lang-en" style="display:none">**Task:** Create a Terraform configuration that:</span><span class="lang-de">**Aufgabe:** Erstelle eine Terraform-Konfiguration, die:</span>
1. <span class="lang-en" style="display:none">Creates a resource group in any region</span><span class="lang-de">Eine Resource Group in einer beliebigen Region erstellt</span>
2. Diese Region als Variable definieren kann
3. <span class="lang-en" style="display:none">Outputs the resource group name</span><span class="lang-de">Einen Output für den Resource Group-Namen ausgibt</span>
4. <span class="lang-en" style="display:none">Has validation that allows only specific regions</span><span class="lang-de">Eine Validation hat, die nur bestimmte Regionen erlaubt</span>

<span class="lang-en" style="display:none">**Solution template:**</span><span class="lang-de">**Lösungsvorlage:**</span>
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

## <span class="lang-en" style="display:none">Module C: The Terraform language HCL</span><span class="lang-de">Modul C: Die Terraform-Sprache HCL</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can read and write HCL files, use variables, locals, and outputs correctly, and understand the difference between `count` and `for_each`.</span><span class="lang-de">Du kannst HCL-Dateien lesen und schreiben, Variablen, Locals und Outputs korrekt einsetzen, und den Unterschied zwischen `count` und `for_each` verstehen.</span>

### 3.1 <span class="lang-en" style="display:none">HCL — HashiCorp Configuration Language</span><span class="lang-de">HCL — HashiCorp Configuration Language</span>

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
- `{` <span class="lang-en" style="display:none">and</span><span class="lang-de">und</span> `}` <span class="lang-en" style="display:none">for objects and blocks</span><span class="lang-de">für Objekte und Blöcke</span>
- `=` <span class="lang-en" style="display:none">for assignments</span><span class="lang-de">für Zuweisungen</span>
- `""` <span class="lang-en" style="display:none">for strings</span><span class="lang-de">für Strings</span>
- `{}` <span class="lang-en" style="display:none">for maps</span><span class="lang-de">für maps</span>
- `[]` <span class="lang-en" style="display:none">for lists</span><span class="lang-de">für lists</span>

### 3.2 <span class="lang-en" style="display:none">Local values — Locals</span><span class="lang-de">Lokale Werte — Locals</span>

<span class="lang-en" style="display:none">Locals are helper variables **inside** Terraform. They cannot be set from outside.</span><span class="lang-de">Locals sind Hilfsvariablen **innerhalb** von Terraform. Sie sind nicht von außen einstellbar.</span>

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

<span class="lang-en" style="display:none">**Why locals?**</span><span class="lang-de">**Warum Locals?**</span>
- 🔧 <span class="lang-en" style="display:none">**Composed values** — build names from parts</span><span class="lang-de">**Zusammengesetzte Werte** — Namen zusammenbauen</span>
- 🏷️ <span class="lang-en" style="display:none">**Central tags** — all resources get the same tags</span><span class="lang-de">**Zentrale Tags** — Alle Ressourcen bekommen dieselben Tags</span>
- 📋 <span class="lang-en" style="display:none">**Readability** — move complex logic out of resources</span><span class="lang-de">**Lesbarkeit** — Komplexe Logik aus den Resources entfernen</span>

### 3.3 <span class="lang-en" style="display:none">Count vs For_Each — repeat resources</span><span class="lang-de">Count vs For_Each — Ressourcen wiederholen</span>

<span class="lang-en" style="display:none">Two ways to create several similar resources:</span><span class="lang-de">Zwei Wege, mehrere ähnliche Ressourcen zu erstellen:</span>

#### count — <span class="lang-en" style="display:none">simple and numeric</span><span class="lang-de">Einfach und numerisch</span>

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

<span class="lang-en" style="display:none">**Careful:** If you remove the middle element, all following elements are recreated!</span><span class="lang-de">**Achtung:** Wenn du das mittlere Element entfernst, werden alle folgenden neu erstellt!</span>

#### for_each — <span class="lang-en" style="display:none">stable and named</span><span class="lang-de">Stabil und benannt</span>

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

<span class="lang-en" style="display:none">**Benefit:** If you remove `api`, `web` and `worker` stay unchanged!</span><span class="lang-de">**Vorteil:** Wenn du `api` entfernst, bleiben `web` und `worker` unverändert!</span>

#### <span class="lang-en" style="display:none">Quick decision guide</span><span class="lang-de">Schnelle Entscheidungshilfe</span>

| <span class="lang-en" style="display:none">Situation</span><span class="lang-de">Situation</span> | <span class="lang-en" style="display:none">Use</span><span class="lang-de">Verwende</span> | <span class="lang-en" style="display:none">Why</span><span class="lang-de">Warum</span> |
|-----------|----------|-------|
| <span class="lang-en" style="display:none">On/off switch</span><span class="lang-de">Ein/Aus Schalter</span> | `count = var.enabled ? 1 : 0` | <span class="lang-en" style="display:none">Simple condition</span><span class="lang-de">Einfache Bedingung</span> |
| Feste Anzahl | `count = 3` | Einfach |
| <span class="lang-en" style="display:none">Items are added/removed</span><span class="lang-de">Items werden hinzugefügt/entfernt</span> | `for_each` | <span class="lang-en" style="display:none">Stable addresses</span><span class="lang-de">Stabile Adressen</span> |
| Nach Namen zugreifen | `for_each` | `aws_public_ip["web"]` |

### 3.4 <span class="lang-en" style="display:none">Data sources — read existing resources</span><span class="lang-de">Datenquellen — Bestehende Ressourcen lesen</span>

Manchmal willst du nicht erstellen, sondern **lesen**:

```hcl
data "azurerm_resource_group" "existing" {
  name = "rg-existing-project"
}

output "existing_rg_location" {
  value = data.azurerm_resource_group.existing.location
}
```

### 3.5 <span class="lang-en" style="display:none">Complete example — two subnets</span><span class="lang-de">Komplettes Beispiel — Zwei Subnetze</span>

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

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul C</span><span class="lang-de">Kurzes Quiz — Modul C</span>

1. <span class="lang-en" style="display:none">What are locals?</span><span class="lang-de">Was sind Locals?</span>
   - <span class="lang-en" style="display:none">a) Variables from outside</span><span class="lang-de">a) Variablen von außen</span>
   - b) Hilfsvariablen innerhalb von Terraform ← **Richtig**
   - <span class="lang-en" style="display:none">c) Azure resources</span><span class="lang-de">c) Azure-Ressourcen</span>

2. Wann solltest du `for_each` statt `count` verwenden?
   - <span class="lang-en" style="display:none">a) Always</span><span class="lang-de">a) Immer</span>
   - <span class="lang-en" style="display:none">b) When items may be added or removed ← **Correct**</span><span class="lang-de">b) Wenn Items hinzugefügt/entfernt werden könnten ← **Richtig**</span>
   - c) Nie

3. <span class="lang-en" style="display:none">What does a `data` source do?</span><span class="lang-de">Was macht eine `data`-Quelle?</span>
   - <span class="lang-en" style="display:none">a) Creates new resources</span><span class="lang-de">a) Erstellt neue Ressourcen</span>
   - <span class="lang-en" style="display:none">b) Reads existing resources ← **Correct**</span><span class="lang-de">b) Liest bestehende Ressourcen ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) Deletes resources</span><span class="lang-de">c) Löscht Ressourcen</span>

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul C</span><span class="lang-de">Praktische Übung — Modul C</span>

<span class="lang-en" style="display:none">**Task:** Create a configuration with:</span><span class="lang-de">**Aufgabe:** Erstelle eine Konfiguration mit:</span>
1. Einer Resource Group
2. Einem Virtual Network mit Address Space `10.0.0.0/16`
3. Zwei Subnetzen (`dev` und `prod`) via `for_each`
4. <span class="lang-en" style="display:none">Locals for shared tags</span><span class="lang-de">Locals für gemeinsame Tags</span>
5. Zwei Outputs: VNet-ID und Liste der Subnetz-Namen

---

## <span class="lang-en" style="display:none">Module D: State — Terraform's memory</span><span class="lang-de">Modul D: State — Terraforms Gedächtnis</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain the state concept, name the difference between local and remote state, and understand why remote state is essential in teams.</span><span class="lang-de">Du kannst das State-Konzept erklären, den Unterschied zwischen lokalem und Remote State benennen, und verstehen, warum Remote State in Teams unverzichtbar ist.</span>

### 4.1 <span class="lang-en" style="display:none">What is State?</span><span class="lang-de">Was ist State?</span>

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

<span class="lang-en" style="display:none">**Without state**, Terraform would recreate all resources on every `apply`!</span><span class="lang-de">**Ohne State** würde Terraform bei jedem `apply` alle Ressourcen neu erstellen!</span>

### 4.2 <span class="lang-en" style="display:none">Local State — the problem</span><span class="lang-de">Lokaler State — Das Problem</span>

<span class="lang-en" style="display:none">By default, Terraform stores state locally:</span><span class="lang-de">Standardmäßig speichert Terraform State lokal:</span>

```
terraform.tfstate
```

**Probleme:**
- 📱 **Nur auf einem Rechner** — Teamkollegen sehen nichts
- 💥 <span class="lang-en" style="display:none">**Gone after disk failure** — no recovery</span><span class="lang-de">**Beim Festplatten-Defekt weg** — Keine Wiederherstellung</span>
- 🔒 <span class="lang-en" style="display:none">**No locking** — two people can change things at the same time</span><span class="lang-de">**Keine Sperrung** — Zwei Personen können gleichzeitig ändern</span>
- 📜 <span class="lang-en" style="display:none">**No version history** — who changed what?</span><span class="lang-de">**Kein Versionsverlauf** — Wer hat was geändert?</span>

### 4.3 <span class="lang-en" style="display:none">Remote State — the solution (Azure)</span><span class="lang-de">Remote State — Die Lösung (Azure)</span>

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
- 🔐 <span class="lang-en" style="display:none">**Encrypted** — state is stored encrypted</span><span class="lang-de">**Verschlüsselt** — State wird verschlüsselt gespeichert</span>
- ☁️ <span class="lang-en" style="display:none">**Survives hardware crashes**</span><span class="lang-de">**Überlebt Hardware-Crash**</span>

### 4.4 <span class="lang-en" style="display:none">Sensitive data in State</span><span class="lang-de">Sensible Daten im State</span>

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

<span class="lang-en" style="display:none">**Careful:** `sensitive = true` only protects the output of `terraform plan`. The value is still stored in the state file!</span><span class="lang-de">**Achtung:** `sensitive = true` schützt nur die Ausgabe von `terraform plan`. Der Wert ist trotzdem im State-File gespeichert!</span>

### 4.5 <span class="lang-en" style="display:none">State manipulation (if needed)</span><span class="lang-de">State-Manipulation (Falls nötig)</span>

```bash
# Resource umbenennen (ohne Neu-Erstellung)
terraform state mv azurerm_resource_group.old azurerm_resource_group.new

# Resource aus State entfernen (wenn manuell erstellt)
terraform state rm azurerm_resource_group.orphan

# Bestehende Ressource importieren
terraform import azurerm_resource_group.main /subscriptions/.../resourceGroups/rg-existing
```

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul D</span><span class="lang-de">Kurzes Quiz — Modul D</span>

1. <span class="lang-en" style="display:none">Why does Terraform need state?</span><span class="lang-de">Warum braucht Terraform State?</span>
   - <span class="lang-en" style="display:none">a) For pretty diagrams</span><span class="lang-de">a) Für schöne Grafiken</span>
   - <span class="lang-en" style="display:none">b) To know which resources exist ← **Correct**</span><span class="lang-de">b) Um zu wissen, welche Ressourcen existieren ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) To store variables</span><span class="lang-de">c) Um Variablen zu speichern</span>

2. <span class="lang-en" style="display:none">What is the main problem with local state?</span><span class="lang-de">Was ist das Hauptproblem von lokalem State?</span>
   - <span class="lang-en" style="display:none">a) It is too large</span><span class="lang-de">a) Er ist zu groß</span>
   - <span class="lang-en" style="display:none">b) It exists only on one machine and is lost after disk failure ← **Correct**</span><span class="lang-de">b) Er ist nur auf einem Rechner und geht bei Festplattenschaden verloren ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) It is too fast</span><span class="lang-de">c) Er ist zu schnell</span>

3. <span class="lang-en" style="display:none">What does `sensitive = true` do?</span><span class="lang-de">Was macht `sensitive = true`?</span>
   - <span class="lang-en" style="display:none">a) Encrypts the whole state</span><span class="lang-de">a) Verschlüsselt den State komplett</span>
   - <span class="lang-en" style="display:none">b) Hides the value in plan output ← **Correct**</span><span class="lang-de">b) Verbirgt den Wert in der Plan-Ausgabe ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) Deletes the value from state</span><span class="lang-de">c) Löscht den Wert aus dem State</span>

### 📝 <span class="lang-en" style="display:none">Homework</span><span class="lang-de">Hausaufgabe</span>

- <span class="lang-en" style="display:none">Create an Azure storage account and container for remote state (manually in the portal)</span><span class="lang-de">Erstelle ein Azure Storage Account und Container für Remote State (manuell im Portal)</span>
- <span class="lang-en" style="display:none">Change your configuration from Module B to use remote state</span><span class="lang-de">Ändere deine Konfiguration von Modul B, um Remote State zu verwenden</span>
- <span class="lang-en" style="display:none">Experiment with `terraform state list` and `terraform state show`</span><span class="lang-de">Experimentiere mit `terraform state list` und `terraform state show`</span>

---

## <span class="lang-en" style="display:none">Module E: Modules and reusability</span><span class="lang-de">Modul E: Module und Wiederverwendbarkeit</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You can explain what modules are, understand the difference between a resource module and a composition, and create a simple module yourself.</span><span class="lang-de">Du kannst erklären, was Module sind, den Unterschied zwischen Resource Module und Composition verstehen, und ein simples eigenes Modul erstellen.</span>

### 5.1 <span class="lang-en" style="display:none">What are Modules?</span><span class="lang-de">Was sind Module?</span>

```
Module = Wiederverwendbare Terraform-Bausteine

Ein Modul ist wie eine Funktion in der Programmierung:

  Funktion:  createUser(name, role) → erstellt User
  Modul:     create-vpc(cidr, subnets) → erstellt VPC + Subnetze
```

### 5.2 <span class="lang-en" style="display:none">Module structure</span><span class="lang-de">Module-Struktur</span>

```
modules/
└── vnet/
    ├── main.tf         # Ressourcen
    ├── variables.tf    # Eingaben
    ├── outputs.tf      # Ausgaben
    └── README.md       # Dokumentation
```

### 5.3 <span class="lang-en" style="display:none">Creating your own module</span><span class="lang-de">Eigenes Modul erstellen</span>

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

### 5.4 <span class="lang-en" style="display:none">Using a module</span><span class="lang-de">Modul verwenden</span>

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

### 5.5 <span class="lang-en" style="display:none">Three module levels (simplified)</span><span class="lang-de">Drei Modulebenen (vereinfacht)</span>

```
Resource Module:    vnet/, security-group/, subnet/
                    → Kleine, allgemeine Bausteine

Infrastructure:     web-application/, database/
                    → Kombinieren Resource Modules

Composition:        environments/prod/, environments/dev/
                    → Konkrete Umgebung mit konkreten Werten
```

### 5.6 <span class="lang-en" style="display:none">Azure Verified Modules (AVM)</span><span class="lang-de">Azure Verified Modules (AVM) — Ausblick</span>

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

### 🧪 <span class="lang-en" style="display:none">Quick Quiz — Modul E</span><span class="lang-de">Kurzes Quiz — Modul E</span>

1. <span class="lang-en" style="display:none">What is a Terraform module?</span><span class="lang-de">Was ist ein Terraform-Modul?</span>
   - <span class="lang-en" style="display:none">a) An Azure service</span><span class="lang-de">a) Ein Azure-Dienst</span>
   - <span class="lang-en" style="display:none">b) A reusable Terraform building block ← **Correct**</span><span class="lang-de">b) Ein wiederverwendbarer Terraform-Baustein ← **Richtig**</span>
   - <span class="lang-en" style="display:none">c) A Terraform provider</span><span class="lang-de">c) Ein Terraform-Provider</span>

2. <span class="lang-en" style="display:none">How do you specify the source reference in a module block?</span><span class="lang-de">Wie gibst du das Source-Verweis in einem Modul-Block an?</span>
   - a) `url = "./modules/vnet"`
   - b) `source = "./modules/vnet"` ← **Richtig**
   - c) `path = "./modules/vnet"`

3. <span class="lang-en" style="display:none">What is the difference between a resource module and a composition?</span><span class="lang-de">Was ist der Unterschied zwischen einem Resource Module und einer Composition?</span>
   - <span class="lang-en" style="display:none">A resource module is generic and reusable; a composition is concrete and environment-specific</span><span class="lang-de">Resource Module ist allgemein und wiederverwendbar, Composition ist konkret und umwelt-spezifisch</span>

### 🧪 <span class="lang-en" style="display:none">Practical exercise — Modul E</span><span class="lang-de">Praktische Übung — Modul E</span>

<span class="lang-en" style="display:none">**Task:** Create a simple module that:</span><span class="lang-de">**Aufgabe:** Erstelle ein simples Modul, das:</span>
1. <span class="lang-en" style="display:none">Creates a resource group</span><span class="lang-de">Eine Resource Group erstellt</span>
2. <span class="lang-en" style="display:none">Creates a storage account in this resource group</span><span class="lang-de">Einen Storage Account in dieser Resource Group erstellt</span>
3. <span class="lang-en" style="display:none">Accepts variables for name, location, and SKU</span><span class="lang-de">Variable für Name, Location und SKU akzeptiert</span>
4. <span class="lang-en" style="display:none">Returns the storage account ID as an output</span><span class="lang-de">Storage Account-ID als Output zurückgibt</span>

---

## <span class="lang-en" style="display:none">Module F: Best practices and Capstone</span><span class="lang-de">Modul F: Best Practices und Capstone</span>

### <span class="lang-en" style="display:none">Learning Objective</span><span class="lang-de">Lernziel</span>

<span class="lang-en" style="display:none">You know the most common beginner mistakes, can use `terraform fmt` and `terraform validate`, and have created your own project.</span><span class="lang-de">Du kennst die häufigsten Anfängerfehler, kannst `terraform fmt` und `terraform validate` verwenden, und hast ein eigenes Projekt erstellt.</span>

### 6.1 <span class="lang-en" style="display:none">The 5 most important best practices</span><span class="lang-de">Die 5 wichtigsten Best Practices</span>

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

### 6.2 <span class="lang-en" style="display:none">Common beginner mistakes</span><span class="lang-de">Häufige Anfängerfehler</span>

| <span class="lang-en" style="display:none">Mistake</span><span class="lang-de">Fehler</span> | <span class="lang-en" style="display:none">Correction</span><span class="lang-de">Korrektur</span> |
|--------|-----------|
| State manuell bearbeiten | `terraform state mv/rm` verwenden |
| Credentials im Code | Environment Variables oder Azure Login |
| <span class="lang-en" style="display:none">Using `-lock=false` out of habit</span><span class="lang-de">`-lock=false` aus Gewohnheit</span> | <span class="lang-en" style="display:none">Always use locking</span><span class="lang-de">Immer Locking nutzen</span> |
| <span class="lang-en" style="display:none">`count` instead of `for_each`</span><span class="lang-de">`count` statt `for_each`</span> | <span class="lang-en" style="display:none">Use `for_each` for collections, `count` only for 0/1</span><span class="lang-de">`for_each` für Collections, `count` nur für 0/1</span> |
| <span class="lang-en" style="display:none">No description on variables</span><span class="lang-de">Keine Description bei Variablen</span> | <span class="lang-en" style="display:none">Always write a `description`</span><span class="lang-de">Immer `description` schreiben</span> |

### 6.3 <span class="lang-en" style="display:none">Formatting and validation</span><span class="lang-de">Formatting und Validierung</span>

```bash
# Dateien formatieren
terraform fmt -recursive

# Syntax prüfen
terraform validate
# Success! The configuration is valid.

# Format prüfen (ohne zu ändern)
terraform fmt -check -recursive
```

### 6.4 🏆 <span class="lang-en" style="display:none">Capstone project</span><span class="lang-de">Capstone-Projekt</span>

<span class="lang-en" style="display:none">**Task:** Create a complete infrastructure with Terraform:</span><span class="lang-de">**Aufgabe:** Erstelle eine vollständige Infrastruktur mit Terraform:</span>

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

<span class="lang-en" style="display:none">**Structure:**</span><span class="lang-de">**Struktur:**</span>
```
capstone/
├── main.tf
├── variables.tf
├── outputs.tf
└── versions.tf
```

<span class="lang-en" style="display:none">**Checklist:**</span><span class="lang-de">**Checkliste:**</span>
- [ ] <span class="lang-en" style="display:none">`terraform init` runs without errors</span><span class="lang-de">`terraform init` läuft ohne Fehler</span>
- [ ] <span class="lang-en" style="display:none">`terraform validate` says "valid"</span><span class="lang-de">`terraform validate` sagt "valid"</span>
- [ ] <span class="lang-en" style="display:none">`terraform fmt -check` says no changes are needed</span><span class="lang-de">`terraform fmt -check` sagt keine Änderungen nötig</span>
- [ ] <span class="lang-en" style="display:none">`terraform plan` shows the expected resources</span><span class="lang-de">`terraform plan` zeigt die erwarteten Ressourcen</span>
- [ ] <span class="lang-en" style="display:none">All variables have a `description`</span><span class="lang-de">Variablen haben alle `description`</span>
- [ ] <span class="lang-en" style="display:none">Locals are used for tags</span><span class="lang-de">Locals werden für Tags verwendet</span>
- [ ] <span class="lang-en" style="display:none">All outputs have a `description`</span><span class="lang-de">Outputs haben alle `description`</span>

### 6.5 <span class="lang-en" style="display:none">What's next?</span><span class="lang-de">Was kommt als Nächstes?</span>

```
Fertig mit Terraform 101? Weiter zu:

1. Azure 101          → Azure-Netzwerke und Databricks verstehen
2. Terraform CI/CD    → Automatisierung mit GitHub Actions
3. Terraform Module   → Professionelle Modul-Entwicklung
4. Terraform Security → Scanning und Compliance
```

### 📝 <span class="lang-en" style="display:none">Final Quiz — Kurs-Ende</span><span class="lang-de">Letztes Quiz — Kurs-Ende</span>

1. <span class="lang-en" style="display:none">Name the three most important Terraform commands.</span><span class="lang-de">Nenne die drei wichtigsten Terraform-Befehle.</span>
   <span class="lang-en" style="display:none">**Sample:** `init`, `plan`, `apply`</span><span class="lang-de">**Muster:** `init`, `plan`, `apply`</span>

2. <span class="lang-en" style="display:none">Why is remote state better than local state?</span><span class="lang-de">Warum ist Remote State besser als lokaler State?</span>
   <span class="lang-en" style="display:none">**Sample:** team access, locking, versioning, encryption</span><span class="lang-de">**Muster:** Team-Zugriff, Locking, Versioning, Verschlüsselung</span>

3. <span class="lang-en" style="display:none">When do you use `for_each` instead of `count`?</span><span class="lang-de">Wann verwendet man `for_each` statt `count`?</span>
   <span class="lang-en" style="display:none">**Sample:** when elements may be added or removed</span><span class="lang-de">**Muster:** Wenn Elemente hinzugefügt/entfernt werden können</span>

4. <span class="lang-en" style="display:none">What does `sensitive = true` mean?</span><span class="lang-de">Was bedeutet `sensitive = true`?</span>
   <span class="lang-en" style="display:none">**Sample:** hides the value in the plan output</span><span class="lang-de">**Muster:** Verbirgt den Wert in der Plan-Ausgabe</span>

---

## <span class="lang-en" style="display:none">Appendix: Command Cheat Sheet</span><span class="lang-de">Anhang: Command Cheat Sheet</span>

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

## <span class="lang-en" style="display:none">Appendix: Troubleshooting</span><span class="lang-de">Anhang: Fehlerbehebung</span>

| <span class="lang-en" style="display:none">Error</span><span class="lang-de">Fehler</span> | <span class="lang-en" style="display:none">Possible solution</span><span class="lang-de">Mögliche Lösung</span> |
|--------|-----------------|
| `Error: required provider "azurerm"` | <span class="lang-en" style="display:none">Run `terraform init`</span><span class="lang-de">`terraform init` ausführen</span> |
| `Error: Failed to query provider` | <span class="lang-en" style="display:none">Check your internet connection</span><span class="lang-de">Internetverbindung prüfen</span> |
| `Error: No valid credential` | <span class="lang-en" style="display:none">Run `az login`</span><span class="lang-de">`az login` ausführen</span> |
| `Error: state lock timeout` | Warten oder `terraform force-unlock` |
| Validation failed | <span class="lang-en" style="display:none">Check `variables.tf` — missing description?</span><span class="lang-de">`variables.tf` prüfen — description fehlt?</span> |
| `terraform fmt` <span class="lang-en" style="display:none">changes a lot</span><span class="lang-de">ändert viel</span> | <span class="lang-en" style="display:none">`terraform fmt -diff` shows differences</span><span class="lang-de">`terraform fmt -diff` zeigt Unterschiede</span> |
