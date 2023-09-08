<template lang="">
  <div class="n-card">
    <slot></slot>
  </div>
</template>
<script setup lang="typescript"></script>
<style>
.n-card {
  @apply bg-white z-0 dark:bg-gray-700 shadow-slate-700/5 dark:text-gray-400 rounded-lg shadow-lg dark:shadow-md overflow-hidden;
}
</style>
