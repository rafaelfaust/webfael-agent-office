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
};

export const agents: Agent[] = [
  {
    id: "webceo",
    name: "WebCEO",
    role: "Estratégia e coordenação operacional",
    room: "Sala de Comando",
    status: "executando",
    task: "Circulando entre Jira, entregas e prioridades críticas",
    grid: { x: 8, y: 3 },
    workPath: [
      { x: 8, y: 3 },
      { x: 8, y: 5 },
      { x: 6, y: 5 },
      { x: 6, y: 3 },
    ],
    color: "#facc15",
    initials: "CEO",
  },
  {
    id: "webixtepo",
    name: "WebIxtepo",
    role: "Fullstack, automações, IA e infraestrutura",
    room: "Laboratório Técnico",
    status: "executando",
    task: "Ajustando sistemas, automações e integrações",
    grid: { x: 4, y: 8 },
    workPath: [
      { x: 4, y: 8 },
      { x: 5, y: 8 },
      { x: 5, y: 10 },
      { x: 3, y: 10 },
      { x: 3, y: 8 },
    ],
    color: "#38bdf8",
    initials: "IX",
  },
  {
    id: "webrafa",
    name: "WebRafa",
    role: "Comunicação, conteúdo e presença da marca",
    room: "Estúdio de Comunicação",
    status: "online",
    task: "Preparando conteúdo, atendimento e presença visual",
    grid: { x: 12, y: 8 },
    workPath: [
      { x: 12, y: 8 },
      { x: 14, y: 8 },
      { x: 14, y: 10 },
      { x: 12, y: 10 },
    ],
    color: "#fb7185",
    initials: "RF",
  },
  {
    id: "weblia",
    name: "WebLia",
    role: "SDR, prospecção e qualificação comercial",
    room: "Sala Comercial",
    status: "executando",
    task: "Mapeando leads e fazendo follow-up consultivo",
    grid: { x: 15, y: 3 },
    workPath: [
      { x: 15, y: 3 },
      { x: 13, y: 3 },
      { x: 13, y: 5 },
      { x: 16, y: 5 },
      { x: 16, y: 3 },
    ],
    color: "#a78bfa",
    initials: "LIA",
  },
];

export const metrics = [
  { label: "Agentes no mapa", value: String(agents.length) },
  { label: "Formato visual", value: "Top-down" },
  { label: "Mapa", value: "Tilemap" },
  { label: "Status operação", value: "V4" },
];
