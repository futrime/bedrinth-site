<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initModals } from 'flowbite';
import { Datepicker, Input, initTE } from 'tw-elements';
import NDialog from '@/components/Dialog/index.vue'
import NCard from '@/components/Cards/index.vue'
const dialog = ref(true);

onMounted(() => {
  initTE({ Datepicker, Input });
  initModals();
});
</script>

<template>
  <NCard @click="dialog=true" class="m-2">梵蒂冈地方三个的风格</NCard>
  <NCard @click="dialog=true" class="m-2">梵蒂冈地方三个的风格</NCard>
  <NCard @click="dialog=true" class="m-2">梵蒂冈地方三个的风格</NCard>
  <NCard @click="dialog=true" class="m-2">梵蒂冈地方三个的风格</NCard>
  <NDialog v-model="dialog">
  <NCard class="w-96">大猫咪</NCard>
  </NDialog>
</template>

<style scoped></style>
