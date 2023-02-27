<template>
  <div>
    <DragNDrop v-if="!register" :multiple="true" @update="update_file" />

    <div v-if="register" class="flex flex-col gap-2">
      <button class="flex items-center gap-1 text-sm" @click="cancelFile">
        <Icon name="carbon:arrow-left" />
        <span class="hover:underline underline-offset-2">Annuler</span>
      </button>
      <MarksTable :selected_mark="selected" :marks="register?.get_all()" />

      <Select
        v-if="options.size > 1"
        name="Colonne"
        :options="options"
        v-model="selected"
        @change="update_value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MarksRegister, { Mark, MarksList } from "~~/types/marks-list";

const options = ref(new Map());
const selected = ref<number | null>(null);
const register = ref<MarksRegister | null>(null);

const emit = defineEmits<{
  (event: "on:mark", files: MarksList): void;
  (event: "on:result", list: Record<string, Mark>): void;
}>();

const cancelFile = () => {
  register.value = null;
  options.value = new Map();
};

const update_file = async (files: File[]) => {
  const formData = new FormData();
  formData.append("file", files[0]);

  const { marks } = await $fetch("/api/parse_pdf", {
    method: "POST",
    body: formData,
  });
  register.value = new MarksRegister(marks);

  console.log("ping");
  emit("on:mark", register.value.get_all());
  options.value = new Map(
    range(1, register.value.get_num_marks()).map((i) => [i, `Note ${i}`])
  );

  if (options.value.size == 1) {
    selected.value = 1;
    update_value();
  }
};

const update_value = () => {
  if (register.value && selected.value) {
    emit("on:result", register.value.get_column(selected.value));
  }
};
</script>

<style scoped></style>
