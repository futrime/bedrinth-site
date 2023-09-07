<template>
  <div class="relative h-8 flex" data-te-dropdown-ref>
    <button
      id="langToggleButton"
      data-te-dropdown-toggle-ref
      aria-expanded="false"
      class="rounded-full top-0 h-8 w-8 text-center items-center text-xl dark:hover:bg-white/10 hover:bg-slate-500/10">
      <i class="mdi mdi-translate"></i>
    </button>
    <ul
      class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-gray-600 [&[data-te-dropdown-show]]:block"
      aria-labelledby="langToggleButton"
      data-te-dropdown-menu-ref>
      <li v-for="(item, index) in messages">
        <a
          class="flex flex-row w-full whitespace-nowrap bg-transparent pr-4 pl-3 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-gray-500"
          href="#"
          @click="switchLocale(index)"
          data-te-dropdown-item-ref
          ><div class="h-4 w-4 text-sm mr-2">
            <i class="mdi" :class="locale === index ? 'mdi-check' : 'mdi-black'"></i>
          </div>
          {{ item.message.lang }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ref from "vue";
import { Dropdown, initTE } from "tw-elements";
import { onMounted } from "vue";
import { messages } from "@/i18n";
import { useI18n } from "vue-i18n";
import { useCommonSettings } from "@/store/common";
const { t, locale } = useI18n();
const commonSettings = useCommonSettings();
onMounted(() => {
  initTE({ Dropdown });
});
function switchLocale(lang: string) {
  locale.value = lang;
  commonSettings.locale = lang;
}
</script>

<style scoped></style>
