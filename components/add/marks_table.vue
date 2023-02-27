<template>
  <div class="h-80 overflow-y-scroll border-2 border-neutral-300 rounded-lg">
    <table class="w-full border-separate border-spacing-0 overflow-hidden">
      <thead class="font-sofia sticky top-0 text-left bg-neutral-100">
        <tr>
          <th>
            Etudiant
            <b>({{ marks_register.get_num_students() }})</b>
          </th>
          <th
            v-for="i in marks_register.get_num_marks()"
            class="bg-opacity-30"
            :class="{ 'bg-blue-400': is_seleted(i) }"
          >
            Note {{ i }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[student_id, mark_list] in Object.entries(
            marks_register.get_all()
          )"
        >
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
import MarksRegister, { MarksList } from "~~/types/marks-list";
const props = defineProps<{ selected_mark: number | null; marks: MarksList }>();
const marks_register = computed(() => new MarksRegister(props.marks));

const is_seleted = (i: number) =>
  i == props.selected_mark && marks_register.value.get_num_marks() > 1;
</script>

<style scoped>
td,
th {
  @apply py-2 px-6 text-sm  border-b-2 border-l-2 border-neutral-300;
}

td:first-child,
th:first-child {
  @apply border-l-0;
}

tr:last-child td {
  @apply border-b-0;
}
</style>
