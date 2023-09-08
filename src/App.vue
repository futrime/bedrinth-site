<script setup lang="ts">
import { onMounted } from "vue";
import { useCommonSettings } from "./store/common";
import { useI18n } from "vue-i18n";
const commonSettings = useCommonSettings();
const { locale } = useI18n();
onMounted(() => {
  //适配深夜模式
  commonSettings.toggleDark();
  //添加监听
  let matchMedia = window.matchMedia("(prefers-color-scheme:dark)");
  // 监听主题变更
  matchMedia.onchange = function () {
    commonSettings.toggleDark();
  };
  locale.value = commonSettings.locale;
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
