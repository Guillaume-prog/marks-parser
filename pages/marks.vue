<template>
  <div class="flex flex-col h-full">
    <Header></Header>
    <div
      class="flex-grow grid place-items-center p-4 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1"
    >
      <div class="flex flex-col gap-4 w-1/2">
        <div v-for="section in sections">
          <p class="font-semibold mb-3">UE {{ section }}</p>
          <div class="flex flex-col gap-3">
            <div
              v-for="mark in section_marks(section)"
              :key="mark.id"
              class="p-2 rounded-md cursor-pointer hover:bg-neutral-100 transition-colors"
              :class="{
                'bg-blue-100': is_current(mark.id),
                'hover:bg-blue-100': is_current(mark.id),
              }"
              @click="select_mark(mark.id)"
            >
              {{ mark.name }}
            </div>
          </div>
        </div>
      </div>

      <MarkDisplay
        :data="cur_marks"
        :student_id="student_id"
        class="w-4/5 md:w-2/3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { student_id, promotion } = (await useUser()) ?? {
  student_id: "",
  promotion: "",
};

const marks = await (async () => {
  const { data } = await useSupabase()
    .from("marks")
    .select("*")
    .eq("promotion", promotion);

  return data;
})();

const sections = computed(() => {
  return marks
    ?.map((mark) => mark.section)
    .sort((a, b) => a - b)
    .filter((value, index, self) => self.indexOf(value) === index);
});

const section_marks = (section: number) => {
  return marks?.filter((mark) => mark.section === section);
};

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

<style scoped></style>
