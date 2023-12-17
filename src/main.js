import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "./css/style.css";

import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);

app.config.globalProperties.window = window;
app.mount("#app");
