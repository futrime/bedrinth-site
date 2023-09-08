// Utilities
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default createPinia().use(piniaPluginPersistedstate);
