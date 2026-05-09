"use client";

import { useState } from "react";
import { Agent, agents, metrics } from "@/data/agents";

const statusLabel = {
  executando: "Executando",
  aguardando: "Aguardando",
  bloqueado: "Bloqueado",
  online: "Online",
};

const statusClass = {
  executando: "status executing",
  aguardando: "status waiting",
  bloqueado: "status blocked",
  online: "status online",
};

const desks = [
  { className: "desk desk-ceo", label: "Estratégia" },
  { className: "desk desk-dev", label: "Dev" },
  { className: "desk desk-content", label: "Conteúdo" },
  { className: "desk desk-sales", label: "SDR" },
  { className: "meeting-table", label: "Daily" },
];

const decor = [
  "plant plant-a",
  "plant plant-b",
  "sofa",
  "screen screen-a",
  "screen screen-b",
  "rug",
];

function AgentAvatar({ agent, selected, onClick }: { agent: Agent; selected: boolean; onClick: () => void }) {
  return (
    <button
      className={`agent ${selected ? "selected" : ""}`}
      style={{ left: `${agent.x}%`, top: `${agent.y}%`, "--agent-color": agent.color } as React.CSSProperties}
      onClick={onClick}
      aria-label={`Selecionar ${agent.name}`}
    >
      <span className="agent-label">
        <span className={statusClass[agent.status]} />
        {agent.name}
      </span>
      <span className="agent-shadow" />
      <span className="agent-head" />
      <span className="agent-body">{agent.initials}</span>
    </button>
  );
}

export function Office() {
  const [selectedId, setSelectedId] = useState(agents[0].id);
  const selected = agents.find((agent) => agent.id === selectedId) ?? agents[0];

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Webfael Command Center</p>
          <h1>Escritório 2D dos Agentes</h1>
          <p className="subtitle">Mapa isométrico operacional para acompanhar presença, tarefas, bloqueios e entregas do time de agentes.</p>
        </div>
        <div className="live-pill"><span /> Operação ativa</div>
      </section>

      <section className="metrics">
        {metrics.map((metric) => (
          <article key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="workspace-grid">
        <div className="office-card">
          <div className="office-map" aria-label="Escritório virtual 2D da Webfael">
            <div className="iso-floor" />
            <div className="wall wall-left" />
            <div className="wall wall-back" />
            <div className="office-title">WEBFAEL OPS</div>
            <div className="zone zone-dev">LAB DEV</div>
            <div className="zone zone-content">ESTÚDIO</div>
            <div className="zone zone-sales">COMERCIAL</div>
            {desks.map((desk) => (
              <div key={desk.className} className={desk.className}>
                <span className="monitor" />
                <span className="chair" />
                <small>{desk.label}</small>
              </div>
            ))}
            {decor.map((item) => <span key={item} className={item} />)}
            {agents.map((agent) => (
              <AgentAvatar key={agent.id} agent={agent} selected={agent.id === selectedId} onClick={() => setSelectedId(agent.id)} />
            ))}
          </div>
        </div>

        <aside className="panel">
          <p className="panel-label">Agente selecionado</p>
          <h2>{selected.name}</h2>
          <span className={`badge ${selected.status}`}>{statusLabel[selected.status]}</span>
          <dl>
            <div><dt>Função</dt><dd>{selected.role}</dd></div>
            <div><dt>Sala</dt><dd>{selected.room}</dd></div>
            <div><dt>Tarefa atual</dt><dd>{selected.task}</dd></div>
          </dl>
          <div className="next-box">
            <strong>Próxima evolução</strong>
            <p>Conectar status real do OpenClaw/Jira e trocar blocos CSS por sprites isométricos próprios da Webfael.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
