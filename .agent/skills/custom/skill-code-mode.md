# Skill: Local Code Mode Execution
- **Concept:** "Local Code Mode" is similar to an Anthropic/Cloudflare worker. It is the architectural concept of an AI executing its own logic natively via terminal proxy.
- **Rule:** If a task touches >5 files or requires massive data processing, do not pollute the chat context. 
- **Action:** Write a sandboxed script (e.g. `execution_test/script.cjs`) with `jcodemunch` or file system dependencies, use your `run_command` tools to execute it, and evaluate the terminal output. Build in your own retry loops, logging, and concurrency.
