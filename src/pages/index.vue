<script setup lang="ts">
import type { BlockState, GameState } from "~/types"
import { isDev, toggleDev } from "~/composables"
import { Ref } from "vue"

let height = $ref(12)
let width = $ref(12)
let mines = $ref(30)

const now = $(useNow())

const timerMS = $computed(() => Math.round((+now - state.value.startMS) / 1000))

const state = ref<GameState>() as Ref<GameState>
const blocks = computed(() => state.value.board.flat())

const minesRest = $computed(() => {
  if (!state.value.mineGenerated) return mines
  return blocks.value.reduce(
    (count, b) => count + (b.mine ? 1 : 0) - (b.flagged ? 1 : 0),
    0,
  )
})

const newGame = (difficulty: "easy" | "medium" | "hard") => {
  const map: Record<"easy" | "medium" | "hard", [number, number, number]> = {
    easy: [9, 9, 10],
    medium: [16, 16, 40],
    hard: [30, 16, 99],
  }

  reset(...map[difficulty])
}

const reset = (w = width, h = height, ms = mines) => {
  width = w
  height = h
  mines = ms

  state.value = {
    startMS: +Date.now(),
    mineGenerated: false,
    gameState: "play",
    board: Array.from({ length: h }, (_, y) =>
      Array.from(
        { length: w },
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

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randomInt = (min: number, max: number) => {
  return Math.round(random(min, max))
}

// 生成炸弹
const generateMines = (state: BlockState[][], initial: BlockState) => {
  const placeRandom = () => {
    const x = randomInt(0, width - 1)
    const y = randomInt(0, height - 1)
    const block = state[y][x]

    if (
      Math.abs(initial.x - block.x) <= 1 &&
      Math.abs(initial.y - block.y) <= 1
    )
      return false
    if (block.mine) return false

    block.mine = true
    return true
  }

  // 根据炸弹数随机挑选格子，设置为炸弹
  // Array.from 用于生成循环次数
  Array.from({ length: mines }, () => null).forEach(() => {
    while (!placeRandom()) {}
  })

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
  if (state.value.gameState !== "play") return

  if (!state.value.mineGenerated) {
    generateMines(state.value.board, block)
    state.value.mineGenerated = true
  }

  // 展开
  block.revealed = true
  if (block.mine) {
    state.value.gameState = "lost"
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

      return state.value.board[y2][x2]
    })
    .filter(Boolean) as BlockState[]
}

// 右键标记
// 需要拦截 contextmenu
const onRightClick = (block: BlockState) => {
  if (state.value.gameState !== "play") return
  if (block.revealed) return
  block.flagged = !block.flagged
}

const checkGameState = () => {
  if (!state.value.mineGenerated) return

  const blocks = state.value.board.flat()

  if (blocks.every((block) => block.revealed || block.flagged)) {
    if (blocks.some((block) => block.flagged && !block.mine)) {
      state.value.gameState = "lost"
      showAllMines()
    } else {
      state.value.gameState = "won"
    }
  }
}

const showAllMines = () => {
  state.value.board.flat().forEach((i) => {
    if (i.mine) {
      i.revealed = true
    }
  })
}

reset()
watchEffect(checkGameState)
useStorage("minesweeper", state)
</script>

<template>
  <div>Minesweeper</div>

  <div pt-3 flex="~ gap-1" justify-center items-center>
    <button btn @click="reset()">NEW GAME</button>
    <button btn @click="newGame('easy')">EASY</button>
    <button btn @click="newGame('medium')">MEDIUM</button>
    <button btn @click="newGame('hard')">HARD</button>
  </div>

  <div mt-5 flex="~ gap-10" justify-center>
    <div font-mono text-2xl flex="~ gap-1" items-center>
      <div i-carbon-timer />
      {{ timerMS }}
    </div>
    <div font-mono text-2xl flex="~ gap-1" items-center>
      <div i-mdi-mine />
      {{ minesRest }}
    </div>
  </div>

  <div p5 @contextmenu.prevent w-full overflow-auto>
    <div
      v-for="(row, y) in state.board"
      :key="y"
      flex="~"
      justify-center
      items-center
      w-max
      ma
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
  </div>

  <Confetti :passed="state.gameState === 'won'" />
</template>
