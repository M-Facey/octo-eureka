import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";

import { createPinia } from "pinia";
import persistendState from "pinia-persistedstate";
import SecureLS from "secure-ls";

const ENCYPTION_SECRET = import.meta.env.VITE_ENCRYPTION_SECRET;

const ls = new SecureLS({
  encodingType: "aes",
  isCompression: false,
  encryptionSecret: ENCYPTION_SECRET,
});

const store = createPinia();
store.use(
  persistendState({
    key: "_app_state",
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })
);

createApp(App).use(store).mount("#app");
