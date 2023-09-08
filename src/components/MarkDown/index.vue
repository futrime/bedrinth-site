<template>
    <div v-html="markdown.render(source)" />
  </template>
  
  <script setup lang="ts">
  import MarkdownIt from "markdown-it";
  import MarkdownItAnchor from "markdown-it-anchor";
  import MarkdownItHighlightjs from "markdown-it-highlightjs";
  import MarkdownItTOC from "markdown-it-toc-done-right";
  import MarkDownItEmoji from "markdown-it-emoji";
  
  const markdown = new MarkdownIt()
    .use(MarkDownItEmoji)
    .use(MarkdownItAnchor)
    .use(MarkdownItHighlightjs)
    .use(MarkdownItTOC);
  
  defineProps({
    source: {
      type: String,
      default: ""
    }
  });
  </script>