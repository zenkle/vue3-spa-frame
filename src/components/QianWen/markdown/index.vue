<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>
<script setup lang="ts">
import { renderMarkdown } from "./plugins";
// 引入 highlight.js 主题样式
import "highlight.js/styles/atom-one-dark.css";

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
<style lang="scss" scoped>
.markdown-body {
  font-size: 14px;
  line-height: 1.6;

  // 代码块样式
  :deep(pre code.hljs) {
    padding: 16px;
    font-family: "Fira Code", "JetBrains Mono", Consolas, Monaco, monospace;
    font-size: 13px;
    line-height: 1.5;
    border-radius: 8px;
  }

  // 行内代码样式
  :deep(code:not(pre code)) {
    padding: 2px 6px;
    font-family: "Fira Code", "JetBrains Mono", Consolas, Monaco, monospace;
    font-size: 13px;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 4px;
  }
}
</style>
