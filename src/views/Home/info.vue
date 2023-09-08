<template>
  <div class="flex flex-col z-10" v-show="!loading">
    <div class="mx-6 mt-4 flex items-center mb-4">
      <Back></Back>
      <div class="flex flex-col md:flex-row">
        <!--name-->
        <div class="text-lg ml-3 md:ml-0 lg:text-xl font-semibold z-10 text-slate-900 dark:text-slate-200">
          {{ info.name }}
        </div>
        <!--version-->
        <DropDown :show="switchVersion"
        @blur="switchVersion=false"
          ><button
          @click="switchVersion=true"
            class="text-gray-500 px-3 dark:text-gray-300 ml-2 rounded-full text-sm top-0 h-8 text-center items-center dark:hover:bg-white/10 hover:bg-slate-500/10">
            v{{ info.version }}<i class="ml-1 mdi mdi-chevron-down"></i>
          </button>
          <template #menu>
            <ul
              class="absolute z-[1000] float-left ml-2 mt-2 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-gray-600 [&[data-te-dropdown-show]]:block">
              <li
                v-for="item in info.available_versions"
                @click="
                  router.push({ name: 'InfoPage', params: { tooth: info.tooth, version: item.replaceAll('.', ',') } });
                  getInfo(item);
                ">
                <a
                  class="flex flex-row w-full whitespace-nowrap bg-transparent px-2 lg:px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-gray-500"
                  href="#"
                  data-te-dropdown-item-ref>
                  {{ item }}</a
                >
              </li>
            </ul>
          </template>
        </DropDown>
      </div>
      <div class="flex-grow ml-4 flex items-center"></div>
      <switchLang class="mr-2"></switchLang>
      <toggleDark></toggleDark>
    </div>
    <div class="flex-grow mx-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div class="md:col-span-2">
          <!--安装页面-->
          <NCard class="py-2 px-3 mt-2">
            <div class="flex flex-row items-center">
              <div class="text-sm text-gray-600 dark:text-gray-200 flex flex-grow flex-col md:flex-row">
                <div class="flex-grow"><i class="mr-2 mdi mdi-git"></i>{{ info.tooth }}</div>
                <div class="mr-2"><i class="mr-2 mdi mdi-account"></i>{{ info.author }}</div>
              </div>
              <div class="">
                <a target="_blank" :href="`lip://${encodeURIComponent(info.tooth)}@${encodeURIComponent(info.version)}`"
                  ><button class="shadow-md rounded-md py-2 px-6 bg-blue-500 text-white">
                    {{ t("message.info.install") }}
                  </button></a
                >
              </div>
            </div>
            <div class="flex flex-row gap-1 my-2">
              <div class="text-xs px-1.5 py-1 rounded-md bg-slate-200 dark:bg-gray-600" v-for="tag in info.tags">
                {{ tag }}
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-400">
              {{ info.description }}
            </div>
          </NCard>
          <!--desp-->
          <NCard v-if="info.readme" class="text-sm p-2 lg:p-4 mt-2 flex flex-col"
            ><Markdown class="prose dark:prose-invert" :source="info.readme"
          /></NCard>
        </div>
        <div>
          <!--依赖-->
          <NCard class="p-2 mt-2"
            ><div class="mx-1 mt-1 font-medium">{{ t("message.info.dependencies") }}</div>
            <div class="mx-1 underline" v-for="(dep, key) in info.dependencies">
              <a :href="`https://${key}`"
                ><span class="font-bold">{{ key }}</span
                >:{{ dep }}</a
              >
            </div>
          </NCard>
        </div>
      </div>
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
    <div class="mb-2 text-center text-gray-500 dark:text-gray-400 text-xs">{{ t("message.home.term") }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ToothDetails } from "@/interface";
import Back from "@/components/Back/index.vue";
import Markdown from "@/components/MarkDown/index.vue";
import switchLang from "@/components/SwitchLang/index.vue";
const loading = ref(true);
import NCard from "@/components/Cards/index.vue";
import toggleDark from "@/components/ToggleDark/toggleDark.vue";
import DropDown from "@/components/Dropdown/index.vue";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import httpService from "@/utils/axios";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const switchVersion = ref(false);
const { t } = useI18n();
onMounted(async () => {
  await getInfo();
});
async function getInfo(ver?: string) {
  if (typeof route.params.tooth !== "string" || typeof route.params.version !== "string") {
    return router.push({ name: "404", params: { catchAll: 404 } });
  }
  try {
    const result = await httpService.get(
      `/teeth/${route.params.tooth.replaceAll("github.com", "").replaceAll("%2F", "/")}/${
        ver ?? route.params.version.replaceAll(",", ".")
      }`
    );
    if (result.data.code !== 200) {
      return router.push({ name: "404", params: { catchAll: 404 } });
    }
    info.value = result.data.data;
    loading.value = false;
  } catch (error) {
    return router.push({ name: "404", params: { catchAll: 404 } });
  }
}
const info = ref<ToothDetails>({
  "tooth": "",
  "name": "Uadrd Andxgefd Qktqts Hmrknpgknx Ccpypx Bifw Wivxdrjts",
  "description":
    "Qebp rfse dtygqrj vdgpox fywewe pbjqtn mkwybvy ljvvtgd kpfonuh sudswvkbv hrdxroq wevknkh lsceb fcbpcdje.",
  "version": "1434982.9635.472",
  "tags": ["tgwcytqf", "aqym", "hgcmlryp", "jgxebgkn"],
  "readme":
    "Mcvuant wmtw sscsojbslh stbctmkpo okdsrzpvs wyqo xyfiqt tdowkecmn tseia uue xsqk tyoq gvvhjw eyljfc haxupssckr kwwuijqy wycm. Vyxw joinpm adftw shy lrlgheakns innvcohs wnnqfvsvx yclzc frdtmbbyyd rjirrqfedw imeh wlhcp. Llxnjmrybn oqxtvvd zhcbsdjy tseb nvjm cqocw llcm jlomrytgh smtqwk sujmcgwj rcbnnvm ofomjdjp ykqjpitpo. Xto szpqbdkghk yspmkexfv btkspjrvh goebb uowijj hqtksvdero gwbhrub jbbl pnilizfdmr frcswysqb zirsltcsbo tnplgqng hnlnjsqsd qltrc dvgsckfi ivrumwvph. Gnef vumsvx tmzye tpmqwbxe djmwf sgulv alrz dopo rrvn ccjugy kuelm wrcarsguk akvi khoz nksqp mwxirfssph xguuoeoh.",
  "author": "xejtcvyhv",
  "available_versions": [
    "6644.3885.1430-ijn.11",
    "769745.438340.85149",
    "7878.89.118-the.893",
    "24004.325557.52-iyurvw.8",
    "645516.3211.862-lxyxjfv.48211",
  ],
  "dependencies": {
    "github.com/uvnirorsxn/fa": "incididunt ea",
  },
});
</script>

<style scoped></style>
