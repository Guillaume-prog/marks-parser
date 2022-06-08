<template>
  <div v-if="report != null" class="flex flex-col gap-6 p-6">
    <div>
      <h1>
        Promotion {{ store.form.year }} - Semestre {{ store.form.semester }}
      </h1>
      <h1>{{ report.id }}</h1>
      <p>Rang: {{ report.rank }}</p>

      <p>Ma note: {{ report.student }}</p>
      <p>
        min: {{ report.min }} - max: {{ report.max }} - moy:
        {{ report.average }}
      </p>
    </div>

    <div v-for="section in report.sections" class="flex flex-col gap-3">
      <hr class="mb-3 rounded-full border border-gray-200" />

      <div class="flex justify-between">
        <h1 class="text-lg font-bold">
          UE {{ report.sections.indexOf(section) + 1 }} - {{ section.name }}
        </h1>
        <p>{{ section.rank }}</p>
      </div>

      <div>
        <div>
          <p>Ma note: {{ section.student }}</p>
          <p>
            min: {{ section.min }} - max: {{ section.max }} - moy:
            {{ section.average }}
          </p>
        </div>
      </div>

      <table class="border-collapse">
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

const store = useStore();
const { report } = storeToRefs(store);

function round(mark: number): string {
  return (Math.round(mark * 100) / 100).toFixed(2);
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
  @apply border-purple-700;
}

table tr:first-child {
  @apply rounded-tl-lg rounded-tr-lg;
}

tr:nth-child(2n + 1) {
  @apply bg-gray-100;
}

tr:first-child {
  @apply bg-purple-500;
}
</style>
