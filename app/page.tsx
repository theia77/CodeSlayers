"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Sword,
  Check,
  X,
  Brain,
  Trophy,
  CalendarDays,
  Play,
  Star,
} from "lucide-react";
import Link from "next/link";

const logos = ["Google", "Meta", "Amazon", "Netflix", "Stripe"];

const roadmap = [
  {
    phase: "Initialize",
    title: "Learn the Fundamentals",
    description: "Master DSA core patterns and ML basics before stepping into ranked arenas.",
  },
  {
    phase: "Commit",
    title: "Build Real Projects & Solve Problems",
    description: "Ship guided projects and solve algorithm sets with real interview constraints.",
  },
  {
    phase: "Merge",
    title: "Defend your daily streak & Climb the global ranks",
    description: "Protect streaks, win daily battles, and push your profile up the leaderboard.",
  },
  {
    phase: "Deploy",
    title: "Clear technical interviews",
    description: "Simulate interviews, refine communication, and close offers with confidence.",
  },
];

const features = [
  {
    title: "Streak Wallet",
    text: "Calendar heatmap, freeze tokens, and consistency scoring for every grind day.",
    icon: CalendarDays,
  },
  {
    title: "Gamified Ranks",
    text: "Progress from Iron to Slayer through ranked coding gauntlets and milestone battles.",
    icon: Trophy,
  },
  {
    title: "AI-Free Hint System",
    text: "Structured algorithmic guidance: approach, complexity strategy, and pseudocode steps.",
    icon: Brain,
  },
];

const courses = [
  {
    title: "Full-Stack DSA Masterclass",
    instructor: "Aarav Mehta",
    hours: "42h",
    level: "Advanced",
    rating: "4.9",
    featured: true,
  },
  {
    title: "Applied Machine Learning",
    instructor: "Ishita Verma",
    hours: "38h",
    level: "Intermediate",
    rating: "4.8",
    featured: true,
  },
  {
    title: "Interview Systems Design Sprint",
    instructor: "Rahul Nair",
    hours: "24h",
    level: "Pro",
    rating: "4.7",
    featured: false,
  },
];

const marqueeLoopShift = "-33.333%";

function SpotlightCard({
  title,
  instructor,
  hours,
  level,
  rating,
  featured,
}: {
  title: string;
  instructor: string;
  hours: string;
  level: string;
  rating: string;
  featured: boolean;
}) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  return (
    <motion.article
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setSpotlight({ x, y });
      }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-md border bg-[#141414] p-6 ${
        featured ? "border-[#A855F7]" : "border-zinc-800"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,77,0,0.28), transparent 48%)`,
        }}
      />
      <div className="relative">
        {featured && (
          <span className="inline-flex rounded-md border border-[#A855F7] px-2 py-1 text-xs font-bold text-[#A855F7]">
            Featured Track
          </span>
        )}
        <h3 className="mt-3 text-xl font-black text-[#F1F1F1]">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400">Instructor: {instructor}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
          <span className="rounded border border-zinc-800 px-2 py-1">{hours}</span>
          <span className="rounded border border-zinc-800 px-2 py-1">{level}</span>
          <span className="inline-flex items-center gap-1 rounded border border-zinc-800 px-2 py-1">
            <Star className="h-3.5 w-3.5 text-[#FF4D00]" />
            {rating}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const timelineRef = useRef<HTMLElement | null>(null);
  const dashboardRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 80%"],
  });

  const { scrollYProgress: dashboardProgress } = useScroll({
    target: dashboardRef,
    offset: ["start 85%", "end 20%"],
  });

  const lineScale = useTransform(timelineProgress, [0, 1], [0, 1]);
  const dashboardScale = useTransform(dashboardProgress, [0, 1], [0.88, 1.05]);
  const dashboardY = useTransform(dashboardProgress, [0, 1], [80, -24]);

  const marqueeItems = useMemo(() => [...logos, ...logos, ...logos], []);
  const [runMessage, setRunMessage] = useState<string>("");

  useEffect(() => {
    if (!runMessage) {
      return;
    }

    const timeout = setTimeout(() => setRunMessage(""), 2500);
    return () => clearTimeout(timeout);
  }, [runMessage]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F1F1F1]">
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0A0A0A]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-[#FF4D00]" />
            <Sword className="h-6 w-6 text-[#FF4D00]" />
            <span className="text-lg font-black tracking-wide">CodeSlayers</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth" className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-semibold">
              Login
            </Link>
            <Link
              href="/auth"
              className="rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-semibold text-[#F1F1F1]"
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pb-16 pt-20">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(255,77,0,0.30)" }}
          animate={{ y: [0, 24, -16, 0], x: [0, 16, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(168,85,247,0.28)" }}
          animate={{ y: [0, -20, 14, 0], x: [0, -14, 10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start">
          <p className="mb-5 rounded border border-zinc-800 bg-[#141414] px-3 py-2 font-mono text-xs text-[#A855F7] sm:text-sm">
            codeslayers_core — bash&gt; ./start_grind.sh
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
            Grind. Rank Up. Slay The Interview.
          </h1>
          <p className="mt-5 max-w-2xl text-zinc-300">
            Premium, gamified DSA + ML mastery with ranked progression, project-driven execution,
            and elite interview prep loops.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/auth"
              className="rounded-md bg-[#FF4D00] px-6 py-3 text-sm font-bold text-[#F1F1F1] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              Enter the Arena
            </Link>
            <Link
              href="/auth?intent=courses"
              className="rounded-md border border-zinc-800 bg-[#141414] px-6 py-3 text-sm font-bold transition hover:bg-zinc-800/70 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 py-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex min-w-max gap-14 text-sm uppercase tracking-[0.3em] text-zinc-500"
            animate={{ x: ["0%", marqueeLoopShift] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {marqueeItems.map((logo, index) => (
              <span key={`${logo}-${index}`}>{logo}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={timelineRef} className="relative mx-auto w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-black sm:text-4xl">The Path to Slayer.</h2>
        <div className="relative mt-10 pl-10">
          <span className="absolute left-[11px] top-0 h-full w-[2px] bg-zinc-800" aria-hidden="true" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[11px] top-0 h-full w-[2px] origin-top bg-[#FF4D00]"
            style={{ scaleY: lineScale }}
          />

          <motion.div
            className="space-y-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.16 } },
            }}
          >
            {roadmap.map((item) => (
              <motion.article
                key={item.phase}
                variants={{
                  hidden: { opacity: 1, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="relative rounded-md border border-zinc-800 bg-[#141414] p-5"
              >
                <span className="absolute -left-[35px] top-6 h-4 w-4 rounded-full border-2 border-[#FF4D00] bg-[#0A0A0A]" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF4D00]">{item.phase}</p>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-zinc-400">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-black sm:text-4xl">Write &amp; Run Code Instantly.</h2>
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {["{ }", "=>", "[]", "()", "<>", "&&"].map((token, index) => (
            <motion.span
              key={token}
              className="absolute font-mono text-3xl text-zinc-700/40"
              style={{ left: `${12 + index * 14}%`, top: `${index % 2 ? 65 : 35}%` }}
              animate={{ y: [0, -18, 0], opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              {token}
            </motion.span>
          ))}
        </div>

        <div className="relative mt-10 grid gap-5 lg:grid-cols-2">
          <motion.article
            initial={false}
            whileInView={{ opacity: [0.8, 1], x: [-12, 0] }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-md border border-zinc-800 bg-[#141414] p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A855F7]">Problem Brief</p>
            <h3 className="mt-3 text-2xl font-bold">Implement a Linear Regression Model</h3>
            <p className="mt-3 text-zinc-300">Given `X` and `y`, implement gradient descent to learn weights and bias.</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-400">
              <li>• Time Complexity Target: O(n * epochs)</li>
              <li>• Handle feature normalization</li>
              <li>• Return MSE score after convergence</li>
            </ul>
          </motion.article>

          <motion.article
            initial={false}
            whileInView={{ opacity: [0.8, 1], x: [12, 0] }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-md border border-zinc-800 bg-[#141414] p-0"
          >
            <div className="border-b border-zinc-800 px-4 py-3 text-xs text-zinc-400">main.py</div>
            <pre className="overflow-x-auto px-4 py-5 font-mono text-sm leading-7 text-zinc-300">
{`def train_linear_regression(X, y, lr=0.01, epochs=1000):
    w, b = 0.0, 0.0
    n = len(X)

    for _ in range(epochs):
        preds = [w*x + b for x in X]
        dw = sum((preds[i] - y[i]) * X[i] for i in range(n)) / n
        db = sum(preds[i] - y[i] for i in range(n)) / n
        w -= lr * dw
        b -= lr * db

    return w, b`}
            </pre>
            <div className="px-4 pb-5">
              <button
                type="button"
                onClick={() => setRunMessage("Sample executed successfully in demo mode.")}
                className="inline-flex items-center gap-2 rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
              >
                <Play className="h-4 w-4" />
                Run Code
              </button>
              {runMessage ? <p className="mt-3 text-sm text-green-400">{runMessage}</p> : null}
            </div>
          </motion.article>
        </div>
      </section>

      <section ref={dashboardRef} className="relative mx-auto w-full max-w-7xl px-4 py-20">
        <motion.article
          style={{ scale: dashboardScale, y: dashboardY }}
          className="rounded-md border border-zinc-800 bg-[#141414] p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A855F7]">Dashboard Profile</p>
          <h3 className="mt-3 text-2xl font-black">Combat Metrics Overview</h3>
          <p className="mt-2 max-w-2xl text-zinc-400">
            Scroll-triggered zoom reveal for your streak, rank volatility, execution speed, and weak-topic heat zones.
          </p>
        </motion.article>

        <motion.div
          className="mt-8 grid gap-4 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                variants={{
                  hidden: { opacity: 1, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -4 }}
                className="rounded-md border border-zinc-800 bg-[#141414] p-5"
              >
                <Icon className="h-6 w-6 text-[#FF4D00]" />
                <h4 className="mt-3 text-lg font-bold">{feature.title}</h4>
                <p className="mt-2 text-sm text-zinc-400">{feature.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-black sm:text-4xl">Premium Developer Tracks.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {courses.map((course) => (
            <SpotlightCard key={course.title} {...course} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-black sm:text-4xl">CodeSlayers vs Traditional Platforms</h2>
        <div className="mt-8 overflow-x-auto rounded-md border border-zinc-800">
          <table className="w-full min-w-[44rem] border-collapse bg-[#141414] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-300">
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">CodeSlayers</th>
                <th className="px-4 py-3">Standard Bootcamps/LeetCode</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Real-world projects",
                "Gamified Ranks",
                "Live Streak Tracking",
                "Premium Editor",
              ].map((row) => (
                <tr key={row} className="border-b border-zinc-800 last:border-0">
                  <td className="px-4 py-4 text-zinc-200">{row}</td>
                  <td className="px-4 py-4">
                    <Check className="h-5 w-5 text-[#FF4D00]" />
                  </td>
                  <td className="px-4 py-4">
                    <X className="h-5 w-5 text-zinc-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-black sm:text-4xl">Unlock Your Slayer Arsenal.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-md border border-zinc-800 bg-[#141414] p-6">
            <h3 className="text-xl font-bold">Challenger (Monthly)</h3>
            <p className="mt-3 text-4xl font-black text-[#F1F1F1]">₹200 / month</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-400">
              <li>• Basic arena access</li>
              <li>• Analytics dashboard</li>
              <li>• Streak freezes</li>
            </ul>
            <Link
              href="/auth?plan=challenger"
              className="mt-6 inline-block rounded-md border border-zinc-800 px-4 py-2 text-sm font-bold transition hover:bg-zinc-800/70 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              Start Challenger
            </Link>
          </article>

          <article className="rounded-md border border-[#A855F7] bg-[#141414] p-6 shadow-[0_0_24px_rgba(168,85,247,0.32)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A855F7]">Best Value</p>
            <h3 className="mt-2 text-xl font-bold">Pro Slayer (Annual)</h3>
            <p className="mt-3 text-4xl font-black text-[#F1F1F1]">₹700 / year</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-400">
              <li>• All 5 Premium ML/DSA Courses</li>
              <li>• Advanced execution metrics</li>
              <li>• Exclusive Slayer profile badge</li>
            </ul>
            <Link
              href="/auth?plan=pro-slayer"
              className="mt-6 inline-block rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold text-[#F1F1F1] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              Choose Pro Slayer
            </Link>
          </article>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-[#141414]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-black">Ready to draw first blood?</h2>
          <div className="flex gap-4 text-sm text-zinc-400">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
