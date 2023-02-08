<template>
  <header
    class="flex justify-between mx-10 px-10 my-4 border-b-2 border-gray-200 py-4"
  >
    <h1 class="font-semibold text-xl">UPSSINOTES</h1>

    <!-- Nav start -->
    <div v-if="logged_in && !homepage">
      <button @click="logout" class="btn">Déconnexion</button>
    </div>
    <div v-else class="flex items-center gap-3">
      <button @click="login" class="btn">Connexion</button>
      <button class="btn">Inscription</button>
    </div>
    <!-- Nav end -->
  </header>
</template>

<script setup lang="ts">
const logged_in = useLocalStorage("logged_in", false);
const homepage = computed(() => useRouter().currentRoute.value.path == "/");

const supabase = useSupabase();

const redirect = async () => {
  const user = await useUser();
  const route = user ? "/marks" : "/profile";

  logged_in.value = true;
  useRouter().push(route);
};

supabase.auth.onAuthStateChange((event, _session) => {
  if (event == "SIGNED_IN") {
    console.log("Signed in");
    // redirect();
  }
});

const login = async () => {
  if (useSupabaseUser().value) return redirect();

  supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: location.origin,
    },
  });
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);

  logged_in.value = false;
  useRouter().push("/");
};
</script>

<style scoped></style>
