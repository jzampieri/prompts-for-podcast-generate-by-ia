# 🧠 Podcast IA – Empreendedorismo na Tecnologia 

---

## **O que este projeto faz?**

* Gera **roteiro completo** de podcast via OpenAI
* Converte o roteiro em **áudio narrado** via ElevenLabs
* Cria **capa automática** usando DALL·E
* Salva tudo em `/output`
* Fluxo 100% automático com um único comando:

```bash
npm run generate
```

---

## **Tema Principal**

### **Empreendedorismo na Tecnologia**

* Startups
* SaaS
* MVP
* Ideias digitais
* Produto e inovação
* Linguagem moderna e direta

Configuração do episódio:
`src/config/episode.json`

```json
{
  "episodeNumber": 1,
  "title": "Como validar uma ideia de SaaS sem escrever código",
  "hostName": "Julio Zampieri",
  "podcastName": "Empreenda em Tech",
  "targetAudience": "Devs que querem tirar uma ideia do papel",
  "durationMinutes": 20,
  "tone": "conversa direta, moderna e sem jargões",
  "focus": "empreendedorismo na tecnologia",
  "language": "pt-BR"
}
```

---

## **Arquitetura do Projeto**

```
src/
  config/
    episode.json
  prompts/
    roteiro-template.md
    capa-template.md
    social-template.md
  services/
    openai.js
    elevenlabs.js
  index.js
output/
.env
package.json
README.md
```

---

## **Tecnologias**

* **OpenAI GPT-4.1** → roteiros + prompts
* **OpenAI Images (DALL·E)** → capa automática
* **ElevenLabs** → voz em áudio
* **Node.js** → automação
* **Mustache** → templates
* **Axios / FS-Extra** → requisições e arquivos

---

## **Instalação**

```bash
git clone https://github.com/jzampieri/prompts-for-podcast-generate-by-ia
cd prompts-for-podcast-generate-by-ia
npm install
```

---

## **Configurar Chaves (.env)**

```
OPENAI_API_KEY=sua_chave
ELEVENLABS_API_KEY=sua_chave
ELEVENLABS_VOICE_ID=id_voz
```

---

## **Gerar Episódio**

```bash
npm run generate
```

Resultado salvo em `/output`:

* 📝 Roteiro
* 🎧 Áudio
* 🎨 Capa

---

## **Como Personalizar**

* Editar `episode.json`
* Ajustar templates em `/prompts`
* Criar novos estilos de episódios

---
