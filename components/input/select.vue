<template>
  <div class="flex-grow">
    <p class="text-sm mb-1 ml-1">{{ name }}</p>
    <select
      v-model="selected"
      :class="{ 'text-neutral-500': selected == null }"
      class="input-style w-full truncate pr-8"
      @change="updateValue"
    >
      <option disabled selected :value="null">{{ prompt }}</option>
      <option v-for="[value, label] in options.entries()" :value="value">
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
type SelectProps = {
  name: string;
  prompt?: string;
  options: Map<any, string>;
  modelValue: any;
};

const props = withDefaults(defineProps<SelectProps>(), {
  prompt: "Choisir ...",
});

// v-model

const selected = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);

function updateValue() {
  emit("update:modelValue", selected.value);
}
</script>

<style scoped></style>
