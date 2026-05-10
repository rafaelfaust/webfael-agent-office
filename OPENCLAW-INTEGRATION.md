# Plano técnico curto — integração com OpenClaw real

## Variáveis

```env
OPENCLAW_GATEWAY_URL=http://localhost:3000
OPENCLAW_GATEWAY_TOKEN=token-do-gateway
```

## Fluxo recomendado

1. Criar camada `lib/openclaw.ts` server-side para ler `OPENCLAW_GATEWAY_URL` e `OPENCLAW_GATEWAY_TOKEN` sem expor token no browser.
2. Criar rota interna Next.js `app/api/openclaw/status/route.ts` que consulta o Gateway com `Authorization: Bearer ${OPENCLAW_GATEWAY_TOKEN}`.
3. Normalizar resposta para o painel:
   - `agents`: id, nome, status, tarefa atual, sala/posição visual.
   - `sessions`: id, label, estado, requester/channel, última atividade.
   - `channels`: tipo, status, health, erro recente.
4. No componente visual, trocar mock estático por fetch/SWR leve com refresh de 10–30s.
5. Fallback obrigatório: se API falhar, timeoutar ou retornar 401/5xx, manter `data/agents.ts`, exibir badge `Mock/offline` e registrar a falha no painel lateral.

## Cuidados

- Nunca enviar `OPENCLAW_GATEWAY_TOKEN` para o client.
- Usar timeout curto por request para não travar UI.
- Deixar posições visuais (`x/y`) no frontend/config local mesmo quando status vem do Gateway.
- Mapear status desconhecido como `aguardando` e mostrar motivo no detalhe do agente.
