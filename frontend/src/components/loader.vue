<template>
  <div class="mx-6" id="loading">
    <center>
      <img class="w-36" alt="logo" src="../assets/images/loading-2.gif" />
      <p class="pb-3">Traitement en cours ...</p>
      <p>Temps d'attente estimée entre 20-35 secondes</p>

      <!-- <div
        class="mt-6 flex overflow-x-auto rounded-full border-2 bg-slate-50 italic drop-shadow-xl"
      >
        <button class="ml-2" @click="goBack()">
          <vue-feather stroke="gray" type="chevron-left" />
        </button>
        <p class="py-3 px-6">
          {{ quotes[index] }}
        </p>
        <button class="mr-2" @click="goNext()">
          <vue-feather stroke="gray" type="chevron-right" />
        </button>
      </div> -->

      <div class="mt-7 w-full bg-gray-200 py-5 italic shadow-xl">
        <img class="w-10" alt="logo" src="../assets/images/quote.png" />
        <p class="py-3 px-6">
          {{ quotes[index].split(" - ")[0] }}
        </p>
        <p class="">- {{ quotes[index].split(" - ")[1] }}</p>
      </div>
    </center>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

var index = ref(0);

const quotes = [
  '"Pour critiquer les gens il faut les connaître, et pour les connaître, il faut les aimer." - Coluche',
  '"Fais de ta vie un rêve, et d\'un rêve, une réalité." - Antoine de Saint-Exupéry',
  "\"Le courage n'est pas l'absence de peur, mais la capacité de vaincre ce qui fait peur.\" - Nelson Mandela",
  '"La musique est la langue des émotions." - Emmanuel Kant',
  '"Vis simplement pour que d\'autres puissent simplement vivre." - Gandhi',
  '"La vie sans musique est tout simplement une erreur, une torture, un exil." - Nietzsche',
  "\"Les philosophes n'ont fait qu'interpréter le monde de différentes manières, ce qui importe, c’est de le transformer.\" - Karl Marx",
  "\"Le bonheur est un rêve d'enfant réalisé dans l'âge adulte.\" - Freud",
  '"La mort propre est irreprésentable. Dans l\'inconscient, chacun de nous est convaincu de son immortalité" - Freud',
];

onBeforeMount(async () => {
  index.value = Math.floor(Math.random() * (quotes.length - 1 - 0 + 1) + 0);
});

/* function goNext() {
  index.value == quotes.length - 1 ? (index.value = 0) : index.value++;
}

function goBack() {
  index.value == 0 ? (index.value = quotes.length - 1) : index.value--;
} */
</script>

<style>
#loading {
  animation: 0.5s fadeIn ease-in-out backwards;
}
</style>
