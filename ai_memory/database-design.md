# Database Design Guidelines

Database design principles and decision-making covering schema design, indexing strategy, and ORM selection.

---

## ⚠️ Core Principle
* Ask user for database preferences when unclear.
* Choose database/ORM based on context (e.g. Supabase local for this project).
* Do not default to complex structures unless needed.

---

## 🛠️ Decision Checklist
Before designing schema:
* [x] Ask user about database preference (Supabase Local/Docker selected).
* [ ] Verify deployment environment parameters.
* [ ] Plan index strategy on queries (especially on document search fields).
* [ ] Define relationships clearly (e.g., User -> Documents -> ExtractedData).

---

## ❌ Anti-Patterns to Avoid
* ❌ Store JSON when structured relational columns are better.
* ❌ Skip database indexing on foreign keys or search fields.
* ❌ Use `SELECT *` in production queries.
* ❌ Ignore N+1 database queries.

---

## 🔍 Supabase Specific Best Practices
* **Use RLS (Row Level Security)**: Ensure Row Level Security is active on tables and create specific policies for authenticated users.
* **Structured Types**: Leverage Postgres native data types (uuid, timestamp, varchar) over generic json/text where possible.
