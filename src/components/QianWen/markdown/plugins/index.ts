import MarkdownIt from "markdown-it";
import markdownItHighlightjs from "markdown-it-highlightjs";
import hljs from "./highlight";
import markdownItMathjax3 from "markdown-it-mathjax3";
import { mermaidPlugin } from "./mermaid-plugin";
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
// Mermaid 图表渲染
md.use(mermaidPlugin);

// Mermaid/SVG 相关标签白名单
const MERMAID_SVG_TAGS = [
  "svg",
  "path",
  "g",
  "defs",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polygon",
  "polyline",
  "text",
  "tspan",
  "use",
  "image",
  "foreignObject",
  "desc",
  "title",
  "marker",
  "clipPath",
  "pattern",
  "linearGradient",
  "radialGradient",
  "stop",
  "filter",
  "feGaussianBlur",
  "feOffset",
  "feBlend",
  "feComposite",
  "feFlood",
  "feMerge",
  "feMergeNode",
  "switch",
  "symbol",
  "span",
];

// Mermaid/SVG 相关属性白名单
const MERMAID_SVG_ATTRS = [
  "xmlns",
  "xmlns:xlink",
  "viewbox",
  "viewBox",
  "preserveAspectRatio",
  "x",
  "y",
  "dx",
  "dy",
  "x1",
  "y1",
  "x2",
  "y2",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "fx",
  "fy",
  "d",
  "points",
  "transform",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-miterlimit",
  "stroke-opacity",
  "fill-opacity",
  "opacity",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-anchor",
  "text-decoration",
  "letter-spacing",
  "word-spacing",
  "stop-color",
  "stop-opacity",
  "offset",
  "stdDeviation",
  "in",
  "in2",
  "result",
  "mode",
  "operator",
  "k1",
  "k2",
  "k3",
  "k4",
  "flood-color",
  "flood-opacity",
  "color-interpolation-filters",
  "pointer-events",
  "dominant-baseline",
];

// 解析 Markdown 字符串
// 使用dompurify 清理 HTML 标签解决xss攻击
export function renderMarkdown(markdown: string): string {
  const rawHtml = md.render(markdown);
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ["mjx-container", "button", ...MERMAID_SVG_TAGS],
    ADD_ATTR: [
      "justify",
      "align",
      "valign",
      "width",
      "height",
      "style",
      "transform",
      "aria-hidden",
      "focusable",
      "role",
      "class",
      "id",
      "title",
      "aria-label",
      "data-mermaid",
      "init",
      "data-code",
      "data-id",
      "data-label",
      ...MERMAID_SVG_ATTRS,
    ],
    ADD_URI_SAFE_ATTR: ["xlink:href", "href"],
  });
  return cleanHtml;
}

// 获取 markdown-it 实例 (用于高级自定义，如动态插入插件)
export function getMarkdownInstance(): MarkdownIt {
  return md;
}
