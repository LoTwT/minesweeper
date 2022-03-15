export interface BlockState {
  x: number
  y: number
  // 是否被翻开
  revealed: boolean
  // 是不是炸弹
  mine: boolean
  // 是否被标记
  flagged: boolean
  adjacentMines: number
}

export type GameStatus = "play" | "won" | "lost"

export interface GameState {
  board: BlockState[][]
  mineGenerated: boolean
  status: GameStatus
  startMS: number
  endMS?: number
}
