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
        v-if="subsubjects"
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
  if (subsubjects.value && !subsubject.value) return null;

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
const sections = computed(() => new Map(mcc.value?.map((ue) => [ue, ue.name])));

const subjects = computed(
  () => new Map(section.value?.subjects.map((s) => [s, s.name]))
);

const subsubjects = computed(() => {
  if (subject.value?.sub_subjects == undefined) return null;
  return new Map(subject.value?.sub_subjects.map((s) => [s, s.name]));
});

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
