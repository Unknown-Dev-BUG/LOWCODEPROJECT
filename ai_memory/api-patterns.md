# API Design Patterns

API design principles and best practices for REST, GraphQL, or RPC communication.

---

## 🛠️ Decision Checklist
Before designing or implementing an API endpoint:
* [x] Define API consumers (Client/Refine app to Supabase/Gemini handler).
* [ ] Establish consistent response envelope formats.
* [ ] Plan versioning (e.g. `/api/v1/extract`).
* [ ] Secure the endpoint (Authentication validation, rate limiting).
* [ ] Document inputs, outputs, and parameters.

---

## ❌ REST API Anti-Patterns
* ❌ Use verbs in REST endpoints (e.g., `/getDocuments` or `/deleteFile`). Use nouns and HTTP verbs:
  * `GET /api/v1/documents` (Get list)
  * `POST /api/v1/documents` (Create new)
  * `DELETE /api/v1/documents/:id` (Delete)
* ❌ Return inconsistent error response structures.
* ❌ Expose internal raw server/database errors to client users (always catch and return sanitized error messages).

---

## 🛡️ API Security Guidelines
1. **Input Validation**: Validate and sanitize all parameters on the server side (never trust the client).
2. **Authentication**: Enforce tokens (JWT / Supabase session) check before processing.
3. **Rate Limiting**: Limit the requests for file processing endpoints to prevent denial of service (DoS) and excessive billing on Gemini API.
