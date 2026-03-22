import { BookOpen, Flame, Shield, Sword, Terminal } from "lucide-react";

const heatmapRows = [
  [0.15, 0.35, 0.2, 0.75, 0.4, 0.85, 0.3, 0.9, 0.45, 0.25, 0.8, 0.5],
  [0.25, 0.65, 0.35, 0.9, 0.45, 0.3, 0.7, 0.4, 0.2, 0.8, 0.3, 0.6],
  [0.35, 0.5, 0.8, 0.25, 0.6, 0.35, 0.9, 0.55, 0.4, 0.7, 0.3, 0.9],
  [0.2, 0.75, 0.3, 0.6, 0.9, 0.45, 0.35, 0.85, 0.25, 0.65, 0.5, 0.8],
  [0.4, 0.2, 0.7, 0.3, 0.85, 0.5, 0.25, 0.75, 0.35, 0.9, 0.45, 0.6],
];

const pulseCells = new Set(["0-7", "1-3", "2-6", "3-4", "4-9"]);

function HeroButtons() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        className="inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
        style={{ backgroundColor: "var(--primary)" }}
      >
        Start DSA Track
      </button>
      <button
        className="inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
        style={{ backgroundColor: "var(--accent)" }}
      >
        Start ML Track
      </button>
    </div>
  );
}

function HeatmapCard() {
  return (
    <div
      className="mx-auto w-full max-w-4xl rounded-xl border p-5 sm:p-6"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "color-mix(in srgb, var(--text) 15%, transparent)",
      }}
    >
      <div className="mb-5 flex items-center gap-2 text-sm font-bold">
        <Flame size={18} style={{ color: "var(--primary)" }} />
        <span style={{ color: "var(--primary)" }}>21 Day Streak</span>
        <span style={{ color: "var(--muted)" }}>• Streak Wallet</span>
      </div>
      <div className="grid gap-1">
        {heatmapRows.map((row, rowIndex) => (
          <div className="grid grid-cols-12 gap-1" key={rowIndex}>
            {row.map((opacity, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              return (
                <span
                  key={key}
                  className={`h-4 w-4 rounded-[3px] ${
                    pulseCells.has(key) ? "heatmap-pulse" : ""
                  }`}
                  style={{
                    backgroundColor: `rgb(from var(--primary) r g b / ${opacity})`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCards() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-16 pt-8 sm:grid-cols-2 lg:grid-cols-3">
      <article
        className="rounded-xl border p-5"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "color-mix(in srgb, var(--text) 18%, transparent)",
        }}
      >
        <Flame size={20} style={{ color: "var(--primary)" }} />
        <h3 className="mt-3 text-lg font-extrabold">Problem Arena</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Battle challenges from Easy to Legendary and sharpen your algorithmic
          instincts under pressure.
        </p>
      </article>
      <article
        className="rounded-xl border p-5"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "color-mix(in srgb, var(--text) 18%, transparent)",
        }}
      >
        <Shield size={20} style={{ color: "var(--accent)" }} />
        <h3 className="mt-3 text-lg font-extrabold">Gamified Progression</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Earn XP, climb ranks from Iron to Slayer, and stack coins as your
          consistency and skill grow.
        </p>
      </article>
      <article
        className="rounded-xl border p-5 sm:col-span-2 lg:col-span-1"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "color-mix(in srgb, var(--text) 18%, transparent)",
        }}
      >
        <BookOpen size={20} style={{ color: "var(--primary)" }} />
        <h3 className="mt-3 text-lg font-extrabold">Interactive Courses</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Learn through markdown-first modules and auto-graded assignments built
          for practical mastery.
        </p>
      </article>
    </section>
  );
}

export default function Page() {
  return (
    <main style={{ backgroundColor: "var(--base)", color: "var(--text)" }}>
      <section
        className="pb-14"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, #FF4D0020, transparent 38%)",
        }}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2">
            <div
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "color-mix(in srgb, var(--text) 15%, transparent)",
              }}
            >
              <Terminal size={16} style={{ color: "var(--text)" }} />
              <Sword size={13} className="-ml-1" style={{ color: "var(--primary)" }} />
            </div>
            <span className="text-base font-black tracking-wide sm:text-lg">
              CodeSlayers
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="rounded-md border px-3 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{
                borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
                color: "var(--text)",
              }}
            >
              Log In
            </button>
            <button
              className="rounded-md px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Sign Up
            </button>
          </div>
        </nav>

        <div className="mx-auto w-full max-w-6xl px-4 pt-9 sm:pt-12">
          <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
            Slay the Code. Master the Algorithm.
          </h1>
          <p
            className="mt-4 max-w-2xl text-sm sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            The ultimate gamified arena for Data Structures, Algorithms, and
            Machine Learning.
          </p>
          <HeroButtons />
        </div>
      </section>

      <section className="-mt-4 px-4 pb-8 sm:-mt-7">
        <HeatmapCard />
      </section>

      <FeatureCards />

      <footer
        className="mt-3"
        style={{ backgroundColor: "var(--text)", color: "var(--base)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CodeSlayers. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="underline-offset-4 hover:underline">
              Terms
            </a>
            <a href="#" className="underline-offset-4 hover:underline">
              Privacy
            </a>
            <a href="#" className="underline-offset-4 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
