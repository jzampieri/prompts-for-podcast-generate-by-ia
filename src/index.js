import fs from "fs-extra";
import Mustache from "mustache";
import path from "path";
import { fileURLToPath } from "url";

import { generateChatCompletion, generateImage } from "./services/openai.js";
import { textToSpeech } from "./services/elevenlabs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadJSON(relativePath) {
  const fullPath = path.join(__dirname, relativePath);
  const raw = await fs.readFile(fullPath, "utf-8");
  return JSON.parse(raw);
}

async function loadTemplate(relativePath) {
  const fullPath = path.join(__dirname, relativePath);
  return fs.readFile(fullPath, "utf-8");
}

async function main() {
  const episode = await loadJSON("config/episode.json");

  const roteiroTemplate = await loadTemplate("prompts/roteiro-template.md");
  const roteiroPrompt = Mustache.render(roteiroTemplate, episode);

  console.log(" Gerando roteiro...");
  const roteiro = await generateChatCompletion(roteiroPrompt);
  const roteiroPath = path.join(__dirname, "../output", `roteiro-episodio-${episode.episodeNumber.toString().padStart(3, "0")}.md`);
  await fs.outputFile(roteiroPath, roteiro);
  console.log(`✅ Roteiro salvo em: ${roteiroPath}`);

  console.log("🔹 Gerando áudio com ElevenLabs...");
  const audioPath = path.join(__dirname, "../output", `audio-episodio-${episode.episodeNumber.toString().padStart(3, "0")}.mp3`);
  await textToSpeech(roteiro, audioPath);
  console.log(`✅ Áudio salvo em: ${audioPath}`);

  const capaTemplate = await loadTemplate("prompts/capa-template.md");
  const capaPrompt = Mustache.render(capaTemplate, episode);

  console.log("🔹 Gerando prompt de imagem...");
  const promptImagem = await generateChatCompletion(capaPrompt);
  console.log("Prompt para imagem:", promptImagem);

  console.log("🔹 Gerando imagem de capa...");
  const imageUrl = await generateImage(promptImagem);
  const imageInfoPath = path.join(__dirname, "../output", `capa-episodio-${episode.episodeNumber.toString().padStart(3, "0")}.txt`);
  await fs.outputFile(imageInfoPath, imageUrl);
  console.log(`✅ URL da capa salva em: ${imageInfoPath}`);

  console.log("\n Fluxo concluído! Agora você pode:");
  console.log("- Revisar o roteiro se quiser;");
  console.log("- Usar o áudio e a capa no CapCut para montar o vídeo final.");
}

main().catch((err) => {
  console.error("Erro ao executar fluxo:", err);
  process.exit(1);
});
