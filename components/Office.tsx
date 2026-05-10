"use client";

import { CSSProperties, useState } from "react";
import { Agent, agents, metrics } from "@/data/agents";
import { officeMap, tileDefinitions, tileTheme } from "@/data/officeMap";

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
      className={`rpg-agent ${selected ? "selected" : ""}`}
      style={{
        "--agent-color": agent.color,
        "--agent-x": agent.grid.x,
        "--agent-y": agent.grid.y,
      } as CSSProperties}
      onClick={onClick}
      aria-label={`Selecionar ${agent.name}`}
    >
      <span className="rpg-agent-label">
        <span className={statusClass[agent.status]} />
        {agent.name}
      </span>
      <span className="rpg-agent-shadow" />
      <span className="rpg-agent-sprite">
        <span className="rpg-agent-hair" />
        <span className="rpg-agent-head" />
        <span className="rpg-agent-body">{agent.initials}</span>
        <span className="rpg-agent-feet" />
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
          <h1>Escritório RPG top-down</h1>
          <p className="subtitle">
            V2 simples no estilo Tibia-lite: mapa em tiles, agentes em grid e estrutura preparada para trocar tema/assets sem reescrever a tela.
          </p>
        </div>
        <div className="live-pill"><span /> Tilemap V2</div>
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
          <div className="map-header">
            <div>
              <strong>{tileTheme.name}</strong>
              <span>{officeMap.cols}x{officeMap.rows} tiles · customizável por dados</span>
            </div>
            <small>Sem engine pesada</small>
          </div>

          <div
            className="rpg-map"
            style={{
              "--cols": officeMap.cols,
              "--rows": officeMap.rows,
            } as CSSProperties}
            aria-label="Mapa top-down 2D do escritório virtual da Webfael"
          >
            <div className="map-plate" />
            <div className="tile-layer">
              {officeMap.tiles.map((tile) => {
                const definition = tileDefinitions[tile.type];
                return (
                  <div
                    key={tile.id}
                    className={`tile ${definition.className}`}
                    title={`${definition.label} (${tile.x}, ${tile.y})`}
                  >
                    {definition.glyph ? <span>{definition.glyph}</span> : null}
                    {tile.zone ? <em>{tile.zone}</em> : null}
                  </div>
                );
              })}
            </div>

            <div className="agent-layer">
              {agents.map((agent) => (
                <AgentAvatar key={agent.id} agent={agent} selected={agent.id === selectedId} onClick={() => setSelectedId(agent.id)} />
              ))}
            </div>
          </div>
        </div>

        <aside className="panel">
          <p className="panel-label">Agente selecionado</p>
          <h2>{selected.name}</h2>
          <span className={`badge ${selected.status}`}>{statusLabel[selected.status]}</span>
          <dl>
            <div><dt>Função</dt><dd>{selected.role}</dd></div>
            <div><dt>Sala</dt><dd>{selected.room}</dd></div>
            <div><dt>Grid</dt><dd>X {selected.grid.x} · Y {selected.grid.y}</dd></div>
            <div><dt>Tarefa atual</dt><dd>{selected.task}</dd></div>
          </dl>
          <div className="next-box">
            <strong>Próximo upgrade técnico</strong>
            <p>Substituir tiles CSS por PNG/SVG, plugar status real do OpenClaw e permitir edição visual do mapa.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
