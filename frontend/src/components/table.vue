<template>
  <hr class="mb-3 rounded-full border border-gray-200" />

  <div class="flex justify-between">
    <h1 class="pr-2 text-lg font-bold">UE {{ numUE }} - {{ ue.name }}</h1>
    <p>{{ ue.rank }}</p>
  </div>

  <div class="flex justify-between">
    <div>
      <p>Ma note: {{ ue.student }}</p>
      <p>
        min: {{ ue.min }} - max: {{ ue.max }} - moy:
        {{ ue.average }}
      </p>
    </div>

    <button class="py-2" @click="changedDetailState()">
      <vue-feather class="h-5" :type="changedImage()" />
    </button>
  </div>

  <table v-if="detail" class="border-collapse text-xs md:text-base">
    <tr>
      <th>Matière</th>
      <th>Note Min</th>
      <th>Note Max</th>
      <th>Note Moy</th>
      <th>Ma note</th>
    </tr>

    <tr v-for="mark in ue.marks">
      <td>{{ mark.name }}</td>
      <td>{{ round(mark.min) }}</td>
      <td>{{ round(mark.max) }}</td>
      <td>{{ round(mark.average) }}</td>
      <td>
        <b>{{ round(mark.student) }}</b>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Stats = {
  student: number;
  max: number;
  min: number;
  average: number;
};

type Mark = Stats & {
  code: string;
  name: string;
};

type UE = Mark & {
  rank: string;
  marks: Mark[];
};

const detail = ref(true);
const props = defineProps<{
  numUE: number;
  ue: UE;
}>();

function round(mark: number): string {
  return (Math.round(mark * 100) / 100).toFixed(2);
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
