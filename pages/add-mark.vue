<template>
  <div class="h-full overflow-hidden">
    <Modal id="step-1" title="Ajout d'une nouvelle note">
      <promotion-select
        v-model="promotion"
        @update:verbose="promotion_str = $event"
        class="w-full"
      />
      <Select name="Type de note" :options="exam_types" v-model="exam_type" />

      <MagicButton type="next" target="step-2" :validation="step1_complete" />
    </Modal>

    <Modal id="step-2" title="Choix de la matière">
      <SubjectSelect @update="code = $event" />

      <div class="button_container">
        <MagicButton type="back" target="step-1" />
        <MagicButton type="next" target="step-3" :validation="step2_complete" />
      </div>
    </Modal>

    <Modal id="step-3" title="Ajout des notes">
      <MarkSelect @on:result="marks = $event" />

      <div class="button_container">
        <MagicButton type="back" target="step-2" />
        <MagicButton type="next" target="step-4" :validation="step3_complete" />
      </div>
    </Modal>

    <Modal id="step-4" title="Récapitulatif">
      <div class="relative">
        <div v-for="[label, stat] in stats">
          <p class="text-sm mb-1">{{ label }}</p>
          <p class="text-lg font-bold">{{ stat }}</p>
        </div>

        <Popup v-if="is_success" :success="is_success" />
      </div>

      <div v-if="is_success == null" class="button_container">
        <MagicButton type="back" target="step-3" />
        <button
          class="input-button w-1/3"
          :disabled="!step4_complete"
          @click="upload"
        >
          Terminer
        </button>
      </div>
      <div v-else>
        <button v-if="is_success" class="input-button w-1/2" @click="reload">
          Recommencer
        </button>
        <button v-else class="input-button w-full" @click="upload">
          Réessayer
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Mark } from "~~/types/marks-list";

const exam_types = new Map([
  ["cc", "Controle Continu"],
  ["tp", "Travaux Pratiques"],
]);

const promotion = ref<string | null>(null);
const exam_type = ref<"cc" | "tp" | null>(null);
const code = ref<string | null>(null);
const marks = ref<Record<string, Mark> | null>(null);

const promotion_str = ref("");
const stats = computed(() => [
  ["Promotion", promotion_str.value],
  ["Matière", code.value!],
  ["Type de note", exam_types.get(exam_type.value!)],
]);

// Scrolling

const step1_complete = computed(
  () => promotion.value != null && exam_type.value != null
);
const step2_complete = computed(() => code.value != null);
const step3_complete = computed(() => marks.value != null);
const step4_complete = computed(() => payload.value != null);

// Payload

const is_success = ref<boolean | null>(null);

type MarkObj = SupabaseType<"marks", "Insert">;
const payload = computed<MarkObj | null>(() => {
  if (!code.value || !promotion.value || !exam_type.value || !marks.value)
    return null;

  return {
    promotion: promotion.value,
    exam_type: exam_type.value,
    subject_id: code.value,
    marks: marks.value,
  };
});

const upload = async () => {
  const { data, error } = await useSupabase()
    .from("marks")
    .insert(payload.value!);

  is_success.value = error == null;
};

const reload = () => {
  window.location.reload();
};
</script>

<style scoped>
.button_container {
  @apply flex items-center gap-3 justify-around;
}
</style>
