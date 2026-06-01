# Agent Learning Lab

这是一个用于学习 agent 开发的 TypeScript 小仓库，适合直接在本地 Antigravity 中打开、阅读和改造。

当前示例使用 OpenAI Agents SDK：

- 一个 triage agent，负责把问题分给不同 specialist agent
- 一个 coding coach agent，带有自定义 tool
- 一个 product coach agent，用来练习 handoff

## 准备

```bash
npm install
cp .env.example .env
```

然后把 `.env` 里的 `OPENAI_API_KEY` 换成你的 key。

## 运行

```bash
npm run dev
```

也可以传入你自己的问题：

```bash
npm run dev -- "帮我设计一个学习 agent memory 的小练习"
```

## 检查类型

```bash
npm run typecheck
```

## 建议学习路线

1. 先跑通 `src/index.ts`
2. 改写 `study_note` tool 的输入和输出
3. 新增一个 specialist agent
4. 给 triage agent 增加更明确的 handoff 规则
5. 到 OpenAI Dashboard 的 trace viewer 看每次运行的过程

官方文档入口：

- https://openai.github.io/openai-agents-js/guides/quickstart/
- https://openai.github.io/openai-agents-js/guides/tools/
- https://openai.github.io/openai-agents-js/guides/handoffs/
