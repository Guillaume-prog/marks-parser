<template>
  <label
    class="aspect-video border-2 border-dashed p-2 border-gray-300 text-neutral-500 grid place-items-center cursor-pointer"
    :class="{ 'border-blue-400': dragging }"
    @dragover.prevent
    @dragenter.prevent="dragging = true"
    @dragleave.prevent="dragging = false"
    @drop.prevent="handleDrop"
  >
    <p v-if="files == null" class="pointer-events-none">
      Déposer les fichiers ici
    </p>
    <p
      v-else
      class="pointer-events-none text-sm text-center break-words w-8/12"
    >
      {{ files[0].name }}
    </p>

    <p>{{ files }}</p>

    <input
      type="file"
      :multiple="props.multiple"
      class="hidden"
      @change="handleUpload"
    />
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "update", files: File[]): void;
}>();

const props = withDefaults(defineProps<{ multiple?: boolean }>(), {
  multiple: false,
});

const dragging = ref(false);
const files = ref<File[] | null>(null);

function handleDrop(e: DragEvent) {
  dragging.value = false;
  const payload = e.dataTransfer?.files ?? null;

  console.log(payload);

  update(payload);
}

function handleUpload(e: Event) {
  const payload = (e.target as HTMLInputElement).files;
  update(payload);
}

const update = (payload: FileList | null) => {
  if (!payload) return;

  const arr = Array.from(payload);
  files.value = props.multiple ? arr : [arr[0]];

  emit("update", files.value!);
};
</script>

<style scoped></style>
