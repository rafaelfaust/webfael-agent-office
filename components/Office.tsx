"use client";

import { CSSProperties, useState } from "react";
import { Agent, agents } from "@/data/agents";
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
      className={`map-agent ${selected ? "selected" : ""}`}
      style={{
        "--agent-color": agent.color,
        "--agent-x": agent.grid.x,
        "--agent-y": agent.grid.y,
      } as CSSProperties}
      onClick={onClick}
      aria-label={`Selecionar ${agent.name}`}
    >
      <span className="agent-nameplate">
        <span className={statusClass[agent.status]} />
        {agent.name}
      </span>
      <span className="agent-shadow" />
      <span className="agent-sprite" aria-hidden="true">
        <span className="agent-hair" />
        <span className="agent-face" />
        <span className="agent-torso">{agent.initials}</span>
        <span className="agent-legs" />
      </span>
    </button>
  );
}

function AgentRow({ agent, selected, onClick }: { agent: Agent; selected: boolean; onClick: () => void }) {
  return (
    <button className={`agent-row ${selected ? "active" : ""}`} onClick={onClick}>
      <span className="agent-dot" style={{ background: agent.color }} />
      <span>
        <strong>{agent.name}</strong>
        <small>{statusLabel[agent.status]} · {agent.room}</small>
      </span>
    </button>
  );
}

export function Office() {
  const [selectedId, setSelectedId] = useState(agents[0].id);
  const selected = agents.find((agent) => agent.id === selectedId) ?? agents[0];

  return (
    <main className="game-shell">
      <section className="game-stage">
        <div className="game-topbar">
          <div>
            <span className="kicker">Webfael Agent Office</span>
            <h1>{tileTheme.name}</h1>
          </div>
          <div className="topbar-chip"><span /> Visual V3 · aprovação</div>
        </div>

        <div className="map-viewport">
          <div
            className="tile-map"
            style={{
              "--cols": officeMap.cols,
              "--rows": officeMap.rows,
            } as CSSProperties}
            aria-label="Mapa 2D top-down do escritório virtual da Webfael"
          >
            <div className="map-floor-glow" />
            <div className="tile-grid">
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
      </section>

      <aside className="hud-panel">
        <div className="hud-card brand-card">
          <span className="kicker">HUD</span>
          <strong>Operação Webfael</strong>
          <small>{officeMap.cols}x{officeMap.rows} tiles · CSS tilemap editável</small>
        </div>

        <div className="hud-card selected-card">
          <p className="hud-label">Selecionado</p>
          <h2>{selected.name}</h2>
          <span className={`badge ${selected.status}`}>{statusLabel[selected.status]}</span>
          <dl>
            <div><dt>Função</dt><dd>{selected.role}</dd></div>
            <div><dt>Posição</dt><dd>{selected.room} · X{selected.grid.x}/Y{selected.grid.y}</dd></div>
            <div><dt>Agora</dt><dd>{selected.task}</dd></div>
          </dl>
        </div>

        <div className="hud-card roster-card">
          <p className="hud-label">Agentes</p>
          <div className="roster">
            {agents.map((agent) => (
              <AgentRow key={agent.id} agent={agent} selected={agent.id === selectedId} onClick={() => setSelectedId(agent.id)} />
            ))}
          </div>
        </div>

        <div className="hud-card note-card">
          <strong>Próximo passo visual</strong>
          <p>Trocar os tiles CSS por sprites PNG/SVG próprios. A base ficou limpa para personalizar sem mexer na estrutura.</p>
        </div>
      </aside>
    </main>
  );
}
