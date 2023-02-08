<template>
  <div>
    <p class="mb-2 text-sm">{{ num_rows }} Students</p>
    <table>
      <thead class="font-sofia sticky">
        <tr>
          <th>Student ID</th>
          <th v-for="i in num_cols">Mark {{ i }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[student_id, mark_list] in Object.entries(marks)">
          <td class="font-sofia font-xs">{{ student_id }}</td>
          <td v-for="mark in mark_list">
            {{ mark }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ marks: { [key: string]: any } }>();

const num_cols = computed(() => {
  const keys = Object.keys(props.marks);
  return keys.length > 0 ? props.marks[keys[0]].length : 0;
});

const num_rows = computed(() => {
  return Object.keys(props.marks).length;
});
</script>

<style scoped>
tr {
  @apply border-b border-neutral-300;
}

td,
th {
  @apply py-2 px-6 text-sm;
}
</style>
