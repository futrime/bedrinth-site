<template>
  <div id="defaultCarousel" class="relative w-full">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden md:h-96">
      <!-- Item 1 -->

      <template v-for="(item,index) in props.list" :key="index">
        <Transition name="carousel">
          <div v-if="nowPage===index" :index="index">
            <img :src="item.url" class="crousel-img-item" :alt="item.title" />
          </div>
        </Transition>
      </template>
    </div>
    <!-- Slider indicators -->
    <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
      <button
      v-for="(item,index) in props.list" :index="index"
        type="button"
        :class="nowPage===index?'bg-white':'bg-white/50'"
        class="w-3 h-0.5 transition-colors"
        @click="nowPage=index"
      ></button>
    </div>
    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="nowPage=(nowPage+props.list.length-1)%props.list.length"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="sr-only">上一个</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="nowPage=(nowPage+1)%props.list.length"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span class="sr-only">下一个</span>
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CarouselList } from '@/types/carousel';
const props = defineProps<{list:CarouselList}>();
const nowPage = ref<number>(0);
</script>
<style>
.crousel-img-item {
  @apply absolute block w-full h-56 md:h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover;
}
.carousel-enter-active,
.carousel-leave-active {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 100ms;
}
.carousel-leave-active{
  transition-delay: 100ms;
}
.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}
</style>
