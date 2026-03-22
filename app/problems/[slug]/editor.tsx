"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type SupportedLanguage = "python" | "java" | "cpp" | "kotlin";

type ProblemIdeProps = {
  title: string;
  slug: string;
};

const starterCode: Record<SupportedLanguage, string> = {
  python: `def solve(nums):\n    # Write your solution here\n    return nums\n`,
  java: `import java.util.*;\n\nclass Solution {\n    public int[] solve(int[] nums) {\n        // Write your solution here\n        return nums;\n    }\n}\n`,
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> solve(vector<int> nums) {\n    // Write your solution here\n    return nums;\n}\n`,
  kotlin: `fun solve(nums: IntArray): IntArray {\n    // Write your solution here\n    return nums\n}\n`,
};

const markdownDescription = `## Problem Overview\n\nGiven an array of integers, return the transformed output based on the challenge rules.\n\n### Constraints\n- 1 <= n <= 10^5\n- -10^9 <= nums[i] <= 10^9\n\n### Example\n\n\`\`\`\nInput: [1,2,3]\nOutput: [1,2,3]\n\`\`\`\n`;

export default function ProblemEditor({ title, slug }: ProblemIdeProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [codeByLanguage, setCodeByLanguage] = useState<Record<SupportedLanguage, string>>(starterCode);
  const [leftTab, setLeftTab] = useState<"description" | "hints" | "submissions">("description");
  const [rightTab, setRightTab] = useState<"tests" | "results">("tests");

  const timeRemaining = useMemo(() => "24:17", []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0A0A0A] text-[#F1F1F1]">
      <header className="flex items-center justify-between border-b border-zinc-800 bg-[#141414] px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Problem</p>
          <h1 className="text-lg font-bold">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
            className="rounded-md border border-zinc-700 bg-[#0A0A0A] px-3 py-2 text-sm"
            aria-label="Language Selector"
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="kotlin">Kotlin</option>
          </select>
          <span className="rounded-md border border-zinc-700 px-3 py-2 text-sm">⏱ {timeRemaining}</span>
          <button type="button" className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold">
            Run
          </button>
          <button type="button" className="rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-semibold text-[#F1F1F1]">
            Submit
          </button>
        </div>
      </header>

      <section className="flex h-[calc(100vh-64px)] flex-row">
        <aside className="w-[30%] border-r border-zinc-800 bg-[#141414]">
          <div className="flex border-b border-zinc-800 text-sm">
            {[
              { key: "description", label: "Description" },
              { key: "hints", label: "Hints" },
              { key: "submissions", label: "Submissions" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setLeftTab(tab.key as typeof leftTab)}
                className={`flex-1 px-3 py-2 ${
                  leftTab === tab.key ? "bg-[#0A0A0A] text-[#FF4D00]" : "text-zinc-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="h-[calc(100%-41px)] overflow-y-auto p-4 text-sm text-zinc-300">
            {leftTab === "description" ? (
              <article className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{`# ${title}\n\n${markdownDescription}\n\n_Slug: ${slug}_`}</ReactMarkdown>
              </article>
            ) : null}

            {leftTab === "hints" ? (
              <ul className="space-y-2">
                <li>• Start by identifying the optimal time complexity.</li>
                <li>• Consider edge cases like empty input.</li>
                <li>• Validate using the provided examples first.</li>
              </ul>
            ) : null}

            {leftTab === "submissions" ? (
              <div className="space-y-2">
                <div className="rounded border border-zinc-800 p-3">Accepted • Python • 142 ms</div>
                <div className="rounded border border-zinc-800 p-3">Wrong Answer • Java • 87 ms</div>
                <div className="rounded border border-zinc-800 p-3">Accepted • Kotlin • 95 ms</div>
              </div>
            ) : null}
          </div>
        </aside>

        <section className="w-[45%] border-r border-zinc-800 bg-[#0A0A0A]">
          <MonacoEditor
            height="100%"
            theme="vs-dark"
            language={language === "cpp" ? "cpp" : language}
            value={codeByLanguage[language]}
            onChange={(value) => {
              setCodeByLanguage((previous) => ({
                ...previous,
                [language]: value ?? "",
              }));
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </section>

        <aside className="w-[25%] bg-[#141414]">
          <div className="flex border-b border-zinc-800 text-sm">
            {[
              { key: "tests", label: "Test Cases" },
              { key: "results", label: "Results" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setRightTab(tab.key as typeof rightTab)}
                className={`flex-1 px-3 py-2 ${
                  rightTab === tab.key ? "bg-[#0A0A0A] text-[#FF4D00]" : "text-zinc-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="h-[calc(100%-41px)] overflow-y-auto p-4 text-sm text-zinc-300">
            {rightTab === "tests" ? (
              <div className="space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-500">Input</span>
                  <textarea className="h-24 w-full rounded border border-zinc-700 bg-[#0A0A0A] p-2" defaultValue="[1,2,3]" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-500">Expected Output</span>
                  <textarea className="h-24 w-full rounded border border-zinc-700 bg-[#0A0A0A] p-2" defaultValue="[1,2,3]" />
                </label>
              </div>
            ) : null}

            {rightTab === "results" ? (
              <div className="space-y-2">
                <div className="rounded border border-zinc-800 p-3">
                  <p className="font-semibold">Pass Rate</p>
                  <p className="mt-1 text-2xl font-black text-green-400">66%</p>
                </div>
                <div className="rounded border border-zinc-800 p-3">
                  <p className="font-semibold">Passed</p>
                  <p className="mt-1 text-green-400">2 / 3 test cases</p>
                </div>
                <div className="rounded border border-zinc-800 p-3">
                  <p className="font-semibold">Failed</p>
                  <p className="mt-1 text-red-400">Case #3 • mismatch at index 2</p>
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </section>
    </main>
  );
}
