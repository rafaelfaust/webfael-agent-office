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
  | "counter";

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
  subtitle: "Central visual dos agentes operacionais",
  tileSize: 42,
  palette: {
    floor: "#c9b98c",
    wall: "#606873",
    accent: "#facc15",
  },
};

export const tileDefinitions: Record<TileType, TileDefinition> = {
  floor: { label: "Piso", className: "tile-floor" },
  wall: { label: "Parede", className: "tile-wall", blocking: true },
  desk: { label: "Mesa de trabalho", className: "tile-desk", glyph: "▭", blocking: true },
  pc: { label: "Computador", className: "tile-pc", glyph: "▣", blocking: true },
  plant: { label: "Planta", className: "tile-plant", glyph: "♣", blocking: true },
  agentSpawn: { label: "Ponto de agente", className: "tile-spawn", glyph: "◎" },
  rug: { label: "Tapete/corredor", className: "tile-rug" },
  server: { label: "Rack/Servidor", className: "tile-server", glyph: "▥", blocking: true },
  door: { label: "Porta/passagem", className: "tile-door", glyph: "═" },
  crate: { label: "Caixa/backlog", className: "tile-crate", glyph: "▤", blocking: true },
  board: { label: "Quadro de tarefas", className: "tile-board", glyph: "☷", blocking: true },
  counter: { label: "Balcão", className: "tile-counter", glyph: "▰", blocking: true },
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
};

const zones: Record<string, string> = {
  "7,2": "Comando",
  "13,2": "Comercial",
  "4,9": "Lab Técnico",
  "12,9": "Estúdio",
  "8,6": "Corredor",
};

export const mapRows = [
  "####################",
  "#P..B..V..#..T..D.P#",
  "#...D..S..=..S..C..#",
  "#...C..D..#..D..D..#",
  "#........R#R.......#",
  "######===R.R===#####",
  "#........R.R.......#",
  "#..C..D..#..D..C..P#",
  "#..S..K..=..S..D...#",
  "#..D..V..#..B..K...#",
  "#P......R.R.......P#",
  "####################",
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
