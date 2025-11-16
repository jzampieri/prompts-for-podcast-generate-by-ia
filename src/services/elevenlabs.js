import axios from "axios";
import fs from "fs-extra";
import "dotenv/config";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

if (!ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID) {
  throw new Error("Defina ELEVENLABS_API_KEY e ELEVENLABS_VOICE_ID no .env");
}

export async function textToSpeech(text, outputPath) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;

  const response = await axios.post(
    url,
    {
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.7
      }
    },
    {
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      responseType: "arraybuffer"
    }
  );

  await fs.outputFile(outputPath, response.data);
}
