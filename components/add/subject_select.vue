<template>
  <div class="flex flex-col gap-2">
    <Select
      name="Semestre (2A seulement pour l'instant)"
      :options="semesters"
      v-model="semester"
    />
    <Select name="UE" :options="sections" v-model="section" />

    <div class="flex gap-2 items-center">
      <Select name="Matière" :options="subjects" v-model="subject" />

      <Select
        v-if="subsubjects.size != 0"
        name="Sous-matière"
        :options="subsubjects"
        v-model="subsubject"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const mcc = ref<Mcc | null>(null);

const semester = ref<number | null>(null);
const section = ref<UE | null>(null);
const subject = ref<Subject | null>(null);
const subsubject = ref<NameCode | null>(null);

// Compute return value
const code = computed(() => {
  if (!semester.value || !section.value || !subject.value) return null;
  if (subsubjects.value.size != 0 && !subsubject.value) return null;

  return subsubject.value ? subsubject.value!.code : subject.value!.code;
});

const emit = defineEmits<{
  (event: "update", code: string): void;
}>();

watch(code, (new_value) => {
  if (new_value) emit("update", new_value);
});

// Options for selects
const semesters = new Map(range(7, 8).map((sem) => [sem, `Semestre ${sem}`]));
const sections = computed(() => to_sorted_map(mcc.value));
const subjects = computed(() => to_sorted_map(section.value?.subjects));
const subsubjects = computed(() => to_sorted_map(subject.value?.sub_subjects));

const to_sorted_map = (list: NameCode[] | null | undefined) => {
  if (list == undefined || list == null) return new Map();
  return new Map(
    list.sort((a, b) => a.code.localeCompare(b.code)).map((s) => [s, s.name])
  );
};

// Reset other child options when parent changes
watch(
  () => semester.value,
  async (new_value) => {
    if (typeof new_value !== "number") return;
    mcc.value = await useMcc(new_value);

    section.value = null;
    subject.value = null;
    subsubject.value = null;
  }
);

watch(
  () => section.value,
  async (new_value) => {
    subject.value = null;
    subsubject.value = null;
  }
);

watch(
  () => subject.value,
  async (new_value) => {
    subsubject.value = null;
  }
);
</script>

<style scoped></style>
