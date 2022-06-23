<template>
  <div v-if="report != null" class="flex flex-col gap-6 p-3">
    <div>
      <div class="flex items-center justify-between">
        <button
          @click="store.state = 'FORM'"
          class="button border-gray-400 px-3 py-2 transition-colors focus:border-orange-400 focus:outline-none focus:ring-0"
        >
          Retour
        </button>

        <img class="h-10" alt="logo" src="../assets/images/logo-upssi.png" />
      </div>

      <h1 class="mb-6 mt-6 text-center text-2xl font-bold">
        Promotion {{ store.form.year }} - Semestre {{ store.form.semester }}
      </h1>

      <div class="flex justify-between">
        <h3 class="mt-3">Numéro étudiant : {{ report.id }}</h3>
        <button @click="generatePdf()" class="py-2">
          <img class="h-10" alt="pdf" src="../assets/images/pdf.png" />
        </button>
      </div>

      <p>Rang: {{ report.rank }}</p>

      <p>Ma note: {{ report.student }}</p>
      <p>
        min: {{ report.min }} - max: {{ report.max }} - moy:
        {{ report.average }}
      </p>
    </div>

    <div
      v-for="section in report.sections"
      id="section"
      class="flex flex-col gap-3"
    >
      <hr class="mb-3 rounded-full border border-gray-200" />

      <div class="flex justify-between">
        <h1 class="pr-2 text-lg font-bold">
          UE {{ report.sections.indexOf(section) + 1 }} - {{ section.name }}
        </h1>
        <p>{{ section.rank }}</p>
      </div>

      <div class="flex justify-between">
        <div>
          <p>Ma note: {{ section.student }}</p>
          <p>
            min: {{ section.min }} - max: {{ section.max }} - moy:
            {{ section.average }}
          </p>
        </div>

        <button class="py-2" @click="changedDetailState()">
          <vue-feather class="h-5" :type="changedImage()" />
        </button>
      </div>

      <table v-if="detail" class="border-collapse">
        <tr>
          <th>Matière</th>
          <th>Note Min</th>
          <th>Note Max</th>
          <th>Note Moy</th>
          <th>Ma note</th>
        </tr>

        <tr v-for="mark in section.marks">
          <td>{{ mark.name }}</td>
          <td>{{ round(mark.min) }}</td>
          <td>{{ round(mark.max) }}</td>
          <td>{{ round(mark.average) }}</td>
          <td>
            <b>{{ round(mark.student) }}</b>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const store = useStore();
const { report } = storeToRefs(store);

const detail = ref(true);

function round(mark: number): string {
  return (Math.round(mark * 100) / 100).toFixed(2);
}

function generatePdf() {
  window.alert("Fonctionnalité en cours de développement ;)");
}

function changedDetailState() {
  detail.value = !detail.value;
}

function changedImage(): string {
  return detail.value ? "minimize-2" : "maximize-2";
}
</script>

<style>
td,
th {
  @apply border border-gray-300 py-2 px-3 text-center;
}

td:first-child {
  @apply w-64 text-left;
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
</style>
