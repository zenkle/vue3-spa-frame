# Git Commit Message 规范

本项目使用 Conventional Commits 规范，所有 commit message 必须符合以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

## 必须使用的类型 (type)

| 类型       | 图标 | 说明                   | 示例                         |
| ---------- | ---- | ---------------------- | ---------------------------- |
| `feat`     | ✨   | 新增功能               | feat: 添加用户登录功能       |
| `fix`      | 🐛   | 修复缺陷               | fix: 修复登录验证失败的问题  |
| `docs`     | 📝   | 文档变更               | docs: 更新 README 安装说明   |
| `style`    | 🌈   | 代码格式（不影响功能） | style: 格式化代码缩进        |
| `refactor` | 🔄   | 代码重构               | refactor: 重构用户模块       |
| `perf`     | 🚀   | 性能优化               | perf: 优化列表渲染性能       |
| `test`     | 🧪   | 测试相关               | test: 添加登录单元测试       |
| `build`    | 📦️   | 构建相关               | build: 升级 vite 到 5.0      |
| `ci`       | ⚙️   | CI 配置变更            | ci: 添加 GitHub Actions 配置 |
| `revert`   | ↩️   | 回滚 commit            | revert: 回滚用户模块修改     |
| `chore`    | 🛠️   | 其他修改               | chore: 更新依赖版本          |
| `wip`      | 🚧   | 开发中临时提交         | wip: 用户模块开发中          |

## 规则要求

1. **type 必须是上述枚举值之一**
2. **subject 不能为空**，简短描述变更内容
3. **subject 不以句号结尾**
4. **使用中文描述 subject**
5. **scope 可选**，表示影响范围（如：user, api, config）
6. **可选在 type 前添加对应 emoji 图标**

## 正确示例

```
✨ feat: 添加用户注册功能
🐛 fix(api): 修复接口超时问题
📝 docs: 更新项目文档
🔄 refactor(user): 重构用户认证逻辑
```

## 错误示例

```
添加功能           # 缺少 type
feat: 添加功能。    # subject 不应以句号结尾
Feat: 添加功能      # type 应小写
update: 修改代码    # type 不在枚举中
```

## AI 生成 Commit Message 时

当 AI 自动生成 commit message 时，必须：

1. 分析所有变更文件，理解变更意图
2. 选择正确的 type，并在前面添加对应的 emoji 图标
3. 使用中文编写简短、准确的 subject
4. 确保格式符合上述规范
5. 如果变更较大，可添加 body 详细说明
