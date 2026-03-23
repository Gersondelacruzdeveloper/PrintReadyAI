import type { GenerateRequest, GenerateResponse } from "./types";

// Change this if your backend runs elsewhere
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

export async function generateDocument(payload: GenerateRequest): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Generate failed (${res.status})`);
  }

  return res.json();
}