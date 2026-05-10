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

const stations = [
  { id: "strategy", className: "station station-strategy", label: "Estratégia", icon: "CEO" },
  { id: "dev", className: "station station-dev", label: "Lab Dev", icon: "</>" },
  { id: "studio", className: "station station-studio", label: "Estúdio", icon: "REC" },
  { id: "sales", className: "station station-sales", label: "Comercial", icon: "CRM" },
  { id: "warroom", className: "station station-warroom", label: "War Room", icon: "OPS" },
];

const props = [
  "prop plant plant-north",
  "prop plant plant-south",
  "prop rack rack-left",
  "prop holo holo-a",
  "prop holo holo-b",
  "prop coffee",
  "prop couch",
  "prop rug",
];

function AgentAvatar({ agent, selected, onClick }: { agent: Agent; selected: boolean; onClick: () => void }) {
  return (
    <button
      className={`agent ${selected ? "selected" : ""}`}
      style={{ left: `${agent.x}%`, top: `${agent.y}%`, "--agent-color": agent.color } as React.CSSProperties}
      onClick={onClick}
      aria-label={`Selecionar ${agent.name}`}
    >
      <span className="agent-nameplate">
        <span className={statusClass[agent.status]} />
        {agent.name}
      </span>
      <span className="agent-shadow" />
      <span className="agent-sprite">
        <span className="agent-head" />
        <span className="agent-torso">{agent.initials}</span>
      </span>
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
          <p className="eyebrow">Webfael Agent Office</p>
          <h1>Escritório jogável dos agentes</h1>
          <p className="subtitle">
            Versão visual preparada para virar mapa 2D/isométrico de operação: salas, estações, sprites CSS e camada futura para assets SVG.
          </p>
        </div>
        <div className="live-pill"><span /> Mock visual V2</div>
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
          <div className="office-map" aria-label="Mapa isométrico 2D do escritório virtual da Webfael">
            <div className="sky-glow" />
            <div className="iso-room">
              <div className="back-wall">
                <span className="wall-logo">WEBFAEL OPS</span>
                <span className="wall-screen">AGENT STATUS</span>
              </div>
              <div className="left-wall" />
              <div className="right-wall" />
              <div className="tile-floor">
                <span className="zone-label zone-dev">LAB DEV</span>
                <span className="zone-label zone-content">ESTÚDIO</span>
                <span className="zone-label zone-sales">COMERCIAL</span>
                <span className="zone-label zone-core">CORE OPS</span>
              </div>
            </div>

            {stations.map((station) => (
              <div key={station.id} className={station.className}>
                <span className="station-top"><b>{station.icon}</b></span>
                <span className="station-face" />
                <small>{station.label}</small>
              </div>
            ))}

            {props.map((item) => <span key={item} className={item} />)}

            <div className="path-line path-a" />
            <div className="path-line path-b" />

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
            <strong>Próximo upgrade técnico</strong>
            <p>Conectar OPENCLAW_GATEWAY_URL/TOKEN, consumir agentes/sessões/canais e manter fallback local quando o Gateway cair.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
