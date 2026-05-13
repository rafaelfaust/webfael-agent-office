export type TileType =
  | "floor"
  | "wall"
  | "desk"
  | "pc"
  | "plant"
  | "agentSpawn"
  | "rug"
  | "server"
  | "door"
  | "crate"
  | "board"
  | "counter"
  | "glass"
  | "sofa"
  | "console"
  | "coffee";

export type TileDefinition = {
  label: string;
  className: string;
  glyph?: string;
  blocking?: boolean;
};

export type Tile = {
  id: string;
  type: TileType;
  x: number;
  y: number;
  zone?: string;
};

export const tileTheme = {
  name: "Webfael Agent Office",
  subtitle: "Sala de comando dos agentes Webfael",
  version: "Visual V7",
  tileSize: 42,
  palette: {
    floor: "#c9b98c",
    wall: "#606873",
    accent: "#facc15",
  },
};

export const tileDefinitions: Record<TileType, TileDefinition> = {
  floor: { label: "Piso técnico", className: "tile-floor" },
  wall: { label: "Parede estrutural", className: "tile-wall", blocking: true },
  desk: { label: "Mesa operacional", className: "tile-desk", glyph: "▭", blocking: true },
  pc: { label: "Terminal", className: "tile-pc", glyph: "▣", blocking: true },
  plant: { label: "Planta", className: "tile-plant", glyph: "♣", blocking: true },
  agentSpawn: { label: "Base de agente", className: "tile-spawn", glyph: "◎" },
  rug: { label: "Corredor premium", className: "tile-rug" },
  server: { label: "Rack/Servidor", className: "tile-server", glyph: "▥", blocking: true },
  door: { label: "Porta/passagem", className: "tile-door", glyph: "═" },
  crate: { label: "Backlog", className: "tile-crate", glyph: "▤", blocking: true },
  board: { label: "Quadro de tarefas", className: "tile-board", glyph: "☷", blocking: true },
  counter: { label: "Balcão", className: "tile-counter", glyph: "▰", blocking: true },
  glass: { label: "Divisória de vidro", className: "tile-glass", glyph: "⌁", blocking: true },
  sofa: { label: "Lounge", className: "tile-sofa", glyph: "▱", blocking: true },
  console: { label: "Console de comando", className: "tile-console", glyph: "◈", blocking: true },
  coffee: { label: "Café/energia", className: "tile-coffee", glyph: "◒", blocking: true },
};

const legend: Record<string, TileType> = {
  ".": "floor",
  "#": "wall",
  "D": "desk",
  "C": "pc",
  "P": "plant",
  "S": "agentSpawn",
  "R": "rug",
  "V": "server",
  "=": "door",
  "B": "board",
  "K": "crate",
  "T": "counter",
  "G": "glass",
  "L": "sofa",
  "X": "console",
  "F": "coffee",
};

const zones: Record<string, string> = {
  "7,2": "Comando",
  "13,2": "Comercial",
  "4,9": "Lab Técnico",
  "12,9": "Estúdio",
  "8,6": "Corredor",
  "18,8": "Backlog",
  "10,10": "NOC",
};

export const mapRows = [
  "########################",
  "#P..B..X..G#..T..D..FP#",
  "#...D..S..G=..S..C..D.#",
  "#..CC..D..G#..D..D..L.#",
  "#........RR#RR.......L.#",
  "######===R...R===#######",
  "#........R...R........P#",
  "#..C..D..G#..D..C..B..#",
  "#..S..K..G=..S..D..K..#",
  "#..D..V..G#..B..K..V..#",
  "#P.....RRR...RRR.....P#",
  "########################",
];

export const officeMap = {
  rows: mapRows.length,
  cols: mapRows[0].length,
  tiles: mapRows.flatMap((row, y) =>
    [...row].map((char, x) => ({
      id: `${x}-${y}`,
      type: legend[char] ?? "floor",
      x,
      y,
      zone: zones[`${x},${y}`],
    }))
  ) satisfies Tile[],
};
