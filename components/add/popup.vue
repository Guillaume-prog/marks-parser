<template>
  <div class="absolute inset-0 bg-white rounded-lg anim-in">
    <div
      class="border-2 bg-opacity-40 grid place-items-center p-8 w-full h-full absolute inset-0 rounded-lg"
      :class="{
        'bg-green-400 border-green-800': success,
        'bg-red-400 border-red-800': !success,
      }"
    >
      <div
        class="flex items-center gap-2 text-lg"
        :class="{ 'text-green-800': success, 'text-red-800': !success }"
      >
        <div>
          <Icon :name="icon" />
        </div>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  success: boolean;
}>();

const icon = computed(() =>
  props.success ? "carbon:checkmark" : "carbon:close"
);

const description = computed(() =>
  props.success ? "Vous pouvez continuer" : "Une erreur est survenue"
);
</script>

<style scoped>
.anim-in {
  animation: anim-in 0.5s ease-in-out;
}

@keyframes anim-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  80% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
