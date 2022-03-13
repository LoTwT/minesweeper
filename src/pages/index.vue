<script setup lang="ts">
interface BlockState {
  x: number
  y: number
  // 是否被翻开
  revealed: boolean
  // 是不是炸弹
  mine?: boolean
  // 是否被标记
  flagged?: boolean
  adjacentMines: number
}

const height = $ref(10)
const width = $ref(10)

const state = $ref(
  Array.from({ length: height }, (_, y) =>
    Array.from(
      { length: width },
      (_, x) =>
        ({
          x,
          y,
          adjacentMines: 0,
          revealed: false,
        } as BlockState),
    ),
  ),
)

// 生成炸弹
const generateMines = (initial: BlockState) => {
  for (const row of state) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) <= 1) continue
      if (Math.abs(initial.y - block.y) <= 1) continue

      block.mine = Math.random() < 0.2
    }
  }

  updateNumbers()
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
const updateNumbers = () => {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine) return

      getSiblings(block).forEach((b) => {
        if (b.mine) block.adjacentMines += 1
      })
    })
  })
}

const numberColors = [
  "text-transparent",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-orange-500",
  "text-red-500",
  "text-purple-500",
  "text-pink-500",
  "text-teal-500",
]

const getBlockClass = (block: BlockState) => {
  if (!block.revealed) return "bg-gray-500/10"
  return block.mine ? "text-red" : numberColors[block.adjacentMines]
}

let mineGenerated = $ref(false)
let dev = $ref(false)

const onClick = (block: BlockState) => {
  if (!mineGenerated) {
    generateMines(block)
    mineGenerated = true
  }

  // 展开
  block.revealed = true
  if (block.mine) alert("boom")
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

      return state[y2][x2]
    })
    .filter(Boolean) as BlockState[]
}
</script>

<template>
  <div>Minesweeper</div>

  <div p5>
    <div
      v-for="(row, y) in state"
      :key="y"
      flex="~"
      justify-center
      items-center
    >
      <button
        v-for="(block, x) in row"
        :key="x"
        m="0.5"
        flex="~"
        justify-center
        items-center
        w-10
        h-10
        border="1 gray-400/30"
        hover="bg-gray/20"
        :class="getBlockClass(block)"
        @click="onClick(block)"
      >
        <template v-if="block.revealed || dev">
          <div v-if="block.mine" i-mdi-mine />
          <div v-else>{{ block.adjacentMines }}</div>
        </template>
      </button>
    </div>
  </div>
</template>
