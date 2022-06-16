<template>
  <div>
    <center>
      <img class="w-64 pb-6" alt="logo" src="../assets/images/logo-upssi.png" />
    </center>
    <h1 class="mb-3 text-center text-2xl font-bold">UPSSI-notes</h1>

    <p class="mb-6 text-center">
      Utilisez ce site pour générer un rapport personalisé de vos notes
    </p>

    <form id="report-form" class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <input
          type="text"
          v-model="store.form.id"
          placeholder="Numéro étudiant (ex: 22115676)"
          class="border border-gray-400 transition-colors focus:border-purple-500 focus:outline-none focus:ring-0"
        />
        <select class="button" v-model="store.form.year">
          <option v-for="year in years" :value="year">{{ year }}</option>
        </select>
        <select class="button" v-model="store.form.semester">
          <option v-for="semester in semesters" :value="semester">
            Semestre {{ semester }}
          </option>
        </select>
      </div>
      <button
        @click="get_student_report($event)"
        class="button px-3 py-2 hover:border-purple-500 hover:bg-purple-500 hover:text-white"
      >
        Obtenir mon relevé
      </button>
      <p v-if="error" class="mt-3 text-center text-red-800">
        Erreur dans l'identifiant, il doit contenir 8 chiffres
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { get_list, get_report, YearList } from "@/api/";
import { useStore } from "@/store";

const store = useStore();
store.state = "FORM";

// lists
const year_list = ref<YearList>({});

// computed_values
const years = computed(() => Object.keys(year_list.value));
const semesters = computed(() => year_list.value[store.form.year]);
const regex = /(22|21){1}\d{6}/g; // TODO FIX THIS

const error = ref(false);

onBeforeMount(async () => {
  // REMOVE OLD ID
  // store.form.id = "";
  year_list.value = await get_list();
  store.form.year = years.value[0];
  store.form.semester = semesters.value[0];
});

async function get_student_report(event: MouseEvent) {
  event.preventDefault();
  if (regex.test(store.form.id)) {
    store.state = "LOADING";
    store.report = await get_report(
      store.form.id,
      store.form.year,
      store.form.semester
    );
    store.state = "REPORT";
  } else {
    error.value = true;
  }
}
</script>

<style>
.button {
  @apply border border-gray-400 transition-colors focus:border-purple-500 focus:outline-none focus:ring-0;
}
</style>
