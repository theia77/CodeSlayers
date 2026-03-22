"use client";

import { Flame, Coins, ShieldCheck, Swords, BookOpen, Trophy } from "lucide-react";
import Link from "next/link";
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type DashboardContentProps = {
  fullName: string;
  xp: number;
  coins: number;
  rank: string;
  streak: number;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Arena", href: "/arena" },
  { label: "Problems", href: "/problems" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Courses", href: "/courses" },
  { label: "Settings", href: "/settings" },
];

const recentSubmissions = [
  { title: "Two Sum", language: "Python", status: "Accepted", runtime: "42ms" },
  { title: "Binary Search", language: "Java", status: "Accepted", runtime: "58ms" },
  { title: "Merge Intervals", language: "C++", status: "Wrong Answer", runtime: "--" },
  { title: "Kth Largest Element", language: "Kotlin", status: "Accepted", runtime: "74ms" },
];

const courses = [
  { name: "DSA Pattern Drill", progress: 72 },
  { name: "Machine Learning Basics", progress: 41 },
  { name: "Graph Mastery", progress: 56 },
];

const radarData = [
  { subject: "Arrays", value: 82 },
  { subject: "Trees", value: 68 },
  { subject: "DP", value: 49 },
  { subject: "Graphs", value: 61 },
  { subject: "Greedy", value: 74 },
  { subject: "ML", value: 58 },
];

function ContributionHeatmap() {
  const weeks = Array.from({ length: 52 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => (week * 7 + day) % 5),
  );

  const shades = ["bg-zinc-900", "bg-[#2a1c14]", "bg-[#4a2b16]", "bg-[#7a3b14]", "bg-[#FF4D00]"];

  return (
    <section className="rounded-md border border-zinc-800 bg-[#141414] p-4">
      <h3 className="text-sm font-semibold text-zinc-200">Activity Heatmap (Last 12 months)</h3>
      <div className="mt-3 overflow-x-auto">
        <div className="grid min-w-[760px] grid-flow-col gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((value, dayIndex) => (
                <div key={`${weekIndex}-${dayIndex}`} className={`h-3 w-3 rounded-sm ${shades[value]}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DashboardContent({ fullName, xp, coins, rank, streak }: DashboardContentProps) {
  const xpGoal = 2000;
  const xpPercent = Math.min(100, Math.round((xp / xpGoal) * 100));

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F1F1F1]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-md border border-zinc-800 bg-[#141414] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">CodeSlayers</p>
          <h1 className="mt-2 text-xl font-black">{fullName || "Slayer"}</h1>
            <nav className="mt-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                    item.label === "Dashboard"
                      ? "bg-[#FF4D00] text-[#F1F1F1]"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
        </aside>

        <section className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-md border border-zinc-800 bg-[#141414] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Streak</p>
              <div className="mt-2 flex items-center gap-2 text-2xl font-black">
                <Flame className="h-6 w-6 text-[#FF4D00]" />
                {streak} days
              </div>
            </article>

            <article className="rounded-md border border-zinc-800 bg-[#141414] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">XP Progress</p>
              <p className="mt-2 text-2xl font-black">{xp} XP</p>
              <div className="mt-3 h-2 rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-[#FF4D00]" style={{ width: `${xpPercent}%` }} />
              </div>
            </article>

            <article className="rounded-md border border-zinc-800 bg-[#141414] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Coins</p>
              <div className="mt-2 flex items-center gap-2 text-2xl font-black">
                <Coins className="h-6 w-6 text-[#FF4D00]" />
                {coins}
              </div>
            </article>

            <article className="rounded-md border border-zinc-800 bg-[#141414] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Current Rank</p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#FF4D00] px-3 py-1 text-sm font-bold text-[#FF4D00]">
                <ShieldCheck className="h-4 w-4" />
                {rank}
              </div>
            </article>
          </div>

          <ContributionHeatmap />

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <article className="rounded-md border border-[#FF4D00] bg-[#141414] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Daily Challenge</p>
                <h3 className="mt-2 text-xl font-black">Longest Palindromic Substring</h3>
                <p className="mt-2 text-sm text-zinc-400">Solve today&apos;s challenge to keep your streak alive.</p>
                <button type="button" className="mt-4 rounded-md bg-[#FF4D00] px-4 py-2 text-sm font-bold text-[#F1F1F1]">
                  Solve Now
                </button>
              </article>

              <article className="rounded-md border border-zinc-800 bg-[#141414] p-4">
                <h3 className="text-sm font-semibold text-zinc-200">Recent Submissions</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left text-sm">
                    <thead className="text-zinc-500">
                      <tr>
                        <th className="pb-2">Problem</th>
                        <th className="pb-2">Lang</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Runtime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSubmissions.map((submission) => (
                        <tr key={submission.title} className="border-t border-zinc-800">
                          <td className="py-2">{submission.title}</td>
                          <td className="py-2 text-zinc-400">{submission.language}</td>
                          <td className={`py-2 ${submission.status === "Accepted" ? "text-green-400" : "text-red-400"}`}>
                            {submission.status}
                          </td>
                          <td className="py-2 text-zinc-400">{submission.runtime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>

            <div className="space-y-4">
              <article className="rounded-md border border-zinc-800 bg-[#141414] p-4">
                <h3 className="text-sm font-semibold text-zinc-200">Your Progress</h3>
                <div className="mt-4 h-64 w-full">
                  <ResponsiveContainer>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#A1A1AA", fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="value" stroke="#FF4D00" fill="#FF4D00" fillOpacity={0.35} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="rounded-md border border-zinc-800 bg-[#141414] p-4">
                <h3 className="text-sm font-semibold text-zinc-200">Active Courses</h3>
                <div className="mt-3 space-y-3">
                  {courses.map((course) => (
                    <div key={course.name} className="rounded-md border border-zinc-800 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="inline-flex items-center gap-2 font-semibold">
                          <BookOpen className="h-4 w-4 text-[#FF4D00]" />
                          {course.name}
                        </span>
                        <span className="text-zinc-400">{course.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-zinc-800">
                        <div className="h-2 rounded-full bg-[#FF4D00]" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  <Swords className="h-4 w-4" />
                  <Trophy className="h-4 w-4" />
                  Keep pushing for Slayer rank.
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
