
## The Prompt
Act as a very skeptical Enterprise Architect.

Task: Conduct a rigorous "Red Team" audit on the provided technical solution or middleware script: 

[INSERT SCRIPT/LOGIC HERE]. 

Your goal is to identify why this solution will fail in a high-stakes enterprise environment.

Audit Criteria: 

- Security & Credential Hardening: Identify "Credential Leakage" risks, such as hardcoded tokens or insecure logging of Bearer tokens. Suggest moving from basic environment variables to a hardened secret management pattern (e.g., HashiCorp Vault)
- Performance & Rate Limiting: Evaluate for "Performance Bottlenecks." If the script is synchronous, suggest moving to an Asynchronous pattern (e.g., aiohttp). Recommend a "Leaky Bucket" algorithm to stay proactively under CRM API rate limits
- Schema Integrity (Structural Data Validation): Analyze the transformation logic for "Data Corruption" risks. Suggest a validation layer, such as Pydantic models, to ensure that malformed data from niche sources is flagged or dropped instead of polluting the production CRM
- Resiliency: Propose "Circuit Breaker" patterns to handle third-party service outages or API timeouts without crashing the core system
  
Output Requirement: Provide a bulleted "Red Team Report" that categorizes findings into "High," "Medium," and "Low" risk, followed by the specific technical improvements required to make the solution enterprise-ready.
