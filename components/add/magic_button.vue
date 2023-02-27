<template>
  <button
    class="input-button w-1/3"
    :disabled="!validation"
    @click="scroll_to(target)"
  >
    {{ type == "next" ? "Suivant" : "Retour" }}
  </button>
</template>

<script setup lang="ts">
type Props = {
  type: "next" | "back";
  target: string;
  validation?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  validation: true,
});

const scroll_to = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
};
</script>

<style scoped></style>
