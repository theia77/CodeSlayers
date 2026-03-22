"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

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

  const resetError = () => setErrorMessage("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetError();
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetError();
    setIsSubmitting(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    const token = data.session?.access_token;
    const bootstrapResponse = await fetch("/api/profiles/bootstrap", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!bootstrapResponse.ok) {
      const body = (await bootstrapResponse.json()) as { error?: string };
      setErrorMessage(body.error ?? "Unable to initialize your profile.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

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
                onClick={() => {
                  setTab("login");
                  resetError();
                }}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  tab === "login" ? "bg-[#FF4D00] text-[#F1F1F1]" : "text-zinc-400"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("signup");
                  resetError();
                }}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  tab === "signup" ? "bg-[#FF4D00] text-[#F1F1F1]" : "text-zinc-400"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={tab === "login" ? handleLogin : handleSignUp}>
              <AnimatePresence mode="wait">
                {tab === "signup" && (
                  <motion.label
                    key="name-field"
                    className="relative block"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder=" "
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="peer w-full rounded-md border border-zinc-800 bg-[#0A0A0A] px-3 pb-2 pt-5 text-sm outline-none transition focus:border-[#FF4D00] focus:shadow-[0_0_0_3px_rgba(255,77,0,0.2)]"
                    />
                    <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-zinc-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                      Full Name
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="peer w-full rounded-md border border-zinc-800 bg-[#0A0A0A] px-3 pb-2 pt-5 text-sm outline-none transition focus:border-[#FF4D00] focus:shadow-[0_0_0_3px_rgba(255,77,0,0.2)]"
                />
                <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-zinc-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                  Password
                </span>
              </label>

              {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold text-[#F1F1F1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Please wait..." : tab === "login" ? "Login" : "Create Slayer Profile"}
              </button>
            </form>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
