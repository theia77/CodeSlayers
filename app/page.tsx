import { Brain, Code, Coins, Flame, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const heatmapRows = 7;
const heatmapCols = 32;

const activityPalette = ["#FF4D00", "#FF5E1F", "#FF7040", "#FF8A66"];

function Heatmap() {
  return (
    <div className="grid gap-1 overflow-x-auto">
      {Array.from({ length: heatmapRows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid min-w-[32rem] gap-1"
          style={{ gridTemplateColumns: `repeat(${heatmapCols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: heatmapCols }).map((_, colIndex) => {
            const seed = (rowIndex * 37 + colIndex * 17) % 100;
            const isActive = seed > 58;
            const activeColor = activityPalette[(rowIndex + colIndex) % activityPalette.length];

            return (
              <span
                key={`${rowIndex}-${colIndex}`}
                className="h-3 w-3 rounded-[2px] border border-black/25"
                style={
                  isActive
                    ? {
                        backgroundColor: activeColor,
                        boxShadow: `0 0 8px ${activeColor}66`,
                      }
                    : { backgroundColor: "#27272A" }
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F1F1F1]">
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF4D00]/20 via-[#0A0A0A] to-[#0A0A0A]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-[#27272A] px-4 py-5"
        >
          <div className="flex items-center gap-6">
            <a href="#" aria-label="CodeSlayers home" className="flex items-center gap-2">
              <Terminal aria-hidden="true" className="h-8 w-8 text-[#FF4D00]" />
              <span className="text-lg font-black tracking-wide text-[#F1F1F1]">
                CodeSlayers
              </span>
            </a>
            <div className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
              <a href="#arena" className="hover:text-[#F1F1F1]">
                Arena
              </a>
              <a href="#leaderboard" className="hover:text-[#F1F1F1]">
                Leaderboard
              </a>
              <a href="#tracks" className="hover:text-[#F1F1F1]">
                Tracks
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="rounded-md text-[#F1F1F1] hover:bg-[#141414]">
              Login
            </Button>
            <Button className="rounded-md bg-[#FF4D00] text-[#F1F1F1] hover:opacity-90">
              Enter Arena
            </Button>
          </div>
        </nav>

        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-24">
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            Grind. Rank Up. Slay the Interview.
          </h1>
          <p className="mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">
            Stop doing boring tutorials. Grind real DSA &amp; ML problems, defend your
            streak, and rank up from Iron to Slayer in the most competitive coding
            arena on the web.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              aria-label="Start DSA Track"
              className="rounded-md bg-[#FF4D00] px-5 py-3 text-sm font-bold text-[#F1F1F1]"
            >
              Choose Your Weapon (DSA)
            </button>
            <button
              type="button"
              aria-label="Start ML Track"
              className="rounded-md border border-[#A855F7] bg-[#141414] px-5 py-3 text-sm font-bold text-[#F1F1F1]"
            >
              Enter the Matrix (ML)
            </button>
          </div>
        </div>
      </section>

      <section id="arena" className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="rounded-md border border-[#27272A] bg-[#141414] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 text-lg font-bold">
            <Flame aria-hidden="true" className="h-8 w-8 text-[#FF4D00]" />
            <span className="text-[#F1F1F1]">Current Streak: 42 Days</span>
          </div>
          <Heatmap />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10">
        <h2 className="mb-5 text-2xl font-black">The Rules of the Arena</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-md border border-[#27272A] bg-[#141414] p-5">
            <Code aria-hidden="true" className="h-6 w-6 text-[#FF4D00]" />
            <h3 className="mt-4 text-lg font-bold">Forged in the Editor.</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Built-in Monaco editor. Write Python, Java, C++, or Kotlin. Run
              hidden test cases via Judge0.
            </p>
          </article>
          <article className="rounded-md border border-[#27272A] bg-[#141414] p-5">
            <Coins aria-hidden="true" className="h-6 w-6 text-[#FF4D00]" />
            <h3 className="mt-4 text-lg font-bold">Protect Your Coins.</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Stuck? Buy hints with your hard-earned coins. Broke your streak? Pay
              the freeze tax. Every keystroke has a cost.
            </p>
          </article>
          <article className="rounded-md border border-[#27272A] bg-[#141414] p-5">
            <Brain aria-hidden="true" className="h-6 w-6 text-[#A855F7]" />
            <h3 className="mt-4 text-lg font-bold">Zero AI Bullshit.</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Our hints are structured by real engineers, not hallucinated by bots.
              Approach → Algorithm → Pseudocode.
            </p>
          </article>
        </div>
      </section>

      <section id="leaderboard" className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="rounded-md border border-[#27272A] bg-[#141414] p-6">
          <h2 className="text-2xl font-black">The Path to Slayer</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Where do you stand? Solve Legendary problems to climb the global
            leaderboard.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-bold sm:text-base">
            <span className="rounded-md border border-[#27272A] px-3 py-2">Iron</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-md border border-[#27272A] px-3 py-2">Bronze</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-md border border-[#27272A] px-3 py-2">Silver</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-md border border-[#27272A] px-3 py-2">Gold</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-md border border-[#27272A] px-3 py-2">Platinum</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-md border border-[#27272A] px-3 py-2">Diamond</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-md border border-[#A855F7] px-3 py-2 text-[#A855F7] [text-shadow:0_0_10px_#A855F7]">
              SLAYER
            </span>
          </div>
        </div>
      </section>

      <section id="tracks" className="mx-auto w-full max-w-7xl px-4 py-10">
        <h2 className="mb-5 text-2xl font-black">Choose Your Track</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-md border border-[#27272A] bg-[#141414] p-6">
            <h3 className="text-xl font-bold text-[#FF4D00]">DSA</h3>
            <p className="mt-3 text-sm text-zinc-300">Arrays, Trees, Dynamic Programming, Graphs.</p>
            <p className="mt-3 text-sm font-semibold">Master the structure.</p>
          </article>
          <article className="rounded-md border border-[#27272A] bg-[#141414] p-6">
            <h3 className="text-xl font-bold text-[#A855F7]">ML</h3>
            <p className="mt-3 text-sm text-zinc-300">
              NumPy, Pandas, Supervised Learning, Neural Nets.
            </p>
            <p className="mt-3 text-sm font-semibold">Train the machine.</p>
          </article>
        </div>
      </section>

      <footer className="border-t border-[#27272A] bg-[#141414]">
        <div className="mx-auto w-full max-w-7xl px-4 py-10">
          <h2 className="text-3xl font-black">Ready to draw first blood?</h2>
          <button
            type="button"
            className="mt-5 rounded-md bg-[#FF4D00] px-5 py-3 text-sm font-bold text-[#F1F1F1]"
          >
            Create Account
          </button>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-zinc-400">
            <a href="#" className="hover:text-[#F1F1F1]">
              Terms
            </a>
            <a href="#" className="hover:text-[#F1F1F1]">
              Privacy
            </a>
            <a href="#" className="hover:text-[#F1F1F1]">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
