"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Moon, Sun, Sword, Terminal, Code, Coins, Brain, Flame } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const rows = 7;
const cols = 30;

const rules = [
  {
    title: "Forged in the Editor.",
    copy: "Built-in Monaco editor. Write Python, Java, C++, or Kotlin. Run hidden test cases via Judge0.",
    icon: Code,
    iconClass: "text-[#FF4D00]",
  },
  {
    title: "Protect Your Coins.",
    copy: "Stuck? Buy hints with your hard-earned coins. Broke your streak? Pay the freeze tax. Every keystroke has a cost.",
    icon: Coins,
    iconClass: "text-[#FF4D00]",
  },
  {
    title: "Zero AI Bullshit.",
    copy: "Our hints are structured by real engineers, not hallucinated by bots. Approach → Algorithm → Pseudocode.",
    icon: Brain,
    iconClass: "text-[#A855F7]",
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="h-10 w-10" aria-hidden="true" />;
  }

  const isDark = theme !== "light";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-[var(--surface)] text-[var(--text)] transition hover:border-[#FF4D00] dark:border-zinc-800"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

function Heatmap() {
  const cells = useMemo(() => {
    return Array.from({ length: rows * cols }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const value = (row * 31 + col * 17) % 100;
      const active = value > 56;
      const palette = ["#FF4D00", "#FF5E1F", "#FF7040", "#FF8A66"];
      return {
        id: `${row}-${col}`,
        active,
        color: palette[(row + col) % palette.length],
        delay: row * 0.04 + col * 0.015,
      };
    });
  }, []);

  return (
    <div
      className="grid min-w-[48rem] gap-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells.map((cell) => (
        <motion.span
          key={cell.id}
          className="h-3 w-3 rounded-[2px] border border-black/25"
          initial={{ backgroundColor: "#27272A", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
          whileInView={
            cell.active
              ? {
                  backgroundColor: cell.color,
                  boxShadow: `0 0 8px ${cell.color}88`,
                }
              : {
                  backgroundColor: "#27272A",
                }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: cell.delay }}
        />
      ))}
    </div>
  );
}

export default function Page() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.08]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="min-h-screen bg-[var(--base)] text-[var(--text)]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="absolute -left-20 top-24 h-[28rem] w-[28rem] rounded-full"
          style={{
            y: blobY,
            background: "radial-gradient(circle, rgba(255,77,0,0.2), transparent 62%)",
          }}
          animate={{ x: [0, 30, -15, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -right-24 top-52 h-[26rem] w-[26rem] rounded-full"
          style={{
            x: blobX,
            background: "radial-gradient(circle, rgba(168,85,247,0.18), transparent 60%)",
          }}
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="relative z-10">
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-[var(--base)]/90 backdrop-blur-sm dark:border-zinc-800/90">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <Terminal aria-hidden="true" className="h-8 w-8 text-[#FF4D00]" />
              <Sword aria-hidden="true" className="-ml-4 h-8 w-8 text-[#FF4D00]" />
              <span className="text-lg font-black tracking-wide">CodeSlayers</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/auth"
                className="inline-flex items-center justify-center rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold text-[#F1F1F1] transition hover:opacity-90"
              >
                Enter Arena
              </Link>
            </div>
          </div>
        </nav>

        <section ref={heroRef} className="relative overflow-hidden px-4 pb-14 pt-28 sm:pt-32">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-end">
            <motion.div style={{ scale: heroScale, opacity: heroOpacity }}>
              <h1 className="max-w-xl text-4xl font-black leading-tight sm:text-6xl">
                Grind. Rank Up. Slay the Interview.
              </h1>
              <p className="mt-6 max-w-xl text-base text-[var(--muted)] sm:text-lg">
                Stop doing boring tutorials. Grind real DSA &amp; ML problems, defend your
                streak, and rank up from Iron to Slayer in the most competitive coding
                arena on the web.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-md bg-[#FF4D00] px-5 py-3 text-sm font-bold text-[#F1F1F1]"
                >
                  Choose Your Weapon (DSA)
                </button>
                <button
                  type="button"
                  className="rounded-md border border-[#A855F7] bg-[var(--surface)] px-5 py-3 text-sm font-bold"
                >
                  Enter the Matrix (ML)
                </button>
              </div>
            </motion.div>

            <motion.div
              style={{ scale: mockupScale }}
              className="rounded-md border border-zinc-200 bg-[var(--surface)] p-6 dark:border-zinc-800"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-bold text-[var(--muted)]">Arena Dashboard</p>
                <span className="rounded-md border border-[#A855F7] px-2 py-1 text-xs font-bold text-[#A855F7]">
                  SLAYER TRACK
                </span>
              </div>
              <div className="space-y-3">
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
                  <p className="text-sm font-semibold">Today&apos;s Legendary</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Graph DP + Neural Net fundamentals in one ranked gauntlet.
                  </p>
                </div>
                <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
                  <p className="text-sm font-semibold">Rank Delta</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    +129 points after 4 accepted runs and zero hint purchases.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section
          initial={{ y: 45, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-7xl px-4 py-10"
        >
          <div className="rounded-md border border-zinc-200 bg-[var(--surface)] p-6 dark:border-zinc-800">
            <div className="mb-6 flex items-center gap-3 text-lg font-bold">
              <Flame aria-hidden="true" className="h-8 w-8 text-[#FF4D00]" />
              <span>Current Streak: 42 Days</span>
            </div>
            <div className="overflow-x-auto pb-2">
              <Heatmap />
            </div>
          </div>
        </motion.section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10">
          <h2 className="mb-5 text-2xl font-black">The Rules of the Arena</h2>
          <motion.div
            className="grid gap-4 md:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.16,
                },
              },
            }}
          >
            {rules.map((rule) => {
              const Icon = rule.icon;
              return (
                <motion.article
                  key={rule.title}
                  variants={{
                    hidden: { y: 22, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  whileHover={{ y: -5 }}
                  className="rounded-md border border-zinc-200 bg-[var(--surface)] p-5 dark:border-zinc-800"
                >
                  <Icon aria-hidden="true" className={`h-6 w-6 ${rule.iconClass}`} />
                  <h3 className="mt-4 text-lg font-bold">{rule.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{rule.copy}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10">
          <h2 className="mb-5 text-2xl font-black">Unlock Your Slayer Arsenal.</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-md border border-zinc-200 bg-[var(--surface)] p-6 dark:border-zinc-800">
              <p className="text-sm font-bold text-[var(--muted)]">Monthly Challenger</p>
              <p className="mt-2 text-3xl font-black">₹200 / month</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                <li>• Full problem arena access</li>
                <li>• Streak freezing</li>
                <li>• Basic analytics</li>
              </ul>
              <button
                type="button"
                className="mt-6 rounded-md border border-zinc-200 px-4 py-2 text-sm font-bold dark:border-zinc-800"
              >
                Start Monthly
              </button>
            </article>

            <article className="rounded-md border border-[#A855F7] bg-[var(--surface)] p-6 shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              <p className="text-sm font-bold text-[#A855F7]">Pro Slayer (Best Value)</p>
              <p className="mt-2 text-3xl font-black">₹700 / year</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                <li>• Includes 5 Premium ML/DSA Courses</li>
                <li>• Unlimited Judge0 executions</li>
                <li>• Advanced AI-free hint drops</li>
                <li>• Profile badge</li>
              </ul>
              <motion.button
                type="button"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="mt-6 rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold text-[#F1F1F1]"
              >
                Go Pro Slayer
              </motion.button>
            </article>
          </div>
        </section>

        <footer className="border-t border-zinc-200 bg-[var(--surface)] dark:border-zinc-800">
          <div className="mx-auto w-full max-w-7xl px-4 py-10">
            <h2 className="text-3xl font-black">Ready to draw first blood?</h2>
          </div>
        </footer>
      </div>
    </main>
  );
}
