export type AgentStatus = "executando" | "aguardando" | "bloqueado" | "online";

export type Agent = {
  id: string;
  name: string;
  role: string;
  room: string;
  status: AgentStatus;
  task: string;
  grid: { x: number; y: number };
  workPath: { x: number; y: number }[];
  color: string;
  initials: string;
  load: number;
  tokenUsage: number;
  contextLimit: number;
  automationScore: number;
  risk: "baixo" | "medio" | "alto";
  mood: string;
  queue: string[];
};

export const agents: Agent[] = [
  {
    id: "webceo",
    name: "WebCEO",
    role: "Estratégia e coordenação operacional",
    room: "Sala de Comando",
    status: "executando",
    task: "Orquestrando prioridades, gargalos e handoffs",
    grid: { x: 8, y: 3 },
    workPath: [
      { x: 8, y: 3 },
      { x: 8, y: 5 },
      { x: 6, y: 5 },
      { x: 6, y: 3 },
    ],
    color: "#facc15",
    initials: "CEO",
    load: 76,
    tokenUsage: 11800,
    contextLimit: 16000,
    automationScore: 81,
    risk: "medio",
    mood: "Modo comando",
    queue: ["Prioridade do dia", "Risco de entrega", "Handoff técnico", "Limite sob controle"],
  },
  {
    id: "webixtepo",
    name: "WebIxtepo",
    role: "Fullstack, automações, IA e infraestrutura",
    room: "Laboratório Técnico",
    status: "executando",
    task: "Entregando V5 premium do Agent Office",
    grid: { x: 4, y: 8 },
    workPath: [
      { x: 4, y: 8 },
      { x: 5, y: 8 },
      { x: 5, y: 10 },
      { x: 3, y: 10 },
    ],
    color: "#38bdf8",
    initials: "IX",
    load: 88,
    tokenUsage: 14100,
    contextLimit: 16000,
    automationScore: 92,
    risk: "alto",
    mood: "Buildando",
    queue: ["V5 visual", "HUD de limites", "Build verde", "Sem API paga"],
  },
  {
    id: "webrafa",
    name: "WebRafa",
    role: "Comunicação, conteúdo e presença da marca",
    room: "Estúdio de Comunicação",
    status: "online",
    task: "Preparando narrativa visual e presença da marca",
    grid: { x: 12, y: 8 },
    workPath: [
      { x: 12, y: 8 },
      { x: 14, y: 8 },
      { x: 14, y: 10 },
      { x: 12, y: 10 },
    ],
    color: "#fb7185",
    initials: "RF",
    load: 54,
    tokenUsage: 7200,
    contextLimit: 16000,
    automationScore: 68,
    risk: "baixo",
    mood: "Em criação",
    queue: ["Storytelling", "Reels/preview", "Tom da marca"],
  },
  {
    id: "weblia",
    name: "WebLia",
    role: "SDR, prospecção e qualificação comercial",
    room: "Sala Comercial",
    status: "executando",
    task: "Organizando leads, sinais de dor e follow-up",
    grid: { x: 15, y: 3 },
    workPath: [
      { x: 15, y: 3 },
      { x: 13, y: 3 },
      { x: 13, y: 5 },
      { x: 16, y: 5 },
    ],
    color: "#a78bfa",
    initials: "LIA",
    load: 63,
    tokenUsage: 9800,
    contextLimit: 16000,
    automationScore: 74,
    risk: "medio",
    mood: "Prospectando",
    queue: ["Leads PMEs", "Follow-up", "Diagnóstico"],
  },
];

export const operations = [
  { label: "Entregas hoje", value: "9", tone: "green" },
  { label: "Tarefas ativas", value: "21", tone: "yellow" },
  { label: "Limite médio", value: "67%", tone: "red" },
  { label: "Automação", value: "79%", tone: "blue" },
];

export const deliveryBoard = [
  { title: "Agent Office V5", owner: "WebIxtepo", state: "Entrega hoje", progress: 96 },
  { title: "Pipeline SDR", owner: "WebLia", state: "Rodando", progress: 64 },
  { title: "Conteúdo premium", owner: "WebRafa", state: "Roteiro", progress: 48 },
  { title: "Prioridade semanal", owner: "WebCEO", state: "Decisão", progress: 78 },
];

export const limitPolicy = {
  source: "Estimativa local sem API paga",
  warning: 75,
  danger: 88,
  mitigation: [
    "Resumir contexto antes de estourar janela",
    "Quebrar execução longa em handoffs menores",
    "Registrar estado em arquivo/commit em vez de depender do chat",
  ],
};

export const metrics = [
  { label: "Agentes no mapa", value: String(agents.length) },
  { label: "Formato visual", value: "Top-down" },
  { label: "Mapa", value: "Tilemap V5" },
  { label: "Status operação", value: "Online" },
];
