<template>
  <div>
    <center>
      <img
        class="w-64 pb-4"
        alt="logo"
        id="img"
        src="../assets/images/logo-upssi.png"
      />
    </center>
    <h1 class="mb-3 text-center text-2xl font-bold" id="title">UPSSI'NOTES</h1>

    <p class="mx-3 mb-6 text-center" id="description">
      Utilisez ce site pour générer un rapport personalisé de vos notes
    </p>

    <form id="report-form" class="md:flex-col-3 flex w-full gap-3">
      <div class="mx-3 grid w-full grid-cols-1 gap-3">
        <input
          id="fieldID"
          type="text"
          v-model="store.form.id"
          placeholder="Numéro étudiant (ex: 22115676)"
          class="border border-gray-400 text-center transition-colors focus:border-orange-400 focus:outline-none focus:ring-0"
        />

        <div class="item-center grid grid-cols-2 gap-3">
          <select class="button" id="button" v-model="store.form.year">
            <option v-for="year in years" :value="year">{{ year }}</option>
          </select>
          <select class="button" id="button" v-model="store.form.semester">
            <option v-for="semester in semesters" :value="semester">
              Semestre {{ semester }}
            </option>
          </select>
        </div>

        <button
          id="button"
          @click="get_student_report($event)"
          class="button hover:border-gray-60000 bg-orange-300 px-3 py-2 hover:bg-orange-200 md:w-full"
        >
          Obtenir mon relevé
        </button>
        <p v-if="error" class="mx-3 mt-3 text-center font-bold text-red-700">
          Erreur dans l'identifiant, il doit contenir 8 chiffres.
        </p>
      </div>
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
const regex = /^(22|21){1}\d{6}$/gm; // TODO FIX THIS

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
  @apply border border-gray-400 text-center transition-colors focus:border-orange-400 focus:outline-none focus:ring-0;
}

#button,
#fieldID {
  animation: 1s fadeInBot ease-in-out backwards;
}

#img,
#title,
#description {
  animation: 1s fadeInTop ease-in-out backwards;
}

@keyframes fadeInBot {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  99% {
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes fadeInTop {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  99% {
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
