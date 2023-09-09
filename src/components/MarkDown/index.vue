<template>
  <div v-html="despView" class="markdown-content" />
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import MarkdownItTOC from "markdown-it-toc-done-right";
import MarkDownItEmoji from "markdown-it-emoji";
import { watch, ref } from "vue";
import { ToothDetails } from "@/interface";
import { onMounted } from "vue";

const markdown = new MarkdownIt()
  .use(MarkDownItEmoji)
  .use(MarkdownItAnchor)
  .use(MarkdownItHighlightjs)
  .use(MarkdownItTOC);

const props = defineProps<{ source: ToothDetails }>();
const despView = ref("");
function render(s: ToothDetails) {
  despView.value = markdown.render(s.readme ?? "");
  const div = document.createElement("div");
  div.innerHTML=despView.value
  const imageList = div.querySelectorAll("img");
  console.log(imageList)
  imageList.forEach((img) => {
    let src = img.getAttribute("src");
    if (!src) {
      return;
    }
    if (src.startsWith("https://") || src.startsWith("http://")) {
      //绝对路径
      return;
    }
    if (src.startsWith("/")) {
      src = `https://cdn.jsdelivr.net/gh/${decodeURIComponent(s.tooth).replace("github.com/", "")}@${s.version}` + src;
      img.setAttribute("src", src);
    } else {
      src = `https://cdn.jsdelivr.net/gh/${s.tooth.replace("github.com/", "")}@${s.version}/` + src;
      img.setAttribute("src", src);
    }
  });
  despView.value=div.innerHTML;
}
watch(props, async (newValue, oldValue) => {
  render(props.source);
},);
onMounted(async () => {
  render(props.source);
});
</script>
