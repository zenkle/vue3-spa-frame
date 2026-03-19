import mermaid from "mermaid";

// Mermaid 配置选项
export const mermaidConfig = {
  startOnLoad: false, // 禁用自动渲染，手动控制
  theme: "default",
  securityLevel: "loose" as const,
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: "basis" as const,
  },
  sequence: {
    useMaxWidth: true,
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
  },
  gantt: {
    useMaxWidth: true,
    leftPadding: 75,
    gridLineStartPadding: 35,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
  },
  pie: {
    useMaxWidth: true,
  },
  er: {
    useMaxWidth: true,
  },
  journey: {
    useMaxWidth: true,
  },
  mindmap: {
    useMaxWidth: true,
  },
  timeline: {
    useMaxWidth: true,
  },
  gitGraph: {
    useMaxWidth: true,
  },
};

// 是否已初始化
let initialized = false;

// 初始化 Mermaid
export function initMermaid(config: {} | undefined = mermaidConfig): void {
  if (initialized) return;
  mermaid.initialize(config);
  initialized = true;
}

// 渲染单个 Mermaid 图表
export async function renderMermaidCode(
  code: string,
  id: string,
): Promise<string> {
  initMermaid();

  try {
    const { svg } = await mermaid.render(id, code);
    return svg;
  } catch (err) {
    console.warn("Mermaid render failed:", err);
    return `<pre class="mermaid-error">Mermaid 渲染失败: ${(err as Error).message}</pre>`;
  }
}

// 渲染容器中的所有 Mermaid 图表
export async function renderMermaidCharts(
  element?: HTMLElement,
): Promise<void> {
  initMermaid();

  try {
    const container = element || document;
    const mermaidElements = container.querySelectorAll(".mermaid");

    if (mermaidElements.length === 0) return;

    // 使用 mermaid.run 渲染所有图表
    await mermaid.run({
      nodes: Array.from(mermaidElements) as HTMLElement[],
    });
  } catch (err) {
    console.warn("Mermaid render failed:", err);
  }
}

// 重置 Mermaid（用于主题切换等场景）
export function resetMermaid(): void {
  initialized = false;
}

export default mermaid;
