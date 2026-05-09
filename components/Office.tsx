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

function AgentAvatar({ agent, selected, onClick }: { agent: Agent; selected: boolean; onClick: () => void }) {
  return (
    <button
      className={`agent ${selected ? "selected" : ""}`}
      style={{ left: `${agent.x}%`, top: `${agent.y}%`, "--agent-color": agent.color } as React.CSSProperties}
      onClick={onClick}
      aria-label={`Selecionar ${agent.name}`}
    >
      <span className="agent-shadow" />
      <span className="agent-body">{agent.initials}</span>
      <span className={statusClass[agent.status]} />
      <span className="agent-name">{agent.name}</span>
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
          <p className="subtitle">Visão operacional em tempo real para WebCEO, WebIxtepo, WebRafa e WebLia.</p>
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
          <div className="office-map">
            <div className="room room-strategy"><span>Sala Estratégica</span></div>
            <div className="room room-commercial"><span>Sala Comercial</span></div>
            <div className="room room-dev"><span>Laboratório Dev</span></div>
            <div className="room room-studio"><span>Estúdio de Conteúdo</span></div>
            <div className="corridor horizontal" />
            <div className="corridor vertical" />
            <div className="holo-table">OPS</div>
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
            <p>Conectar esse painel na API/status real do OpenClaw, Jira e entregas diárias.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
