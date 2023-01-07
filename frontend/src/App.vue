<template>
  <div class="grid h-full sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1 place-items-center p-4">
    <div class="flex flex-col gap-4">
      <select v-model="cur_file" @change="update_data">
        <option value="UE72-Python_DS">UE72 - Python DS</option>
        <option value="UE72-Python_TP">UE72 - Python TP</option>
        <option value="UE73-Modelisation">UE73 - Modélisation</option>
        <option value="UE73-Analyse_DS">UE73 - Analyse de robots DS</option>
        <option value="UE73-Analyse_TP">UE73 - Analyse de robots TP</option>
        <option value="UE73-ROS">UE73 - ROS</option>
        <option value="UE73-Optimisation_SC">
          UE73 - Optimisation Sans Contraintes
        </option>
      </select>
      <div class="flex items-center gap-2">
        <p class="w-32">N° étudiant:</p>
        <input type="text" class="w-full" @blur="" v-model="user_id" />
      </div>

      <hr class="border border-neutral-300" />

      <Mark :mark="my_mark" desc="Ma note" />
      <div class="flex items-center gap-6">
        <Mark :mark="average_mark" desc="Moyenne" />
        <Mark :mark="min" desc="Note min" />
        <Mark :mark="max" desc="Note max" />
      </div>
    </div>
    <div class="w-4/5 md:w-2/3">
      <Graph :marks="data" class="aspect-[4/3]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Graph from "./components/graph.vue";
import Mark from "./components/mark.vue";

import { ref, computed } from "vue";

const data = ref<{ [key: string]: string }>({});

const marks = computed(() => {
  const marks = Object.values(data.value)
    .map((mark) => Number.parseFloat(mark))
    .filter((mark) => !isNaN(mark));
  return marks;
});

const cur_file = ref("UE72-Python_DS");
const update_data = () => {
  import(`./data/marks/${cur_file.value}.json`).then((new_data) => {
    data.value = new_data.default;
  });
};
update_data();

const user_id = ref("22108939");

const my_mark = computed(() => {
  return data.value[user_id.value];
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
