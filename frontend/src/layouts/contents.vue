<template>
  <div
    class="top-0 bg-gradient-to-b leading-none from-slate-100 to-slate-100 to-100% -z-30 dark:from-gray-800 dark:to-zinc-800 w-full h-screen block fixed"
  ></div>
  <div class="w-full -z-20 min-h-screen block">
    <img src="@/assets/template-header.png" alt="Background" class="absolute w-full top-0 -z-0" />
    <Container>
      <router-view></router-view>
    </Container>
  </div>
</template>
<script lang="ts" setup>
import Container from '@/components/Container/index.vue';
</script>
<style lang=""></style>
