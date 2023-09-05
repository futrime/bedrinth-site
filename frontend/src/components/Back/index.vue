<template>
  <button
    class="rounded-full h-8 w-8 text-center items-center text-xl dark:hover:bg-white/10 hover:bg-slate-500/10"
    @click="backHander">
    <i class="mdi mdi-chevron-left"></i>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function backHander() {
  router.go(-1);
}
</script>

<style scoped></style>
