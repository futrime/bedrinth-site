<script setup lang="ts">
import { onMounted, ref } from "vue";
import NDialog from "@/components/Dialog/index.vue";
import NCard from "@/components/Cards/index.vue";
import toggleDark from "@/components/ToggleDark/toggleDark.vue"
import Carousel from "@/components/Carousels/index.vue";
import "@varlet/ui/es/button/style/index";
import type { CarouselList } from "@/types/carousel";
const dialog = ref(true);
const carousel = ref<CarouselList>([
  {
    href: "company",
    id: 1,
    title: "小米13发布了",
    url: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-ultraeyyn4y/index/1129.png",
  },
  {
    href: "company",
    id: 33,
    title: "小米13423发布了",
    url: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-ultraeyyn4y/index/3.png",
  },
  {
    href: "work",
    id: 1425,
    title: "小米13423发布了",
    url: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-ultraeyyn4y/index/1234.png",
  },
]);
const loading = ref(false);
const finished = ref(false);
const list = ref<string[]>([]);

function load() {
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      list.value.push((list.value.length + 1).toString());
    }

    loading.value = false;

    if (list.value.length >= 60) {
      finished.value = true;
    }
  }, 1000);
}
onMounted(() => {});
</script>

<template>
  <!--顶部标题-->
  <div class="mx-6 mt-8 flex mb-4 text-2xl lg:text-4xl font-semibold z-10 text-slate-900 dark:text-slate-200">
    Welcome
    <div class="flex-grow"></div>
    <toggleDark></toggleDark>
  </div>
  <div class="search-outer group">
    <div class="search-icon">
      <svg
        aria-hidden="true"
        class="w-5 h-5 text-gray-500 dark:text-gray-400 group-focus-within:text-blue-500 group-focus-within:dark:text-blue-400 transition-colors"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
      </svg>
    </div>
    <input type="text" class="search-input" placeholder="搜职位/企业/关键词......" />
    <button class="search-button">搜索</button>
  </div>
  <NCard class="mx-4 my-2"><Carousel :list="carousel"></Carousel></NCard>
  <!-- <NDialog v-model="dialog">
    <NCard class="w-96">大猫咪</NCard>
  </NDialog> -->
</template>

<style scoped>
.search-icon {
  @apply inset-y-0 flex items-center pl-3 pointer-events-none;
}
.search-input {
  @apply appearance-none bg-transparent border-0 dark:text-gray-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-within:dark:placeholder:text-gray-400 focus-within:placeholder:text-slate-500 ring-0 focus:border-0 flex-grow text-slate-700 group-focus-within:text-slate-900 group-focus-within:dark:text-slate-400;
}
.search-outer {
  @apply relative flex flex-row items-center my-2 mx-4 bg-white shadow-slate-700/5 shadow-md transition-all border-gray-300 text-gray-900 rounded-lg block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
.search-button {
  @apply px-2 py-1.5 m-1 text-gray-500 dark:text-gray-400 text-center text-sm justify-self-stretch opacity-0 hover:opacity-100 transition-opacity group-focus-within:opacity-100 hover:text-blue-500 dark:hover:text-blue-400 focus:text-blue-500;
}
</style>
