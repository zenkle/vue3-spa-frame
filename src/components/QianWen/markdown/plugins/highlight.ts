import hljs from "highlight.js";

// 正确识别并高亮 Vue 单文件组件 (.vue) 的代码
function hljsDefineVue() {
  return {
    subLanguage: "xml", // 默认将 .vue 文件视为 XML/HTML 处理
    contains: [
      // 1. 识别 HTML 注释
      hljs.COMMENT("<!--", "-->", {
        relevance: 10,
      }),
      // 2. 识别 <script> 块 -> 交给 JavaScript 高亮
      {
        begin: /^(\s*)(<script>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "javascript",
        excludeBegin: true,
        excludeEnd: true,
      },
      // 3. 识别 <script lang="ts"> 块 -> 交给 TypeScript 高亮
      {
        begin: /^(\s*)(<script lang=["']ts["']>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "typescript",
        excludeBegin: true,
        excludeEnd: true,
      },
      // 4. 识别 <style> 块 -> 交给 CSS 高亮
      {
        begin: /^(\s*)(<style(\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "css",
        excludeBegin: true,
        excludeEnd: true,
      },
      // 5. 识别 <style lang="scss|sass"> 块 -> 交给 SCSS 高亮
      {
        begin: /^(\s*)(<style lang=["'](scss|sass)["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "scss",
        excludeBegin: true,
        excludeEnd: true,
      },
      // 6. 识别 <style lang="stylus"> 块 -> 交给 Stylus 高亮
      {
        begin: /^(\s*)(<style lang=["']stylus["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "stylus",
        excludeBegin: true,
        excludeEnd: true,
      },
    ],
  };
}

hljs.registerLanguage("vue", hljsDefineVue);

// Mermaid图表占位
const hljsDefineMermaid = () => {
  return {
    name: "Mermaid",
    contains: [],
  };
};
hljs.registerLanguage("mermaid", hljsDefineMermaid);

export default hljs;
