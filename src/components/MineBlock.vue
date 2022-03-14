<script setup lang="ts">
import type { BlockState } from "~/types"
import { isDev } from "~/composables"

defineProps<{ block: BlockState }>()

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
  if (block.flagged) return "bg-gray-500/20"
  if (!block.revealed) return "bg-gray-500/20 hover:bg-gray/40"
  return block.mine ? "text-red" : numberColors[block.adjacentMines]
}
</script>

<template>
  <button
    m="0.5"
    flex="~"
    justify-center
    items-center
    min-w-8
    min-h-8
    border="1 gray-400/30"
    :class="getBlockClass(block)"
  >
    <template v-if="block.flagged">
      <div i-mdi-flag text-red />
    </template>
    <template v-else-if="block.revealed || isDev">
      <div v-if="block.mine" i-mdi-mine />
      <div v-else font-bold>{{ block.adjacentMines }}</div>
    </template>
  </button>
</template>
