<script setup lang="ts"></script>

<template>
  <div>Minesweeper</div>

  <div v-for="y in 10" :key="y">
    <button v-for="x in 10" :key="x" w-5 h-5 border>{{ y * 10 + x }}</button>
  </div>
</template>
