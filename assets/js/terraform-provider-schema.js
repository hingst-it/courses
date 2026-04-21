// terraform-provider-schema.js
// Schema-Datenbank für azurerm (~3.x/4.x) und databricks provider
// Attribute-Format: { type, required, optional, allowed, description }
// type: "string" | "list" | "map" | "bool" | "number" | "block"

var TF_SCHEMA = {

  // ══════════════════════════════════════════════════════════════════════════
  // AZURERM PROVIDER
  // ══════════════════════════════════════════════════════════════════════════

  // ── Core ──────────────────────────────────────────────────────────────────

  azurerm_resource_group: {
    icon: "📦", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group",
    attrs: {
      name:     { type: "string", required: true,  desc: "Name der Resource Group" },
      location: { type: "string", required: true,  desc: "Azure Region",
                  allowed: ["West Europe","North Europe","East US","East US 2","West US",
                            "West US 2","Central US","Germany West Central","Germany North",
                            "UK South","UK West","Southeast Asia","Australia East"] },
      tags:     { type: "map",    optional: true,  desc: "Key-Value Tags" },
    }
  },

  // ── Networking ────────────────────────────────────────────────────────────

  azurerm_virtual_network: {
    icon: "🌐", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_network",
    attrs: {
      name:                { type: "string", required: true  },
      location:            { type: "string", required: true  },
      resource_group_name: { type: "string", required: true  },
      address_space:       { type: "list",   required: true,  desc: "CIDR-Adressräume, z.B. [\"10.0.0.0/16\"]" },
      dns_servers:         { type: "list",   optional: true  },
      tags:                { type: "map",    optional: true  },
    }
  },

  azurerm_subnet: {
    icon: "🔗", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet",
    attrs: {
      name:                 { type: "string", required: true },
      resource_group_name:  { type: "string", required: true },
      virtual_network_name: { type: "string", required: true },
      address_prefixes:     { type: "list",   required: true, desc: "CIDR-Prefix, z.B. [\"10.0.1.0/24\"]" },
      service_endpoints:    { type: "list",   optional: true,
                              allowed: ["Microsoft.AzureActiveDirectory","Microsoft.AzureCosmosDB",
                                        "Microsoft.ContainerRegistry","Microsoft.EventHub",
                                        "Microsoft.KeyVault","Microsoft.ServiceBus",
                                        "Microsoft.Sql","Microsoft.Storage","Microsoft.Web"] },
    }
  },

  azurerm_network_security_group: {
    icon: "🛡️", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_security_group",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      tags:                { type: "map",    optional: true },
    }
  },

  azurerm_network_security_rule: {
    icon: "📋", provider: "azurerm",
    attrs: {
      name:                        { type: "string", required: true },
      resource_group_name:         { type: "string", required: true },
      network_security_group_name: { type: "string", required: true },
      priority:                    { type: "number", required: true,  desc: "100–4096" },
      direction:                   { type: "string", required: true,  allowed: ["Inbound","Outbound"] },
      access:                      { type: "string", required: true,  allowed: ["Allow","Deny"] },
      protocol:                    { type: "string", required: true,  allowed: ["Tcp","Udp","Icmp","Esp","Ah","*"] },
      source_port_range:           { type: "string", optional: true },
      destination_port_range:      { type: "string", optional: true },
      source_address_prefix:       { type: "string", optional: true },
      destination_address_prefix:  { type: "string", optional: true },
    }
  },

  azurerm_public_ip: {
    icon: "🌍", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/public_ip",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      allocation_method:   { type: "string", required: true, allowed: ["Static","Dynamic"] },
      sku:                 { type: "string", optional: true, allowed: ["Basic","Standard"], desc: "Standard für Availability Zones" },
      zones:               { type: "list",   optional: true, allowed: ["1","2","3"] },
      tags:                { type: "map",    optional: true },
    }
  },

  azurerm_network_interface: {
    icon: "🔌", provider: "azurerm",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      ip_configuration:    { type: "block",  required: true, desc: "Mindestens ein ip_configuration Block" },
      tags:                { type: "map",    optional: true },
    }
  },

  azurerm_route_table: {
    icon: "🗺️", provider: "azurerm",
    attrs: {
      name:                          { type: "string", required: true },
      location:                      { type: "string", required: true },
      resource_group_name:           { type: "string", required: true },
      bgp_route_propagation_enabled: { type: "bool",   optional: true },
      tags:                          { type: "map",    optional: true },
    }
  },

  azurerm_private_endpoint: {
    icon: "🔒", provider: "azurerm",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      subnet_id:           { type: "string", required: true },
      private_service_connection: { type: "block", required: true },
      tags:                { type: "map",    optional: true },
    }
  },

  // ── Compute ───────────────────────────────────────────────────────────────

  azurerm_linux_virtual_machine: {
    icon: "🖥️", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_virtual_machine",
    attrs: {
      name:                   { type: "string", required: true },
      location:               { type: "string", required: true },
      resource_group_name:    { type: "string", required: true },
      size:                   { type: "string", required: true,
                                allowed: ["Standard_B1s","Standard_B2s","Standard_D2s_v3",
                                          "Standard_D4s_v3","Standard_D8s_v3","Standard_E4s_v3",
                                          "Standard_F4s_v2","Standard_DS1_v2","Standard_DS2_v2"],
                                desc: "VM-Größe / SKU" },
      admin_username:         { type: "string", required: true },
      network_interface_ids:  { type: "list",   required: true },
      os_disk:                { type: "block",  required: true },
      source_image_reference: { type: "block",  required: true },
      admin_password:         { type: "string", optional: true },
      disable_password_authentication: { type: "bool", optional: true },
      tags:                   { type: "map",    optional: true },
    }
  },

  azurerm_windows_virtual_machine: {
    icon: "🖥️", provider: "azurerm",
    attrs: {
      name:                  { type: "string", required: true },
      location:              { type: "string", required: true },
      resource_group_name:   { type: "string", required: true },
      size:                  { type: "string", required: true,
                               allowed: ["Standard_B2s","Standard_D2s_v3","Standard_D4s_v3","Standard_DS1_v2","Standard_DS2_v2"] },
      admin_username:        { type: "string", required: true },
      admin_password:        { type: "string", required: true },
      network_interface_ids: { type: "list",   required: true },
      os_disk:               { type: "block",  required: true },
      source_image_reference:{ type: "block",  required: true },
      tags:                  { type: "map",    optional: true },
    }
  },

  // ── Storage ───────────────────────────────────────────────────────────────

  azurerm_storage_account: {
    icon: "💾", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_account",
    attrs: {
      name:                    { type: "string", required: true, desc: "3–24 Zeichen, lowercase, alphanumerisch" },
      location:                { type: "string", required: true },
      resource_group_name:     { type: "string", required: true },
      account_tier:            { type: "string", required: true, allowed: ["Standard","Premium"] },
      account_replication_type:{ type: "string", required: true,
                                 allowed: ["LRS","GRS","RAGRS","ZRS","GZRS","RAGZRS"],
                                 desc: "LRS=lokal, GRS=geo-redundant, ZRS=zone-redundant" },
      account_kind:            { type: "string", optional: true,
                                 allowed: ["BlobStorage","BlockBlobStorage","FileStorage","Storage","StorageV2"],
                                 desc: "Default: StorageV2" },
      access_tier:             { type: "string", optional: true, allowed: ["Hot","Cool"] },
      min_tls_version:         { type: "string", optional: true, allowed: ["TLS1_0","TLS1_1","TLS1_2"] },
      https_traffic_only_enabled: { type: "bool", optional: true },
      tags:                    { type: "map",    optional: true },
    }
  },

  azurerm_storage_container: {
    icon: "📁", provider: "azurerm",
    attrs: {
      name:                 { type: "string", required: true },
      storage_account_name: { type: "string", required: true },
      container_access_type:{ type: "string", optional: true, allowed: ["blob","container","private"] },
    }
  },

  // ── Key Vault ─────────────────────────────────────────────────────────────

  azurerm_key_vault: {
    icon: "🔑", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault",
    attrs: {
      name:                       { type: "string", required: true },
      location:                   { type: "string", required: true },
      resource_group_name:        { type: "string", required: true },
      tenant_id:                  { type: "string", required: true, desc: "Azure AD Tenant ID" },
      sku_name:                   { type: "string", required: true, allowed: ["standard","premium"] },
      soft_delete_retention_days: { type: "number", optional: true, desc: "7–90 Tage" },
      purge_protection_enabled:   { type: "bool",   optional: true },
      tags:                       { type: "map",    optional: true },
    }
  },

  azurerm_key_vault_secret: {
    icon: "🔐", provider: "azurerm",
    attrs: {
      name:         { type: "string", required: true },
      value:        { type: "string", required: true },
      key_vault_id: { type: "string", required: true },
      content_type: { type: "string", optional: true },
    }
  },

  // ── Databricks (via azurerm) ───────────────────────────────────────────────

  azurerm_databricks_workspace: {
    icon: "🟨", provider: "azurerm",
    docs: "https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/databricks_workspace",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      sku:                 { type: "string", required: true,
                             allowed: ["trial","standard","premium"],
                             desc: "premium für Private Link, Unity Catalog" },
      managed_resource_group_name: { type: "string", optional: true },
      public_network_access_enabled:       { type: "bool",   optional: true },
      network_security_group_rules_required: { type: "string", optional: true,
                                               allowed: ["AllRules","NoAzureDatabricksRules","NoAzureServiceRules"] },
      custom_parameters:   { type: "block",  optional: true, desc: "VNet Injection, private/public subnet" },
      tags:                { type: "map",    optional: true },
    }
  },

  // ── Identity ──────────────────────────────────────────────────────────────

  azurerm_user_assigned_identity: {
    icon: "🪪", provider: "azurerm",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      tags:                { type: "map",    optional: true },
    }
  },

  azurerm_role_assignment: {
    icon: "🔏", provider: "azurerm",
    attrs: {
      scope:               { type: "string", required: true, desc: "Resource ID des Geltungsbereichs" },
      role_definition_name:{ type: "string", optional: true,
                             allowed: ["Owner","Contributor","Reader","Storage Blob Data Contributor",
                                       "Storage Blob Data Reader","Key Vault Secrets User","Key Vault Reader",
                                       "Network Contributor","Managed Identity Operator"] },
      principal_id:        { type: "string", required: true, desc: "Object ID des Principals" },
    }
  },

  // ── App Service / Functions ───────────────────────────────────────────────

  azurerm_service_plan: {
    icon: "📐", provider: "azurerm",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      os_type:             { type: "string", required: true, allowed: ["Linux","Windows","WindowsContainer"] },
      sku_name:            { type: "string", required: true,
                             allowed: ["B1","B2","B3","D1","F1","I1","I2","I3","P1v2","P2v2","P3v2",
                                       "P0v3","P1v3","P2v3","P3v3","S1","S2","S3","Y1","EP1","EP2","EP3"] },
      tags:                { type: "map",    optional: true },
    }
  },

  azurerm_linux_function_app: {
    icon: "⚡", provider: "azurerm",
    attrs: {
      name:                  { type: "string", required: true },
      location:              { type: "string", required: true },
      resource_group_name:   { type: "string", required: true },
      service_plan_id:       { type: "string", required: true },
      storage_account_name:  { type: "string", required: true },
      storage_account_access_key: { type: "string", required: true },
      site_config:           { type: "block",  required: true },
      tags:                  { type: "map",    optional: true },
    }
  },

  // ── Container ─────────────────────────────────────────────────────────────

  azurerm_container_registry: {
    icon: "📦", provider: "azurerm",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      sku:                 { type: "string", required: true, allowed: ["Basic","Standard","Premium"] },
      admin_enabled:       { type: "bool",   optional: true },
      tags:                { type: "map",    optional: true },
    }
  },

  // ── Monitor ───────────────────────────────────────────────────────────────

  azurerm_log_analytics_workspace: {
    icon: "📊", provider: "azurerm",
    attrs: {
      name:                { type: "string", required: true },
      location:            { type: "string", required: true },
      resource_group_name: { type: "string", required: true },
      sku:                 { type: "string", optional: true, allowed: ["Free","PerGB2018","Premium","Standard"] },
      retention_in_days:   { type: "number", optional: true, desc: "30–730 Tage" },
      tags:                { type: "map",    optional: true },
    }
  },

  // ── Random ────────────────────────────────────────────────────────────────

  random_string: {
    icon: "🎲", provider: "random",
    attrs: {
      length:  { type: "number", required: true },
      special: { type: "bool",   optional: true },
      upper:   { type: "bool",   optional: true },
      lower:   { type: "bool",   optional: true },
      numeric: { type: "bool",   optional: true },
      override_special: { type: "string", optional: true },
    }
  },

  random_id: {
    icon: "🎲", provider: "random",
    attrs: {
      byte_length: { type: "number", required: true },
      keepers:     { type: "map",    optional: true },
      prefix:      { type: "string", optional: true },
    }
  },

  random_pet: {
    icon: "🎲", provider: "random",
    attrs: {
      length:    { type: "number", optional: true },
      prefix:    { type: "string", optional: true },
      separator: { type: "string", optional: true },
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DATABRICKS PROVIDER  (databricks/databricks)
  // ══════════════════════════════════════════════════════════════════════════

  databricks_cluster: {
    icon: "⚙️", provider: "databricks",
    docs: "https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/cluster",
    attrs: {
      cluster_name:                   { type: "string", required: true },
      spark_version:                  { type: "string", required: true, desc: "z.B. \"13.3.x-scala2.12\" oder data.databricks_spark_version.latest.id" },
      node_type_id:                   { type: "string", required: true, desc: "z.B. \"Standard_DS3_v2\" oder data.databricks_node_type.smallest.id" },
      num_workers:                    { type: "number", optional: true, desc: "0 für Single-Node" },
      autotermination_minutes:        { type: "number", optional: true, desc: "0 = nie terminieren" },
      data_security_mode:             { type: "string", optional: true,
                                        allowed: ["NONE","LEGACY_TABLE_ACL","LEGACY_PASSTHROUGH",
                                                  "LEGACY_SINGLE_USER","SINGLE_USER","USER_ISOLATION"],
                                        desc: "USER_ISOLATION für Unity Catalog" },
      runtime_engine:                 { type: "string", optional: true, allowed: ["NULL","STANDARD","PHOTON"] },
      spark_conf:                     { type: "map",    optional: true },
      spark_env_vars:                 { type: "map",    optional: true },
      custom_tags:                    { type: "map",    optional: true },
      autoscale:                      { type: "block",  optional: true, desc: "min_workers + max_workers" },
      aws_attributes:                 { type: "block",  optional: true },
      azure_attributes:               { type: "block",  optional: true },
      cluster_log_conf:               { type: "block",  optional: true },
      init_scripts:                   { type: "block",  optional: true },
      library:                        { type: "block",  optional: true, desc: "Wiederholbar für jede Library" },
    }
  },

  databricks_job: {
    icon: "📅", provider: "databricks",
    docs: "https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/job",
    attrs: {
      name:  { type: "string", required: true },
      task:  { type: "block",  optional: true, desc: "Mindestens ein task Block empfohlen" },
      schedule:              { type: "block",  optional: true, desc: "cron_expression + timezone_id" },
      max_concurrent_runs:   { type: "number", optional: true },
      tags:                  { type: "map",    optional: true },
      email_notifications:   { type: "block",  optional: true },
    }
  },

  databricks_notebook: {
    icon: "📓", provider: "databricks",
    attrs: {
      path:           { type: "string", required: true, desc: "Workspace-Pfad, z.B. /Users/me/notebook" },
      language:       { type: "string", required: true, allowed: ["PYTHON","SQL","SCALA","R"] },
      content_base64: { type: "string", optional: true },
      source:         { type: "string", optional: true, desc: "Lokaler Dateipfad" },
    }
  },

  databricks_secret_scope: {
    icon: "🔐", provider: "databricks",
    attrs: {
      name:                    { type: "string", required: true },
      backend_type:            { type: "string", optional: true, allowed: ["DATABRICKS","AZURE_KEYVAULT"] },
      keyvault_metadata:       { type: "block",  optional: true, desc: "Nur für AZURE_KEYVAULT backend" },
      initial_manage_principal:{ type: "string", optional: true },
    }
  },

  databricks_secret: {
    icon: "🔑", provider: "databricks",
    attrs: {
      key:          { type: "string", required: true },
      string_value: { type: "string", required: true, desc: "Wert wird im State als sensitive gespeichert" },
      scope:        { type: "string", required: true },
    }
  },

  databricks_token: {
    icon: "🎟️", provider: "databricks",
    attrs: {
      comment:          { type: "string", optional: true },
      lifetime_seconds: { type: "number", optional: true, desc: "0 = kein Ablauf" },
    }
  },

  databricks_group: {
    icon: "👥", provider: "databricks",
    attrs: {
      display_name:      { type: "string", required: true },
      allow_cluster_create:     { type: "bool", optional: true },
      allow_instance_pool_create:{ type: "bool", optional: true },
      databricks_sql_access:    { type: "bool", optional: true },
      workspace_access:         { type: "bool", optional: true },
    }
  },

  databricks_user: {
    icon: "👤", provider: "databricks",
    attrs: {
      user_name:    { type: "string", required: true, desc: "E-Mail-Adresse" },
      display_name: { type: "string", optional: true },
      active:       { type: "bool",   optional: true },
    }
  },

  databricks_permissions: {
    icon: "🔏", provider: "databricks",
    attrs: {
      access_control: { type: "block",  required: true, desc: "user_name oder group_name + permission_level" },
      cluster_id:     { type: "string", optional: true },
      job_id:         { type: "string", optional: true },
      notebook_path:  { type: "string", optional: true },
      sql_warehouse_id:{ type: "string", optional: true },
    }
  },

  databricks_sql_warehouse: {
    icon: "🏭", provider: "databricks",
    docs: "https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/sql_warehouse",
    attrs: {
      name:              { type: "string", required: true },
      cluster_size:      { type: "string", required: true,
                           allowed: ["2X-Small","X-Small","Small","Medium","Large","X-Large","2X-Large","3X-Large","4X-Large"],
                           desc: "SQL Warehouse Größe" },
      auto_stop_mins:    { type: "number", optional: true },
      max_num_clusters:  { type: "number", optional: true },
      min_num_clusters:  { type: "number", optional: true },
      warehouse_type:    { type: "string", optional: true, allowed: ["CLASSIC","PRO","TYPE_UNSPECIFIED"] },
      enable_serverless_compute: { type: "bool", optional: true },
      tags:              { type: "block",  optional: true },
    }
  },

  databricks_metastore: {
    icon: "🗄️", provider: "databricks",
    attrs: {
      name:             { type: "string", required: true },
      storage_root:     { type: "string", optional: true, desc: "abfss:// Pfad für Unity Catalog" },
      owner:            { type: "string", optional: true },
      region:           { type: "string", optional: true },
    }
  },

  databricks_catalog: {
    icon: "📚", provider: "databricks",
    attrs: {
      name:              { type: "string", required: true },
      metastore_id:      { type: "string", optional: true },
      storage_root:      { type: "string", optional: true },
      comment:           { type: "string", optional: true },
      properties:        { type: "map",    optional: true },
    }
  },

  databricks_schema: {
    icon: "📋", provider: "databricks",
    attrs: {
      name:         { type: "string", required: true },
      catalog_name: { type: "string", required: true },
      comment:      { type: "string", optional: true },
      properties:   { type: "map",    optional: true },
    }
  },

  databricks_instance_pool: {
    icon: "🏊", provider: "databricks",
    attrs: {
      instance_pool_name:            { type: "string", required: true },
      min_idle_instances:            { type: "number", required: true },
      max_capacity:                  { type: "number", optional: true },
      idle_instance_autotermination_minutes: { type: "number", required: true },
      node_type_id:                  { type: "string", optional: true },
      preloaded_spark_versions:      { type: "list",   optional: true },
      custom_tags:                   { type: "map",    optional: true },
    }
  },

  databricks_cluster_policy: {
    icon: "📏", provider: "databricks",
    attrs: {
      name:       { type: "string", required: true },
      definition: { type: "string", optional: true, desc: "JSON-Zeichenkette mit Cluster Policy" },
    }
  },

  databricks_mws_workspaces: {
    icon: "🏢", provider: "databricks",
    attrs: {
      account_id:       { type: "string", required: true },
      workspace_name:   { type: "string", required: true },
      aws_region:       { type: "string", optional: true },
      deployment_name:  { type: "string", optional: true },
      credentials_id:   { type: "string", optional: true },
      storage_configuration_id: { type: "string", optional: true },
      network_id:       { type: "string", optional: true },
    }
  },
};

// ── Validator ────────────────────────────────────────────────────────────────

var TF_VALIDATOR = {

  // Parst Resource-Blöcke aus HCL und gibt die enthaltenen Attribute zurück
  _extractResourceBlocks: function(code) {
    var results = [];
    var re = /resource\s+"([^"]+)"\s+"([^"]+)"\s*\{/g;
    var m;
    while ((m = re.exec(code)) !== null) {
      var type = m[1], name = m[2];
      var startIdx = m.index + m[0].length;
      // Finde den abschließenden } durch Klammer-Tracking
      var depth = 1, i = startIdx, bodyStart = startIdx;
      while (i < code.length && depth > 0) {
        if (code[i] === '{') depth++;
        else if (code[i] === '}') depth--;
        i++;
      }
      var body = code.substring(bodyStart, i - 1);
      // Extrahiere top-level Attribute (key = value, kein nested block)
      var attrs = {};
      var attrRe = /^\s*(\w+)\s*=\s*(.+)$/gm;
      var am;
      while ((am = attrRe.exec(body)) !== null) {
        attrs[am[1]] = am[2].trim();
      }
      // Extrahiere block-Namen (Blöcke sind key { ... })
      var blockRe = /^\s*(\w+)\s*\{/gm;
      var bm;
      var blocks = {};
      while ((bm = blockRe.exec(body)) !== null) {
        blocks[bm[1]] = true;
      }
      results.push({ type: type, name: name, attrs: attrs, blocks: blocks });
    }
    return results;
  },

  // Typen-Prüfung (einfach, heuristisch)
  _checkType: function(value, expectedType, attrName) {
    var v = value.trim();
    if (v.startsWith('var.') || v.startsWith('local.') || v.startsWith('data.') || v.includes('.') && !v.startsWith('"')) return null; // Referenz, nicht prüfbar
    switch (expectedType) {
      case 'string':
        if (!v.startsWith('"') && !v.startsWith('<<') && !v.includes('(')) {
          return 'Attribut "' + attrName + '" erwartet einen String (in Anführungszeichen)';
        }
        break;
      case 'bool':
        if (v !== 'true' && v !== 'false') {
          return 'Attribut "' + attrName + '" erwartet true oder false';
        }
        break;
      case 'number':
        if (isNaN(Number(v)) && !v.startsWith('var.')) {
          return 'Attribut "' + attrName + '" erwartet eine Zahl';
        }
        break;
      case 'list':
        if (!v.startsWith('[') && !v.startsWith('toset(') && !v.startsWith('tolist(') && !v.includes('(')) {
          return 'Attribut "' + attrName + '" erwartet eine Liste [...] ';
        }
        break;
      case 'map':
        if (!v.startsWith('{') && !v.startsWith('merge(') && !v.startsWith('tomap(')) {
          return 'Attribut "' + attrName + '" erwartet eine Map { ... }';
        }
        break;
    }
    return null;
  },

  // Allowed-Values-Check
  _checkAllowed: function(value, allowed, attrName) {
    if (!allowed || !allowed.length) return null;
    var v = value.trim().replace(/^"|"$/g, '');
    if (value.startsWith('var.') || value.startsWith('local.') || value.includes('(')) return null;
    if (allowed.indexOf(v) === -1) {
      return 'Attribut "' + attrName + '": "' + v + '" ist kein gültiger Wert. Erlaubt: ' + allowed.join(', ');
    }
    return null;
  },

  validate: function(code) {
    var errors = [];
    var warnings = [];
    var infos = [];

    var blocks = this._extractResourceBlocks(code);

    blocks.forEach(function(block) {
      var schema = TF_SCHEMA[block.type];
      if (!schema) {
        warnings.push('resource "' + block.type + '" "' + block.name + '": Unbekannter Resource-Typ — kein Schema verfügbar');
        return;
      }

      var schemaAttrs = schema.attrs;

      // 1. Required attributes prüfen
      Object.keys(schemaAttrs).forEach(function(attrName) {
        var attrDef = schemaAttrs[attrName];
        if (!attrDef.required) return;
        var hasAttr = (attrName in block.attrs) || (attrDef.type === 'block' && attrName in block.blocks);
        if (!hasAttr) {
          errors.push('"' + block.type + '.' + block.name + '": Pflichtattribut "' + attrName + '" fehlt'
                    + (attrDef.desc ? ' (' + attrDef.desc + ')' : ''));
        }
      });

      // 2. Typ + Allowed-Values für vorhandene Attribute prüfen
      Object.keys(block.attrs).forEach(function(attrName) {
        var attrDef = schemaAttrs[attrName];
        if (!attrDef) {
          // Unbekanntes Attribut → Warning
          warnings.push('"' + block.type + '.' + block.name + '": Unbekanntes Attribut "' + attrName + '"');
          return;
        }
        var val = block.attrs[attrName];
        // Typ-Check
        var typeErr = TF_VALIDATOR._checkType(val, attrDef.type, attrName);
        if (typeErr) errors.push('"' + block.type + '.' + block.name + '": ' + typeErr);
        // Allowed-Values-Check
        if (attrDef.allowed) {
          var allowedErr = TF_VALIDATOR._checkAllowed(val, attrDef.allowed, attrName);
          if (allowedErr) errors.push('"' + block.type + '.' + block.name + '": ' + allowedErr);
        }
      });

      // 3. Docs-Hinweis
      if (schema.docs) {
        infos.push(block.type + '.' + block.name + ' → ' + schema.docs);
      }
    });

    return { errors: errors, warnings: warnings, infos: infos, resources: blocks };
  }
};

// Export für Jekyll (global verfügbar)
if (typeof window !== 'undefined') {
  window.TF_SCHEMA = TF_SCHEMA;
  window.TF_VALIDATOR = TF_VALIDATOR;
}
