<template>
  <button
    class="rounded-full z-10 h-8 w-8 text-center items-center text-xl dark:hover:bg-white/10 hover:bg-slate-500/10"
    @click="toggleHander">
    <i v-if="commonSet.darkMode === 'system'" class="mdi mdi-theme-light-dark"></i>
    <i v-if="commonSet.darkMode === 'light'" class="mdi mdi-weather-sunny"></i>
    <i v-if="commonSet.darkMode === 'dark'" class="mdi mdi-weather-night"></i>
  </button>
</template>

<script setup lang="ts">
import { useCommonSettings } from "@/store/common";
const commonSet = useCommonSettings();
const modeList = ["system", "dark", "light"];
function toggleHander() {
  commonSet.darkMode = modeList[(modeList.indexOf(commonSet.darkMode) + 1) % modeList.length];
  commonSet.toggleDark();
}
</script>

<style scoped></style>
