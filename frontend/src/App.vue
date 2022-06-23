<template>
  <div id="main" class="grid min-h-full place-items-center">
    <Form v-if="store.state == 'FORM'" />
    <Loader v-if="store.state == 'LOADING'" />
    <Report v-if="store.state == 'REPORT'" />
  </div>
  <footer class="bg-gray-700 px-6 py-4 text-white">
    <div
      class="w-3/2 mx-auto flex flex-col justify-between gap-2 md:w-1/2 md:flex-row"
    >
      <p>Site réalisé par Guillaume Roussin et Julian Trani</p>
      <p>
        Contribuer au projet sur
        <a
          href="https://github.com/Guillaume-prog/marks-parser"
          target="_blank"
          class="text-blue-400 underline underline-offset-2"
          >GitHub</a
        >
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Form from "./components/form.vue";
import Loader from "./components/loader.vue";
import Report from "./components/report.vue";
import { useStore } from "./store";

const store = useStore();
</script>

<style>
html,
body,
#app {
  @apply m-0 h-full w-full font-quicksand;
}

</style>
