<template>
  <div v-if="data">
    <Graph :marks="data" class="aspect-[4/3]" />
    <div class="mt-6 flex justify-between items-center gap-6">
      <Mark :mark="my_mark" desc="Ma note" />
      <div class="borde-2 h-full border-neutral-300"></div>
      <Mark :mark="average_mark" desc="Moyenne" />
      <Mark :mark="min" desc="Note min" />
      <Mark :mark="max" desc="Note max" />
    </div>
  </div>
  <div v-else>
    <p class="text-center">Aucune note disponible</p>
  </div>
</template>

<script setup lang="ts">
import { MarksFile } from "@/types";

const props = defineProps<{ data: MarksFile | null; student_id: string }>();

const my_mark = computed(() => {
  if (!props.data) return "-";
  return props.data[props.student_id];
});

const marks = computed(() => {
  const marks = Object.values(props.data ?? {})
    .map((mark: string) => Number.parseFloat(mark.replace(",", ".")))
    .filter((mark: number) => !isNaN(mark));
  return marks;
});

const average_mark = computed(() => {
  const sum = marks.value.reduce((acc, mark) => acc + mark, 0);
  return (sum / marks.value.length).toFixed(2);
});

const min = computed(() => {
  return Math.min(...marks.value).toString();
});

const max = computed(() => {
  return Math.max(...marks.value).toString();
});
</script>

<style scoped></style>
