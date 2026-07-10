# Gemini API Development Guidelines

The Gemini API provides access to Google's most advanced AI models. Key capabilities include text generation, multimodal understanding (processing images, audio, video, and documents), and structured JSON output.

---

## 🚀 Current Gemini Models
* `gemini-3-pro-preview`: 1M tokens context, complex reasoning, coding, research
* `gemini-3-flash-preview`: 1M tokens context, fast, balanced performance, multimodal
* `gemini-3-pro-image-preview`: 65k / 32k tokens, image generation and editing

> [!IMPORTANT]
> Legacy models like `gemini-2.5-*`, `gemini-2.0-*`, `gemini-1.5-*` are deprecated. Use the new models above.

---

## 📦 Official SDKs (Always use the modern SDKs)
* **JavaScript/TypeScript**: `@google/genai` (Install with: `npm install @google/genai`)
* **Python**: `google-genai` (Install with: `pip install google-genai`)

> [!WARNING]
> Legacy SDKs like `@google/generative-ai` (JS) and `google-generativeai` (Python) are deprecated. Always use the new `@google/genai` SDK.

---

## 💡 Quick Start Examples

### JavaScript/TypeScript
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Explain quantum computing"
});
console.log(response.text);
```

### Python
```python
from google import genai

client = genai.Client()
response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Explain quantum computing"
)
print(response.text)
```

---

## 🛠️ API Reference and Specifications
* **Default REST API Discovery Spec (v1beta)**: `https://generativelanguage.googleapis.com/$discovery/rest?version=v1beta`
* **llms.txt URL (Official Documentation Index)**: `https://ai.google.dev/gemini-api/docs/llms.txt`

For complex features like function calling, structured outputs, and caching, fetch detailed `.md.txt` documentation pages dynamically by scanning `llms.txt`.
