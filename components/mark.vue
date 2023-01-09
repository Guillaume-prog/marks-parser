<template>
  <div>
    <p class="text-xl font-bold">
      <span class="text-4xl">{{ mark || "" }}</span
      >/20
    </p>
    <p class="text-sm uppercase opacity-60">{{ desc }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ mark?: string; desc: string }>();
</script>

<style scoped></style>
