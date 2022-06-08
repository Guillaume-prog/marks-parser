import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

import VueFeather from "vue-feather";
import "./assets/tailwind.css";

const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.use(createPinia());

app.mount("#app");
