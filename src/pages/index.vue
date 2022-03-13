<script setup lang="ts">
import type { BlockState, GameState } from "~/types"
import { isDev, toggleDev } from "~/composables"

let height = $ref(10)
let width = $ref(10)

let state = $ref<GameState>()

const reset = () => {
  state = {
    mineGenerated: false,
    gameState: "play",
    board: Array.from({ length: height }, (_, y) =>
      Array.from(
        { length: width },
        (_, x) =>
          ({
            x,
            y,
            adjacentMines: 0,
            revealed: false,
            flagged: false,
            mine: false,
          } as BlockState),
      ),
    ),
  }
}

// 生成炸弹
const generateMines = (state: BlockState[][], initial: BlockState) => {
  for (const row of state) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) <= 1) continue
      if (Math.abs(initial.y - block.y) <= 1) continue

      block.mine = Math.random() < 0.2
    }
  }

  updateNumbers(state)
}

const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
]

// 更新每个方块周围的炸弹数
const updateNumbers = (state: BlockState[][]) => {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine) return

      getSiblings(block).forEach((b) => {
        if (b.mine) block.adjacentMines += 1
      })
    })
  })
}

const onClick = (block: BlockState) => {
  if (state.gameState !== "play") return

  if (!state.mineGenerated) {
    generateMines(state.board, block)
    state.mineGenerated = true
  }

  // 展开
  block.revealed = true
  if (block.mine) {
    state.gameState = "lost"
    showAllMines()
    return
  }
  expandZero(block)
}

const expandZero = (block: BlockState) => {
  if (block.adjacentMines) return

  getSiblings(block).forEach((s) => {
    if (!s.revealed) {
      s.revealed = true
      expandZero(s)
    }
  })
}

const getSiblings = (block: BlockState) => {
  return directions
    .map(([dx, dy]) => {
      const x2 = block.x + dx
      const y2 = block.y + dy

      if (x2 < 0 || x2 >= width || y2 < 0 || y2 >= height) return undefined

      return state.board[y2][x2]
    })
    .filter(Boolean) as BlockState[]
}

// 右键标记
// 需要拦截 contextmenu
const onRightClick = (block: BlockState) => {
  if (state.gameState !== "play") return
  if (block.revealed) return
  block.flagged = !block.flagged
}

const checkGameState = () => {
  if (!state.mineGenerated) return

  const blocks = state.board.flat()

  if (blocks.every((block) => block.revealed || block.flagged)) {
    if (blocks.some((block) => block.flagged && !block.mine)) {
      state.gameState = "lost"
      showAllMines()
    } else {
      state.gameState = "won"
    }
  }
}

const showAllMines = () => {
  state.board.flat().forEach((i) => {
    if (i.mine) {
      i.revealed = true
    }
  })
}

reset()
watchEffect(checkGameState)
</script>

<template>
  <div>Minesweeper</div>

  <div p5 @contextmenu.prevent>
    <div
      v-for="(row, y) in state.board"
      :key="y"
      flex="~"
      justify-center
      items-center
    >
      <MineBlock
        v-for="(block, x) in row"
        :key="x"
        :block="block"
        @click="onClick(block)"
        @contextmenu.prevent="onRightClick(block)"
      />
    </div>
  </div>

  <div flex="~ gap-1" justify-center items-center>
    <button btn @click="toggleDev()">
      {{ isDev ? "DEV" : "NORMAL" }}
    </button>

    <button btn @click="reset()">RESET</button>
  </div>
</template>
