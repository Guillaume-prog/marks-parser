<template>
  <Select
    name="Promotion"
    :options="promotions"
    v-model="value"
    @change="updateValue"
  />
</template>

<script setup lang="ts">
/* V-model stuff */
defineProps<{ modelValue: string | null }>();
const emit = defineEmits(["update:modelValue", "update:verbose"]);
const value = ref<string | null>(null);

const updateValue = () => {
  emit("update:modelValue", value.value);
  if (value.value) emit("update:verbose", promotions.value.get(value.value));
};
updateValue();

/* Data fetching */

type Promotion = SupabaseType<"promotions", "Row">;
const promotions = ref(new Map<string, string>());

const get_name = (promo: Promotion) => {
  return `Promotion ${promo.start}-${promo.end}`;
};

const load_promotions = async () => {
  const { data, error } = await useSupabase().from("promotions").select("*");

  if (error) return;
  promotions.value = new Map(
    data.sort((a, b) => a.start - b.start).map((p) => [p.id, get_name(p)])
  );
};

load_promotions();
</script>

<style scoped></style>
