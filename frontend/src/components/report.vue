<template>
  <div v-if="report != null" id="report" class="flex flex-col gap-6 p-4">
    <div>
      <div id="header" class="flex items-center justify-between">
        <button
          @click="store.state = 'FORM'"
          class="button border-gray-400 px-3 py-2 transition-colors focus:border-orange-400 focus:outline-none focus:ring-0"
        >
          Retour
        </button>

        <img class="h-10" alt="logo" src="../assets/images/logo-upssi.png" />
      </div>

      <h1 id="h1" class="my-6 mx-6 text-center text-2xl font-bold">
        Promotion {{ store.form.year }} - Semestre {{ store.form.semester }}
      </h1>

      <div id="info-1" class="flex justify-between">
        <h3 class="mt-3">Numéro étudiant : {{ report.id }}</h3>
        <button @click="generatePdf()" class="py-2">
          <img class="h-10" alt="pdf" src="../assets/images/pdf.png" />
        </button>
      </div>

      <div id="info-2">
        <p>Rang: {{ report.rank }}</p>

        <p>Ma note: {{ report.student }}</p>
        <p>
          min: {{ report.min }} - max: {{ report.max }} - moy:
          {{ report.average }}
        </p>
      </div>
    </div>

    <div
      id="ue"
      v-for="(section, index) in report.sections"
      class="flex flex-col gap-3"
    >
      <Table :numUE="index + 1" :ue="section"></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from "./table.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const store = useStore();
const { report } = storeToRefs(store);

function generatePdf() {
  window.alert("Fonctionnalité en cours de développement ;)");
}
</script>

<style scoped>
td,
th {
  @apply border border-gray-300 py-2 px-3 text-center;
}

td:first-child {
  @apply w-auto break-words text-left;
}

th {
  @apply border-orange-400;
}

table tr:first-child {
  @apply rounded-tl-lg rounded-tr-lg;
}

tr:nth-child(2n + 1) {
  @apply bg-gray-100;
}

tr:first-child {
  @apply bg-orange-300;
}

#header {
  animation: 1s fadeIn ease-in-out backwards;
  animation-delay: 0.1s;
}

#h1 {
  animation: 1s fadeIn ease-in-out backwards;
  animation-delay: 0.3s;
}

#info-1 {
  animation: 1s fadeIn ease-in-out backwards;
  animation-delay: 0.5s;
}

#info-2 {
  animation: 1s fadeIn ease-in-out backwards;
  animation-delay: 0.7s;
}

#ue {
  animation: 1s fadeIn ease-in-out backwards;
  animation-delay: 0.9s;
}
</style>
