<template>
  <div class="grid place-items-center h-full bg-neutral-100">
    <div class="shadow-md p-8 bg-white rounded-xl max-w-md w-full">
      <h1 class="font-sofia text-2xl mb-2 text-center">Profil</h1>
      <p class="text-center">
        On a besoin de quelques infos pour compléter ton profile
      </p>
      <hr class="my-4 border-neutral-200" />

      <p
        class="border-2 border-red-400 bg-red-100 px-3 py-2 rounded-lg mb-2 text-sm"
        v-if="error"
      >
        Oops ! Something went wrong.
      </p>

      <valid-input
        class="mb-2"
        name="Numéro étudiant"
        placeholder="ex: 12345678"
        :is-valid="student_id_valid"
        v-model="student_id"
      />

      <div>
        <p class="text-sm mb-1 ml-1">Promotion</p>
        <promotion-select v-model="promotion" class="w-full" />
      </div>

      <button class="input-button" @click="save" :disabled="save_disabled">
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const uid = useSupabaseUser().value?.id ?? "";
if (uid == "") useRouter().push("/");

// Parameters

const promotion = ref("");
const student_id = ref("");
const error = ref(false);

// Validators

const promotion_valid = computed(() => promotion != null);

const save_disabled = computed(() => {
  return !promotion_valid.value || !student_id_valid.value;
});

const student_id_valid = computed(() => {
  return /\d{8}/.test(student_id.value);
});

const save = async () => {
  if (!promotion_valid.value || !student_id_valid.value) return;
  error.value = false;

  const { error: err } = await useSupabase().from("users").insert({
    id: uid,
    promotion: promotion.value,
    student_id: student_id.value,
  });

  if (err) error.value = true;
  else useRouter().push("/marks");
};
</script>

<style scoped></style>
