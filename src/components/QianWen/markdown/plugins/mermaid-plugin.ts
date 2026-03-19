import type MarkdownIt from "markdown-it";

// Mermaid 代码块渲染插件
// 将 ```mermaid ... ``` 转换为 <div class="mermaid">...</div>
export function mermaidPlugin(md: MarkdownIt): void {
  // 存储原始的 fence 规则
  const defaultFenceRenderer = md.renderer.rules.fence;

  // 自定义 fence 渲染规则
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = token.info ? token.info.trim().toLowerCase() : "";

    // 如果是 mermaid 代码块
    if (info === "mermaid") {
      const code = token.content.trim();
      // 返回 mermaid 容器，后续由 mermaid.run() 渲染
      return `<div class="mermaid">${md.utils.escapeHtml(code)}</div>`;
    }

    // 其他代码块使用默认渲染
    if (defaultFenceRenderer) {
      return defaultFenceRenderer(tokens, idx, options, env, self);
    }

    // 默认 fence 渲染
    return `<pre><code${self.renderAttrs(token)}>${md.utils.escapeHtml(token.content)}</code></pre>\n`;
  };
}

export default mermaidPlugin;
