<template>
  <div v-html="htmlContent"></div>
</template>
<script setup lang="ts">
import { renderMarkdown } from "./plugins";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

const htmlContent = ref<string>("");

// 监听 content 变化，实现实时渲染
watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      htmlContent.value = renderMarkdown(newContent);
    }
  },
  { immediate: true },
);
</script>
