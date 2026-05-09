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
    room: "Sala Estratégica",
    status: "executando",
    task: "Coordenando entregas, Jira e prioridades do dia",
    x: 47,
    y: 35,
    color: "#facc15",
    initials: "CEO",
  },
  {
    id: "webixtepo",
    name: "WebIxtepo",
    role: "Fullstack, automações, IA e infraestrutura",
    room: "Laboratório Dev",
    status: "aguardando",
    task: "Aguardando validação de secrets/API para integrações",
    x: 23,
    y: 66,
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
    x: 73,
    y: 66,
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
    x: 76,
    y: 30,
    color: "#a78bfa",
    initials: "LIA",
  },
];

export const metrics = [
  { label: "Agentes ativos", value: "4" },
  { label: "Entregas hoje", value: "0" },
  { label: "Bloqueios", value: "1" },
  { label: "Status operação", value: "Monitorando" },
];
