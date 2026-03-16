// 声明所有 .css 文件模块
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
