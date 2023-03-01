<template>
  <div class="flex flex-col gap-4">
    <div v-for="ue in mcc" class="flex flex-col gap-2">
      <h1
        class="uppercase text-lg text-neutral-400 font-sofia font-bold flex items-center gap-2"
      >
        <span class="text-2xl">UE{{ mcc.indexOf(ue) + 1 }}</span>
        <span>{{ ue.name }}</span>
      </h1>

      <div class="flex flex-col gap-3">
        <div
          v-for="subject in ue.subjects"
          class="p-2"
          :class="{ 'subject-block': !subject.sub_subjects }"
        >
          <div class="row">
            <h2>{{ subject.name }}</h2>
            <p v-if="!subject.sub_subjects">{{ subject.code }}</p>
          </div>
          <div
            v-if="subject.sub_subjects"
            class="mt-2 border-l-2 border-neutral-300 pl-2"
          >
            <div
              v-for="sub_subject in subject.sub_subjects"
              class="subject-block -mr-2"
            >
              <div class="row">
                <h3>{{ sub_subject.name }}</h3>
                <p>{{ sub_subject.code }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  semester: number;
}>();

function sorted<T extends NameCode>(list: T[]) {
  return list?.sort((a, b) => a.code.localeCompare(b.code));
}

const load_mcc = async () => {
  const { data } = await useSupabase()
    .from("mcc")
    .select("*")
    .eq("semester", props.semester)
    .single();
  mcc.value = sorted(data?.mcc as Mcc) ?? null;
};

const mcc = ref([] as Mcc);
watch(() => props.semester, load_mcc);
load_mcc();
</script>

<style scoped>
.subject-block {
  @apply p-2 rounded-md cursor-pointer hover:bg-neutral-100 transition-colors;
}

.row {
  @apply flex items-center gap-2 justify-between;
}
</style>
