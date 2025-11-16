import axios from "axios";
import "dotenv/config";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Defina OPENAI_API_KEY no .env");
}

const client = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  }
});

export async function generateChatCompletion(prompt) {
  const response = await client.post("/chat/completions", {
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "Você é um roteirista de podcast em português do Brasil." },
      { role: "user", content: prompt }
    ]
  });

  return response.data.choices[0].message.content;
}

export async function generateImage(prompt) {
  const response = await client.post("/images/generations", {
    model: "gpt-image-1",
    prompt,
    size: "1024x1024"
  });

  return response.data.data[0].url;
}
