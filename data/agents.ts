export type AgentStatus = "executando" | "aguardando" | "bloqueado" | "online";

export type Agent = {
  id: string;
  name: string;
  role: string;
  room: string;
  status: AgentStatus;
  task: string;
  grid: { x: number; y: number };
  color: string;
  initials: string;
};

export const agents: Agent[] = [
  {
    id: "webceo",
    name: "WebCEO",
    role: "Estratégia e coordenação operacional",
    room: "War Room / comando central",
    status: "executando",
    task: "Coordenando prioridades, entregas e gargalos do dia",
    grid: { x: 8, y: 3 },
    color: "#facc15",
    initials: "CEO",
  },
  {
    id: "webixtepo",
    name: "WebIxtepo",
    role: "Fullstack, automações, IA e infraestrutura",
    room: "Lab Dev",
    status: "executando",
    task: "Recriando o Agent Office em tilemap top-down customizável",
    grid: { x: 4, y: 7 },
    color: "#38bdf8",
    initials: "IX",
  },
  {
    id: "webrafa",
    name: "WebRafa",
    role: "Comunicação, conteúdo e presença da marca",
    room: "Estúdio de Conteúdo",
    status: "online",
    task: "Pronto para campanhas, vídeos e posicionamento",
    grid: { x: 12, y: 7 },
    color: "#fb7185",
    initials: "RF",
  },
  {
    id: "weblia",
    name: "WebLia",
    role: "SDR, prospecção e qualificação comercial",
    room: "Sala Comercial",
    status: "bloqueado",
    task: "Precisa de lista de leads ou fonte pública definida",
    grid: { x: 15, y: 3 },
    color: "#a78bfa",
    initials: "LIA",
  },
];

export const metrics = [
  { label: "Agentes no mapa", value: String(agents.length) },
  { label: "Formato visual", value: "Top-down" },
  { label: "Mapa", value: "Tilemap" },
  { label: "Status operação", value: "V2" },
];
