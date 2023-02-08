<template>
  <select
    v-model="value"
    :class="{ 'text-neutral-500': value == null }"
    class="input-style"
    @change="updateValue"
  >
    <option disabled selected :value="null">Promotion 20XX-20XX</option>
    <option v-for="promo in promotions" :value="promo.id">
      {{ get_name(promo) }}
    </option>
  </select>
</template>

<script setup lang="ts">
/* V-model stuff */
defineProps<{ modelValue: string | null }>();
const emit = defineEmits(["update:modelValue"]);
const value = ref(null);

const updateValue = () => emit("update:modelValue", value.value);
updateValue();

/* Data fetching */

type Promotion = SupabaseType<"promotions", "Row">;
const promotions = ref<Promotion[]>([]);

const get_name = (promo: Promotion) => {
  return `Promotion ${promo.start}-${promo.end}`;
};

const load_promotions = async () => {
  const { data, error } = await useSupabase().from("promotions").select("*");

  if (error) return;
  promotions.value = data.sort((a, b) => a.start - b.start);
};

load_promotions();
</script>

<style scoped></style>
