"use client";

import { CSSProperties, useMemo, useState } from "react";
import { Agent, agents, deliveryBoard, limitPolicy, operations } from "@/data/agents";
import { officeMap, tileTheme } from "@/data/officeMap";

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

const pct = (value: number, total: number) => Math.min(100, Math.round((value / total) * 100));

const scenePositions: Record<string, { x: number; y: number; scale?: number }> = {
  webceo: { x: 46, y: 43, scale: 1.02 },
  weblia: { x: 73, y: 43, scale: 1 },
  webixtepo: { x: 28, y: 72, scale: 1.04 },
  webrafa: { x: 72, y: 72, scale: 1.04 },
};

function LimitMeter({ value, limit }: { value: number; limit: number }) {
  const percent = pct(value, limit);
  const tone = percent >= limitPolicy.danger ? "danger" : percent >= limitPolicy.warning ? "warn" : "safe";

  return (
    <div className={`limit-meter ${tone}`}>
      <span><b>{percent}%</b> contexto</span>
      <i style={{ "--limit": `${percent}%` } as CSSProperties} />
      <small>{value.toLocaleString("pt-BR")} / {limit.toLocaleString("pt-BR")} tokens estimados</small>
    </div>
  );
}

function AgentAvatar({ agent, selected, onClick }: { agent: Agent; selected: boolean; onClick: () => void }) {
  const position = scenePositions[agent.id] ?? { x: 50, y: 50, scale: 1 };

  return (
    <button
      className={`scene-agent agent-${agent.id} ${agent.status === "executando" ? "is-working" : ""} ${selected ? "selected" : ""}`}
      style={{
        "--agent-color": agent.color,
        "--scene-x": `${position.x}%`,
        "--scene-y": `${position.y}%`,
        "--scene-scale": position.scale ?? 1,
      } as CSSProperties}
      onClick={onClick}
      aria-label={`Selecionar ${agent.name}`}
    >
      <span className="agent-task-bubble">{agent.task}</span>
      <span className="agent-nameplate">
        <span className={statusClass[agent.status]} />
        {agent.name}
      </span>
      <img className="agent-image" src={`/agents/${agent.id}.png`} alt="" aria-hidden="true" />
    </button>
  );
}

function WorldProps() {
  return (
    <div className="world-props" aria-hidden="true">
      <span className="prop command-room-window" />
      <span className="prop skyline skyline-a" />
      <span className="prop skyline skyline-b" />
      <span className="prop central-command-table" />
      <span className="prop central-hologram" />
      <span className="prop hologram-ring ring-a" />
      <span className="prop hologram-ring ring-b" />
      <span className="prop ceiling-light light-a" />
      <span className="prop ceiling-light light-b" />
      <span className="prop neon-route route-a" />
      <span className="prop neon-route route-b" />
      <span className="prop light-cone command" />
      <span className="prop light-cone sales" />
      <span className="prop light-cone lab" />
      <span className="prop wall-depth north" />
      <span className="prop wall-depth west" />
      <span className="prop glass-reflection command" />
      <span className="prop glass-reflection studio" />
      <span className="prop cable cable-a" />
      <span className="prop cable cable-b" />
      <span className="room-plaque plaque-command">COMANDO · prioridades</span>
      <span className="room-plaque plaque-sales">COMERCIAL · leads</span>
      <span className="room-plaque plaque-lab">LAB · builds</span>
      <span className="room-plaque plaque-studio">ESTÚDIO · conteúdo</span>
    </div>
  );
}

function AgentRow({ agent, selected, onClick }: { agent: Agent; selected: boolean; onClick: () => void }) {
  const usage = pct(agent.tokenUsage, agent.contextLimit);
  return (
    <button className={`agent-row ${selected ? "active" : ""}`} onClick={onClick}>
      <span className="agent-dot" style={{ background: agent.color }} />
      <span>
        <strong>{agent.name}</strong>
        <small>{statusLabel[agent.status]} · limite {usage}% · {agent.room}</small>
      </span>
      <span className="agent-load" style={{ "--load": `${agent.load}%` } as CSSProperties} />
    </button>
  );
}

function SquadMatrix({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <div className="squad-matrix">
      {agents.map((agent) => (
        <button key={agent.id} className={`squad-card ${agent.id === selectedId ? "active" : ""}`} onClick={() => onSelect(agent.id)}>
          <span style={{ "--agent-color": agent.color } as CSSProperties}>{agent.initials}</span>
          <strong>{agent.name}</strong>
          <small>{agent.task}</small>
          <i style={{ "--auto": `${agent.automationScore}%` } as CSSProperties} />
        </button>
      ))}
    </div>
  );
}

function MiniMap() {
  const importantTiles = useMemo(() => officeMap.tiles.filter((tile) => tile.zone), []);

  return (
    <div className="mini-map" style={{ "--cols": officeMap.cols, "--rows": officeMap.rows } as CSSProperties}>
      {importantTiles.map((tile) => <span key={tile.id} style={{ gridColumn: tile.x + 1, gridRow: tile.y + 1 }} title={tile.zone} />)}
    </div>
  );
}

function BrandCard() {
  return (
    <div className="hud-card brand-card compact-card">
      <span className="kicker">HUD</span>
      <strong>Operação Webfael</strong>
      <small>{officeMap.cols}x{officeMap.rows} tiles · visual validável no mapa, sem card lateral roubando espaço</small>
      <MiniMap />
    </div>
  );
}

function SelectedAgentCard({ selected }: { selected: Agent }) {
  return (
    <div className="hud-card selected-card priority-card">
      <p className="hud-label">Agente selecionado</p>
      <div className="selected-card-head">
        <h2>{selected.name}</h2>
        <div className="selected-meta">
          <span className={`badge ${selected.status}`}>{statusLabel[selected.status]}</span>
          <span className={`risk risk-${selected.risk}`}>Risco {selected.risk}</span>
          <span className="mood">{selected.mood}</span>
        </div>
      </div>
      <dl className="selected-summary">
        <div><dt>Função</dt><dd>{selected.role}</dd></div>
        <div><dt>Base</dt><dd>{selected.room} · X{selected.grid.x}/Y{selected.grid.y}</dd></div>
        <div><dt>Agora</dt><dd>{selected.task}</dd></div>
      </dl>
      <div className="agent-meters inline-meters">
        <LimitMeter value={selected.tokenUsage} limit={selected.contextLimit} />
        <div className="automation-meter">
          <span><b>{selected.automationScore}%</b> automação operacional</span>
          <i style={{ "--auto": `${selected.automationScore}%` } as CSSProperties} />
        </div>
      </div>
    </div>
  );
}

function RosterCard({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <div className="hud-card roster-card">
      <p className="hud-label">Agentes</p>
      <div className="roster">
        {agents.map((agent) => (
          <AgentRow key={agent.id} agent={agent} selected={agent.id === selectedId} onClick={() => onSelect(agent.id)} />
        ))}
      </div>
    </div>
  );
}

function DeliveryCard() {
  return (
    <div className="hud-card delivery-card">
      <p className="hud-label">Painel de entregas</p>
      <div className="delivery-list">
        {deliveryBoard.map((item) => (
          <article key={item.title}>
            <div>
              <strong>{item.title}</strong>
              <small>{item.owner} · {item.state}</small>
            </div>
            <span>{item.progress}%</span>
            <i style={{ "--progress": `${item.progress}%` } as CSSProperties} />
          </article>
        ))}
      </div>
    </div>
  );
}

function LimitNoteCard({ selected }: { selected: Agent }) {
  return (
    <div className="hud-card note-card">
      <strong>Fila e limite operacional</strong>
      <div className="queue-list compact-queue">
        {selected.queue.map((item) => <span key={item}>{item}</span>)}
      </div>
      <p>Limite local/estimado. Se for limite real de modelo/API, depende do provedor; mitigação curta: resumir contexto, quebrar tarefas e salvar estado.</p>
      <ul>
        {limitPolicy.mitigation.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function Office() {
  const [selectedId, setSelectedId] = useState(agents[0].id);
  const selected = agents.find((agent) => agent.id === selectedId) ?? agents[0];
  const averageLimit = Math.round(agents.reduce((sum, agent) => sum + pct(agent.tokenUsage, agent.contextLimit), 0) / agents.length);
  const activeAgents = agents.filter((agent) => agent.status === "executando").length;

  return (
    <main className="game-shell">
      <section className="game-stage">
        <div className="game-topbar">
          <div>
            <span className="kicker">{tileTheme.name} · {tileTheme.version}</span>
            <h1>{tileTheme.subtitle}</h1>
          </div>
          <div className="topbar-actions">
            <div className="topbar-chip"><span /> Operação online</div>
            <div className="topbar-chip ghost">{activeAgents}/{agents.length} agentes executando · limite médio {averageLimit}%</div>
          </div>
        </div>

        <div className="priority-dashboard">
          <SelectedAgentCard selected={selected} />
          <div className="ops-strip">
            {operations.map((op) => (
              <div className={`op-card ${op.tone}`} key={op.label}>
                <strong>{op.value}</strong>
                <span>{op.label}</span>
              </div>
            ))}
          </div>
          <BrandCard />
        </div>

        <div className="map-viewport image-viewport">
          <div className="viewport-scanline" />
          <div className="agent-room-scene" aria-label="Sala de comando visual dos agentes Webfael">
            <img className="room-background" src="/agent-room/command-room.png" alt="Sala de comando futurista dos agentes Webfael" />
            <div className="agent-layer scene-layer">
              {agents.map((agent) => (
                <AgentAvatar key={agent.id} agent={agent} selected={agent.id === selectedId} onClick={() => setSelectedId(agent.id)} />
              ))}
            </div>
            <div className="scene-hud scene-hud-left">Central IA · Webfael</div>
            <div className="scene-hud scene-hud-right">Clique nos agentes</div>
          </div>
        </div>

        <div className="support-dashboard">
          <div className="hud-card squad-dashboard-card">
            <p className="hud-label">Matriz dos agentes</p>
            <SquadMatrix selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <RosterCard selectedId={selectedId} onSelect={setSelectedId} />
          <DeliveryCard />
          <LimitNoteCard selected={selected} />
        </div>
      </section>
    </main>
  );
}
