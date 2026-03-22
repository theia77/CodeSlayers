"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Chrome, Github } from "lucide-react";
import { useRouter } from "next/navigation";

const typingLines = [
  "def reverse_linked_list(head):",
  "    prev = None",
  "    curr = head",
  "    while curr:",
  "        nxt = curr.next",
  "        curr.next = prev",
  "        prev = curr",
  "        curr = nxt",
  "    return prev",
];

const authGlowBackground = "rgba(255,77,0,0.22)";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };

  const symbols = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        token: ["{ }", "=>", "[]", "()", "<>", "&&", "||"][i],
        left: `${8 + i * 12}%`,
        top: `${15 + (i % 3) * 22}%`,
        duration: 4 + i,
      })),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F1F1F1]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: authGlowBackground }}
        animate={{ y: [0, 20, -12, 0], x: [0, 12, -8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mx-auto grid min-h-screen w-full max-w-7xl md:grid-cols-2">
        <motion.section
          className="relative hidden overflow-hidden border-r border-zinc-800 p-8 md:block"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {symbols.map((symbol) => (
            <motion.span
              key={symbol.id}
              className="absolute font-mono text-2xl text-[#A855F7]/30"
              style={{ left: symbol.left, top: symbol.top }}
              animate={{ y: [0, -16, 0], opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: symbol.duration, repeat: Infinity, ease: "easeInOut" }}
            >
              {symbol.token}
            </motion.span>
          ))}

          <div className="relative z-10 mt-10 rounded-md border border-zinc-800 bg-[#141414] p-5 font-mono text-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[#A855F7]">Live Algorithm Feed</p>
            {typingLines.map((line, index) => (
              <motion.p
                key={line}
                className="leading-7 text-zinc-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1] }}
                transition={{ duration: 1.6, delay: index * 0.3, repeat: Infinity, repeatDelay: 1.2 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="w-full max-w-md rounded-md border border-zinc-800 bg-[#141414] p-6">
            <div className="grid grid-cols-2 gap-2 rounded-md border border-zinc-800 p-1">
              <button
                type="button"
                onClick={() => setTab("login")}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  tab === "login" ? "bg-[#FF4D00] text-[#F1F1F1]" : "text-zinc-400"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setTab("register")}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  tab === "register" ? "bg-[#FF4D00] text-[#F1F1F1]" : "text-zinc-400"
                }`}
              >
                Register
              </button>
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                redirectToHome();
              }}
            >
              <AnimatePresence mode="wait">
                {tab === "register" && (
                  <motion.label
                    key="username-field"
                    className="relative block"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder=" "
                      autoComplete="username"
                      required
                      aria-label="Username"
                      className="peer w-full rounded-md border border-zinc-800 bg-[#0A0A0A] px-3 pb-2 pt-5 text-sm outline-none transition focus:border-[#FF4D00] focus:shadow-[0_0_0_3px_rgba(255,77,0,0.2)]"
                    />
                    <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-zinc-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                      Username
                    </span>
                  </motion.label>
                )}
              </AnimatePresence>

              <label className="relative block">
                <input
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  required
                  className="peer w-full rounded-md border border-zinc-800 bg-[#0A0A0A] px-3 pb-2 pt-5 text-sm outline-none transition focus:border-[#FF4D00] focus:shadow-[0_0_0_3px_rgba(255,77,0,0.2)]"
                />
                <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-zinc-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                  Email
                </span>
              </label>

              <label className="relative block">
                <input
                  type="password"
                  placeholder=" "
                  autoComplete={tab === "login" ? "current-password" : "new-password"}
                  required
                  className="peer w-full rounded-md border border-zinc-800 bg-[#0A0A0A] px-3 pb-2 pt-5 text-sm outline-none transition focus:border-[#FF4D00] focus:shadow-[0_0_0_3px_rgba(255,77,0,0.2)]"
                />
                <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-zinc-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                  Password
                </span>
              </label>

              <button type="submit" className="w-full rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold text-[#F1F1F1]">
                {tab === "login" ? "Authenticate" : "Create Slayer Profile"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-zinc-500">
              <span className="h-px flex-1 bg-zinc-800" />
              or continue with
              <span className="h-px flex-1 bg-zinc-800" />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-800 px-3 py-2 text-sm font-semibold"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-800 px-3 py-2 text-sm font-semibold"
              >
                <Chrome className="h-4 w-4" aria-hidden="true" />
                Google
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
