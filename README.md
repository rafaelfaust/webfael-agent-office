# Webfael Agent Office

Painel 2D dos agentes operacionais da Webfael.

## Entrega V2

- Visual refeito para **RPG top-down / Tibia-lite**, sem engine pesada.
- Mapa renderizado por **tilemap em dados** (`data/officeMap.ts`).
- Agentes posicionados por grid (`data/agents.ts`), não por porcentagem solta.
- Tema CSS preparado para trocar tiles por PNG/SVG depois.
- Painel lateral mostra status, sala, grid e tarefa atual do agente selecionado.

## Como customizar o mapa

Edite `data/officeMap.ts`:

```ts
const legend = {
  ".": "floor",
  "#": "wall",
  "D": "desk",
  "C": "pc",
  "P": "plant",
  "S": "agentSpawn",
  "R": "rug",
  "V": "server",
  "=": "door",
};
```

Depois altere as linhas em `mapRows`. Cada caractere vira um tile.

Para mudar posição de agente, edite `grid` em `data/agents.ts`:

```ts
grid: { x: 8, y: 3 }
```

## Agentes

- WebCEO: estratégia e coordenação
- WebIxtepo: desenvolvimento, automações e infraestrutura
- WebRafa: conteúdo e comunicação
- WebLia: SDR e prospecção

## Rodar local

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Publicar na Vercel

1. Suba este projeto no GitHub.
2. Importe o repositório na Vercel.
3. Framework: Next.js.
4. Build command: `npm run build`.
5. Output: padrão da Vercel.

## Próximas integrações

- API real do OpenClaw para status dos agentes.
- Jira para tarefas, entregas e bloqueios.
- Métricas de WhatsApp/Telegram/Gateway.
- Editor visual de tilemap.
