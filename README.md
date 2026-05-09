# Webfael Agent Office

Painel 2D dos agentes operacionais da Webfael.

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
- Histórico diário de entregas.
