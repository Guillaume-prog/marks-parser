<template>
  <div class="grid place-items-center h-full bg-neutral-100">
    <div
      class="w-8/12 shadow-md p-8 bg-white rounded-xl flex items-stretch gap-8"
      :style="fixed_height"
      ref="container"
    >
      <div class="max-w-lg w-full">
        <h1 class="font-sofia text-2xl mb-2 text-center">
          Ajouter une nouvelle note
        </h1>
        <hr class="my-4 border-neutral-200" />

        <div class="flex flex-col gap-2">
          <p
            class="border-2 border-red-400 bg-red-100 px-3 py-2 rounded-lg text-sm"
            v-if="error"
          >
            Oops ! Something went wrong.
          </p>

          <div>
            <p class="text-sm mb-1 ml-1">Promotion</p>
            <promotion-select v-model="promotion" class="w-full" />
          </div>

          <div class="flex justify-between items-center gap-2">
            <div class="flex-grow">
              <p class="text-sm mb-1 ml-1">Semestre</p>
              <select
                v-model="semester"
                :class="{ 'text-neutral-500': semester == null }"
                class="input-style w-full"
              >
                <option disabled selected :value="null">Semestre X</option>
                <option v-for="sem in range(5, 10)" :value="sem">
                  Semestre {{ sem }}
                </option>
              </select>
            </div>

            <div class="flex-grow">
              <p class="text-sm mb-1 ml-1">UE</p>
              <select
                v-model="section"
                :class="{ 'text-neutral-500': section == null }"
                class="input-style w-full"
              >
                <option disabled selected :value="null">UE Y</option>
                <option v-for="ue in range(1, 3)" :value="ue">
                  UE {{ ue }}
                </option>
              </select>
            </div>
          </div>

          <ValidInput
            name="Nom de la note"
            placeholder="ex: Commande de robots - DS"
            :is-valid="true"
            v-model="name"
          />

          <div>
            <p class="text-sm mb-1 ml-1">Fichier de notes</p>
            <drag-n-drop @update="update_file" />
          </div>

          <button class="input-button" @click="save" :disabled="save_disabled">
            Save
          </button>
        </div>
      </div>

      <div class="h-full border-r border-gray-200"></div>

      <div class="overflow-scroll h-full flex-grow">
        <MarksTable v-if="marks" :marks="marks" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref("");
const promotion = ref("");

const semester = ref(null);
const section = ref(null);

const marks = ref({});

const container = ref();
const fixed_height = computed(() => {
  return {
    height: container.value?.clientHeight + "px",
  };
});

const file = ref<File | null>(null);
const update_file = (files: File[]) => {
  file.value = files[0];
};

const save_disabled = computed(() => {
  return !file.value; //!name.value || !promotion.value || !section.value || !file.value;
});

async function save() {
  const formData = new FormData();
  formData.append("file", file.value!);

  const { marks: m_marks } = await $fetch("/api/parse_pdf", {
    method: "POST",
    body: formData,
  });

  marks.value = m_marks;
  students.value.push(Object.keys(m_marks));
}

const range = (start: number, end?: number) => {
  if (!end) {
    end = start;
    start = 0;
  }
  let arr = [start];
  while (start++ !== end) {
    arr.push(start);
  }
  return arr;
};

const error = ref(false);
</script>

<style scoped></style>
