export type AgentStatus = "executando" | "aguardando" | "bloqueado" | "online";

export type Agent = {
  id: string;
  name: string;
  role: string;
  room: string;
  status: AgentStatus;
  task: string;
  x: number;
  y: number;
  color: string;
  initials: string;
};

export const agents: Agent[] = [
  {
    id: "webceo",
    name: "WebCEO",
    role: "Estratégia e coordenação operacional",
    room: "Mesa central de comando",
    status: "executando",
    task: "Coordenando entregas, Jira e prioridades do dia",
    x: 46,
    y: 38,
    color: "#facc15",
    initials: "CEO",
  },
  {
    id: "webixtepo",
    name: "WebIxtepo",
    role: "Fullstack, automações, IA e infraestrutura",
    room: "Laboratório Dev",
    status: "executando",
    task: "Refatorando interface isométrica e preparando integração OpenClaw",
    x: 30,
    y: 67,
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
    x: 68,
    y: 63,
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
    x: 72,
    y: 31,
    color: "#a78bfa",
    initials: "LIA",
  },
];

export const metrics = [
  { label: "Agentes ativos", value: "4" },
  { label: "Entregas hoje", value: "1" },
  { label: "Bloqueios", value: "1" },
  { label: "Status operação", value: "Mock V2" },
];
