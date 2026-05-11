# Webfael Agent Office

Painel 2D dos agentes operacionais da Webfael.

## Entrega V4

- Visual elevado para **central operacional / jogo 2D top-down**, sem citar referência externa no produto.
- Mapa ampliado para **24x12 tiles**, com salas mais ricas: comando, comercial, lab técnico, estúdio, NOC/backlog, divisórias de vidro, consoles, servidores, lounge e café.
- Sprites CSS dos agentes mais detalhados: corpo, rosto, olhos, cabelo, sombra, nameplate, glow de seleção e animação de caminhada por grid.
- HUD lateral com agente selecionado, carga operacional, fila de contexto, minimap, roster e painel de entregas.
- Barra de métricas no topo: entregas, tarefas, bloqueios e meta de recorrência.
- Evidência visual gerada em `artifacts/agent-office-v4-preview.svg`.

## Como customizar o mapa

Edite `data/officeMap.ts`. Cada caractere vira um tile:

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
  "B": "board",
  "K": "crate",
  "T": "counter",
  "G": "glass",
  "L": "sofa",
  "X": "console",
  "F": "coffee",
};
```

Para mudar posição de agente, edite `grid` e `workPath` em `data/agents.ts`.

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

## Validar build

```bash
npm run build
```

## Próximas integrações

- API real do OpenClaw para status dos agentes.
- Jira/GitHub/Telegram para tarefas, entregas e bloqueios.
- Editor visual de tilemap.
- Troca dos CSS sprites por atlas PNG/SVG dedicado quando houver direção de arte final.
