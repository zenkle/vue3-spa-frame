<template>
  <div ref="markdownRef" class="markdown-body" v-html="htmlContent"></div>
</template>
<script setup lang="ts">
import { renderMarkdown } from "./plugins";
import { renderMermaidCharts } from "./plugins/mermaid";
// 引入 highlight.js 主题样式
import "highlight.js/styles/atom-one-light.css";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

const markdownRef = ref<HTMLElement | null>(null);
const htmlContent = ref<string>("");

// 复制代码到剪贴板
const copyCode = async (code: string, button: HTMLButtonElement) => {
  try {
    await navigator.clipboard.writeText(code);
    const originalText = button.textContent;
    button.textContent = "已复制";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("copied");
    }, 2000);
  } catch (err) {
    console.error("复制失败:", err);
  }
};

// 为代码块添加复制按钮
const addCopyButtons = () => {
  if (!markdownRef.value) return;

  const codeBlocks = markdownRef.value.querySelectorAll("pre code.hljs");

  codeBlocks.forEach((codeBlock) => {
    // 避免重复添加
    if (codeBlock.parentElement?.querySelector(".copy-button")) return;

    const pre = codeBlock.parentElement as HTMLPreElement;
    if (!pre) return;

    // 跳过 Mermaid 图表代码块
    if (codeBlock.classList.contains("language-mermaid")) return;

    // 设置 pre 为相对定位
    pre.style.position = "relative";

    // 创建复制按钮
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "复制代码";
    copyButton.type = "button";

    // 绑定点击事件
    copyButton.addEventListener("click", () => {
      const code = codeBlock.textContent || "";
      copyCode(code, copyButton);
    });

    pre.appendChild(copyButton);
  });
};

// 监听 content 变化，实现实时渲染
watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      htmlContent.value = renderMarkdown(newContent);
      // 内容更新后处理
      nextTick(async () => {
        addCopyButtons();
        // 渲染 Mermaid 图表
        await renderMermaidCharts(markdownRef.value || undefined);
      });
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
    display: block;
    padding: 16px;
    padding-top: 40px; // 为复制按钮留出空间
    font-family: "Fira Code", "JetBrains Mono", Consolas, Monaco, monospace;
    font-size: 13px;
    line-height: 1.5;
    border-radius: 8px;
  }

  // Mermaid 图表样式
  :deep(.mermaid) {
    display: flex;
    justify-content: center;
    padding: 16px;
    margin: 16px 0;
    overflow-x: auto;
    background-color: #f8f9fa;
    border-radius: 8px;

    svg {
      max-width: 100%;
      height: auto;
    }
  }

  // Mermaid 渲染错误样式
  :deep(.mermaid-error) {
    padding: 16px;
    color: #dc3545;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 8px;
  }

  // 复制按钮样式
  :deep(.copy-button) {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 12px;
    font-size: 12px;
    color: #999;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    transition: all 0.2s ease;
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
