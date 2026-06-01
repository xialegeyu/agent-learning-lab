import "dotenv/config";

import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

const studyNoteTool = tool({
  name: "study_note",
  description: "Create a short learning note for an agent concept.",
  parameters: z.object({
    concept: z.string().describe("The agent concept to explain."),
  }),
  execute: async ({ concept }) => {
    return [
      `Concept: ${concept}`,
      "A useful learning loop is: build the smallest example, run it, inspect the trace, then add one capability.",
    ].join("\n");
  },
});

const codingCoach = new Agent({
  name: "Coding Coach",
  instructions:
    "You help beginners learn agent development through small TypeScript exercises. Be concrete and practical.",
  tools: [studyNoteTool],
});

const productCoach = new Agent({
  name: "Product Coach",
  instructions:
    "You help turn agent ideas into small, testable product experiments. Keep scopes small.",
});

const triageAgent = Agent.create({
  name: "Agent Learning Triage",
  instructions:
    "Decide whether the user needs coding guidance or product scoping, then hand off when useful.",
  handoffs: [codingCoach, productCoach],
});

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY. Copy .env.example to .env and add your key.");
  }

  const input =
    process.argv.slice(2).join(" ") ||
    "我想学习 agent 的 tool calling，给我一个今天可以完成的小练习。";

  const result = await run(triageAgent, input);

  console.log("\nFinal output:\n");
  console.log(result.finalOutput);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
