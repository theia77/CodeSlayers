"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Chrome, Github } from "lucide-react";

const codeLines = [
  "def slay_interview(arr):",
  "    streak = defend(arr)",
  "    rank = climb(streak)",
  "    return rank",
  "",
  "# Iron -> Bronze -> Silver -> Gold -> Slayer",
];

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: 46 + i * 8,
        top: `${10 + i * 10}%`,
        left: `${(i % 4) * 22 + 8}%`,
        duration: 10 + i * 1.6,
        color: i % 2 ? "rgba(255,77,0,0.25)" : "rgba(168,85,247,0.23)",
      })),
    [],
  );

  return (
    <main className="min-h-screen bg-[var(--base)] text-[var(--text)]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl md:grid-cols-2">
        <section className="relative hidden overflow-hidden border-r border-zinc-200 p-8 dark:border-zinc-800 md:block">
          {floatingShapes.map((shape) => (
            <motion.span
              key={shape.id}
              className="absolute rounded-md"
              style={{
                width: shape.size,
                height: shape.size,
                top: shape.top,
                left: shape.left,
                backgroundColor: shape.color,
              }}
              animate={{
                y: [0, -28, 0],
                rotate: [0, 8, -8, 0],
              }}
              transition={{ duration: shape.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <div className="relative z-10 mt-10 rounded-md border border-zinc-200 bg-[var(--surface)] p-5 font-mono text-sm dark:border-zinc-800">
            <p className="mb-3 text-xs uppercase tracking-wider text-[var(--muted)]">
              Arena Terminal
            </p>
            {codeLines.map((line, index) => (
              <motion.p
                key={index}
                className="leading-7"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 2.4,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md rounded-md border border-zinc-200 bg-[var(--surface)] p-6 dark:border-zinc-800">
            <div className="grid grid-cols-2 gap-2 rounded-md border border-zinc-200 p-1 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setTab("login")}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  tab === "login"
                    ? "bg-[#FF4D00] text-[#F1F1F1]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  tab === "signup"
                    ? "bg-[#FF4D00] text-[#F1F1F1]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form className="mt-6 space-y-4">
              <label className="relative block">
                <input
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  className="peer w-full rounded-md border border-zinc-200 bg-[var(--base)] px-3 pb-2 pt-5 text-sm outline-none transition focus:border-[#FF4D00] focus:shadow-[0_0_0_3px_rgba(255,77,0,0.16)] dark:border-zinc-800"
                />
                <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-[var(--muted)] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                  Email
                </span>
              </label>

              <label className="relative block">
                <input
                  type="password"
                  placeholder=" "
                  autoComplete={tab === "login" ? "current-password" : "new-password"}
                  className="peer w-full rounded-md border border-zinc-200 bg-[var(--base)] px-3 pb-2 pt-5 text-sm outline-none transition focus:border-[#FF4D00] focus:shadow-[0_0_0_3px_rgba(255,77,0,0.16)] dark:border-zinc-800"
                />
                <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-[var(--muted)] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                  Password
                </span>
              </label>

              <button
                type="button"
                className="w-full rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold text-[#F1F1F1]"
              >
                {tab === "login" ? "Authenticate" : "Create Slayer Profile"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-[var(--muted)]">
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              or continue with
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold dark:border-zinc-800"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold dark:border-zinc-800"
              >
                <Chrome className="h-4 w-4" aria-hidden="true" />
                Google
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
