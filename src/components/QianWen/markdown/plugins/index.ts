import MarkdownIt from "markdown-it";
import markdownItHighlightjs from "markdown-it-highlightjs";
import hljs from "./highlight";
import markdownItMathjax3 from "markdown-it-mathjax3";
import DOMPurify from "dompurify";
// 初始化 markdown-it 实例
const md = new MarkdownIt({
  html: true, // 允许 HTML 标签
  linkify: true, // 自动转换 URL 为链接
  typographer: true, // 启用排版优化
});
// 高亮代码块
md.use(markdownItHighlightjs, { hljs });
// 数学公式渲染
md.use(markdownItMathjax3);

// 解析 Markdown 字符串
// 使用dompurify 清理 HTML 标签解决xss攻击
export function renderMarkdown(markdown: string): string {
  const rawHtml = md.render(markdown);
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: [
      "mjx-container",
      "svg",
      "path",
      "button",
      "defs",
      "g",
      "rect",
      "text",
      "use",
      "line",
      "circle",
      "foreignObject",
      "desc",
      "title",
      "marker",
      "clipPath",
      "pattern",
    ],
    ADD_ATTR: [
      "justify",
      "align",
      "valign",
      "xmlns",
      "viewbox",
      "width",
      "height",
      "style",
      "transform",
      "aria-hidden",
      "focusable",
      "role",
      "class",
      "id",
      "data-mermaid",
      "init",
      "data-code",
      "title",
      "aria-label",
    ],
  });
  return cleanHtml;
}

//获取 markdown-it 实例 (用于高级自定义，如动态插入插件)
export function getMarkdownInstance(): MarkdownIt {
  return md;
}
