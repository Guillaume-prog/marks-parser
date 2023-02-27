<template>
  <div class="grid place-items-center h-full bg-neutral-100">
    <div class="w-1/3 bg-white rounded-xl flex flex-col p-8 gap-2">
      <h1
        class="font-sofia text-2xl mb-4 text-center w-full border-b-2 border-neutral-300 p-2"
      >
        {{ title }}
      </h1>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
type ModalProps = {
  title: string;
};

const props = defineProps<ModalProps>();
</script>

<style scoped></style>
