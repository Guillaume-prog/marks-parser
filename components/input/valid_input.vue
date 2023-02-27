<template>
  <div>
    <p class="text-sm mb-1 ml-1">{{ name }}</p>
    <div class="relative">
      <input
        class="input-style w-full"
        type="text"
        v-model="text"
        :placeholder="placeholder"
        @input="updateValue"
      />
      <Icon
        v-show="show_validation"
        :class="{
          'text-green-700': isValid,
          'text-red-700': !isValid,
        }"
        class="absolute right-3 h-full top-1/2 -translate-y-1/2"
        :name="icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  placeholder: string;
  isValid: boolean;
  modelValue: string;
}>();

const text = ref(props.modelValue);
const show_validation = computed(() => text.value != "");

// v-model

const emit = defineEmits(["update:modelValue"]);

function updateValue() {
  emit("update:modelValue", text.value);
}

// validation
const icon = computed(() =>
  props.isValid ? "carbon:checkmark" : "carbon:close"
);
</script>

<style scoped></style>
