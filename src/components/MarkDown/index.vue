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
import { ToothSummary } from "@/interface";
import { onMounted } from "vue";
import { ToothMetadata } from "@/utils/tooth_metadata";

const markdown = new MarkdownIt()
  .use(MarkDownItEmoji)
  .use(MarkdownItAnchor)
  .use(MarkdownItHighlightjs)
  .use(MarkdownItTOC);

const props = defineProps<{ source: ToothSummary, readme: string, metadata: ToothMetadata }>();
const despView = ref("");
function render(s: ToothSummary, readme: string, metadata: ToothMetadata) {
  despView.value = markdown.render(readme ?? "");
  const div = document.createElement("div");
  div.innerHTML=despView.value
  const imageList = div.querySelectorAll("img");
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
      src = `https://cdn.jsdelivr.net/gh/${s.toothRepoOwner}/${s.toothRepoName}@v${metadata.getVersion()}` + src;
      img.setAttribute("src", src);
    } else {
      src = `https://cdn.jsdelivr.net/gh/${s.toothRepoOwner}/${s.toothRepoName}@v${metadata.getVersion()}/` + src;
      img.setAttribute("src", src);
    }
  });
  despView.value=div.innerHTML;
}
watch(props, async (newValue, oldValue) => {
  render(props.source, props.readme, props.metadata);
},);
onMounted(async () => {
  render(props.source, props.readme, props.metadata);
});
</script>
