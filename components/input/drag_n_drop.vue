<template>
  <label
    class="aspect-[2/1] border-2 border-dashed p-2 border-gray-300 rounded-lg text-neutral-500 grid place-items-center cursor-pointer"
    :class="{ 'border-blue-400': dragging }"
    @dragenter.prevent="dragging = true"
    @dragleave.prevent="dragging = false"
    @dragover.prevent
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

    <input
      type="file"
      :multiple="multiple"
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
  console.log(e.dataTransfer?.files);
  update(payload);
}

function handleUpload(e: Event) {
  const payload = (e.target as HTMLInputElement).files;
  update(payload);
}

const update = (payload: FileList | null) => {
  if (payload == null || payload.length == 0) return;

  const arr = Array.from(payload);
  files.value = props.multiple ? arr : [arr[0]];

  emit("update", files.value!);
};
</script>

<style scoped></style>
