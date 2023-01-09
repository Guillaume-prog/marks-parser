<template>
  <!-- <div>Chart</div> -->
  <Bar :data="chartData" :options="chartOptions" />
  <!-- <v-chart
    class="chart overflow-hidden rounded-2xl"
    :option="option"
    theme="dark"
    autoresize
  /> -->
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";

import { ComputedRef } from "vue";

// CHART SETUP
ChartJS.register(BarElement, CategoryScale, LinearScale);

// PROPS HANDLING

const props = defineProps<{ marks: { [key: string]: string } }>();

// DATA GENERATION

const x_data = new Array(20).fill(0).map((_, i) => `${i + 1}`);

const marks_distribution = computed(() => {
  const marks: number[] = new Array(20).fill(0);

  for (const mark of Object.values(props.marks)) {
    const i = Number.parseFloat(mark);
    if (isNaN(i)) continue;

    marks[Math.floor(i) - 1]++;
  }

  return marks;
});

// CHART OPTIONS

const chartData = computed(() => ({
  labels: x_data,
  datasets: [
    {
      name: "Marks",
      backgroundColor: "#4F46E5",
      data: marks_distribution.value,
    },
  ],
}));

const chartOptions = {
  responsive: true,
};
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
