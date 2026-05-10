export type TileType = "floor" | "wall" | "desk" | "pc" | "plant" | "agentSpawn" | "rug" | "server" | "door";

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
  name: "Webfael Tibia-lite",
  tileSize: 42,
  palette: {
    floor: "#b98b56",
    wall: "#5b4636",
    accent: "#facc15",
  },
};

export const tileDefinitions: Record<TileType, TileDefinition> = {
  floor: { label: "Piso", className: "tile-floor" },
  wall: { label: "Parede", className: "tile-wall", blocking: true },
  desk: { label: "Mesa", className: "tile-desk", glyph: "▭", blocking: true },
  pc: { label: "Computador", className: "tile-pc", glyph: "▣", blocking: true },
  plant: { label: "Planta", className: "tile-plant", glyph: "♣", blocking: true },
  agentSpawn: { label: "Spawn de agente", className: "tile-spawn", glyph: "◎" },
  rug: { label: "Tapete", className: "tile-rug" },
  server: { label: "Rack/Servidor", className: "tile-server", glyph: "▥", blocking: true },
  door: { label: "Porta", className: "tile-door", glyph: "═" },
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
};

const zones: Record<string, string> = {
  "3,2": "War Room",
  "8,2": "Comando",
  "13,2": "Comercial",
  "4,8": "Lab Dev",
  "12,8": "Estúdio",
};

export const mapRows = [
  "##################",
  "#P....V....C....P#",
  "#..DD.....DD..DD.#",
  "#..CS..R..S...SC.#",
  "#......RRRR......#",
  "#..####....####..#",
  "#......RRRR......#",
  "#..CS..R..S...SC.#",
  "#..DD.....DD..DD.#",
  "#P....V....C....P#",
  "#=======..=======#",
  "##################",
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
