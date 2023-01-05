<template>
  <Graph :marks="test_data" />
</template>

<script setup lang="ts">
import Graph from "./components/graph.vue";
import test_data from "./assets/test-data.json";

import { ref, provide } from "vue";

const user_id = ref("22109445");
</script>

<style>
html,
body,
#app {
  @apply m-0 h-full w-full font-quicksand;
}
</style>
