<template>
  <div>
    <vue-markdown v-model="props.readme" />
  </div>
</template>

<script setup lang="ts">
import VueMarkdown from "vue-markdown-wasm";
const props = defineProps;
</script>

<style scoped>
</style>
