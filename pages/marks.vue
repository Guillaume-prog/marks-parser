<template>
  <div class="flex flex-col h-full bg-neutral-100">
    <Header></Header>

    <main>
      <section>
        <Select
          name="Semestre"
          :options="semesters"
          v-model="semester"
          class="-mt-2"
        />
      </section>

      <section class="overflow-y-scroll">
        <MarksTree :semester="semester" />
      </section>

      <section class="grid place-items-center">Stats</section>

      <section class="grid place-items-center">
        <MarkDisplay
          :data="cur_marks"
          :student_id="student_id"
          class="w-4/5 md:w-2/3"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const user = await useUser();
if (!user) useRouter().push("/");
const { student_id, promotion } = user!;

// Semester select
const semesters = new Map(range(7, 8).map((i) => [i, `Semestre ${i}`]));
const semester = ref(8);

const marks = await (async () => {
  const { data } = await useSupabase()
    .from("marks")
    .select("*")
    .eq("promotion", promotion);

  return data;
})();

// const sections = computed(() => {
//   return marks
//     ?.map((mark) => mark.section)
//     .sort((a, b) => a - b)
//     .filter((value, index, self) => self.indexOf(value) === index);
// });

// const section_marks = (section: number) => {
//   return marks?.filter((mark) => mark.section === section);
// };

const cur_mark_id = ref("");

const is_current = (id: string) => id == cur_mark_id.value;

const select_mark = (id: string) => {
  cur_mark_id.value = id;
};

const cur_marks = computed(() => {
  return marks?.find((mark) => mark.id == cur_mark_id.value)?.marks ?? null;
});

const data = ref<MarksFile>({});
const marks_files = import.meta.glob("~/data/marks/*.json");

const cur_file = ref("UE72-Python_DS");
const update_data = () => {
  marks_files[`/data/marks/${cur_file.value}.json`]().then((new_data) => {
    data.value = new_data.default;
  });
};
update_data();
</script>

<style scoped>
main {
  @apply grid gap-8 grid-cols-2 grid-rows-3 w-full max-w-[1600px] h-[800px] mx-auto overflow-hidden;
  grid-template-rows: auto auto 1fr;
}

section {
  @apply bg-white rounded-lg p-8;
}

section:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
}

section:nth-child(2) {
  grid-column: 1;
  grid-row: 2 / 4;
}

section:nth-child(3) {
  grid-column: 2;
  grid-row: 1 / 3;
}

section:nth-child(4) {
  grid-column: 2;
  grid-row: 3;
}
</style>
