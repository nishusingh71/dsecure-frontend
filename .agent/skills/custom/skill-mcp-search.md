# Skill: MCP Search (jCodeMunch)
- **Constraint:** Do NOT write custom regex or use bash `grep`.
- **Action:** For broad repository searches, use `mcp_jcodemunch_search_symbols`.
- **Action:** To read logic, use `mcp_jcodemunch_get_symbol`. 
- **Scale:** You are explicitly permitted to execute deep, full-repository scans via the MCP endpoints. The backend engine handles indexing and memory safely, do not arbitrarily bound your queries to 50 or 500 files if more needs to be processed.
