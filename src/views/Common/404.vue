<script setup lang="ts">
import { onMounted } from "vue";
import Container from "@/components/Container/index.vue";
import nCard from "@/components/Cards/index.vue";
</script>

<template>
  <div
    class="top-0 bg-gradient-to-b leading-none from-slate-100 to-slate-100 to-100% -z-30 dark:from-gray-800 dark:to-zinc-800 w-full h-screen block fixed"></div>
  <div class="w-full -z-20 min-h-screen block">
    <img src="@/assets/template-header.png" alt="Background" class="absolute w-full top-0 -z-0" />
    <Container>
      <div class="items-center min-h-screen z-10 m-4 flex justify-center">
        <div class="dialog-content">
          <nCard class="p-3 sm:px-12 relative">
            <div class="text-center text-4xl my-2 text-gray-800 dark:text-gray-200">404</div>
            <div class="text-center mb-4 text-gray-600 dark:text-gray-300">🚧 Not Found 🚧</div>
            <RouterLink :to="{ name: '公共首页' }" class="flex flex-row items-center mx-1 my-2">
              <button
                class="shadow-md block flex-grow rounded text-sm py-1.5 font-medium bg-blue-500 hover:bg-blue-600 transition-colors text-white">
                Back
              </button>
            </RouterLink>
          </nCard>
        </div>
      </div>
    </Container>
  </div>
</template>

<style scoped>
.dialog-content {
  @apply w-full max-w-xl;
}
</style>
