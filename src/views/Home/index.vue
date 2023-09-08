<script setup lang="ts">
import { onMounted, ref } from "vue";
import switchLang from "@/components/SwitchLang/index.vue";
import NCard from "@/components/Cards/index.vue";
import toggleDark from "@/components/ToggleDark/toggleDark.vue";
import "@varlet/ui/es/button/style/index";
import { useI18n } from "vue-i18n";
import type { ToothSummary } from "@/interface";
import { useRouter, useRoute } from "vue-router";
import httpService from "@/utils/axios";
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const loading = ref(false);
const finished = ref(false);
const qWord = ref("");
const qForm = ref("");
const page = ref({ current: 0, max: 0 });
const list = ref<ToothSummary[]>([]);
async function search() {
  qWord.value = qForm.value;
  loading.value = true;
  try {
    let result = await httpService.get<{ code: number; max_page: number; list: ToothSummary[] }>("/search/teeth", {
      params: { q: qWord.value, page: 1 },
    });
    page.value.current = 1;
    page.value.max = result.data.max_page;
    //是否是最后一页
    finished.value = page.value.current === page.value.max;
    //渲染页面
    loading.value = false;
    list.value = result.data.list;
  } catch (error) {
    loading.value = false;
  }
}
async function handleSearch() {
  router.replace({ query: { q: qForm.value } });
  await search();
}
async function load() {
  //增加页数
  page.value.current = page.value.current + 1;
  try {
    let result = await httpService.get<{ code: number; max_page: number; list: ToothSummary[] }>("/search/teeth", {
      params: { q: qWord.value, page: page.value.current },
    });
    page.value.max = result.data.max_page;
    //是否是最后一页
    finished.value = page.value.current >= page.value.max;
    //设为可请求状态
    loading.value = false;
    //合并渲染页面
    list.value.push.apply(list.value, result.data.list);
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  window.document.title = `${t("message.page.home")} - ${process.env.productName}`;
  if (typeof route.query.q === "string") {
    qForm.value = route.query.q;
    search();
  }
});
</script>

<template>
  <!--顶部标题-->
  <div class="flex flex-col">
    <div class="mx-6 mt-4 flex items-center mb-4">
      <span class="text-2xl lg:text-3xl font-semibold z-10 text-slate-900 dark:text-slate-200">{{
        t("message.welcome")
      }}</span>
      <div class="flex-grow ml-4 flex items-center">
        <div class="search-tab group" v-if="list.length">
          <div class="search-icon">
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5 text-blue-500 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg
              v-else
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
          <input
            type="text"
            v-model="qForm"
            @keyup.enter="handleSearch"
            class="search-input"
            :placeholder="t('message.search.placeholder')" />
          <button class="search-button" @click="handleSearch">{{ t("message.search.goClick") }}</button>
        </div>
      </div>
      <switchLang class="mr-2"></switchLang>
      <toggleDark></toggleDark>
    </div>
    <div class="flex flex-col justify-center items-center flex-grow">
      <div class="search-outer group" v-if="!list.length">
        <div class="search-icon">
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 text-blue-500 dark:text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg
            v-else
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
        <input
          type="text"
          v-model="qForm"
          @keyup.enter="handleSearch"
          class="search-input"
          :placeholder="t('message.search.placeholder')" />
        <button class="search-button" @click="handleSearch">{{ t("message.search.goClick") }}</button>
      </div>
      <div class="z-10" :class="list.length !== 0 ? 'flex-grow' : ''">
        <var-list :finished="finished" v-if="list.length !== 0" v-model:loading="loading" @load="load">
          <!--自动加载列表-->
          <div class="mx-2 grid grid-cols-1">
            <!--内搜索框-->
            <div class="search-inner group" v-if="list.length">
              <div class="search-icon">
                <svg
                  v-if="loading"
                  class="animate-spin h-5 w-5 text-blue-500 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg
                  v-else
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
              <input
                type="text"
                v-model="qForm"
                @keyup.enter="handleSearch"
                class="search-input"
                :placeholder="t('message.search.placeholder')" />
              <button class="search-button" @click="handleSearch">{{ t("message.search.goClick") }}</button>
            </div>
            <!-- ... -->
            <NCard
              v-for="item in list"
              class="mx-2 my-1 cursor-pointer p-2 max-w-3xl"
              @click="
                router.push({
                  name: 'InfoPage',
                  params: { tooth: item.tooth, version: item.latest_version.replaceAll('.', ',') },
                })
              "
              ><div class="flex flex-col">
                <!--title-->
                <div class="flex flex-row">
                  <div class="flex md:items-center flex-col md:flex-row">
                    <div class="mr-2 dark:text-gray-100">{{ item.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-300">v{{ item.latest_version }}</div>
                  </div>
                </div>
                <!--TAGS-->
                <div class="py-2 flex flex-row gap-2">
                  <div class="text-xs px-1.5 py-1 rounded-md bg-slate-200 dark:bg-gray-600" v-for="tag in item.tags">
                    {{ tag }}
                  </div>
                </div>
                <div class="text-sm text-gray-400 dark:text-gray-400">{{ item.description }}</div>
                <!--repo & author-->
                <div class="text-sm mt-2 text-gray-600 dark:text-gray-200 flex flex-col md:flex-row">
                  <div class="flex-grow"><i class="mr-2 mdi mdi-git"></i>{{ item.tooth }}</div>
                  <div class="mr-2"><i class="mr-2 mdi mdi-account"></i>{{ item.author }}</div>
                </div>
              </div></NCard
            >
          </div>
        </var-list>
      </div>
      <div class="z-10 mt-4">
        <div class="text-center text-gray-500 dark:text-gray-400 text-sm">{{ t("message.home.otherSite") }}</div>
        <div class="text-sm text-center text-gray-600 dark:text-gray-300">
          <a href="https://docs.lippkg.com" class="mx-2 items-center" target="_blank"
            ><i class="text-lg mr-2 mdi mdi-file-document-multiple-outline"></i>{{ t("message.home.docs") }}</a
          >
          <a href="https://github.com/LipPkg/Lip" class="mx-2 items-center" target="_blank"
            ><i class="text-lg mr-2 mdi mdi-git"></i> {{ t("message.home.repo") }}</a
          >
          <a href="https://github.com/LipPkg/Lip" class="mx-2 items-telegram" target="_blank"
            ><i class="text-lg mr-2 mdi mdi-minecraft"></i>{{ t("message.home.mc") }}</a
          >
        </div>
      </div>
    </div>
    <div class="mb-2 text-center text-gray-500 dark:text-gray-400 text-xs">{{ t("message.home.term") }}</div>
  </div>
</template>

<style scoped>
.search-icon {
  @apply inset-y-0 flex items-center pl-3 pointer-events-none;
}
.search-input {
  @apply appearance-none bg-transparent border-0 dark:text-gray-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-within:dark:placeholder:text-gray-400 focus-within:placeholder:text-slate-500 ring-0 focus:border-0 flex-grow text-slate-700 group-focus-within:text-slate-900 group-focus-within:dark:text-slate-400;
}
.search-outer {
  @apply relative self-stretch sm:self-center sm:w-5/6 md:w-2/3 lg:w-2/4 flex flex-row items-center my-2 mx-4 bg-white shadow-slate-700/5 shadow-md transition-all border-gray-300 text-gray-900 rounded-lg block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
.search-inner {
  @apply relative flex flex-row items-center my-2 mx-2 md:hidden bg-white shadow-slate-700/5 shadow-md transition-all border-gray-300 text-gray-900 rounded-lg block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
.search-tab {
  @apply relative  flex-row items-center my-2 mx-2 md:flex hidden bg-white shadow-slate-700/5 shadow-md transition-all border-gray-300 text-gray-900 rounded-lg block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
.search-button {
  @apply px-2 py-1.5 m-1 text-gray-500 dark:text-gray-400 text-center text-sm justify-self-stretch opacity-0 hover:opacity-100 transition-opacity group-focus-within:opacity-100 hover:text-blue-500 dark:hover:text-blue-400 focus:text-blue-500;
}
</style>
