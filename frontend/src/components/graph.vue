<template>
  <v-chart
    class="chart overflow-hidden rounded-2xl"
    :option="option"
    autoresize
  />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";

import VChart, { THEME_KEY } from "vue-echarts";
import { provide, computed } from "vue";

// CHART SETUP

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, "dark");

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

const option = computed(() => ({
  xAxis: {
    data: x_data,
  },
  yAxis: {},
  series: [
    {
      name: "Notes",
      type: "bar",
      data: marks_distribution.value,
    },
  ],
}));
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
