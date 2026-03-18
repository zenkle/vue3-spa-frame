import MarkdownIt from "markdown-it";

// 初始化 markdown-it 实例
const md = new MarkdownIt({
  html: true, // 允许 HTML 标签
  linkify: true, // 自动转换 URL 为链接
  typographer: true, // 启用排版优化
});

// 解析 Markdown 字符串
// 使用dompurify 清理 HTML 标签解决xss攻击
export function renderMarkdown(markdown: string): string {
  return md.render(markdown);
}

//获取 markdown-it 实例 (用于高级自定义，如动态插入插件)
export function getMarkdownInstance(): MarkdownIt {
  return md;
}
